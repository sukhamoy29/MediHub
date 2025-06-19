from fastapi import APIRouter, HTTPException, Depends, Header, status
from sqlalchemy.orm import Session
from fastapi import Body, Path
from backend.database import get_db
from backend.models import User, UserProfile
from backend.schemas import UserProfileCreate, UserProfileUpdate, UserProfileResponse, ChangePasswordRequest
from backend.utils import hash_password, verify_password, create_access_token
import jwt
from typing import Optional
from datetime import datetime

SECRET_KEY = "your_secret_key"
ALGORITHM = "HS256"

router = APIRouter()

def get_current_user(authorization: Optional[str] = Header(None), db: Session = Depends(get_db)) -> User:
    if authorization is None or not authorization.startswith("Bearer "):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid authorization header")
    token = authorization.split(" ")[1]
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        email: str = payload.get("sub")
        if email is None:
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid token payload")
    except jwt.PyJWTError:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Could not validate credentials")
    user = db.query(User).filter(User.email == email).first()
    if user is None:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="User not found")
    return user

@router.get("/profile/{user_id}", response_model=UserProfileResponse)
def get_user_profile(
    user_id: int = Path(..., gt=0),
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    user_profile = db.query(UserProfile).filter(UserProfile.id == user_id).first()
    if not user_profile:
        raise HTTPException(status_code=404, detail="User profile not found")
    return user_profile

from pydantic import ValidationError
from fastapi.responses import JSONResponse

@router.post("/profile/{user_id}", response_model=UserProfileResponse)
def create_user_profile(
    user_id: int,
    profile_data: dict,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    # Verify user has permission
    if current_user.id != user_id:
        raise HTTPException(status_code=403, detail="Not authorized to modify this profile")
        
    # Check if profile already exists
    existing_profile = db.query(UserProfile).filter(UserProfile.id == user_id).first()
    if existing_profile:
        raise HTTPException(status_code=400, detail="Profile already exists")

    try:
        # Validate input data explicitly
        validated_profile = UserProfileCreate(**profile_data)
        profile_dict = validated_profile.dict()
        new_profile = UserProfile(**profile_dict)
        new_profile.id = user_id
        
        db.add(new_profile)
        db.commit()
        db.refresh(new_profile)
        return new_profile
    except ValidationError as ve:
        db.rollback()
        return JSONResponse(status_code=422, content={"detail": ve.errors()})
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=400, detail=str(e))

@router.put("/profile/{user_id}", response_model=UserProfileResponse)
def update_user_profile(
    user_id: int,
    profile_data: dict,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    # Verify user has permission
    if current_user.id != user_id:
        raise HTTPException(status_code=403, detail="Not authorized to modify this profile")
        
    profile = db.query(UserProfile).filter(UserProfile.id == user_id).first()
    if not profile:
        try:
            # If profile doesn't exist, create it
            validated_profile = UserProfileCreate(**profile_data)
            profile_dict = validated_profile.dict()
            new_profile = UserProfile(**profile_dict)
            new_profile.id = user_id
            
            db.add(new_profile)
            db.commit()
            db.refresh(new_profile)
            return new_profile
        except ValidationError as ve:
            db.rollback()
            return JSONResponse(status_code=422, content={"detail": ve.errors()})
        except Exception as e:
            db.rollback()
            raise HTTPException(status_code=400, detail=str(e))

    try:
        # Validate update data explicitly
        validated_update = UserProfileUpdate(**profile_data)
        update_data = validated_update.dict(exclude_unset=True)
        # Update existing profile
        for field, value in update_data.items():
            if value is not None:  # Only update non-null values
                setattr(profile, field, value)
        
        db.commit()
        db.refresh(profile)
        return profile
    except ValidationError as ve:
        db.rollback()
        return JSONResponse(status_code=422, content={"detail": ve.errors()})
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=400, detail=str(e))

@router.post("/change-password")
def change_password(
    password_data: ChangePasswordRequest,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    if password_data.new_password != password_data.confirm_password:
        raise HTTPException(status_code=400, detail="New password and confirm password do not match")
    
    if not verify_password(password_data.current_password, current_user.password_hash):
        raise HTTPException(status_code=400, detail="Current password is incorrect")
    
    # Password strength validation
    import re
    strong_password_regex = re.compile(r"^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$")
    if not strong_password_regex.match(password_data.new_password):
        raise HTTPException(
            status_code=400,
            detail="Password must be at least 8 characters long, include an uppercase letter, a lowercase letter, a number, and a special character."
        )
    
    current_user.password_hash = hash_password(password_data.new_password)
    db.commit()
    return {"message": "Password changed successfully"}

@router.delete("/delete-account")
def delete_account(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    try:
        # Delete the user and cascade delete related data (doctor, profile)
        db.delete(current_user)
        db.commit()
        # Additional cleanup can be done here if needed (e.g., invalidate tokens)
        return {"message": "Account deleted successfully"}
    except Exception as e:
        db.rollback()
        # For debugging, return the error detail in response
        return {"error": f"Failed to delete account: {str(e)}"}


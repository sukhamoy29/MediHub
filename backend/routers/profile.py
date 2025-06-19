from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from backend.database import get_db
from backend.models import UserProfile
from backend.schemas import UserProfileCreate, UserProfileUpdate
from backend.routers.auth import get_current_user

router = APIRouter()

@router.get("/{user_id}", response_model=UserProfileCreate)
def get_profile(user_id: int, db: Session = Depends(get_db), current_user: dict = Depends(get_current_user)):
    if current_user["id"] != user_id:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Not authorized to access this profile")
    profile = db.query(UserProfile).filter(UserProfile.id == user_id).first()
    if not profile:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Profile not found")
    return profile

@router.put("/{user_id}")
def update_profile(user_id: int, profile_data: UserProfileUpdate, db: Session = Depends(get_db), current_user: dict = Depends(get_current_user)):
    if current_user["id"] != user_id:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Not authorized to update this profile")
    profile = db.query(UserProfile).filter(UserProfile.id == user_id).first()
    if not profile:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Profile not found")
    for key, value in profile_data.dict(exclude_unset=True).items():
        setattr(profile, key, value)
    db.commit()
    db.refresh(profile)
    return {"message": "Profile updated successfully"}

@router.post("/{user_id}")
def create_profile(user_id: int, profile_data: UserProfileCreate, db: Session = Depends(get_db), current_user: dict = Depends(get_current_user)):
    if current_user["id"] != user_id:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Not authorized to create this profile")
    existing_profile = db.query(UserProfile).filter(UserProfile.id == user_id).first()
    if existing_profile:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Profile already exists")
    new_profile = UserProfile(**profile_data.dict())
    db.add(new_profile)
    db.commit()
    db.refresh(new_profile)
    return {"message": "Profile created successfully"}

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from backend.models import ClinicProfile
from backend.schemas import ClinicProfileCreate, ClinicProfileOut, ClinicProfileUpdate
from backend.database import get_db
from backend.auth import get_current_user

router = APIRouter(tags=["Clinic Profile"])

@router.get("/")
def test():
    return {"message": "Clinic profile router is working"}

@router.post("/", response_model=ClinicProfileOut)
def create_profile(profile: ClinicProfileCreate, db: Session = Depends(get_db)):
    new_profile = ClinicProfile(**profile.dict())
    db.add(new_profile)
    db.commit()
    db.refresh(new_profile)
    return new_profile

@router.get("/user/{user_id}", response_model=ClinicProfileOut)
def get_profile_by_user(user_id: int, db: Session = Depends(get_db)):
    # Removed validation for negative user_id to allow demo users to fetch profile
    try:
        profile = db.query(ClinicProfile).filter(ClinicProfile.user_id == user_id).first()
        if not profile:
            raise HTTPException(status_code=404, detail="Clinic profile not found")
        return profile
    except Exception as e:
        # Log the exception and return 500 error with stack trace
        import traceback
        traceback_str = ''.join(traceback.format_tb(e.__traceback__))
        print(f"Error fetching clinic profile for user_id {user_id}: {e}\nTraceback:\n{traceback_str}")
        raise HTTPException(status_code=500, detail="Internal Server Error")

@router.put("/user/{user_id}", response_model=ClinicProfileOut)
def update_profile_by_user(user_id: int, profile_data: ClinicProfileUpdate, db: Session = Depends(get_db), current_user: dict = Depends(get_current_user)):
    # Removed validation for negative user_id to allow demo users to update profile
    # Check if user is authorized to update this profile
    if current_user["id"] != user_id:
        raise HTTPException(status_code=403, detail="Not authorized to update this profile")
        
    profile = db.query(ClinicProfile).filter(ClinicProfile.user_id == user_id).first()
    if not profile:
        raise HTTPException(status_code=404, detail="Clinic profile not found")
        
    try:
        for key, value in profile_data.dict(exclude_unset=True).items():
            setattr(profile, key, value)
        db.commit()
        db.refresh(profile)
        return profile
    except Exception as e:
        import traceback
        traceback_str = ''.join(traceback.format_tb(e.__traceback__))
        print(f"Error updating clinic profile for user_id {user_id}: {e}\nTraceback:\n{traceback_str}")
        db.rollback()
        raise HTTPException(status_code=400, detail=str(e))

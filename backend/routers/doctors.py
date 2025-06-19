from fastapi import APIRouter, HTTPException, Depends, status
from sqlalchemy.orm import Session
from backend import models, schemas
from backend.database import get_db
import logging
import traceback

router = APIRouter(
    
    tags=["doctors"]
)

logger = logging.getLogger("uvicorn.error")

@router.get("/test-db")
def test_db_connection(db: Session = Depends(get_db)):
    try:
        doctors = db.query(models.Doctor).all()
        doctors_data = [doctor.to_dict() for doctor in doctors]
        return {"status": "success", "data": doctors_data}
    except Exception as e:
        import traceback
        tb_str = traceback.format_exc()
        logger.error(f"Error in test_db_connection: {e}\n{tb_str}")
        return {"status": "error", "message": str(e), "traceback": tb_str}

from backend.routers.auth import get_current_user

@router.get("/", response_model=list[schemas.DoctorOut])
def get_doctors(current_user: dict = Depends(get_current_user), db: Session = Depends(get_db)):
    try:
        doctors = db.query(models.Doctor).filter(models.Doctor.user_id == current_user["id"]).all()
        print(f"DEBUG: Fetched doctors from DB for user_id {current_user['id']}: {doctors}")
        print(f"DEBUG: Type of doctors: {type(doctors)}")
        print(f"DEBUG: Doctors content: {[str(doctor) for doctor in doctors]}")
        # Convert to list of Pydantic schema instances for proper serialization
        doctors_out = []
        for doctor in doctors:
            try:
                doctor_dict = doctor.to_dict()
                doctor_out = schemas.DoctorOut(**doctor_dict)
                doctors_out.append(doctor_out)
            except Exception as ser_e:
                ser_tb_str = traceback.format_exc()
                print(f"Serialization error for doctor {doctor.id}: {ser_e}\n{ser_tb_str}")
                logger.error(f"Serialization error for doctor {doctor.id}: {ser_e}\n{ser_tb_str}")
                raise HTTPException(status_code=500, detail=f"Serialization Error for doctor {doctor.id}")
        return doctors_out
    except Exception as e:
        import sys
        import traceback as tb
        exc_type, exc_value, exc_traceback = sys.exc_info()
        tb_str = ''.join(tb.format_exception(exc_type, exc_value, exc_traceback))
        print(f"Exception in get_doctors: {e}\n{tb_str}")
        logger.error(f"Error fetching doctors: {e}\n{tb_str}")
        # Show internal server error details in response for debugging
        raise HTTPException(status_code=500, detail=f"Internal Server Error: {e}")

@router.post("/", response_model=schemas.DoctorOut, status_code=status.HTTP_201_CREATED)
def create_doctor(doctor: schemas.DoctorCreate, current_user: dict = Depends(get_current_user), db: Session = Depends(get_db)):
    # Check if contact email already exists
    existing_doctor = db.query(models.Doctor).filter(models.Doctor.contact == doctor.contact).first()
    if existing_doctor:
        raise HTTPException(status_code=400, detail="Doctor with this contact email already exists")

    db_doctor = models.Doctor(
        name=doctor.name,
        specialty=doctor.specialty,
        contact=doctor.contact,
        phone=doctor.phone,
        status=doctor.status,
        patients=doctor.patients,
        years=doctor.years,
        availability=doctor.availability,
        bio=doctor.bio,
        user_id=current_user["id"]
    )
    db.add(db_doctor)
    db.commit()
    db.refresh(db_doctor)
    return db_doctor

@router.get("/{doctor_id}", response_model=schemas.DoctorOut)
def get_doctor(doctor_id: int, current_user: dict = Depends(get_current_user), db: Session = Depends(get_db)):
    doctor = db.query(models.Doctor).filter(models.Doctor.id == doctor_id, models.Doctor.user_id == current_user["id"]).first()
    if not doctor:
        raise HTTPException(status_code=404, detail="Doctor not found")
    return doctor

@router.put("/{doctor_id}", response_model=schemas.DoctorOut)
def update_doctor(doctor_id: int, doctor_update: schemas.DoctorUpdate, current_user: dict = Depends(get_current_user), db: Session = Depends(get_db)):
    doctor = db.query(models.Doctor).filter(models.Doctor.id == doctor_id, models.Doctor.user_id == current_user["id"]).first()
    if not doctor:
        raise HTTPException(status_code=404, detail="Doctor not found")
    for var, value in vars(doctor_update).items():
        if value is not None:
            setattr(doctor, var, value)
    db.commit()
    db.refresh(doctor)
    return doctor

@router.delete("/{doctor_id}", status_code=204)
def delete_doctor(doctor_id: int, db: Session = Depends(get_db)):
    doctor = db.query(models.Doctor).filter(models.Doctor.id == doctor_id).first()
    if not doctor:
        raise HTTPException(status_code=404, detail="Doctor not found")
    db.delete(doctor)
    db.commit()
    return

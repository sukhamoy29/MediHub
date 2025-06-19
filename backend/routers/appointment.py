from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from ..database import SessionLocal, engine
from .. import models, schemas
from backend.auth import get_current_user

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/", response_model=schemas.AppointmentOut)
def create_appointment(
    appointment: schemas.AppointmentCreate,
    db: Session = Depends(get_db),
    user: dict = Depends(get_current_user),
):
    import logging
    appointment_data = appointment.dict()
    appointment_data["email"] = user["email"]  # Override email with logged-in user's email
    logging.info(f"Creating appointment with data: {appointment_data}")
    db_appointment = models.Appointment(**appointment_data)
    db.add(db_appointment)
    db.commit()
    db.refresh(db_appointment)
    return db_appointment

from sqlalchemy.orm import joinedload
from sqlalchemy import select, func

@router.get("/appointments", response_model=list[schemas.AppointmentOut])
def get_appointments(
    db: Session = Depends(get_db),
    user: dict = Depends(get_current_user),
):
    # Query appointments for the user
    appointments = db.query(models.Appointment).filter(models.Appointment.email == user["email"]).all()

    # For each appointment, fetch fees from ClinicsPayment if available
    for appt in appointments:
        payment = db.query(models.ClinicsPayment).filter(models.ClinicsPayment.appointment_id == appt.id).first()
        appt.fees = payment.amount if payment else 0
        # Address is not available in models, set default or empty string
        appt.address = "Address Not Available"

    return appointments

@router.get("/appointments/all", response_model=list[schemas.AppointmentOut])
def get_all_appointments(
    db: Session = Depends(get_db),
    user: dict = Depends(get_current_user),
):
    # Check if user is admin
    if not user.get("is_admin", False):
        raise HTTPException(status_code=403, detail="Not authorized to access all appointments")

    appointments = db.query(models.Appointment).all()

    for appt in appointments:
        payment = db.query(models.ClinicsPayment).filter(models.ClinicsPayment.appointment_id == appt.id).first()
        appt.fees = payment.amount if payment else 0
        appt.address = "Address Not Available"

    return appointments

@router.put("/appointments/{appointment_id}", response_model=schemas.AppointmentOut)
def update_appointment(
    appointment_id: int,
    appointment: schemas.AppointmentCreate,
    db: Session = Depends(get_db),
    user: dict = Depends(get_current_user),
):
    db_appointment = db.query(models.Appointment).filter(models.Appointment.id == appointment_id).first()
    if not db_appointment:
        raise HTTPException(status_code=404, detail="Appointment not found")
    for key, value in appointment.dict().items():
        setattr(db_appointment, key, value)

    # Also update ClinicsAppointment status if exists
    from datetime import datetime
    updated_data = appointment.dict()
    import logging
    logging.info(f"Updating ClinicsAppointment status with data: {updated_data}")

    # Convert date string to date object if needed
    date_value = updated_data.get("date")
    if isinstance(date_value, str):
        try:
            date_value = datetime.strptime(date_value, "%Y-%m-%d").date()
        except Exception as e:
            logging.error(f"Date conversion error: {e}")

    db_clinic_appointment = db.query(models.ClinicsAppointment).filter(
        models.ClinicsAppointment.doctor_id == updated_data.get("doctor_id"),
        models.ClinicsAppointment.date == date_value,
        models.ClinicsAppointment.time == updated_data.get("time"),
        models.ClinicsAppointment.patient_name == updated_data.get("patient_name"),
    ).first()
    if db_clinic_appointment:
        logging.info(f"Found ClinicsAppointment to update: {db_clinic_appointment.id}")
        if "status" in updated_data:
            db_clinic_appointment.status = updated_data.get("status")

    db.commit()
    db.refresh(db_appointment)
    return db_appointment



# clinic appointment routes
@router.post("/clinic_appointments", response_model=schemas.ClinicsAppointmentOut)
def create_clinic_appointment(
    appointment: schemas.ClinicsAppointmentCreate,
    db: Session = Depends(get_db),
    user: dict = Depends(get_current_user),
):
    import logging
    appointment_data = appointment.dict()
    appointment_data["email"] = user["email"]  # Override email with logged-in user's email
    logging.info(f"Creating clinic appointment with data: {appointment_data}")
    db_appointment = models.ClinicsAppointment(**appointment_data)
    db.add(db_appointment)

    # Also create a general appointment record
    general_appointment_data = {
        "doctor_id": appointment_data.get("doctor_id"),
        "doctor_name": appointment_data.get("doctor_name"),
        "location": appointment_data.get("clinic_name"),
        "date": appointment_data.get("date"),
        "time": appointment_data.get("time"),
        "status": appointment_data.get("status", "Pending"),
        "patient_name": appointment_data.get("patient_name"),
        "phone_number": appointment_data.get("phone_number"),
        "email": appointment_data.get("email"),
        "radio_button_value": appointment_data.get("radio_button_value"),
        "feedback_rating": appointment_data.get("feedback_rating"),
        "feedback_comment": appointment_data.get("feedback_comment"),
    }
    db_general_appointment = models.Appointment(**general_appointment_data)
    db.add(db_general_appointment)

    db.commit()
    db.refresh(db_appointment)
    return db_appointment

from urllib.parse import unquote

@router.get("/clinic_appointments/{clinic_name}", response_model=list[schemas.ClinicsAppointmentOut])
def get_clinic_appointments(
    clinic_name: str,
    db: Session = Depends(get_db),
    user: dict = Depends(get_current_user),
):
    decoded_clinic_name = unquote(clinic_name)
    appointments = db.query(models.ClinicsAppointment).filter(models.ClinicsAppointment.clinic_name == decoded_clinic_name).all()
    return appointments

@router.get("/appointments/clinic/{clinic_name}", response_model=list[schemas.AppointmentOut])
def get_user_booked_appointments_for_clinic(
    clinic_name: str,
    db: Session = Depends(get_db),
    user: dict = Depends(get_current_user),
):
    appointments = db.query(models.Appointment).filter(models.Appointment.location == clinic_name).all()
    return appointments

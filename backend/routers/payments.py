from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from backend import models, schemas
from backend.database import get_db
from datetime import date

router = APIRouter(
    prefix="",
    tags=["payments"]
)

@router.post("/", response_model=schemas.ClinicsPaymentOut)
def create_payment(payment: schemas.ClinicsPaymentCreate, db: Session = Depends(get_db)):
    db_payment = models.ClinicsPayment(
        clinic_name=payment.clinic_name,
        appointment_id=payment.appointment_id,
        patient_name=payment.patient_name,
        doctor=payment.doctor,
        service=payment.service,
        amount=payment.amount,
        status=payment.status,
        payment_date=payment.payment_date,
        payment_method=payment.payment_method,
        notes=payment.notes
    )
    db.add(db_payment)
    db.commit()
    db.refresh(db_payment)
    return db_payment

@router.get("/clinic/{clinic_name}", response_model=List[schemas.ClinicsPaymentOut])
def get_payments_by_clinic(clinic_name: str, db: Session = Depends(get_db)):
    payments = db.query(models.ClinicsPayment).filter(models.ClinicsPayment.clinic_name == clinic_name).all()
    return payments

@router.get("/", response_model=List[schemas.ClinicsPaymentOut])
def get_all_payments(db: Session = Depends(get_db)):
    payments = db.query(models.ClinicsPayment).all()
    return payments

@router.put("/{payment_id}", response_model=schemas.ClinicsPaymentOut)
def update_payment_status(payment_id: int, status: str, db: Session = Depends(get_db)):
    payment = db.query(models.ClinicsPayment).filter(models.ClinicsPayment.id == payment_id).first()
    if not payment:
        raise HTTPException(status_code=404, detail="Payment not found")
    payment.status = status
    db.commit()
    db.refresh(payment)
    return payment

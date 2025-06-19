from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from backend.database import get_db
from backend.models import UserPayment
from backend.schemas import UserPaymentCreate, UserPaymentResponse

router = APIRouter(prefix="", tags=["User Payments"])

@router.post("/", response_model=UserPaymentResponse)
def create_user_payment(payment: UserPaymentCreate, db: Session = Depends(get_db)):
    db_payment = UserPayment(**payment.dict())
    db.add(db_payment)
    db.commit()
    db.refresh(db_payment)
    return db_payment

@router.get("/", response_model=List[UserPaymentResponse])
def get_all_user_payments(db: Session = Depends(get_db)):
    payments = db.query(UserPayment).all()
    return payments

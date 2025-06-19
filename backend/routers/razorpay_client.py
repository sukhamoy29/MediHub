# backend/routers/payments.py
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
import razorpay
import os

router = APIRouter()

# Setup Razorpay credentials (use env variables in production)
RAZORPAY_KEY_ID = "rzp_test_FnBeGoJAHlye2h"
RAZORPAY_KEY_SECRET = "NOBWohePdMcLaWNvwDetMT3q"

razorpay_client = razorpay.Client(auth=(RAZORPAY_KEY_ID, RAZORPAY_KEY_SECRET))


class PaymentRequest(BaseModel):
    amount: float
    currency: str = "INR"
    receipt: str
    notes: dict = {}


@router.post("/create-order")
def create_order(payment: PaymentRequest):
    try:
        order_data = {
            "amount": int(payment.amount * 100),  # Razorpay uses paise
            "currency": payment.currency,
            "receipt": payment.receipt,
            "notes": payment.notes,
        }
        order = razorpay_client.order.create(data=order_data)
        return {"order_id": order["id"], "razorpay_key": RAZORPAY_KEY_ID}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

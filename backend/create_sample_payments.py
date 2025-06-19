from datetime import datetime, date
from sqlalchemy.orm import Session
from backend.database import SessionLocal
from backend.models import UserPayment
from decimal import Decimal

def create_sample_payments():
    db = SessionLocal()
    try:
        # Sample payment data
        payments = [
            {
                "invoice_number": "INV001",
                "patient_name": "John Doe",
                "payment_type": "Credit Card",
                "payment_time": "09:30 AM",
                "amount": Decimal("150.00"),
                "clinic_name": "City Health Clinic",
                "payment_date": date(2025, 6, 1),
                "status": "Completed"
            },
            {
                "invoice_number": "INV002",
                "patient_name": "Jane Smith",
                "payment_type": "Debit Card",
                "payment_time": "02:15 PM",
                "amount": Decimal("200.00"),
                "clinic_name": "Kids Care Clinic",
                "payment_date": date(2025, 6, 2),
                "status": "Pending"
            },
            {
                "invoice_number": "INV003",
                "patient_name": "Mike Johnson",
                "payment_type": "Cash",
                "payment_time": "11:45 AM",
                "amount": Decimal("300.00"),
                "clinic_name": "Prime Vision Eye Care",
                "payment_date": date(2025, 6, 3),
                "status": "Completed"
            },
            {
                "invoice_number": "INV004",
                "patient_name": "Sarah Brown",
                "payment_type": "UPI",
                "payment_time": "04:00 PM",
                "amount": Decimal("175.00"),
                "clinic_name": "City Health Clinic",
                "payment_date": date(2025, 6, 4),
                "status": "Refunded"
            }
        ]

        # Clear existing payments
        db.query(UserPayment).delete()
        
        # Add new payments
        for payment_data in payments:
            payment = UserPayment(**payment_data)
            db.add(payment)
        
        db.commit()
        print("Sample payments created successfully!")
        
        # Verify the data
        all_payments = db.query(UserPayment).all()
        print(f"\nCreated {len(all_payments)} payments:")
        for payment in all_payments:
            print(f"Invoice: {payment.invoice_number}, Patient: {payment.patient_name}, Amount: {payment.amount}, Status: {payment.status}")

    except Exception as e:
        print(f"Error creating sample payments: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    create_sample_payments()

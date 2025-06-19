from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List

from backend.database import get_db
from backend.models import ContactRequest
from backend.schemas import ContactRequestCreate, ContactRequestOut

router = APIRouter(
    tags=["contact-request"]
)

@router.post("/", response_model=ContactRequestOut, status_code=status.HTTP_201_CREATED)
def create_contact_request(contact_request: ContactRequestCreate, db: Session = Depends(get_db)):
    db_contact_request = ContactRequest(
        user_id=contact_request.user_id,
        name=contact_request.name,
        email=contact_request.email,
        contact_number=contact_request.contact_number,
        message=contact_request.message
    )
    db.add(db_contact_request)
    db.commit()
    db.refresh(db_contact_request)
    return db_contact_request

@router.get("/", response_model=List[ContactRequestOut])
def get_all_contact_requests(db: Session = Depends(get_db)):
    contact_requests = db.query(ContactRequest).all()
    return contact_requests

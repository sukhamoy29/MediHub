from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List

from backend.database import get_db
from backend.models import SiteFeedback
from backend.schemas import SiteFeedbackCreate, SiteFeedbackOut

router = APIRouter(
    tags=["site-feedback"]
)

@router.post("/", response_model=SiteFeedbackOut, status_code=status.HTTP_201_CREATED)
def create_feedback(feedback: SiteFeedbackCreate, db: Session = Depends(get_db)):
    db_feedback = SiteFeedback(
        user_id=feedback.user_id,
        name=feedback.name,
        email=feedback.email,
        feedback_type=feedback.feedback_type,
        rating=feedback.rating,
        feedback=feedback.feedback
    )
    db.add(db_feedback)
    db.commit()
    db.refresh(db_feedback)
    return db_feedback

@router.get("/", response_model=List[SiteFeedbackOut])
def get_all_feedback(db: Session = Depends(get_db)):
    feedbacks = db.query(SiteFeedback).all()
    return feedbacks

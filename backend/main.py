from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .routers.auth import router as auth_router
from .routers.users import router as users_router
from .routers.doctors import router as doctors_router
from .routers.appointment import router as appointment_router
from .routers.profile import router as profile_router
from .routers.payments import router as payments_router
from .routers.clinic_profile import router as clinic_profile_router
from .routers.site_feedback import router as site_feedback_router
from .routers.contact_request import router as contact_request_router
from .routers.user_payment import router as user_payment_router
from .routers.razorpay_client import router as razorpay_client_router

from .database import Base, engine

Base.metadata.create_all(bind=engine)

app = FastAPI()

print("Registering routers...")  

app.add_middleware(
    CORSMiddleware,
   allow_origins=["https://medi-hub-three.vercel.app/", "http://localhost:3000"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.include_router(auth_router, prefix="/auth")
print("Registered auth_router")

app.include_router(users_router, prefix="/api")
print("Registered users_router")

app.include_router(appointment_router, prefix="/api", tags=["Appointments"])
print("Registered appointment_router")

app.include_router(doctors_router, prefix="/api/doctors", tags=["Doctors"])
print("Registered doctors_router")

app.include_router(payments_router, prefix="/api/payments", tags=["Payments"])
print("Registered payments_router")

app.include_router(profile_router, prefix="/api/profile", tags=["Profile"])
print("Registered profile_router")

app.include_router(clinic_profile_router, prefix="/clinic-profile", tags=["Clinic Profile"])
print("Registered clinic_profile")

app.include_router(site_feedback_router, prefix="/site-feedback", tags=["Site Feedback"])
print("Registered site_feedback_router")

app.include_router(contact_request_router, prefix="/contact-request", tags=["Contact Request"])
print("Registered contact_request_router")

app.include_router(user_payment_router, prefix="/api/user_payments", tags=["User Payments"])
print("Registered user_payment_router")

app.include_router(razorpay_client_router, prefix="/razorpay", tags=["Razorpay Client"])
print("Registered razorpay_client_router")
# SQLAlchemy models

from sqlalchemy import Column, Integer, String, Boolean, Enum, ForeignKey, Time, JSON, Date, Text, TIMESTAMP, DECIMAL, DateTime, func
from sqlalchemy.orm import relationship
from backend.database import Base

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True)
    name = Column(String)
    email = Column(String, unique=True, index=True)
    phone = Column(String)
    password_hash = Column(String)
    role = Column(Enum("doctor", "patient", "clinic"))
    doctors = relationship("Doctor", back_populates="user", uselist=False, cascade="all, delete-orphan")
    profile = relationship("UserProfile", back_populates="user", uselist=False, cascade="all, delete-orphan")
    clinic_profile = relationship("ClinicProfile", back_populates="user", uselist=False, cascade="all, delete-orphan")

class UserProfile(Base):
    __tablename__ = "patients_profile"
    id = Column(Integer, ForeignKey("users.id"), primary_key=True)
    user = relationship("User", back_populates="profile")
    name = Column(String(255), nullable=False)
    image = Column(Text(length=4294967295))
    phone_number = Column(String(15), nullable=False)
    email = Column(String(255), nullable=False)
    dob = Column(Date, nullable=False)
    gender = Column(Enum('Male', 'Female', 'Other'), nullable=False)
    blood_group = Column(Enum('A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'), nullable=False)
    house_no = Column(String(255), nullable=False)
    street = Column(String(255), nullable=False)
    city = Column(String(100), nullable=False)
    state = Column(String(100), nullable=False)
    country = Column(String(100), nullable=False, default='India')
    pincode = Column(String(10), nullable=False)
    created_at = Column(TIMESTAMP, server_default=func.current_timestamp())
    updated_at = Column(TIMESTAMP, server_default=func.current_timestamp(), onupdate=func.current_timestamp())

class Doctor(Base):
    __tablename__ = "clinic_doctors"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255), nullable=False)
    specialty = Column(String(100), nullable=False)
    contact = Column(String(255), nullable=False, unique=True, index=True)
    phone = Column(String(20), nullable=True)
    status = Column(Enum("Active", "On Leave", "Inactive", name="doctor_status"), default="Active", nullable=False)
    patients = Column(Integer, default=0)
    years = Column(Integer, default=0)
    availability = Column(String(255), nullable=True)
    bio = Column(Text, nullable=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=True)
    user = relationship("User", back_populates="doctors")
    created_at = Column(TIMESTAMP, server_default=func.current_timestamp())
    updated_at = Column(TIMESTAMP, server_default=func.current_timestamp(), onupdate=func.current_timestamp())

    @property
    def status_str(self):
        return str(self.status)

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "specialty": self.specialty,
            "contact": self.contact,
            "phone": self.phone,
            "status": str(self.status),
            "status_str": str(self.status),
            "patients": self.patients,
            "years": self.years,
            "availability": self.availability,
            "bio": self.bio,
            "created_at": self.created_at,
            "updated_at": self.updated_at,
        }

class Appointment(Base):
    __tablename__ = "appointments"
    id = Column(Integer, primary_key=True, index=True)
    doctor_id = Column(Integer, nullable=False)
    doctor_name = Column(String(100), nullable=False)
    location = Column(String(255))
    date = Column(Date, nullable=False)
    time = Column(String(20), nullable=False)
    status = Column(String(50), default="Pending")
    patient_name = Column(String(100), nullable=False)
    phone_number = Column(String(20))
    email = Column(String(100))
    radio_button_value = Column(String(10))
    feedback_rating = Column(Integer)
    feedback_comment = Column(Text)
    created_at = Column(TIMESTAMP)

class ClinicsAppointment(Base):
    __tablename__ = "clinics_appointment"
    id = Column(Integer, primary_key=True, index=True)
    clinic_name = Column(String(255), nullable=False)
    doctor_id = Column(Integer, nullable=False)
    doctor_name = Column(String(100), nullable=False)
    location = Column(String(255))
    date = Column(Date, nullable=False)
    time = Column(String(20), nullable=False)
    status = Column(String(50), default="Pending")
    patient_name = Column(String(100), nullable=False)
    phone_number = Column(String(20))
    email = Column(String(100))
    radio_button_value = Column(String(10))
    feedback_rating = Column(Integer)
    feedback_comment = Column(Text)
    created_at = Column(TIMESTAMP)

class ClinicsPayment(Base):
    __tablename__ = "clinics_payment"
    id = Column(Integer, primary_key=True, index=True)
    clinic_name = Column(String(255), nullable=False)
    appointment_id = Column(Integer, nullable=False)
    patient_name = Column(String(100), nullable=False)
    amount = Column(Integer, nullable=False)
    status = Column(String(50), default="Pending")
    payment_date = Column(Date, nullable=False)
    payment_method = Column(String(50), nullable=True)
    created_at = Column(TIMESTAMP, server_default=func.current_timestamp())
    updated_at = Column(TIMESTAMP, server_default=func.current_timestamp(), onupdate=func.current_timestamp())

class ClinicProfile(Base):
    __tablename__ = "clinic_profile"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=True)
    user = relationship("User", back_populates="clinic_profile")
    clinic_name = Column(String(255), nullable=False)
    email = Column(String(255), nullable=False)
    phone_number = Column(String(20))
    specialty = Column(String(100))
    address = Column(Text)
    fees = Column(DECIMAL(10, 2))
    bio = Column(Text)
    services = Column(Text)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())

class SiteFeedback(Base):
    __tablename__ = "site_feedback"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=True)
    name = Column(String(255), nullable=True)
    email = Column(String(255), nullable=True)
    feedback_type = Column(String(100), nullable=False)
    rating = Column(Integer, nullable=False)
    feedback = Column(Text, nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())


class ContactRequest(Base):
    __tablename__ = "contact_request"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=True)
    name = Column(String(255), nullable=True)
    email = Column(String(255), nullable=True)
    contact_number = Column(String(50), nullable=True)
    message = Column(Text, nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())

from sqlalchemy import Column, Integer, String, Numeric, Date, DateTime, func

class UserPayment(Base):
    __tablename__ = "user_payments"

    id = Column(Integer, primary_key=True, index=True)
    invoice_number = Column(String(50), unique=True, nullable=False)
    patient_name = Column(String(100), nullable=False)
    payment_type = Column(String(50))
    payment_time = Column(String(50))
    amount = Column(Numeric(10, 2), nullable=False)
    clinic_name = Column(String(100))
    payment_date = Column(Date, nullable=False)
    status = Column(String(50), default="Pending")
    created_at = Column(DateTime(timezone=True), server_default=func.now())

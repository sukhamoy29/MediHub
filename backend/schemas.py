from pydantic import BaseModel, EmailStr
from typing import List, Optional
from datetime import date, time, datetime
from enum import Enum

class UserBase(BaseModel):
    name: str
    email: EmailStr
    phone: str
    role: str

class SiteFeedbackBase(BaseModel):
    user_id: Optional[int] = None
    name: Optional[str] = None
    email: Optional[EmailStr] = None
    feedback_type: str
    rating: int
    feedback: str

class SiteFeedbackCreate(SiteFeedbackBase):
    pass

class SiteFeedbackOut(SiteFeedbackBase):
    id: int
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None

    class Config:
        orm_mode = True

class ContactRequestBase(BaseModel):
    user_id: Optional[int] = None
    name: Optional[str] = None
    email: Optional[EmailStr] = None
    contact_number: Optional[str] = None
    message: str

class ContactRequestCreate(ContactRequestBase):
    pass

class ContactRequestOut(ContactRequestBase):
    id: int
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None

    class Config:
        orm_mode = True

class UserCreate(UserBase):
    password: str

from enum import Enum as PyEnum
from pydantic import BaseModel, EmailStr
from typing import List, Optional
from datetime import date, time

class GenderEnum(str, PyEnum):
    Male = "Male"
    Female = "Female"
    Other = "Other"

class BloodGroupEnum(str, PyEnum):
    A_pos = "A+"
    A_neg = "A-"
    B_pos = "B+"
    B_neg = "B-"
    O_pos = "O+"
    O_neg = "O-"
    AB_pos = "AB+"
    AB_neg = "AB-"

class UserProfileBase(BaseModel):
    name: str
    image: Optional[str] = None
    phone_number: str
    email: EmailStr
    dob: date
    gender: GenderEnum
    blood_group: BloodGroupEnum
    house_no: str
    street: str
    city: str
    state: str
    country: Optional[str] = "India"
    pincode: str

class UserProfileCreate(UserProfileBase):
    pass

class UserProfileUpdate(BaseModel):
    name: Optional[str] = None
    image: Optional[str] = None
    phone_number: Optional[str] = None
    email: Optional[EmailStr] = None
    dob: Optional[date] = None
    gender: Optional[GenderEnum] = None
    blood_group: Optional[BloodGroupEnum] = None
    house_no: Optional[str] = None
    street: Optional[str] = None
    city: Optional[str] = None
    state: Optional[str] = None
    country: Optional[str] = None
    pincode: Optional[str] = None

class UserProfileResponse(UserProfileBase):
    id: int

    class Config:
        orm_mode = True



class LoginRequest(BaseModel):
    email: EmailStr
    phone: str = ""
    password: str
    role: Optional[str] = None



from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import date

class ChangePasswordRequest(BaseModel):
    current_password: str
    new_password: str
    confirm_password: str

class AppointmentCreate(BaseModel):
    doctor_id: int
    doctor_name: str
    location: Optional[str]
    date: date
    time: str
    status: Optional[str] = "Pending"
    patient_name: str
    phone_number: str
    email: EmailStr
    radio_button_value: Optional[str]
    feedback_rating: Optional[int] = None
    feedback_comment: Optional[str] = None

class AppointmentOut(AppointmentCreate):
    id: int
    class Config:
        orm_mode = True

from typing import Optional
from datetime import date
from pydantic import BaseModel, EmailStr

class ClinicsAppointmentCreate(BaseModel):
    clinic_name: str
    doctor_id: int
    doctor_name: str
    location: Optional[str] = None
    date: date
    time: str
    status: Optional[str] = "Pending"
    patient_name: str
    phone_number: str
    email: EmailStr
    radio_button_value: Optional[str]
    feedback_rating: Optional[int] = None
    feedback_comment: Optional[str] = None

class ClinicsAppointmentOut(ClinicsAppointmentCreate):
    id: int
    class Config:
        orm_mode = True

class ClinicsPaymentBase(BaseModel):
    clinic_name: str
    appointment_id: int
    patient_name: str
    amount: int
    status: Optional[str] = "Pending"
    payment_date: date
    payment_method: Optional[str] = None

class ClinicsPaymentCreate(ClinicsPaymentBase):
    pass

class ClinicsPaymentOut(ClinicsPaymentBase):
    id: int

    class Config:
        orm_mode = True


class DoctorBase(BaseModel):
    name: str
    specialty: str
    contact: str
    phone: Optional[str] = None
    status: Optional[str] = "Active"
    patients: Optional[int] = 0
    years: Optional[int] = 0
    availability: Optional[str] = None
    bio: Optional[str] = None

class DoctorCreate(DoctorBase):
    pass

class DoctorUpdate(BaseModel):
    name: Optional[str] = None
    specialty: Optional[str] = None
    contact: Optional[EmailStr] = None
    phone: Optional[str] = None
    status: Optional[str] = None
    patients: Optional[int] = None
    years: Optional[int] = None
    availability: Optional[str] = None
    bio: Optional[str] = None

class DoctorOut(DoctorBase):
    id: int
    status_str: Optional[str] = None

    class Config:
        orm_mode = True


from pydantic import BaseModel, EmailStr
from typing import Optional

class ClinicProfileBase(BaseModel):
    clinic_name: str
    email: EmailStr
    phone_number: Optional[str] = None
    specialty: Optional[str] = None
    address: Optional[str] = None
    fees: Optional[float] = None
    bio: Optional[str] = None
    services: Optional[str] = None

class ClinicProfileCreate(ClinicProfileBase):
    pass

class ClinicProfileUpdate(ClinicProfileBase):
    pass

class ClinicProfileOut(ClinicProfileBase):
    id: int

    class Config:
        orm_mode = True



from pydantic import BaseModel
from typing import Optional
from datetime import date, datetime

class UserPaymentCreate(BaseModel):
    invoice_number: str
    patient_name: str
    payment_type: Optional[str]
    payment_time: Optional[str]
    amount: float
    clinic_name: Optional[str]
    payment_date: date
    status: Optional[str] = "Pending"

class UserPaymentResponse(UserPaymentCreate):
    id: int
    created_at: datetime

    class Config:
        orm_mode = True


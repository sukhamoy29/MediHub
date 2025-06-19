from fastapi import APIRouter, HTTPException, Depends, Body, status, Header
from sqlalchemy.orm import Session
from backend.database import get_db
from backend.models import User, UserProfile
from backend.schemas import UserCreate, LoginRequest
from backend.utils import hash_password, verify_password, create_access_token
import jwt
from typing import Optional
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from fastapi import Request
from datetime import datetime
from backend.schemas import GenderEnum, BloodGroupEnum, UserProfileCreate

SECRET_KEY = "your_secret_key"
ALGORITHM = "HS256"

router = APIRouter()

security = HTTPBearer()

def get_current_user(authorization: Optional[str] = Header(None), db: Session = Depends(get_db)):
    print(f"DEBUG get_current_user: Received Authorization header: {authorization}")
    if authorization is None or not authorization.startswith("Bearer "):
        print("DEBUG get_current_user: Missing or invalid authorization header:", authorization)
        raise HTTPException(status_code=401, detail="Invalid or missing authorization token")
    token = authorization[len("Bearer "):]
    try:
        print(f"DEBUG get_current_user: Decoding token: {token}")
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        print(f"DEBUG get_current_user: Decoded token payload: {payload}")
        email = payload.get("sub")
        print(f"DEBUG get_current_user: Token email: {email}")
        if email is None:
            print("DEBUG get_current_user: Token payload missing 'sub'")
            raise HTTPException(status_code=401, detail="Invalid token payload")
    except jwt.PyJWTError as e:
        print(f"DEBUG get_current_user: Token decode error: {e}")
        raise HTTPException(status_code=401, detail="Invalid token")

    # Demo credentials for clinic bypass (same as in login)
    demo_clinics = [
        {"name": "City Health Clinic","email": "city-health@clinic.com", "password": "password123", "id": -10},
        {"name": "Kids Care Clinic","email": "kids-care@clinic.com", "password": "password123", "id": -14},
        {"name": "Prime Vision Eye Care","email": "prime-vision@clinic.com", "password": "password123", "id": -15},
        {"name": "Dr. Soma Sarkar (De) Eye Clinic","email": "soma-sarkar-eye-clinic@clinic.com", "password": "password123","id": -18},
        {"name": "Dr. Arun Achar Clinic","email": "arun-achar-clinic@clinic.com", "password": "password123", "id": -19},
        {"name": "Dr. Kanchan Kumar Dhara Clinic","email": "kanchan-kumar-dhara-clinic@clinic.com", "password": "password123", "id": -20},
        {"name": "Dr. Nirmalya Mangal Clinic","email": "nirmalya-mangal-clinic@clinic.com", "password": "password123", "id": -21},
        {"name": "Dr. Soumyajit Ghosh Clinic","email": "soumyajit-ghosh-clinic@clinic.com", "password": "password123", "id": -22},
        {"name": "Dr. Gairik Maji Clinic","email": "gairik-maji-clinic@clinic.com", "password": "password123", "id": -23}, 
        {"name": "Dr. Epika Ghorai Clinic","email": "epika-ghorai-clinic@clinic.com", "password": "password123", "id": -24},
        {"name": "Dr. Kohena Roy Clinic","email": "kohena-roy-clinic@clinic.com", "password": "password123", "id": -25}, 
        {"name": "EYE LIGHT","email": "eye-light@gmail.com","password": "password123","id": -26}
    ] 

    for demo_clinic in demo_clinics:
        print(f"DEBUG get_current_user: Comparing with demo clinic email: {demo_clinic['email']}")
        if email.lower() == demo_clinic["email"].lower():
            user_data = {
                "id": demo_clinic["id"],
                "name": demo_clinic["name"],
                "email": demo_clinic["email"],
                "phone": None,
                "role": "clinic",
                "clinicName": demo_clinic["name"],
            }
            print(f"DEBUG get_current_user: Returning demo clinic user_data: {user_data}")
            return user_data

    user = db.query(User).filter(User.email == email).first()
    if user is None:
        print(f"DEBUG get_current_user: User not found for email: {email}")
        raise HTTPException(status_code=401, detail="User not found")
    print(f"DEBUG get_current_user: user.role={user.role}, user.name={user.name}")
    user_data = {
        "id": user.id,
        "name": user.name,
        "email": user.email,
        "phone": user.phone,
        "role": user.role,
    }
    if user.role == "clinic":
        user_data["clinicName"] = user.name
    print(f"DEBUG get_current_user: Returning user_data: {user_data}")
    return user_data

@router.post("/signup")
def signup(user: UserCreate, db: Session = Depends(get_db)):
    try:
        # Check if user already exists by email or phone
        existing_user = db.query(User).filter((User.email == user.email) | (User.phone == user.phone)).first()
        if existing_user:
            raise HTTPException(status_code=400, detail="User with this email or phone number already exists")

        try:
            # Create new user first
            new_user = User(
                name=user.name,
                email=user.email,
                phone=user.phone,
                password_hash=hash_password(user.password),
                role=user.role
            )
            db.add(new_user)
            db.commit()
            db.refresh(new_user)

            # Now create the profile with the new user's ID
            profile_data = {
                "id": new_user.id,
                "name": user.name,
                "email": user.email,
                "phone_number": user.phone,
                "dob": datetime.now().date(),
                "gender": GenderEnum.Male,
                "blood_group": BloodGroupEnum.O_pos,
                "house_no": "Not provided",
                "street": "Not provided",
                "city": "Not provided",
                "state": "Not provided",
                "pincode": "000000",
                "country": "India",
                "image": None
            }
            
            new_profile = UserProfile(**profile_data)
            db.add(new_profile)
            db.commit()

            return {"message": "Signup successful! Please log in."}
            
        except Exception as e:
            # Rollback on error
            db.rollback()
            raise e

    except Exception as e:
        import traceback
        traceback_str = traceback.format_exc()
        print(f"Error during signup: {traceback_str}")
        raise HTTPException(status_code=500, detail=f"Internal Server Error: {str(e)}")

@router.post("/login")
def login(login_request: LoginRequest = Body(...), db: Session = Depends(get_db)):
    print("Login request received:", login_request)
    email = login_request.email
    phone = login_request.phone
    password = login_request.password
    role = login_request.role if hasattr(login_request, 'role') else None
    print("Role received:", role)

    # Demo credentials for doctor bypass
    demo_doctor_email = "demo@doctor.com"
    demo_doctor_password = "demopassword"

    if role == "doctor" and email == demo_doctor_email and password == demo_doctor_password:
        # Bypass normal login for demo doctor
        access_token = create_access_token({"sub": email})
        demo_doctor_id = -1  # fixed demo user id
        return {
            "access_token": access_token,
            "token_type": "bearer",
            "role": "doctor",
            "id": demo_doctor_id
        }

    # Demo credentials for clinic bypass
    demo_clinics = [
        {"name": "City Health Clinic","email": "city-health@clinic.com", "password": "password123", "id": -10},
       
        {"name": "Kids Care Clinic","email": "kids-care@clinic.com", "password": "password123", "id": -14},
        {"name": "Prime Vision Eye Care","email": "prime-vision@clinic.com", "password": "password123", "id": -15},
       
        {"name": "Dr. Soma Sarkar (De) Eye Clinic","email": "soma-sarkar-eye-clinic@clinic.com", "password": "password123","id": -18},
        {"name": "Dr. Arun Achar Clinic","email": "arun-achar-clinic@clinic.com", "password": "password123", "id": -19},
        {"name": "Dr. Kanchan Kumar Dhara Clinic","email": "kanchan-kumar-dhara-clinic@clinic.com", "password": "password123", "id": -20},
        {"name": "Dr. Nirmalya Mangal Clinic","email": "nirmalya-mangal-clinic@clinic.com", "password": "password123", "id": -21},
        {"name": "Dr. Soumyajit Ghosh Clinic","email": "soumyajit-ghosh-clinic@clinic.com", "password": "password123", "id": -22},
        {"name": "Dr. Gairik Maji Clinic","email": "gairik-maji-clinic@clinic.com", "password": "password123", "id": -23}, 
        {"name": "Dr. Epika Ghorai Clinic","email": "epika-ghorai-clinic@clinic.com", "password": "password123", "id": -24},
        {"name": "Dr. Kohena Roy Clinic","email": "kohena-roy-clinic@clinic.com", "password": "password123", "id": -25}, 
        {"name": "EYE LIGHT","email": "eye-light@gmail.com","password": "password123","id": -26}
    ] 

    if role == "clinic":
        for demo_clinic in demo_clinics:
            if email == demo_clinic["email"] and password == demo_clinic["password"]:
                access_token = create_access_token({"sub": email})
                return {
                    "access_token": access_token,
                    "token_type": "bearer",
                    "role": "clinic",
                    "id": demo_clinic["id"]
                }

    # Check if user exists
    user = db.query(User).filter(User.email == email).first()
    if not user:
        raise HTTPException(
            status_code=401,
            detail="User not found. Please sign up first."
        )
    
    # If user exists, verify password
    if not verify_password(password, user.password_hash):
        raise HTTPException(
            status_code=401,
            detail="Invalid password."
        )

    # Generate token
    access_token = create_access_token({"sub": user.email})
    return {"access_token": access_token, "token_type": "bearer", "role": user.role, "id": user.id}

@router.get("/me")
def get_me(current_user: dict = Depends(get_current_user)):
    return current_user

@router.delete("/delete-account")
def delete_account(current_user: dict = Depends(get_current_user), db: Session = Depends(get_db)):
    user_id = current_user.get("id")
    if user_id is None:
        raise HTTPException(status_code=401, detail="Invalid user")

    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    # Delete user profile if exists
    profile = db.query(UserProfile).filter(UserProfile.id == user_id).first()
    if profile:
        db.delete(profile)

    # Delete user
    db.delete(user)
    db.commit()

    return {"message": "User account deleted successfully."}

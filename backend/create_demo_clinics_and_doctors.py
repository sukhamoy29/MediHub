from backend.database import SessionLocal, engine
from backend.models import User, UserProfile
from backend.utils import hash_password


# Demo clinic user accounts
# demo_clinics = [
#     {"name": "City Health Clinic", "email": "city-health@clinic.com", "password": "password123", "role": "clinic", "phone": "5551240001"},
#     {"name": "Family Care Center", "email": "family-care@clinic.com", "password": "password123", "role": "clinic", "phone": "5551240002"},
#     {"name": "Dental Excellence", "email": "dental-excellence@clinic.com", "password": "password123", "role": "clinic", "phone": "5551240003"},
#     {"name": "Wellness Plus Clinic", "email": "wellness-plus@clinic.com", "password": "password123", "role": "clinic", "phone": "5551240004"},
#     {"name": "Kids Care Clinic", "email": "kids-care@clinic.com", "password": "password123", "role": "clinic", "phone": "5551240005"},
#     {"name": "Prime Vision Eye Care", "email": "prime-vision@clinic.com", "password": "password123", "role": "clinic", "phone": "5551240006"},
#     {"name": "Healthy Smiles Dental", "email": "healthy-smiles@clinic.com", "password": "password123", "role": "clinic", "phone": "5551240007"},
#     {"name": "Urban Heart Clinic", "email": "urban-heart@clinic.com", "password": "password123", "role": "clinic", "phone": "5551240008"},
# ]

demo_clinics = [
        {"name": "Dr. Soma Sarkar (De) Eye Clinic","email": "soma-sarkar-eye-clinic@clinic.com", "password": "password123","role": "clinic"},
        {"name": "Dr. Arun Achar Clinic","email": "arun-achar-clinic@clinic.com", "password": "password123", "role": "clinic"},
        {"name": "Dr. Kanchan Kumar Dhara Clinic","email": "kanchan-kumar-dhara-clinic@clinic.com", "password": "password123", "role": "clinic"},
        {"name": "Dr. Nirmalya Mangal Clinic","email": "nirmalya-mangal-clinic@clinic.com", "password": "password123", "role": "clinic"},
        {"name": "Kids Care Clinic","email": "kids-care@clinic.com", "password": "password123", "role": "clinic"},
        {"name": "Prime Vision Eye Care","email": "prime-vision@clinic.com", "password": "password123","role": "clinic"},
        {"name": "Dr. Soumyajit Ghosh Clinic","email": "soumyajit-ghosh-clinic@clinic.com", "password": "password123", "role": "clinic"},
        {"name": "Dr. Gairik Maji Clinic","email": "gairik-maji-clinic@clinic.com", "password": "password123", "role": "clinic"}, 
        {"name": "Dr. Epika Ghorai Clinic","email": "epika-ghorai-clinic@clinic.com", "password": "password123", "role": "clinic"},
        {"name": "Dr. Kohena Roy Clinic","email": "kohena-roy-clinic@clinic.com", "password": "password123", "role": "clinic"}, 
]

def create_demo_users():
    db = SessionLocal()
    try:
       
        for clinic in demo_clinics:
            existing_user = db.query(User).filter(User.email == clinic["email"]).first()
            if existing_user:
                print(f"User {clinic['email']} already exists, skipping.")
                continue
            new_user = User(
                name=clinic["name"],
                email=clinic["email"],
                phone=clinic["phone"],
                password_hash=hash_password(clinic["password"]),
                role=clinic["role"]
            )
            db.add(new_user)
            db.commit()
            db.refresh(new_user)

            # Create user profile
            profile = UserProfile(
                id=new_user.id,
                name=clinic["name"],
                email=clinic["email"],
                phone_number=clinic["phone"],
                dob=None,
                gender=None,
                blood_group=None,
                house_no=None,
                street=None,
                city=None,
                state=None,
                pincode=None,
                country="India",
                image=None,
            )
            db.add(profile)
            db.commit()
            print(f"Created demo clinic user: {clinic['email']}")
    finally:
        db.close()

if __name__ == "__main__":
    create_demo_users()

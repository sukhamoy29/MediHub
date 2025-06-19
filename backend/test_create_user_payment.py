import requests

def test_create_user_payment():
    url = "http://localhost:8000/api/user_payment"
    payment_data = {
        "invoice_number": "INV123456",
        "patient_name": "John Doe",
        "payment_type": "Credit Card",
        "payment_time": "10:00 AM",
        "amount": 100.00,
        "clinic_name": "Health Clinic",
        "payment_date": "2024-06-01",
        "status": "Completed"
    }
    response = requests.post(url, json=payment_data)
    print("Status Code:", response.status_code)
    print("Response JSON:", response.json())

if __name__ == "__main__":
    test_create_user_payment()

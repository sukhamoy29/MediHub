# 🏥 MediHub - Healthcare Management System

MediHub is a comprehensive healthcare management platform that connects patients with healthcare providers, streamlines appointment scheduling, and manages medical payments seamlessly.

## 🌟 Features

### For Patients

- 👤 User authentication and profile management
- 🏥 Browse and search for clinics and doctors
- 📅 Easy appointment scheduling
- 💳 Secure online payments through Razorpay integration
- 📱 Responsive design for all devices
- 📝 Submit feedback and contact requests
- 📋 View appointment history and payment records

### For Healthcare Providers (Admin)

- 👨‍⚕️ Manage doctor profiles and availability
- 📊 Dashboard with analytics and insights
- 💰 Track payments and appointments
- 📝 Manage clinic profiles
- 📅 Handle appointment requests

## 🛠️ Technology Stack

### Frontend

- **React 18** with Vite for blazing-fast development
- **TailwindCSS** for modern, responsive styling
- **React Router** for seamless navigation
- **Framer Motion** for smooth animations
- **Recharts** for data visualization
- **Axios** for API communication
- **React Toastify** for notifications
- **HTML2Canvas & jsPDF** for document generation

### Backend

- **FastAPI** - Modern, fast web framework for Python
- **SQLAlchemy** - SQL toolkit and ORM
- **MySQL** - Database management
- **Razorpay** - Payment gateway integration
- **JWT** - Secure authentication
- **Uvicorn** - ASGI server

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- Python (v3.12 or higher)
- MySQL Server

### Frontend Setup

1. Navigate to the frontend directory:

   ```bash
   cd frontend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start development server:
   ```bash
   npm run dev
   ```
   The application will be available at `http://localhost:5173`

### Backend Setup

1. Navigate to the backend directory:

   ```bash
   cd backend
   ```

2. Create a virtual environment:

   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows use: venv\Scripts\activate
   ```

3. Install dependencies:

   ```bash
   pip install -r requirements.txt
   ```

4. Set up environment variables:
   Create a `.env` file with the following:

   ```env
   DATABASE_URL=mysql+mysqlconnector://user:password@localhost/medihub
   SECRET_KEY=your-secret-key
   RAZORPAY_KEY_ID=your-razorpay-key
   RAZORPAY_KEY_SECRET=your-razorpay-secret
   ```

5. Run the server:
   ```bash
   python run.py
   ```
   The API will be available at `http://localhost:8000`

## 📚 API Documentation

- Once the backend server is running, visit `http://localhost:8000/docs` for interactive API documentation
- Explore available endpoints and test them directly from the Swagger UI

## 🔐 Security Features

- JWT-based authentication
- Secure password hashing with bcrypt
- CORS protection
- Input validation and sanitization
- Secure payment processing

## 💡 Additional Features

- Real-time notifications
- PDF generation for reports and invoices
- Responsive design for mobile and desktop
- Interactive data visualizations
- Dark/Light mode support

## 🤝 Contributing

Feel free to submit issues, fork the repository, and create pull requests for any improvements.

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- The amazing open-source community
- All contributors and users of MediHub
- Icons provided by Lucide React and React Icons

## ⚙️ How It Works

The project is a full-stack web application with a React-based frontend and a FastAPI backend.

- **Frontend:**  
  Built with React and Vite, the frontend provides a responsive and user-friendly interface. It uses React Router for navigation and supports role-based routing to separate patient, doctor/admin, and public views.

- **Backend:**  
  Developed with FastAPI, the backend exposes RESTful APIs for authentication, user management, appointments, payments, profiles, clinic information, feedback, and contact requests. It uses SQLAlchemy ORM with a MySQL database and integrates Razorpay for payment processing.

- **Communication:**  
  The frontend communicates with the backend APIs to perform all operations securely, with JWT-based authentication and role-based access control.

---

## 🏃‍♂️ How to Run

### Backend

1. Ensure you have Python 3.8+ installed.
2. Install dependencies:
   ```bash
   pip install -r backend/requirements.txt
   ```
3. Set up your environment variables (e.g., database credentials, Razorpay keys) in a `.env` file in the backend directory.
4. Run the backend server:
   ```bash
   fastapi dev main.py
   ```
5. The backend will be available at `http://localhost:8000`.

### Frontend

1. Ensure you have Node.js (v16+) and npm installed.
2. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```
5. The frontend will be available at `http://localhost:5173`.

---

## ✨ Features

- 👍 **Effortless Online Booking:** Schedule appointments with top doctors seamlessly through our user-friendly platform.
- 🏆 **24/7 Doctor Availability:** Access qualified medical professionals anytime for immediate advice and care.
- ⭐ **Personalized Health Reminders:** Receive tailored notifications to keep your health check-ups and prescriptions on track.
- 🔍 **Comprehensive Specialist Search:** Find and connect with specialists across various fields to address all your health needs.
- 🔐 **Role-Based Access Control:** Secure access for patients, doctors, and clinic admins.
- 👤 **User Authentication & Profile Management:** Secure login and personalized profiles.
- 📅 **Appointment Scheduling & History:** Manage your appointments with ease.
- 💳 **Integrated Payment Processing:** Seamless payments powered by Razorpay.
- 🏥 **Clinic Profile Management:** Manage clinic details and information.
- 📝 **Site Feedback & Contact Requests:** Easy communication channels for users.

---

## 🛠️ Technologies Used

### Backend

- FastAPI 🚀
- Uvicorn 🏃‍♂️
- SQLAlchemy 🗄️
- MySQL 🐬
- Passlib 🔐
- Python-JOSE 🔏
- Razorpay 💳
- Python-Multipart 📦
- Python-Dotenv 🌿

### Frontend

- React 18 ⚛️
- Vite ⚡
- React Router DOM 🛣️
- Axios 📡
- TailwindCSS 🎨
- React Toastify 🔔
- Framer Motion 🎞️
- Recharts 📊
- Lucide React & React Icons 🎭

---

## 💡 Additional Insights

- The project is designed with **modularity** in mind, separating concerns between user roles and functionalities.
- **Role-based routing and protected routes** ensure secure access to sensitive data and operations.
- The backend API is structured with multiple routers for **scalability and maintainability**.
- Integration with Razorpay provides a **seamless payment experience**.
- The frontend leverages modern React features and libraries to deliver a **smooth and responsive user experience**.
- The system supports easy extensibility for adding new features like telemedicine, advanced analytics, or AI-driven health recommendations.

---

For any questions or contributions, please refer to the project documentation or contact the maintainers.

---

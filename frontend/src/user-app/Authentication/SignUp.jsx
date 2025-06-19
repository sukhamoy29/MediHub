import { useState, useEffect, useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaLock,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";
import axios from "axios";

import { AuthContext } from "../context/AuthContext";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SignUp = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  // Force role to patient only
  const initialRole = "patient";

  const [role, setRole] = useState(initialRole);
  const [showPassword, setShowPassword] = useState(false);
  const [phone, setPhone] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    setRole(initialRole);
  }, [initialRole]);

  const handlePhoneChange = (e) => {
    const value = e.target.value;

    if (/^\d{0,10}$/.test(value)) {
      setPhone(value);
      if (value.length < 10) {
        setPhoneError("Phone number must be exactly 10 digits.");
      } else if (value.startsWith("0")) {
        setPhoneError("Phone number cannot start with 0.");
      } else {
        setPhoneError("");
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      phoneError ||
      !formData.email ||
      !formData.password ||
      !formData.name ||
      !phone
    ) {
      return;
    }

    // Create user object with role forced to patient
    const userData = {
      ...formData,
      phone,
      role: "patient",
    };

    try {
      const response = await axios.post(
        "http://localhost:8000/auth/signup",
        userData
      );
      toast.success(response.data.message, {
        position: "top-center",
        autoClose: 5000,
        onClose: async () => {
          // After signup success, automatically login the user
          try {
            const loginResponse = await axios.post(
              "http://localhost:8000/auth/login",
              {
                email: formData.email,
                password: formData.password,
              }
            );
            const userData = {
              id: loginResponse.data.id,
              role: loginResponse.data.role,
              access_token: loginResponse.data.access_token,
              email: formData.email,
              name: formData.name,
              phone: phone,
            };
            login(userData);
            // Redirect to dashboard or profile page
            navigate("/dashboard");
          } catch {
            toast.error("Automatic login failed. Please login manually.", {
              position: "top-center",
              autoClose: 5000,
            });
            navigate("/AuthPage");
          }
        },
      });
    } catch (error) {
      toast.error(error.response?.data?.detail || "Signup failed.", {
        position: "top-center",
        autoClose: 5000,
      });
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="min-h-screen bg-gray-200 flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl xl:max-w-3xl bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-900">
            Create an account
          </h2>
          <p className="text-gray-500 text-sm mb-6">
            Join Medihub to streamline your practice and connect with patients
          </p>

          {/* Removed role selection buttons */}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <FaUser className="absolute top-3.5 left-3 text-gray-400" />
              <input
                type="text"
                placeholder="Full Name"
                required
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="relative">
              <FaEnvelope className="absolute top-3.5 left-3 text-gray-400" />
              <input
                type="email"
                placeholder="patient@example.com"
                required
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="relative">
              <FaPhone className="absolute top-3.5 left-3 text-gray-400" />
              <input
                type="text"
                value={phone}
                onChange={handlePhoneChange}
                required
                placeholder="Enter 10-digit phone number"
                className={`w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none ${
                  phoneError
                    ? "border-red-500"
                    : "focus:ring-2 focus:ring-blue-500"
                }`}
              />
            </div>
            {phoneError && (
              <p className="text-sm text-red-500 mt-1">{phoneError}</p>
            )}

            <div className="relative">
              <FaLock className="absolute top-3.5 left-3 text-gray-400" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                required
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                className="w-full pl-10 pr-10 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-gray-500 focus:outline-none"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

            <button
              type="submit"
              className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800 transition-colors"
            >
              Create Account
            </button>

            <p className="text-sm text-center text-gray-600">
              Already have an account?{" "}
              <Link to="/AuthPage" className="text-blue-600 hover:underline">
                Log in
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignUp;

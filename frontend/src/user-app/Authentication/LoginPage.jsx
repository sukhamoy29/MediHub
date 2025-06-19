import { useState, useContext } from "react";
import { MdEmail, MdVisibility, MdVisibilityOff } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LoginPage = () => {
  const [role, setRole] = useState("Clinic");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState({ email: "", password: "" });

  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleLogin = async () => {
    let isValid = true;
    const newError = { email: "", password: "" };

    if (!email) {
      newError.email = "Email is required.";
      isValid = false;
    } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      newError.email = "Enter a valid email address.";
      isValid = false;
    }

    if (!password) {
      newError.password = "Password is required.";
      isValid = false;
    }

    setError(newError);

    if (isValid) {
      try {
        const response = await axios.post("http://localhost:8000/auth/login", {
          email,
          password,
          phone: "",
          role: role.toLowerCase(),
        });

        if (response.data && response.data.id && response.data.access_token) {
          if (
            role.toLowerCase() === "clinic" &&
            response.data.role === "patient"
          ) {
            toast.error(
              "Access denied: Patients cannot access clinic section.",
              {
                position: "top-center",
                autoClose: 5000,
              }
            );
            return;
          }

          const user = {
            ...response.data,
            email,
            id: response.data.id,
            role: response.data.role,
          };

          const demoClinicIds = [
            -10, -14, -15, -18, -19, -20, -21, -22, -23, -24, -25, -26,
          ];
          if (user.role === "clinic" && demoClinicIds.includes(user.id)) {
            user.redirectUrl = "/admin/dashboard";
          } else if (user.role === "doctor") {
            user.redirectUrl = "/admin/dashboard";
          }

          localStorage.setItem("access_token", response.data.access_token);
          login(user, response.data.access_token);
          navigate(user.redirectUrl || "/");
        } else {
          toast.error("Invalid response from server. Missing user data.", {
            position: "top-center",
            autoClose: 5000,
          });
        }
      } catch (error) {
        if (error.response?.status === 401) {
          toast.info("User not found. Please sign up first.", {
            position: "top-center",
            autoClose: 5000,
            onClose: () => {
              navigate(`/signup?role=${role.toLowerCase()}`);
            },
          });
        } else {
          toast.error(
            error.response?.data?.detail || "Login failed. Please try again.",
            { position: "top-center", autoClose: 5000 }
          );
        }
      }
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-gray-200 p-8 rounded-lg shadow-md w-full max-w-md">
          <h2 className="text-2xl font-bold mb-6">Login to MediHub</h2>

          {/* Role toggle */}
          <div className="flex mb-6 bg-gray-100 p-1 rounded-lg">
            <button
              onClick={() => setRole("Clinic")}
              className={`w-1/2 py-2 rounded-lg text-sm font-medium ${
                role === "Clinic" ? "bg-white text-black" : "text-gray-500"
              }`}
            >
              Clinic
            </button>
            <button
              onClick={() => setRole("Patient")}
              className={`w-1/2 py-2 rounded-lg text-sm font-medium ${
                role === "Patient" ? "bg-white text-black" : "text-gray-500"
              }`}
            >
              Patient
            </button>
          </div>

          {/* Email field */}
          <div className="mb-4">
            <label className="block text-sm mb-1 text-gray-700">Email</label>
            <div className="flex items-center border border-gray-300 rounded-lg px-3 bg-white">
              <MdEmail className="text-gray-400 text-xl" />
              <input
                type="email"
                className="w-full px-2 py-2 outline-none"
                placeholder={`${role.toLowerCase()}@example.com`}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            {error.email && (
              <p className="text-red-500 text-sm mt-1">{error.email}</p>
            )}
          </div>

          {/* Password field */}
          <div className="mb-6">
            <label className="block text-sm mb-1 text-gray-700">Password</label>
            <div className="flex items-center border border-gray-300 rounded-lg px-3 bg-white">
              <RiLockPasswordLine className="text-gray-400 text-xl" />
              <input
                type={showPassword ? "text" : "password"}
                className="w-full px-2 py-2 outline-none"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="focus:outline-none"
              >
                {showPassword ? (
                  <MdVisibilityOff className="text-gray-400 text-xl" />
                ) : (
                  <MdVisibility className="text-gray-400 text-xl" />
                )}
              </button>
            </div>
            {error.password && (
              <p className="text-red-500 text-sm mt-1">{error.password}</p>
            )}
          </div>

          {/* Login button */}
          <button
            onClick={handleLogin}
            className="w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition-colors"
          >
            Login
          </button>

          {/* Links */}
          <div className="mt-4 text-sm text-center">
            <Link
              to="/forgotpassword"
              className="text-blue-600 hover:underline"
            >
              Forgot Password?
            </Link>
            <div className="mt-2">
              Don&apos;t have an account?{" "}
              {role === "Patient" ? (
                <Link
                  to={`/signup?role=${role.toLowerCase()}`}
                  className="text-blue-600 hover:underline"
                >
                  Sign up
                </Link>
              ) : (
                <button
                  type="button"
                  onClick={() =>
                    toast.warn(
                      "Sign up access is restricted. Please contact  super admin for assistance.",
                      {
                        position: "top-center",
                        autoClose: 5000,
                      }
                    )
                  }
                  className="text-blue-600 hover:underline"
                >
                  Sign up
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;

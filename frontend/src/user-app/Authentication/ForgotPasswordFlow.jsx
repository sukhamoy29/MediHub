import { useState } from "react";
import { MdPhone } from "react-icons/md";

import { useNavigate, Link } from "react-router-dom"; // or use window.location if not using react-router

const ForgotPasswordFlow = () => {
  const [step, setStep] = useState("phone");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [passwords, setPasswords] = useState({ new: "", confirm: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate(); // comment this out if not using React Router

  const handlePhoneSubmit = (e) => {
    e.preventDefault();
    setStep("otp");
  };

  const handleOtpChange = (index, value) => {
    if (/^\d?$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Auto-focus next input
      if (value && index < 3) {
        document.getElementById(`otp-${index + 1}`).focus();
      }
    }
  };

  const handleOtpSubmit = () => {
    if (otp.join("") === "1234") {
      setStep("reset");
      setError("");
    } else {
      setError("Invalid OTP. Try again.");
    }
  };

  const handlePasswordChange = (e) => {
    setPasswords({ ...passwords, [e.target.name]: e.target.value });
  };

  const handleResetSubmit = (e) => {
    e.preventDefault();
    if (passwords.new !== passwords.confirm) {
      setError("Passwords do not match.");
    } else {
      setError("");
      // Redirect to login after successful reset
      navigate("/Signup"); // or window.location.href = "/login";
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-2">Forgot password</h2>
        <p className="text-gray-600 mb-6">
          {step === "phone" &&
            "Enter your phone number and we'll send you an OTP"}
          {step === "otp" && "OTP sent! Please enter the code below"}
          {step === "reset" && "Set your new password below"}
        </p>

        {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

        {step === "phone" && (
          <form onSubmit={handlePhoneSubmit}>
            <label className="block text-sm font-medium mb-1" htmlFor="phone">
              Phone Number
            </label>
            <div className="relative mb-4">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">
                <MdPhone />
              </span>
              <input
                id="phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                className="pl-10 pr-4 py-2 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                placeholder="+91 9876543210"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-900 transition"
            >
              Send OTP
            </button>
          </form>
        )}

        {step === "otp" && (
          <div className="space-y-4">
            <div className="flex justify-center space-x-2">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  id={`otp-${index}`}
                  type="text"
                  maxLength="1"
                  value={digit}
                  onChange={(e) => handleOtpChange(index, e.target.value)}
                  className="w-12 h-12 text-center text-lg border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                />
              ))}
            </div>
            <button
              onClick={handleOtpSubmit}
              className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-900 transition"
            >
              Verify OTP
            </button>
            <p className="text-gray-600 text-sm text-center">
              Didn&apos;t get it?{" "}
              <span className="text-black cursor-pointer hover:underline">
                Resend
              </span>
            </p>
          </div>
        )}

        {step === "reset" && (
          <form onSubmit={handleResetSubmit}>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">
                New Password
              </label>
              <input
                type="password"
                name="new"
                value={passwords.new}
                onChange={handlePasswordChange}
                required
                className="w-full border px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">
                Confirm Password
              </label>
              <input
                type="password"
                name="confirm"
                value={passwords.confirm}
                onChange={handlePasswordChange}
                required
                className="w-full border px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-900 transition"
            >
              Done
            </button>
          </form>
        )}

        <div className="mt-6 text-sm text-center text-gray-600">
          Remember your password?{" "}
          <Link to="/Signup" className="text-black hover:underline">
            Back to login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordFlow;

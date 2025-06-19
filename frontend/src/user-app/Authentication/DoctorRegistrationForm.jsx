import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaCheck,
} from "react-icons/fa";
import { AuthContext } from "../context/AuthContext";

const InputField = ({
  label,
  icon,
  type = "text",
  placeholder,
  value,
  onChange,
  name,
  maxLength,
}) => (
  <div>
    {label && (
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
    )}
    <div className="relative">
      {icon && (
        <span className="absolute top-3 left-3 text-gray-400">{icon}</span>
      )}
      <input
        type={type}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
        maxLength={maxLength}
        className={`w-full ${
          icon ? "pl-10" : "pl-4"
        } pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-black`}
      />
    </div>
  </div>
);

export default function DoctorRegistrationForm() {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const [currentStep, setCurrentStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [checkboxChecked, setCheckboxChecked] = useState(false);

  const handleCheckbox = () => {
    setCheckboxChecked((prev) => !prev);
  };

  const [personalDetails, setPersonalDetails] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  const [clinicDetails, setClinicDetails] = useState({
    clinicName: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    specialization: "",
  });

  const [availability, setAvailability] = useState({
    days: [],
    startTime: "",
    endTime: "",
    fee: "",
    insurance: false,
  });

  const handleCheckboxChange = (day) => {
    setAvailability((prev) => {
      const days = prev.days.includes(day)
        ? prev.days.filter((d) => d !== day)
        : [...prev.days, day];
      return { ...prev, days };
    });
  };

  const handleSubmit = async () => {
    const doctorData = {
      ...personalDetails,
      clinic: clinicDetails,
      availability,
      role: "doctor",
    };

    try {
      const response = await fetch("http://localhost:8000/api/doctors/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(doctorData),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error(
          "Doctor registration failed:",
          response.status,
          errorText
        );
        throw new Error("Failed to register doctor");
      }

      const data = await response.json();
      login(data);
      navigate("/admin/dashboard");
    } catch (error) {
      console.error("Error during doctor registration:", error);
      alert("Failed to register doctor. Please try again.");
    }
  };

  const steps = [
    "Personal Details",
    "Clinic Details",
    "Availability & Fees",
    "Documents",
    "Review & Submit",
    "Complete",
  ];

  const renderStepIndicator = () => (
    <div className="flex sm:flex-col md:flex-row flex-wrap justify-between items-center mb-8">
      {steps.map((label, index) => {
        const stepNum = index + 1;
        const isActive = currentStep === stepNum;
        const isCompleted = currentStep > stepNum;
        return (
          <div
            key={label}
            className="text-center relative mb-4 sm:mb-2 md:mb-0 sm:w-full md:w-auto flex-shrink-0"
          >
            <div
              className={`w-9 h-9 mx-auto rounded-full flex items-center justify-center text-sm font-semibold transition-colors duration-300 ${
                isCompleted
                  ? "bg-black text-white"
                  : isActive
                  ? "border-2 border-black text-black"
                  : "border border-gray-300 text-gray-500"
              }`}
            >
              {isCompleted ? "✓" : stepNum}
            </div>
            <div className="mt-2 text-sm font-medium text-gray-700">
              {label}
            </div>
            {isActive && (
              <div className="absolute bottom-[-10px] left-1/2 transform -translate-x-1/2 w-10 h-1 bg-black rounded" />
            )}
          </div>
        );
      })}
    </div>
  );

  return (
    <div className="max-w-3xl mx-auto">
      {renderStepIndicator()}

      {currentStep === 1 && (
        <div className="space-y-4">
          <InputField
            icon={<FaUser />}
            label="Full Name"
            placeholder="Dr. John Doe"
            name="name"
            value={personalDetails.name}
            onChange={(e) =>
              setPersonalDetails({ ...personalDetails, name: e.target.value })
            }
          />
          <InputField
            icon={<FaEnvelope />}
            label="Email"
            placeholder="doctor@example.com"
            name="email"
            value={personalDetails.email}
            onChange={(e) =>
              setPersonalDetails({ ...personalDetails, email: e.target.value })
            }
          />
          <InputField
            icon={<FaPhone />}
            label="Phone Number"
            placeholder="Enter 10-digit number"
            name="phone"
            value={personalDetails.phone}
            maxLength={10}
            onChange={(e) => {
              const value = e.target.value.replace(/\D/g, "");
              if (value.length <= 10) {
                setPersonalDetails({ ...personalDetails, phone: value });
              }
            }}
          />
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <div className="relative">
              <span className="absolute top-3 left-3 text-gray-400">
                <FaLock />
              </span>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                name="password"
                value={personalDetails.password}
                onChange={(e) =>
                  setPersonalDetails({
                    ...personalDetails,
                    password: e.target.value,
                  })
                }
                className="w-full pl-10 pr-10 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-black"
              />
              <span
                className="absolute top-3 right-3 text-gray-500 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
          </div>
          <div className="flex justify-end">
            <button
              className="bg-black text-white px-6 py-2 rounded"
              onClick={() => setCurrentStep(2)}
            >
              Next Step
            </button>
          </div>
          <p className="text-sm text-center text-gray-600 mt-4">
            Already have an account?{" "}
            <Link to="/Signup" className="text-blue-600 hover:underline">
              Log in
            </Link>
          </p>
        </div>
      )}

      {currentStep === 2 && (
        <div className="space-y-4">
          <InputField
            label="Clinic/Chamber Name"
            name="clinicName"
            value={clinicDetails.clinicName}
            onChange={(e) =>
              setClinicDetails({ ...clinicDetails, clinicName: e.target.value })
            }
          />
          <InputField
            label="Address"
            name="address"
            value={clinicDetails.address}
            onChange={(e) =>
              setClinicDetails({ ...clinicDetails, address: e.target.value })
            }
          />
          <div className="grid grid-cols-2 gap-4">
            <InputField
              label="City"
              name="city"
              value={clinicDetails.city}
              onChange={(e) =>
                setClinicDetails({ ...clinicDetails, city: e.target.value })
              }
            />
            <InputField
              label="State"
              name="state"
              value={clinicDetails.state}
              onChange={(e) =>
                setClinicDetails({ ...clinicDetails, state: e.target.value })
              }
            />
          </div>
          <InputField
            label="Zip Code"
            name="zip"
            value={clinicDetails.zip}
            maxLength={6}
            onChange={(e) => {
              const value = e.target.value.replace(/\D/g, "");
              if (value.length <= 6) {
                setClinicDetails({ ...clinicDetails, zip: value });
              }
            }}
          />
          <InputField
            label="Specialization"
            name="specialization"
            value={clinicDetails.specialization}
            onChange={(e) =>
              setClinicDetails({
                ...clinicDetails,
                specialization: e.target.value,
              })
            }
          />
          <div className="flex flex-col sm:flex-row sm:justify-between mt-4">
            <button
              className="bg-gray-200 px-6 py-2 rounded mb-4 sm:mb-0"
              onClick={() => setCurrentStep(1)}
            >
              Previous
            </button>
            <button
              className="bg-black text-white px-6 py-2 rounded"
              onClick={() => setCurrentStep(3)}
            >
              Next Step
            </button>
          </div>
        </div>
      )}

      {currentStep === 3 && (
        <div className="space-y-6">
          <div>
            <label className="block font-medium mb-2">Available Days</label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {[
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
                "Saturday",
                "Sunday",
              ].map((day) => (
                <label key={day} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={availability.days.includes(day)}
                    onChange={() => handleCheckboxChange(day)}
                    className="h-4 w-4"
                  />
                  <span>{day}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <InputField
              label="Start Time"
              type="time"
              name="startTime"
              value={availability.startTime}
              onChange={(e) =>
                setAvailability({ ...availability, startTime: e.target.value })
              }
            />
            <InputField
              label="End Time"
              type="time"
              name="endTime"
              value={availability.endTime}
              onChange={(e) =>
                setAvailability({ ...availability, endTime: e.target.value })
              }
            />
          </div>

          <InputField
            label="Consultation Fee ($)"
            type="number"
            name="fee"
            value={availability.fee}
            onChange={(e) => {
              const value = e.target.value;
              if (!value || (Number(value) > 0 && /^\d*\.?\d*$/.test(value))) {
                setAvailability({ ...availability, fee: value });
              }
            }}
          />

          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={availability.insurance}
              onChange={(e) =>
                setAvailability({
                  ...availability,
                  insurance: e.target.checked,
                })
              }
              className="h-4 w-4"
            />
            <span>Accepts Insurance</span>
          </label>

          <div className="flex flex-col sm:flex-row sm:justify-between mt-4">
            <button
              className="bg-gray-200 px-6 py-2 rounded mb-4 sm:mb-0"
              onClick={() => setCurrentStep(2)}
            >
              Previous
            </button>
            <button
              className="bg-black text-white px-6 py-2 rounded"
              onClick={() => setCurrentStep(4)}
            >
              Next Step
            </button>
          </div>
        </div>
      )}

      {currentStep === 4 && (
        <div className="space-y-6">
          {["Medical License", "Board Certification", "ID Proof"].map((doc) => (
            <div key={doc}>
              <label className="block text-sm font-medium mb-1">{doc}</label>
              <input
                type="file"
                className="w-full border px-4 py-2 rounded-md"
              />
              <p className="text-xs text-gray-500 mt-1">
                Upload {doc.toLowerCase()} (PDF, JPG, PNG)
              </p>
            </div>
          ))}

          <div className="flex flex-col sm:flex-row sm:justify-between mt-4">
            <button
              className="bg-gray-200 px-6 py-2 rounded mb-4 sm:mb-0"
              onClick={() => setCurrentStep(3)}
            >
              Previous
            </button>
            <button
              className="bg-black text-white px-6 py-2 rounded"
              onClick={() => setCurrentStep(5)}
            >
              Next Step
            </button>
          </div>
        </div>
      )}

      {currentStep === 5 && (
        <div className="space-y-6">
          <div className="border p-4 rounded">
            <h3 className="font-semibold mb-2 text-sm sm:text-base">
              Personal Details
            </h3>
            <p className="text-sm sm:text-base">Name: {personalDetails.name}</p>
            <p className="text-sm sm:text-base">
              Email: {personalDetails.email}
            </p>
            <p className="text-sm sm:text-base">
              Phone: {personalDetails.phone}
            </p>
          </div>

          <div className="border p-4 rounded">
            <h3 className="font-semibold mb-2 text-sm sm:text-base">
              Clinic Details
            </h3>
            <p className="text-sm sm:text-base">
              Clinic Name: {clinicDetails.clinicName}
            </p>
            <p className="text-sm sm:text-base">
              Address: {clinicDetails.address}
            </p>
            <p className="text-sm sm:text-base">City: {clinicDetails.city}</p>
            <p className="text-sm sm:text-base">State: {clinicDetails.state}</p>
            <p className="text-sm sm:text-base">
              Zip Code: {clinicDetails.zip}
            </p>
            <p className="text-sm sm:text-base">
              Specialization: {clinicDetails.specialization}
            </p>
          </div>

          <div className="border p-4 rounded">
            <h3 className="font-semibold mb-2 text-sm sm:text-base">
              Availability
            </h3>
            <p className="text-sm sm:text-base">
              Days: {availability.days.join(", ")}
            </p>
            <p className="text-sm sm:text-base">
              Time: {availability.startTime} - {availability.endTime}
            </p>
            <p className="text-sm sm:text-base">Fee: ${availability.fee}</p>
            <p className="text-sm sm:text-base">
              Insurance Accepted: {availability.insurance ? "Yes" : "No"}
            </p>
          </div>

          <label className="flex items-center space-x-2 text-sm sm:text-base">
            <input
              type="checkbox"
              className="h-4 w-4"
              checked={checkboxChecked}
              onChange={handleCheckbox}
            />
            <span>I agree to the Terms of Service and Privacy Policy</span>
          </label>

          <div className="flex flex-col sm:flex-row sm:justify-between mt-4">
            <button
              className="bg-gray-200 px-6 py-2 rounded mb-4 sm:mb-0"
              onClick={() => setCurrentStep(4)}
            >
              Previous
            </button>
            <button
              className="bg-black text-white px-6 py-2 rounded"
              onClick={handleSubmit}
              disabled={!checkboxChecked}
            >
              Submit
            </button>
          </div>
        </div>
      )}

      {currentStep === 6 && (
        <div className="text-center">
          <div className="flex justify-center items-center mb-4">
            <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
              <FaCheck className="text-green-500 w-6 h-6" />
            </div>
          </div>
          <h3 className="text-2xl font-semibold">Registration Complete!</h3>
          <p className="mt-4 text-gray-600">
            Your registration has been completed successfully. You can now
            access your dashboard.
          </p>
          <div className="mt-6">
            <button
              onClick={handleSubmit}
              className="bg-black text-white px-6 py-2 rounded"
            >
              Go to Dashboard
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

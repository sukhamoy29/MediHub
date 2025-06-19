import { useNavigate } from "react-router-dom";

const JoinSection = () => {
  const navigate = useNavigate();

  const handlePatientSignup = () => {
    navigate("/AuthPage?role=patient");
  };

  const handleClinicSignup = () => {
    navigate("/AuthPage?role=doctor");
  };

  return (
    <div className="bg-gray-100 py-16 px-4 sm:px-6 lg:px-8 text-center ">
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4 mt-10">
        Join MediHub Today
      </h2>
      <p className="text-gray-600 text-base sm:text-lg mb-8 max-w-xl mx-auto">
        Start booking appointments with top clinics in your area and save time.
      </p>
      <div className="flex flex-col sm:flex-row justify-center gap-4 mb-10">
        <button
          onClick={handlePatientSignup}
          className="bg-teal-600 text-white font-medium py-3 px-6 rounded-md hover:bg-teal-700 transition"
        >
          Sign Up as Patient
        </button>
        <button
          onClick={handleClinicSignup}
          className="bg-white border border-gray-300 text-gray-800 font-medium py-3 px-6 rounded-md hover:bg-gray-100 transition"
        >
          Register Your Clinic
        </button>
      </div>
    </div>
  );
};

export default JoinSection;

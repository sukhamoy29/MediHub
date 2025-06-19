import { useEffect } from "react";
import { X } from "lucide-react";

const PatientRecordModal = ({ patient, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  if (!patient) return null;

  return (
    <div
      className="fixed inset-0 bg-auto bg-opacity-40 flex items-center justify-center backdrop-blur-md z-50"
      onClick={onClose}
    >
      <div
        className="bg-[#f7f9fc] text-neutral-800 p-6 rounded-lg w-full max-w-md relative shadow-lg mx-4" // Adjusted width for responsiveness
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-800 hover:text-gray-600 cursor-pointer"
        >
          <X size={20} />
        </button>
        <h2 className="text-xl font-semibold">Patient Record</h2>
        <p className="text-gray-700 text-sm mb-4">
          Detailed medical information for {patient.name}
        </p>

        <div className="flex items-center gap-4 mb-4">
          <div className="w-16 h-16 bg-gray-300 rounded-full"></div>
          <div>
            <h3 className="text-lg font-medium">{patient.name}</h3>
            <p className="text-gray-700 text-sm">
              {patient.age} years, {patient.gender}
            </p>
            <p className="text-gray-800 text-sm">{patient.email}</p>
          </div>
        </div>

        <div className="mb-4">
          <h4 className="font-semibold text-gray-800">Medical History</h4>
          <div className="bg-gray-100 p-4 rounded-md mt-1 border">
            {patient.medicalHistory}
          </div>
        </div>

        <div className="mb-4">
          <h4 className="font-semibold text-gray-800">Current Medications</h4>
          <div className="bg-gray-100 p-4 rounded-md mt-1 border">
            {patient.medications}
          </div>
        </div>

        <div className="mb-4">
          <h4 className="font-semibold text-gray-800">Clinical Notes</h4>
          <div className="bg-gray-100 p-4 rounded-md mt-1 border">
            {patient.clinicalNotes}
          </div>
        </div>

        <div className="flex justify-end gap-2">
          <button
            className="px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700 cursor-pointer"
            onClick={onClose}
          >
            Close
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-500 cursor-pointer">
            Edit Record
          </button>
        </div>
      </div>
    </div>
  );
};

export default PatientRecordModal;

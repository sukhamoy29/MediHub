import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

const DoctorDetailsModal = ({ selectedDoctor, onClose }) => {
  const navigate = useNavigate();

  const handleEditClick = () => {
    navigate(`/admin/doctors/edit/${selectedDoctor.id}`);
  };

  return (
    <div className="fixed inset-0 bg-transparent bg-opacity-50 flex justify-center items-center px-4 backdrop-blur-md z-50">
      <div className="bg-white p-6 rounded-lg w-[450px] shadow-lg">
        {/* Header */}
        <div className="flex justify-between items-center border-b pb-3 mb-4">
          <h2 className="text-xl font-bold">{selectedDoctor.name}</h2>
          <button
            className="text-gray-500 hover:text-gray-800"
            onClick={onClose}
          >
            ✖
          </button>
        </div>

        {/* Specialty & Status */}
        <p className="text-blue-600 font-semibold text-lg">
          {selectedDoctor.specialty}
        </p>
        <p
          className={`mt-2 text-sm font-medium ${
            selectedDoctor.status === "Active"
              ? "text-green-600"
              : "text-red-500"
          }`}
        >
          {selectedDoctor.status}
        </p>

        {/* Contact Info */}
        <div className="mt-4">
          <p className="text-gray-500 text-sm">Email</p>
          <p className="font-semibold">{selectedDoctor.contact}</p>
        </div>

        <div className="mt-3">
          <p className="text-gray-500 text-sm">Phone</p>
          <p className="font-semibold">{selectedDoctor.phone}</p>
        </div>

        {/* Experience & Patients */}
        <div className="mt-3 flex justify-between">
          <div>
            <p className="text-gray-500 text-sm">Experience</p>
            <p className="font-semibold">{selectedDoctor.years} years</p>
          </div>
          <div>
            <p className="text-gray-500 text-sm">Patients</p>
            <p className="font-semibold">{selectedDoctor.patients}</p>
          </div>
        </div>

        {/* Availability */}
        <div className="mt-3">
          <p className="text-gray-500 text-sm">Availability</p>
          <p className="font-semibold">
            {selectedDoctor.availability || "Not Provided"}
          </p>
        </div>

        {/* Biography */}
        <div className="mt-4 border-t pt-3">
          <p className="text-gray-500 text-sm">Biography</p>
          <p className="text-gray-700 text-sm leading-relaxed">
            {selectedDoctor.bio ? selectedDoctor.bio : "No biography provided."}
          </p>
        </div>

        {/* Buttons */}
        <div className="flex justify-end space-x-2 mt-6">
          <button
            className="bg-gray-200 px-4 py-2 rounded text-sm"
            onClick={onClose}
          >
            Close
          </button>
          <button
            className="bg-black text-white px-4 py-2 rounded text-sm"
            onClick={handleEditClick}
          >
            Edit
          </button>
        </div>
      </div>
    </div>
  );
};

DoctorDetailsModal.propTypes = {
  selectedDoctor: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    specialty: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    contact: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
    years: PropTypes.number.isRequired,
    patients: PropTypes.number.isRequired,
    availability: PropTypes.string,
    bio: PropTypes.string,
  }).isRequired,
  onClose: PropTypes.func.isRequired,
};

export default DoctorDetailsModal;

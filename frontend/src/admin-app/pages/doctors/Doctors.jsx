import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { FiMoreVertical, FiTrash2, FiEdit, FiEye } from "react-icons/fi";
import DoctorDetailsModal from "./DoctorDetailsModal";
import DeleteConfirmationModal from "./DeleteConfirmationModal";
import AddDoctorModal from "./AddDoctorModal"; // Import the AddDoctorModal
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Doctors = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const [doctors, setDoctors] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState("All Statuses");
  const [selectedSpecialty, setSelectedSpecialty] = useState("All Specialties");
  const [openMenuIndex, setOpenMenuIndex] = useState(null);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [doctorToDelete, setDoctorToDelete] = useState(null);

  const dropdownRefs = useRef({});
  const [dropdownDirection, setDropdownDirection] = useState({});

  const fetchDoctors = async () => {
    try {
      const token = localStorage.getItem("access_token");
      if (!token) {
        toast.error("No authentication token found. Please log in again.");
        navigate("/login"); // Redirect to login page
        return;
      }

      const response = await fetch("http://localhost:8000/api/doctors", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 401) {
        toast.error("Unauthorized access. Please log in again.");
        navigate("/login"); // Redirect to login page
        return;
      }

      if (!response.ok) {
        throw new Error("Failed to fetch doctors");
      }

      const data = await response.json();
      setDoctors(data);
    } catch (error) {
      console.error("Error fetching doctors:", error);
      toast.error(error.message || "An error occurred while fetching doctors.");
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  const handleDelete = async (doctorId) => {
    try {
      const token = localStorage.getItem("access_token");
      const response = await fetch(
        `http://localhost:8000/api/doctors/${doctorId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to delete doctor");
      }
      fetchDoctors();
      setOpenMenuIndex(null);
      setShowDeleteConfirm(false);
      toast.success("Doctor deleted successfully!"); // Add success toast
    } catch (error) {
      console.error("Error deleting doctor:", error);
      toast.error("Failed to delete doctor."); // Add error toast
    }
  };

  const handleDeleteClick = (doctor) => {
    setDoctorToDelete(doctor);
    setShowDeleteConfirm(true);
    setOpenMenuIndex(null); // Close the action menu
  };

  const handleCancelDelete = () => {
    setDoctorToDelete(null);
    setShowDeleteConfirm(false);
  };

  const filteredDoctors = doctors.filter(
    (doctor) =>
      (selectedStatus === "All Statuses" || doctor.status === selectedStatus) &&
      (selectedSpecialty === "All Specialties" ||
        doctor.specialty === selectedSpecialty)
  );

  const handleViewDetails = (doctor) => {
    setSelectedDoctor(doctor);
    setShowDetails(true);
    setOpenMenuIndex(null);
  };

  const handleClickOutside = (event) => {
    let clickedInside = false;
    Object.values(dropdownRefs.current).forEach((ref) => {
      if (ref && ref.contains(event.target)) {
        clickedInside = true;
      }
    });
    if (!clickedInside) setOpenMenuIndex(null);
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const getStatusColorClass = (status) => {
    switch (status) {
      case "Active":
        return "text-green-600";
      case "On Leave":
        return "text-yellow-600";
      case "Inactive":
        return "text-red-600";
      default:
        return "text-gray-600";
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleDoctorAdded = () => {
    setIsModalOpen(false); // Close the modal
    fetchDoctors(); // Refresh the doctor list
  };

  // Effect to calculate dropdown direction when menu is opened
  useEffect(() => {
    if (openMenuIndex !== null) {
      const ref = dropdownRefs.current[openMenuIndex];
      if (ref) {
        const rect = ref.getBoundingClientRect();
        const spaceBelow = window.innerHeight - rect.bottom;
        const spaceAbove = rect.top;
        const direction = spaceBelow < 160 && spaceAbove > 160 ? "up" : "down";
        setDropdownDirection((prev) => ({
          ...prev,
          [openMenuIndex]: direction,
        }));
      }
    }
  }, [openMenuIndex]);

  return (
    <div>
      <AddDoctorModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onDoctorAdded={handleDoctorAdded}
      />
      <div className="p-4 md:p-6 bg-gray-100 min-h-screen">
        {/* Header */}
        <div className="mb-4 flex flex-col md:flex-row justify-between items-center bg-blue-100 md:bg-gray-200 p-2 rounded">
          <div className="mb-4 md:mb-0 text-center md:text-left">
            <h2 className="text-2xl md:text-3xl font-bold">Doctors</h2>
            <p className="text-gray-600 text-sm md:text-base">
              Manage your medical staff and specialists
            </p>
          </div>
          <button
            onClick={openModal}
            className="bg-black text-white px-3 py-2 md:px-4 md:py-2 rounded cursor-pointer"
          >
            + Add Doctor
          </button>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <select
            className="border p-2 rounded w-full sm:w-1/2 md:w-1/4"
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
          >
            {["All Statuses", "Active", "On Leave", "Inactive"].map(
              (status) => (
                <option key={status} className={getStatusColorClass(status)}>
                  {status}
                </option>
              )
            )}
          </select>

          <select
            className="border p-2 rounded w-full sm:w-1/2 md:w-1/4"
            value={selectedSpecialty}
            onChange={(e) => setSelectedSpecialty(e.target.value)}
          >
            {[
              "All Specialties",
              "Cardiology",
              "Neurology",
              "Orthopedics",
              "Pediatrics",
              "Dermatology",
              "Psychiatry",
              "Ophthalmology",
            ].map((specialty) => (
              <option key={specialty}>{specialty}</option>
            ))}
          </select>
        </div>

        {/* Doctor Table */}
        <div className="bg-white p-4 rounded shadow">
          <h3 className="text-lg md:text-xl font-semibold mb-2">
            Doctor Directory
          </h3>
          <p className="text-gray-500 mb-4 text-sm md:text-base">
            {filteredDoctors.length} doctors found
          </p>
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse">
              <thead>
                <tr className="border-b bg-gray-50">
                  <th className="text-left p-2 text-sm md:text-base">Doctor</th>
                  <th className="text-left p-2 text-sm md:text-base">
                    Specialty
                  </th>
                  <th className="text-left p-2 text-sm md:text-base">
                    Contact
                  </th>
                  <th className="text-left p-2 text-sm md:text-base">
                    Patients
                  </th>
                  <th className="text-left p-2 text-sm md:text-base">Status</th>
                  <th className="text-left p-2 text-sm md:text-base">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredDoctors.map((doctor) => (
                  <tr key={doctor.id} className="border-b hover:bg-gray-50">
                    <td className="p-2">{doctor.name}</td>
                    <td className="p-2">{doctor.specialty}</td>
                    <td className="p-2">{doctor.contact}</td>
                    <td className="p-2">{doctor.patients}</td>
                    <td className={`p-2 ${getStatusColorClass(doctor.status)}`}>
                      {doctor.status}
                    </td>
                    <td className="p-2 text-right relative">
                      <div className="flex justify-center items-center">
                        <button
                          className="text-gray-600 hover:text-black"
                          onClick={() => {
                            const isOpening = openMenuIndex !== doctor.id;
                            setOpenMenuIndex(isOpening ? doctor.id : null);
                          }}
                        >
                          <FiMoreVertical size={20} />
                        </button>
                      </div>
                      {openMenuIndex === doctor.id && (
                        <div
                          ref={(el) => (dropdownRefs.current[doctor.id] = el)}
                          className={`absolute right-0 z-50 w-40 bg-white shadow-lg rounded p-2 ${
                            dropdownDirection[doctor.id] === "up"
                              ? "bottom-full mb-2"
                              : "mt-2"
                          }`}
                        >
                          <button
                            className="flex items-center gap-2 text-gray-700 px-3 py-1 w-full text-left"
                            onClick={() => handleViewDetails(doctor)}
                          >
                            <FiEye size={16} /> View Details
                          </button>
                          <button
                            className="flex items-center gap-2 text-gray-700 px-3 py-1 w-full text-left"
                            onClick={() => {
                              setOpenMenuIndex(null);
                              navigate(`/admin/doctors/edit/${doctor.id}`);
                            }}
                          >
                            <FiEdit size={16} /> Edit
                          </button>
                          <button
                            className="flex items-center gap-2 text-red-600 px-3 py-1 w-full text-left"
                            onClick={() => handleDeleteClick(doctor)}
                          >
                            <FiTrash2 size={16} /> Delete
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Doctor Details Popup */}
        {showDetails && selectedDoctor && (
          <DoctorDetailsModal
            selectedDoctor={selectedDoctor}
            onClose={() => setShowDetails(false)}
          />
        )}

        {/* Delete Confirmation Popup */}
        {showDeleteConfirm && doctorToDelete && (
          <DeleteConfirmationModal
            doctorToDelete={doctorToDelete}
            onDelete={handleDelete}
            onCancel={handleCancelDelete}
          />
        )}
      </div>
    </div>
  );
};

export default Doctors;

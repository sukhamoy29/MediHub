import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EditDetailsDoctor = () => {
  const { doctorId } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    id: null,
    name: "",
    specialty: "",
    contact: "",
    phone: "",
    status: "Active",
    patients: "",
    years: "",
    availability: "",
    bio: "",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        const token = localStorage.getItem("access_token");
        if (!token) {
          throw new Error(
            "No authentication token found. Please log in again."
          );
        }
        const response = await fetch(
          `http://localhost:8000/api/doctors/${doctorId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.status === 404) {
          toast.error("Doctor not found");
          navigate("/admin/doctors");
          return;
        }
        if (!response.ok) {
          throw new Error("Failed to fetch doctor details");
        }
        const doctor = await response.json();
        setFormData({
          id: doctor.id,
          name: doctor.name || "",
          specialty: doctor.specialty || "",
          contact: doctor.contact || "",
          phone: doctor.phone || "",
          status: doctor.status || "Active",
          patients: doctor.patients || "",
          years: doctor.years || "",
          availability: doctor.availability || "",
          bio: doctor.bio || "",
        });
      } catch (error) {
        toast.error(
          error.message || "An error occurred while fetching doctor details."
        );
        navigate("/admin/doctors");
      } finally {
        setLoading(false);
      }
    };
    fetchDoctor();
  }, [doctorId, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.specialty || !formData.contact) {
      alert("Please fill in all required fields.");
      return;
    }

    try {
      const token = localStorage.getItem("access_token");
      if (!token) {
        throw new Error("No authentication token found. Please log in again.");
      }
      const response = await fetch(
        `http://localhost:8000/api/doctors/${doctorId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            ...formData,
            patients: parseInt(formData.patients) || 0,
            years: parseInt(formData.years) || 0,
          }),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to update doctor details");
      }
      toast.success("Doctor details updated successfully");
      navigate("/admin/doctors");
    } catch (error) {
      toast.error(
        error.message || "An error occurred while updating doctor details."
      );
    }
  };

  const handleCancel = () => {
    navigate("/admin/doctors");
  };

  if (loading) {
    return <div>Loading doctor details...</div>;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 overflow-y-auto flex justify-center items-center px-4 py-8 backdrop-blur-md z-50">
      <div className="bg-white p-6 rounded-lg w-[450px] shadow-lg max-h-full overflow-y-auto">
        {/* header */}

        <div className="flex justify-between items-center border-b pb-3 mb-4">
          <p className="text-gray-600 mb-4">
            Edit the details of the doctor. Click save when you&lsquo;re done.
          </p>
          <button
            className="text-gray-950 hover:text-gray-500 ml-8"
            onClick={handleCancel}
          >
            ✖
          </button>
        </div>
        <ToastContainer />
        {/* <p className="text-gray-600 mb-4">
        Edit the details of the doctor. Click save when you&lsquo;re done.
      </p> */}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name & Specialty */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block font-medium">Full Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter doctor's name"
                className="border p-2 rounded w-full"
                required
              />
            </div>
            <div>
              <label className="block font-medium">Specialty</label>
              <select
                name="specialty"
                value={formData.specialty}
                onChange={handleChange}
                className="border p-2 rounded w-full"
                required
              >
                <option value="">Select specialty</option>
                <option value="Cardiology">Cardiology</option>
                <option value="Neurology">Neurology</option>
                <option value="Orthopedics">Orthopedics</option>
                <option value="Pediatrics">Pediatrics</option>
                <option value="Dermatology">Dermatology</option>
                <option value="Psychiatry">Psychiatry</option>
                <option value="Ophthalmology">Ophthalmology</option>
              </select>
            </div>
          </div>

          {/* Contact & Phone */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block font-medium">Email</label>
              <input
                type="email"
                name="contact"
                value={formData.contact}
                onChange={handleChange}
                placeholder="example@medihub.com"
                className="border p-2 rounded w-full"
                required
              />
            </div>
            <div>
              <label className="block font-medium">Phone Number</label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter phone number"
                className="border p-2 rounded w-full"
              />
            </div>
          </div>

          {/* Status, Patients, Experience */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block font-medium">Status</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="border p-2 rounded w-full"
              >
                <option value="Active">Active</option>
                <option value="On Leave">On Leave</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
            <div>
              <label className="block font-medium">Patients</label>
              <input
                type="number"
                name="patients"
                value={formData.patients}
                onChange={handleChange}
                min="0"
                className="border p-2 rounded w-full"
              />
            </div>
            <div>
              <label className="block font-medium">Experience (Years)</label>
              <input
                type="number"
                name="years"
                value={formData.years}
                onChange={handleChange}
                min="0"
                className="border p-2 rounded w-full"
              />
            </div>
          </div>

          {/* Availability */}
          <div>
            <label className="block font-medium">Availability</label>
            <input
              type="text"
              name="availability"
              value={formData.availability}
              onChange={handleChange}
              placeholder="E.g. Mon, Wed, Fri"
              className="border p-2 rounded w-full"
            />
          </div>

          {/* Bio */}
          <div>
            <label className="block font-medium">Doctor&rsquo;s Bio</label>
            <textarea
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              placeholder="Enter doctor's bio"
              className="border p-2 rounded w-full h-24"
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-end space-x-2 mt-6">
            <button
              type="button"
              className="bg-gray-500 text-white px-4 py-2 rounded cursor-pointer"
              onClick={handleCancel}
            >
              Close
            </button>

            <button
              type="submit"
              className="bg-black text-white px-4 py-2 rounded cursor-pointer"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

EditDetailsDoctor.propTypes = {
  onClose: PropTypes.func,
};

export default EditDetailsDoctor;

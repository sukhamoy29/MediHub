import PropTypes from "prop-types";
import { useEffect } from "react";
import AddDoctor from "./AddDoctorPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddDoctorModal = ({ isOpen, onClose, onDoctorAdded }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("overflow-hidden"); // Prevent scrolling
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    return () => document.body.classList.remove("overflow-hidden");
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-transparent bg-opacity-50 backdrop-blur-md flex justify-center items-center z-50 px-4">
      <div
        className="bg-white p-6 rounded-lg w-full max-w-2xl shadow-lg modal-scrollable relative"
        style={{ maxHeight: "80vh", overflowY: "auto" }}
      >
        <ToastContainer />
        <div className="flex justify-between items-center border-b pb-3 mb-4">
          <h2 className="text-xl font-bold">Add New Doctor</h2>
          <button
            className="text-gray-500 hover:text-gray-800"
            onClick={onClose}
          >
            ✖
          </button>
        </div>
        <AddDoctor onClose={onClose} onDoctorAdded={onDoctorAdded} />
      </div>
    </div>
  );
};

AddDoctorModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onDoctorAdded: PropTypes.func,
};

export default AddDoctorModal;

import PropTypes from "prop-types";

const DeleteConfirmationModal = ({ doctorToDelete, onDelete, onCancel }) => {
  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex justify-center items-center px-4 z-50">
      <div className="bg-white p-6 rounded-lg w-[450px] shadow-lg">
        <h2 className="text-xl font-bold mb-4">Are you sure?</h2>
        <p className="text-gray-700 mb-6">
          This will permanently delete Dr. {doctorToDelete.name}&lsquo;s record
          from the system. This action cannot be undone.
        </p>
        <div className="flex justify-end space-x-2">
          <button
            className="bg-gray-200 px-4 py-2 rounded text-sm"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button
            className="bg-red-600 text-white px-4 py-2 rounded text-sm"
            onClick={() => onDelete(doctorToDelete.id)}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

DeleteConfirmationModal.propTypes = {
  doctorToDelete: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
  onDelete: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default DeleteConfirmationModal;

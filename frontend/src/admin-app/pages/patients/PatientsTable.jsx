import { useState } from "react";
import { FileText, Edit, Trash2 } from "lucide-react";
import PatientRecordModal from "./PatientRecordModal"; // Import the PatientRecordModal component
import EditPatient from "./EditPatient";
import ConfirmationModal from "./ConfirmationModal"; // Import the ConfirmationModal component

export default function PatientTable({
  patients,
  filter,
  onDeletePatient,
  filteredPatients,
}) {
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [editingPatient, setEditingPatient] = useState(null);
  const [patientToDelete, setPatientToDelete] = useState(null); // State for the patient to delete

  const displayedPatients = filteredPatients || patients; // Use filteredPatients if available

  const filteredPatientsList =
    filter === "All Patients"
      ? displayedPatients
      : displayedPatients.filter((p) => p.status === filter);

  const handleDelete = () => {
    if (patientToDelete) {
      onDeletePatient(patientToDelete.id); // Call the delete function passed as a prop
      setPatientToDelete(null); // Close the modal after deletion
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-2xl p-5">
      <div className="overflow-x-auto">
        <table className="min-w-full text-left text-black">
          <thead>
            <tr className="text-gray-800 border-b border-gray-700">
              <th className="p-2">Patient</th>
              <th className="p-2">Contact Info</th>
              <th className="p-2">Last Visit</th>
              <th className="p-2">Next Appointment</th>
              <th className="p-2">Status</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredPatientsList.map((patient) => (
              <tr key={patient.id} className="border-b border-gray-700">
                <td className="p-2 font-semibold">
                  {patient.name} <br />
                  <span className="text-gray-400">
                    {patient.age} yrs, {patient.gender}
                  </span>
                </td>
                <td className="p-2">
                  {patient.phone} <br />
                  <span className="text-gray-400">{patient.email}</span>
                </td>
                <td className="p-2">{patient.lastVisit}</td>
                <td className="p-2">{patient.nextAppointment}</td>
                <td className="p-2">
                  <span
                    className={`px-2 py-1 rounded text-sm ${
                      patient.status === "Active"
                        ? "bg-green-500"
                        : "bg-gray-500"
                    }`}
                  >
                    {patient.status}
                  </span>
                </td>
                <td className="p-2 flex gap-2">
                  <FileText
                    className="cursor-pointer text-gray-500 hover:text-neutral-800"
                    size={18}
                    onClick={() => setSelectedPatient(patient)}
                  />
                  <Edit
                    className="cursor-pointer text-gray-500 hover:text-neutral-800"
                    size={18}
                    onClick={() => setEditingPatient(patient)}
                  />
                  <Trash2
                    className="cursor-pointer text-gray-500 hover:text-red-600"
                    size={18}
                    onClick={() => setPatientToDelete(patient)} // Open the confirmation modal
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Render PatientRecordModal if selectedPatient is set */}
      {selectedPatient && (
        <PatientRecordModal
          patient={selectedPatient}
          onClose={() => setSelectedPatient(null)}
        />
      )}

      {/* Render EditPatient if editingPatient is set */}
      {editingPatient && (
        <div className="fixed inset-0 bg-auto bg-opacity-50 flex items-center justify-center backdrop-blur-md z-50">
          <div className="bg-white p-6 rounded-lg shadow-2xl w-full max-w-2xl relative">
            <button
              className="absolute top-4 right-4 text-gray-800 hover:text-black cursor-pointer"
              onClick={() => setEditingPatient(null)}
            >
              ✕
            </button>
            <EditPatient patient={editingPatient} />
          </div>
        </div>
      )}

      {/* Render ConfirmationModal if patientToDelete is set */}
      <ConfirmationModal
        show={!!patientToDelete}
        onClose={() => setPatientToDelete(null)} // Close the modal
        onConfirm={handleDelete} // Handle deletion
      />
    </div>
  );
}

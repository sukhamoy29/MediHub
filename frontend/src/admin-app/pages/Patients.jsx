import { useState } from "react";
import Navbar from "./patients/PatientsHead";
import PatientTable from "./patients/PatientsTable";
import { patients as initialPatients } from "./patients/PatientsData";

export default function Patients() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All Patients");
  const [filteredPatients, setFilteredPatients] = useState(initialPatients); // Add state for filtered patients

  const handleDeletePatient = (id) => {
    setFilteredPatients((prevPatients) =>
      prevPatients.filter((patient) => patient.id !== id)
    ); // Function to delete patient
  }; // Close the function properly

  return (
    <div className="p-2 bg-transparent min-h-screen text-black ">
      <Navbar
        search={search}
        setSearch={setSearch}
        setFilter={setFilter}
        setFilteredPatients={setFilteredPatients}
      />
      <div className="mt-2 p-8">
        <PatientTable
          patients={filteredPatients} // Use filtered patients
          filter={filter}
          search={search}
          onDeletePatient={handleDeletePatient}
        />{" "}
        {/* Pass delete function */}
      </div>
    </div>
  );
}

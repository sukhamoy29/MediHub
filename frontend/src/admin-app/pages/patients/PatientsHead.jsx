import { Search } from "lucide-react";
import FilterSection from "./PatientsFilterSection";
import { patients } from "./PatientsData"; // Import patient data

export default function PatientsHead({
  search,
  setSearch,
  setFilter,
  setFilteredPatients,
}) {
  return (
    <div className="p-4 ">
      <h1 className="text-3xl font-bold">Patients</h1>
      <p className="text-gray-400">Manage and view your patient records</p>
      <div className="mt-4 flex flex-col md:flex-row justify-between items-center bg-white p-4 shadow-md rounded-lg">
        <div className="relative w-full md:w-2/3">
          <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
          <input
            className="w-full pl-10 pr-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-neutral-600"
            placeholder="Search patients..."
            value={search}
            onChange={(e) => {
              const value = e.target.value.toLowerCase();
              setSearch(value);
              const filtered = patients.filter(
                (patient) =>
                  patient.name.toLowerCase().includes(value) ||
                  patient.phone.includes(value) ||
                  patient.email.toLowerCase().includes(value)
              );
              setFilteredPatients(filtered); // Set filtered patients
            }}
          />
        </div>
        <div className="mt-4 md:mt-0 md:ml-2">
          <FilterSection setFilter={setFilter} />
        </div>
      </div>
    </div>
  );
}

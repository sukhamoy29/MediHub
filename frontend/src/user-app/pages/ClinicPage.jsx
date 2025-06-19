import { useState, useMemo } from "react";
import Sidebar from "../components/clinic/Sidebar";
import Navbar from "../components/clinic/Navbar";
import ClinicCard from "../components/clinic/ClinicCard";
import Pagination from "../components/clinic/Pagination";
import { clinics } from "../data/clinicsData";
import useScreenWidth from "../hooks/useScreenWidth";

const ClinicPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedAvailability, setSelectedAvailability] = useState([]);
  const [selectedRatings, setSelectedRatings] = useState([]);
  const [selectedSpecialties, setSelectedSpecialties] = useState([]);
  const [locationFilter, setLocationFilter] = useState("");
  const [selectedDistance, setSelectedDistance] = useState(0);
  const screenWidth = useScreenWidth();

  const cardsPerPage = 6;

  // Move useMemo calls to top level to fix hook order issue
  const memoSelectedAvailability = useMemo(
    () => selectedAvailability,
    [selectedAvailability]
  );
  const memoSelectedRatings = useMemo(() => selectedRatings, [selectedRatings]);
  const memoSelectedSpecialties = useMemo(
    () => selectedSpecialties,
    [selectedSpecialties]
  );
  const memoLocationFilter = useMemo(() => locationFilter, [locationFilter]);
  const memoSelectedDistance = useMemo(
    () => selectedDistance,
    [selectedDistance]
  );

  let filteredClinics =
    searchTerm.trim() === ""
      ? clinics
      : clinics.filter((clinic) =>
          clinic.name.toLowerCase().includes(searchTerm.toLowerCase())
        );

  // Filter clinics by selected availability if any availability filter is selected
  if (selectedAvailability.length > 0) {
    filteredClinics = filteredClinics.filter((clinic) =>
      selectedAvailability.some((availability) =>
        clinic.nextAvailable.toLowerCase().includes(availability.toLowerCase())
      )
    );
  }

  // Filter clinics by selected ratings if any rating filter is selected
  if (selectedRatings.length > 0) {
    filteredClinics = filteredClinics.filter((clinic) => {
      const clinicRating = parseFloat(clinic.rating);
      return selectedRatings.some(
        (rating) => clinicRating >= rating && clinicRating < rating + 1
      );
    });
  }

  // Filter clinics by selected specialties if any specialty filter is selected
  if (selectedSpecialties.length > 0) {
    filteredClinics = filteredClinics.filter((clinic) =>
      selectedSpecialties.includes(clinic.specialty)
    );
  }

  // Filter clinics by location filter if set (case insensitive match in address or name)
  if (locationFilter.trim() !== "") {
    filteredClinics = filteredClinics.filter(
      (clinic) =>
        clinic.address.toLowerCase().includes(locationFilter.toLowerCase()) ||
        clinic.name.toLowerCase().includes(locationFilter.toLowerCase())
    );
  }

  if (selectedDistance > 0) {
    filteredClinics = filteredClinics.filter((clinic) => {
      const clinicDistance = parseFloat(clinic.distance);
      return clinicDistance <= selectedDistance;
    });
  }

  const totalPages = Math.ceil(filteredClinics.length / cardsPerPage);

  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentClinics = filteredClinics.slice(
    indexOfFirstCard,
    indexOfLastCard
  );

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleSearchChange = (value) => {
    setSearchTerm(value);
    setCurrentPage(1);
  };

  const handleApplyAvailability = (availabilityFilters) => {
    setSelectedAvailability(availabilityFilters);
    setCurrentPage(1);
  };

  const handleApplyRating = (ratingFilters) => {
    setSelectedRatings(ratingFilters);
    setCurrentPage(1);
  };

  const handleApplySpecialty = (specialtyFilters) => {
    setSelectedSpecialties(specialtyFilters);
    setCurrentPage(1);
  };

  const handleApplyLocation = (location) => {
    setLocationFilter(location);
    setCurrentPage(1);
  };

  const handleApplyDistance = (distance) => {
    setSelectedDistance(distance);
    setCurrentPage(1);
  };

  const handleReset = () => {
    setSelectedAvailability([]);
    setSelectedRatings([]);
    setSelectedSpecialties([]);
    setLocationFilter("");
    setSelectedDistance(0);
    setCurrentPage(1);
  };

  return (
    <div className="flex flex-col sm:flex-row min-h-screen bg-slate-100 p-6 gap-2">
      {/* Sidebar toggle button for small screens */}
      <div className="sm:hidden mb-4">
        <button
          onClick={toggleSidebar}
          className="text-gray-700 bg-white p-2 rounded-md shadow-md focus:outline-none"
          aria-label="Toggle sidebar"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 6h16M4 12h16M4 18h16"
            ></path>
          </svg>
        </button>
      </div>

      {/* Sidebar for small screens (toggleable) */}
      {sidebarOpen && (
        <div className="sm:hidden w-full">
          <Sidebar
            onApplyAvailability={handleApplyAvailability}
            onReset={handleReset}
            onApplyRating={handleApplyRating}
            onApplySpecialty={handleApplySpecialty}
            onApplyLocation={handleApplyLocation}
            onApplyDistance={handleApplyDistance}
            initialSelectedAvailability={memoSelectedAvailability}
            initialSelectedRatings={memoSelectedRatings}
            initialSelectedSpecialties={memoSelectedSpecialties}
            initialLocation={memoLocationFilter}
            initialDistance={memoSelectedDistance}
            onCloseSidebar={() => setSidebarOpen(false)}
          />
        </div>
      )}

      {/* Sidebar for larger screens (always visible) */}
      <div className="hidden sm:block w-full sm:w-72">
        <Sidebar
          onApplyAvailability={handleApplyAvailability}
          onReset={handleReset}
          onApplyRating={handleApplyRating}
          onApplySpecialty={handleApplySpecialty}
          onApplyLocation={handleApplyLocation}
          onApplyDistance={handleApplyDistance}
          initialSelectedAvailability={memoSelectedAvailability}
          initialSelectedRatings={memoSelectedRatings}
          initialSelectedSpecialties={memoSelectedSpecialties}
          initialLocation={memoLocationFilter}
          initialDistance={memoSelectedDistance}
        />
      </div>

      {/* Main content */}
      <div className="flex-1 p-3">
        {/* Show Navbar only if sidebar is not open on small screens or always on larger screens */}
        {(!sidebarOpen || screenWidth >= 640) && (
          <Navbar searchTerm={searchTerm} onSearchChange={handleSearchChange} />
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
          {currentClinics.map((clinic, index) => (
            <ClinicCard
              key={index}
              id={clinic.id}
              name={clinic.name || "N/A"}
              rating={clinic.rating || 0}
              specialty={clinic.specialty || "N/A"}
              distance={clinic.distance || "N/A"}
              nextAvailable={clinic.nextAvailable || "N/A"}
              reviews={clinic.reviews || 0}
              address={clinic.address || "N/A"}
              fees={clinic.fees || 0}
              doctors={clinic.doctors || []}
            />
          ))}
        </div>

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default ClinicPage;

import { useNavigate } from "react-router-dom";
import ClinicCard from "../components/clinic/ClinicCard";
import { clinics } from "../data/clinicsData";

const FeaturedClinics = () => {
  const navigate = useNavigate();

  const handleViewAllClick = () => {
    navigate("/clinics");
  };

  return (
    <div className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-4">
        {/* Header */}
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Featured Clinics
          </h2>
          <p className="mt-4 text-lg leading-6 text-gray-600">
            Discover top-rated clinics in your area with instant appointment
            booking.
          </p>
        </div>

        {/* 3 Cards only */}
        <div className="flex flex-wrap  justify-center gap-6">
          {clinics.slice(0, 3).map((clinic) => (
            <ClinicCard
              key={clinic.id}
              id={clinic.id}
              name={clinic.name}
              rating={clinic.rating}
              reviews={clinic.reviews}
              specialty={clinic.specialty}
              distance={clinic.distance}
              nextAvailable={clinic.nextAvailable}
              address={clinic.address}
              fees={clinic.fees}
            />
          ))}
        </div>

        {/* View All Button */}
        <div className="flex justify-center mt-10">
          <button
            onClick={handleViewAllClick}
            className="border border-gray-300 text-gray-700 px-6 py-2 rounded-md hover:bg-gray-100 cursor-pointer"
          >
            View All Clinics
          </button>
        </div>
      </div>
    </div>
  );
};

export default FeaturedClinics;

import PropTypes from "prop-types";

const ServicesSection = ({ clinic }) => {
  // Defensive check for clinic and doctors array
  if (!clinic || !Array.isArray(clinic.doctors)) {
    return <div>No services available</div>;
  }

  // Extract unique specialties from the clinic's doctors array
  const specialties = Array.from(
    new Set(clinic.doctors.map((doctor) => doctor.specialty))
  );

  return (
    <div className="grid grid-cols-2 gap-y-3 gap-x-6 mt-6 text-sm sm:text-base text-gray-900">
      {specialties.map((specialty, idx) => (
        <div key={idx} className="flex items-start gap-2">
          <span className="text-emerald-600 mt-1 text-lg">•</span>
          <span>{specialty}</span>
        </div>
      ))}
    </div>
  );
};

ServicesSection.propTypes = {
  clinic: PropTypes.shape({
    doctors: PropTypes.arrayOf(
      PropTypes.shape({
        specialty: PropTypes.string.isRequired,
      })
    ).isRequired,
  }).isRequired,
};

export default ServicesSection;

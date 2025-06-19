import { MapPin, Clock, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { clinics } from "../../data/clinicsData";
import clinicBanner from "../../assets/header.jpg";
import PropTypes from "prop-types";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ClinicCard = ({
  id,
  name,
  rating,
  specialty,
  distance,
  nextAvailable,
  address,
  reviews,
  fees,
  doctors,
}) => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const handleClinicDetails = () => {
    navigate(`/clinic-details/${id}`);
  };

  const handleBookAppointment = () => {
    if (!user) {
      toast.error("Please log in to book an appointment.");
      return;
    }
    const clinic = clinics.find((c) => c.id === id);
    console.log("Clinic object passed to BookAppointment:", clinic);
    navigate(`/bookappointment`, {
      state: clinic || {},
    });
  };

  return (
    // <div className="flex flex-col  sm:flex-row bg-white rounded-xl overflow-hidden shadow-sm">
    <div className="flex flex-col bg-white rounded-xl overflow-hidden shadow-sm">
      {/* Image section */}
      <div className="w-full bg-gray-100 flex items-center justify-center p-4">
        <img
          src={clinicBanner}
          alt="Clinic"
          className="w-20 h-20 rounded-full object-cover"
        />
      </div>

      {/* Details section */}
      <div className="flex-1 p-4 flex flex-col justify-between">
        <div>
          <div className="flex justify-between items-start flex-wrap">
            <div>
              <h2 className="text-lg font-semibold">{name}</h2>
              <span className="inline-block mt-1 px-2 py-0.5 text-xs text-white bg-emerald-700 rounded-full">
                {specialty}
              </span>
              <div className="mt-1 text-sm text-gray-700 font-semibold">
                Fees: {fees} Rs
              </div>
            </div>
            <div className="flex items-center gap-1 text-yellow-500 text-sm font-medium mt-2 sm:mt-0">
              <Star size={16} fill="#facc15" strokeWidth={0} />
              {rating}{" "}
              <span className="text-gray-500 font-normal">({reviews})</span>
            </div>
          </div>

          <div className="mt-3 flex items-center gap-2 text-sm text-gray-600 flex-wrap">
            <MapPin size={16} />
            <span className="truncate">{address}</span> • {distance} km
          </div>

          <div className="mt-2 flex items-center gap-2 text-sm text-emerald-600 font-medium">
            <Clock size={16} />
            {nextAvailable}
          </div>
        </div>

        {/* Doctors section */}
        {doctors && doctors.length > 0 && (
          <div className="mt-4">
            <h3 className="text-md font-semibold mb-2">Doctors</h3>
            <ul className="list-disc list-inside text-sm text-gray-700">
              {doctors.map((doctor, index) => (
                <li key={index}>
                  {doctor.name} - {doctor.specialty}
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="flex flex-row space-x-2 mt-2">
          <button
            onClick={handleClinicDetails}
            className=" bg-teal-600 hover:bg-teal-700 text-white text-sm py-4 rounded-md w-full cursor-pointer"
          >
            See Details
          </button>
          <button
            onClick={handleBookAppointment}
            className=" bg-teal-600 hover:bg-teal-700 text-white text-sm py-2 rounded-md w-full cursor-pointer"
          >
            Book Appointment
          </button>
        </div>
      </div>
    </div>
  );
};
ClinicCard.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  rating: PropTypes.number.isRequired,
  specialty: PropTypes.string.isRequired,
  distance: PropTypes.number.isRequired,
  nextAvailable: PropTypes.string.isRequired,
  address: PropTypes.string.isRequired,
  reviews: PropTypes.number.isRequired,
  fees: PropTypes.number.isRequired,
  doctors: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      specialty: PropTypes.string.isRequired,
    })
  ),
};

export default ClinicCard;

<ToastContainer
  position="top-center"
  className="toast-container" // Custom class for small device styling
/>;

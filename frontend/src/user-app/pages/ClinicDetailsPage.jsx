import { useNavigate, useParams } from "react-router-dom";
import ClinicHeader from "../components/clinic/clinicDetailsPage/ClinicHeader";
import ClinicTabs from "../components/clinic/clinicDetailsPage/ClinicTabs";
// import AppointmentForm from "../components/paymentsection/BookAppointment";
import { clinics } from "../data/clinicsData";

const ClinicDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  // Find the clinic by name (assuming "City Health Clinic" for now)
  // const clinic =
  //   clinics.find((c) => c.name === "City Health Clinic") || clinics[0];
  const clinic = clinics.find((c) => c.id === id) || clinics[0];
  return (
    // <div className="flex flex-col lg:flex-row gap-6 md:p-10 sm:p-4 bg-gray-100 max-w-full ">
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4 py-8 relative">
      <div className="w-full max-w-5xl bg-white rounded-lg shadow-md p-6 print:shadow-none print:border print:border-gray-300 print:max-w-full">
        <div className="flex-1 bg-white rounded-xl shadow p-6">
          {/* Back Button */}
          <button
            onClick={() => navigate(-1)}
            className="mb-4 text-md cursor-pointer  text-teal-500   inline-flex items-center "
          >
            ← Back
          </button>

          <ClinicHeader clinic={clinic} />
          <ClinicTabs clinic={clinic} />
        </div>

        {/* <div className="w-full lg:w-[400px] bg-white rounded-xl shadow p-6">
        <AppointmentForm clinic={clinic} />
      </div> */}
      </div>
    </div>
  );
};

export default ClinicDetails;

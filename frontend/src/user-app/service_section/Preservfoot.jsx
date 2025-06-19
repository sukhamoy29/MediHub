import { Link } from "react-router-dom";

const Preservfoot = () => {
  return (
    <div className="bg-slate-100 text-gray-950 py-10">
      <div className="max-w-5xl mx-auto text-center px-4 mb-10">
        <h2 className="text-4xl md:text-5xl font-bold mb-4">
          Connect with Clinics Instantly!
        </h2>
        <p className="text-base md:text-lg mb-6">
          Effortlessly schedule your health appointments in Medinipur. Connect
          with top clinics and doctors swiftly through MediHub now! Get started
          today to prioritize your well-being.
        </p>
        <Link
          to="/clinics"
          className="mt-6 border border-slate-500 hover:bg-slate-300 text-gray-900 font-semibold py-3 px-8 rounded-lg transition-transform duration-300 hover:scale-105"
        >
          Schedule Now
        </Link>
      </div>
    </div>
  );
};

export default Preservfoot;

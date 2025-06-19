import { Link } from "react-router-dom";

const Prevfaqfoot = () => {
  return (
    <div className="bg-slate-100 text-gray-900 py-12">
      <div className="container mx-auto text-center px-4">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold mb-4">
          Book Your Doctor Today
        </h2>
        <p className="text-base sm:text-lg md:text-xl mt-4 mb-10 leading-relaxed max-w-2xl mx-auto">
          Connect instantly with top specialists across India. Schedule your
          health appointments at your convenience, anytime, anywhere.
        </p>
        <Link
          to="/clinics"
          className="border bg-transparent border-gray-500 hover:bg-slate-300 text-gray-900 font-medium py-3 px-6 rounded-lg transition duration-300 text-base sm:text-lg"
        >
          Schedule Now
        </Link>
      </div>
    </div>
  );
};

export default Prevfaqfoot;

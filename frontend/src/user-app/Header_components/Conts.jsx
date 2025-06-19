import { useEffect, useState, Suspense } from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import contactImage from "../assets/contactimg.jpg"; // for image section

const Contact = () => {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setAnimate(true);
  }, []);

  return (
    <div className="flex flex-col md:flex-row h-screen">
      <div
        className={`flex transform transition-all duration-1000 ease-out ${
          animate ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
        } p-6`}
      >
        <div className="flex-1 bg-gradient-to-r from-gray-500 to-gray-300 p-10 flex flex-col justify-center">
          <h1 className="text-4xl font-bold mb-4">
            Book Medical Appointments Easily with MediHub in Midnapore
          </h1>
          <p className="mb-6 text-lg">
            MediHub simplifies your healthcare journey in Midnapore. Schedule
            appointments with trusted doctors online. Experience convenience and
            care at your fingertips. Trust MediHub for all your medical
            appointment needs.
          </p>
          <Link
            to="/contact#fromcontact"
            className="mt-24 border bg-transparent border-gray-50 hover:bg-slate-400 text-gray-100 text-center font-semibold py-3 px-6 rounded-lg transition duration-300 text-lg"
            aria-label="Contact us"
          >
            Contact Us
          </Link>
        </div>
        <div className="flex-1 bg-white flex items-center justify-center">
          <Suspense fallback={<div>Loading image...</div>}>
            <img
              src={contactImage}
              alt="A doctor consulting with a patient"
              className="w-full h-full object-cover object-center"
            />
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default Contact;

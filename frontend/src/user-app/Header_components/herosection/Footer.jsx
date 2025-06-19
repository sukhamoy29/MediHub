import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  // FaLinkedinIn,
} from "react-icons/fa";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Footer = () => {
  const { user } = useContext(AuthContext);

  const handleClinicDashboardClick = (e) => {
    if (!user || user.role !== "clinicAdmin") {
      e.preventDefault();
      toast.error("Please log in as a clinic admin to access the dashboard.");
    }
  };

  return (
    <footer className="bg-slate-950 text-white py-12 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-8 border-b border-gray-200 pb-8">
        {/* Company */}
        <div>
          <h3 className="font-semibold text-lg mb-4">Company</h3>
          <ul className="space-y-2 text-gray-50">
            <li>
              <Link to="/about" className="hover:underline">
                About Us
              </Link>
            </li>

            <li>
              <Link to="/contact" className="hover:underline">
                Contact
              </Link>
            </li>
            <li>
              <Link to="/faq" className="hover:underline">
                FAQs
              </Link>
            </li>
            <li>
              <Link to="/privacy" className="hover:underline">
                Privacy Policy
              </Link>
            </li>
          </ul>
        </div>

        {/* For Patients */}
        <div>
          <h3 className="font-semibold text-lg mb-4">For Patients</h3>
          <ul className="space-y-2 text-gray-50">
            <li>
              <Link to="/clinics" className="hover:underline">
                Find Clinics
              </Link>
            </li>
            <li>
              <Link to="/appointments" className="hover:underline">
                Book Appointments
              </Link>
            </li>

            <li>
              <Link to="/faq" className="hover:underline">
                FAQs
              </Link>
            </li>
          </ul>
        </div>

        {/* For Clinics */}
        <div>
          <h3 className="font-semibold text-lg mb-4">For Clinics</h3>
          <ul className="space-y-2 text-gray-50">
            <li>
              <Link to="/join" className="hover:underline">
                Join Network
              </Link>
            </li>
            <li>
              <Link
                to="/admin/dashboard"
                className="hover:underline"
                onClick={handleClinicDashboardClick}
              >
                Clinic Dashboard
              </Link>
            </li>

            <li>
              <Link to="/success" className="hover:underline">
                Success Stories
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-center max-w-7xl mx-auto pt-6 px-4 text-white text-sm">
        <p className="text-center md:text-left">
          &copy; 2025 Medihub. All rights reserved.
        </p>
        <div className="flex space-x-4 mt-4 md:mt-0">
          <a href="#" className="hover:text-gray-400">
            <FaFacebookF />
          </a>
          <a href="#" className="hover:text-gray-400">
            <FaTwitter />
          </a>
          <a href="#" className="hover:text-gray-400">
            <FaInstagram />
          </a>
          {/* <a href="#" className="hover:text-gray-400">
            <FaLinkedinIn />
          </a> */}
        </div>
      </div>
    </footer>
  );
};

export default Footer;

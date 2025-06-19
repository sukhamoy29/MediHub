import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Dsidebar from "./dcomponents/Dsidebar";
import Navbar from "../Header_components/herosection/Navbar";
import Footer from "../Header_components/herosection/Footer";

const Dashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to profile on first load if no specific route is selected
    if (window.location.pathname === "/dashboard") {
      navigate("/dashboard/profile");
    }
  }, [navigate]);

  const handleSectionChange = (section) => {
    switch (section) {
      case "profile":
        navigate("/dashboard/profile");
        break;
      case "appointment":
        navigate("/dashboard/appointments");
        break;
      case "book_appointment":
        navigate("/clinics");
        break;
      case "settings":
        navigate("/dashboard/settings");
        break;
      default:
        break;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <div className="sticky top-0 z-30">
        <Navbar />
      </div>
      <div className="flex-1 flex bg-gray-100">
        <Dsidebar
          onSectionChange={handleSectionChange}
          className="hidden lg:block w-1/4"
        />
        <main className="flex-1 overflow-y-auto p-4 pb-20 pt-8 md:pl-1 lg:w-3/4">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl font-bold text-teal-500 sm:text-3xl">
                Patient Dashboard
              </h1>
            </div>
            <div className="p-2 lg:pt-0">
              <Outlet />
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;

import { useState } from "react";
import PropTypes from "prop-types";
import AboutSection from "./AboutSection";
import ServicesSection from "./ServicesSection";
import DoctorsSection from "./DoctorsSection";
// import ReviewsSection from "./ReviewsSection";

// const tabs = ["About", "Services", "Doctors", "Reviews"];
const tabs = ["About", "Services", "Doctors"];
const ClinicTabs = ({ clinic }) => {
  const [active, setActive] = useState("About");

  return (
    <div className="mt-4">
      {/* Tabs Container */}
      <div className="flex flex-nowrap bg-slate-200 rounded-md overflow-hidden w-full p-1">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActive(tab)}
            className={`w-1/3 py-2 text-xs sm:text-sm font-semibold text-center transition cursor-pointer ${
              active === tab ? "bg-white shadow text-black" : "text-gray-600"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Active Tab Content */}
      <div className="mt-4">
        {active === "About" && <AboutSection clinic={clinic} />}
        {active === "Services" && <ServicesSection clinic={clinic} />}
        {active === "Doctors" && <DoctorsSection clinic={clinic} />}
        {/* {active === "Reviews" && <ReviewsSection />} */}
      </div>
    </div>
  );
};
ClinicTabs.propTypes = {
  clinic: PropTypes.object.isRequired,
};

export default ClinicTabs;

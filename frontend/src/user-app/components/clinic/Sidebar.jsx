import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { SlidersHorizontal } from "lucide-react";
import { MapPin } from "lucide-react";

import { clinics } from "../../data/clinicsData";

const Sidebar = ({
  onApplyAvailability,
  onReset,
  onApplyRating,
  onApplySpecialty,
  onApplyLocation,
  onApplyDistance,
  onCloseSidebar,
  initialSelectedAvailability = [],
  initialSelectedRatings = [],
  initialSelectedSpecialties = [],
  initialLocation = "",
  initialDistance = 0,
}) => {
  const [selectedAvailability, setSelectedAvailability] = useState(
    initialSelectedAvailability
  );
  const [selectedRatings, setSelectedRatings] = useState(
    initialSelectedRatings
  );
  const [selectedSpecialties, setSelectedSpecialties] = useState(
    initialSelectedSpecialties
  );
  const [location, setLocation] = useState(initialLocation);
  const [distance, setDistance] = useState(0);

  const [specialtyOptions, setSpecialtyOptions] = useState([]);

  useEffect(() => {
    if (
      JSON.stringify(selectedAvailability) !==
      JSON.stringify(initialSelectedAvailability)
    ) {
      setSelectedAvailability(initialSelectedAvailability);
    }
  }, [initialSelectedAvailability]);

  useEffect(() => {
    if (
      JSON.stringify(selectedRatings) !== JSON.stringify(initialSelectedRatings)
    ) {
      setSelectedRatings(initialSelectedRatings);
    }
  }, [initialSelectedRatings]);

  useEffect(() => {
    if (
      JSON.stringify(selectedSpecialties) !==
      JSON.stringify(initialSelectedSpecialties)
    ) {
      setSelectedSpecialties(initialSelectedSpecialties);
    }
  }, [initialSelectedSpecialties]);

  useEffect(() => {
    if (location !== initialLocation) {
      setLocation(initialLocation);
    }
  }, [initialLocation]);

  useEffect(() => {
    if (distance !== initialDistance) {
      setDistance(initialDistance);
    }
  }, [initialDistance]);

  useEffect(() => {
    // Extract unique specialties from clinics data
    const specialtiesSet = new Set();
    clinics.forEach((clinic) => {
      if (clinic.specialty) {
        specialtiesSet.add(clinic.specialty);
      }
    });
    setSpecialtyOptions(Array.from(specialtiesSet));
  }, []);

  const availabilityOptions = ["Today", "Tomorrow", "This Week"];

  const handleCheckboxChange = (option) => {
    setSelectedAvailability((prevSelected) => {
      if (prevSelected.includes(option)) {
        return prevSelected.filter((item) => item !== option);
      } else {
        return [...prevSelected, option];
      }
    });
  };

  const handleRatingChange = (rating) => {
    setSelectedRatings((prevSelected) => {
      if (prevSelected.includes(rating)) {
        return prevSelected.filter((item) => item !== rating);
      } else {
        return [...prevSelected, rating];
      }
    });
  };

  const handleSpecialtyChange = (specialty) => {
    setSelectedSpecialties((prevSelected) => {
      if (prevSelected.includes(specialty)) {
        return prevSelected.filter((item) => item !== specialty);
      } else {
        return [...prevSelected, specialty];
      }
    });
  };
  // const handleDistanceChange = (e) => {
  //   setDistance(Number(e.target.value));
  // };
  const handleApplyClick = () => {
    if (onApplyAvailability) {
      onApplyAvailability(selectedAvailability);
    }
    if (onApplyRating) {
      onApplyRating(selectedRatings);
    }
    if (onApplySpecialty) {
      onApplySpecialty(selectedSpecialties);
    }
    if (onApplyLocation) {
      onApplyLocation(location);
    }
    if (onApplyDistance) {
      onApplyDistance(distance);
    }
    if (onCloseSidebar) {
      onCloseSidebar();
    }
  };

  const handleResetClick = () => {
    setSelectedAvailability([]);
    setSelectedRatings([]);
    setSelectedSpecialties([]);
    setLocation("");
    setDistance(0);
    if (onReset) {
      onReset();
    }
  };

  return (
    <div className="w-full sm:w-72 bg-white rounded-xl p-5 shadow-md mb-6 sm:mb-0">
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-lg font-bold text-teal-700">Filters</h2>
        <div
          className="flex items-center gap-2 text-sm font-medium text-gray-600 cursor-pointer"
          onClick={handleResetClick}
        >
          <SlidersHorizontal size={18} />
          <span>Reset</span>
        </div>
      </div>

      {/* Location */}
      <div className="mb-5">
        <label className="text-sm font-semibold block mb-2">Location</label>
        <div className="relative">
          <MapPin
            className="absolute top-2.5 left-3 text-gray-400 cursor-pointer"
            size={16}
          />
          <input
            type="text"
            placeholder="Enter your location"
            className="w-full pl-10 pr-3 py-2 border rounded-md text-sm placeholder-gray-400"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>
      </div>

      {/* Distance */}
      {/* <div className="mb-5">
        <label className="text-sm font-semibold block mb-2">
          {" "}
          Selected: {distance} km
        </label>
        <input
          type="range"
          min="0"
          max="10"
          value={distance}
          onChange={handleDistanceChange}
          className="w-full accent-black cursor-pointer"
        />
        <div className="flex justify-between text-xs mt-1 text-gray-500 ">
          <span>0 km</span>
          <span>10 km</span>
        </div>
      </div> */}

      {/* Specialty */}
      <div className="mb-5">
        <label className="text-sm font-semibold block mb-2">Specialty</label>
        <div className="space-y-2 text-sm">
          {specialtyOptions.map((spec, index) => (
            <div key={index} className="flex items-center gap-2 ">
              <input
                type="checkbox"
                id={spec}
                className="cursor-pointer"
                checked={selectedSpecialties.includes(spec)}
                onChange={() => handleSpecialtyChange(spec)}
              />
              <label htmlFor={spec} className="cursor-pointer">
                {spec}
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Availability */}
      <div className="mb-5">
        <label className="text-sm font-semibold block mb-2">Availability</label>
        <div className="space-y-2 text-sm ">
          {availabilityOptions.map((option, index) => (
            <div key={index} className="flex items-center gap-2">
              <input
                type="checkbox"
                className="cursor-pointer"
                id={option}
                checked={selectedAvailability.includes(option)}
                onChange={() => handleCheckboxChange(option)}
              />
              <label htmlFor={option} className="cursor-pointer">
                {option}
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Rating */}
      <div className="mb-5">
        <label className="text-sm font-semibold block mb-2">Rating</label>
        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2 ">
            <input
              type="checkbox"
              id="4plus"
              className="cursor-pointer"
              checked={selectedRatings.includes(4)}
              onChange={() => handleRatingChange(4)}
            />
            <label htmlFor="4plus" className="cursor-pointer">
              4+ <span className="text-yellow-400 cursor-pointer">★</span>
            </label>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="3plus"
              className="cursor-pointer"
              checked={selectedRatings.includes(3)}
              onChange={() => handleRatingChange(3)}
            />
            <label htmlFor="3plus" className="cursor-pointer">
              3+ <span className="text-yellow-400 cursor-pointer">★</span>
            </label>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="2plus"
              className="cursor-pointer"
              checked={selectedRatings.includes(2)}
              onChange={() => handleRatingChange(2)}
            />
            <label htmlFor="2plus" className="cursor-pointer">
              2+ <span className="text-yellow-400 cursor-pointer">★</span>
            </label>
          </div>
        </div>
      </div>

      <button
        onClick={handleApplyClick}
        className="w-full bg-teal-600 hover:bg-teal-700 text-white py-2 rounded-md text-sm font-medium cursor-pointer"
      >
        Apply Filters
      </button>
    </div>
  );
};
Sidebar.propTypes = {
  onApplyAvailability: PropTypes.func,
  onReset: PropTypes.func,
  onApplyRating: PropTypes.func,
  onApplySpecialty: PropTypes.func,
  onApplyLocation: PropTypes.func,
  onApplyDistance: PropTypes.func,
  onCloseSidebar: PropTypes.func,
  initialSelectedAvailability: PropTypes.array,
  initialSelectedRatings: PropTypes.array,
  initialSelectedSpecialties: PropTypes.array,
  initialLocation: PropTypes.string,
  initialDistance: PropTypes.number,
};

export default Sidebar;

import { useState } from "react";
import { motion } from "framer-motion"; // Import Framer Motion
import { useMediaQuery } from "react-responsive"; // Import for screen size handling
import about2 from "../assets/about2.jpg";

const Def1 = () => {
  // Full text content
  const fullText = `In the heart of Midnapore, where tradition meets innovation, our
  online medical appointment platform acts as a bridge to better
  health and well-being. We set out with a simple yet profound
  mission: to make healthcare accessible, efficient, and personalized
  for every individual in our community. With a touch of empathy and a
  commitment to excellence, our platform streamlines the process of
  booking medical appointments, bringing trusted healthcare providers
  directly to your fingertips. Whether it’s a routine check-up
  or specialized care, we're here to ensure you spend less time
  waiting and more time living vibrantly. Together, let's walk
  hand-in-hand towards a healthier tomorrow.`;

  // State to toggle text expansion
  const [isExpanded, setIsExpanded] = useState(false);

  // Check if the screen size is small (mobile)
  const isMobile = useMediaQuery({ maxWidth: 768 }); // Adjust width as needed for mobile devices

  // Function to truncate text
  const truncateText = (text, wordLimit) => {
    const words = text.split(" ");
    return words.length > wordLimit
      ? words.slice(0, wordLimit).join(" ") + "..."
      : text;
  };

  return (
    <div className="flex flex-col items-center bg-gradient-to-br from-neutral-100 to-gray-200 px-4 md:px-8 lg:px-16">
      <div className="flex flex-col lg:flex-row w-full lg:h-96 mt-20 mb-20">
        {/* Left Content */}
        <motion.div
          className="flex flex-col justify-center p-4 md:p-8 w-full lg:w-1/2"
          initial={{ opacity: 0, x: -50 }} // Initial animation state
          animate={{ opacity: 1, x: 0 }} // Final animation state
          transition={{ duration: 0.8 }} // Animation duration
        >
          <h1 className="text-6xl md:text-4xl font-bold mb-4 text-gray-800 mt-4 md:mt-5">
            Our Vision
          </h1>

          {/* Conditionally render text behavior based on screen size */}
          <p className="text-base md:text-lg mt-2 md:mt-2 text-gray-700">
            {isMobile
              ? isExpanded
                ? fullText // Show full text on "Know More" click
                : truncateText(fullText, 30) // Show truncated text with a higher word limit
              : fullText}{" "}
            {/* On larger screens, always show full text */}
            {isMobile && !isExpanded && (
              <button
                onClick={() => setIsExpanded(true)}
                className="text-blue-500 hover:underline ml-2"
              >
                Know More...
              </button>
            )}
          </p>

          {isMobile && isExpanded && (
            <button
              onClick={() => setIsExpanded(false)}
              className="text-blue-500 hover:underline mt-4"
            >
              Show Less
            </button>
          )}
        </motion.div>

        {/* Right Image */}
        <motion.div
          className="w-full lg:w-1/2 bg-gray-200 opacity-95 border rounded-2xl border-black mt-6 lg:mt-0 lg:ml-4 flex justify-center items-center"
          initial={{ opacity: 0, scale: 0.8 }} // Initial scale
          animate={{ opacity: 1, scale: 1 }} // Final scale
          transition={{ duration: 0.8 }} // Animation duration
        >
          <img
            src={about2}
            alt="A doctor consulting with a patient"
            className="w-full h-60 md:h-80 lg:h-full object-cover rounded-2xl"
            loading="lazy"
          />
        </motion.div>
      </div>
    </div>
  );
};

export default Def1;

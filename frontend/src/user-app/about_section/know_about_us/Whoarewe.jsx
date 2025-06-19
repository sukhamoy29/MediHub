import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import mission from "../../assets/mission.jpg";

const Whoarewe = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const [isLargeScreen, setIsLargeScreen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const element = document.getElementById("whoarewe-section");
      if (element) {
        const rect = element.getBoundingClientRect();
        const inView = rect.top >= 0 && rect.top <= window.innerHeight;
        if (inView) setIsVisible(true);
      }
    };

    const handleResize = () => {
      setIsLargeScreen(window.innerWidth >= 1024);
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div
      id="whoarewe-section"
      className="bg-gradient-to-br from-neutral-100 to-gray-200 p-6 md:p-12 lg:p-16 font-sans text-gray-800"
    >
      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 lg:items-stretch mb-32 mt-20">
        {/* Image Block */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isVisible ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.6 }}
          className="order-1 lg:order-none flex"
        >
          <img
            src={mission}
            alt="Building a healthier world"
            className="w-full h-64 sm:h-80 md:h-96 lg:h-full object-cover rounded-lg shadow-lg"
          />
        </motion.div>

        {/* Text Block */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={isVisible ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.4 }}
          className="order-2 lg:order-none"
        >
          <p className="font-semibold text-lg mb-3">Our Mission</p>
          <h2 className="text-xl md:text-xl font-extrabold mb-1">
            Revolutionize Healthcare:
          </h2>
          <p className="text-lg mb-3">
            To transform the healthcare landscape by offering digital solutions
            that bridge the gap between patients and medical professionals.
          </p>

          <h3 className="text-xl font-bold mb-1">
            Reduce Waiting Times & Queue Delays:
          </h3>
          <p className="text-lg mb-3">
            Our primary goal is to minimize patient waiting times and eliminate
            unnecessary queues by providing an efficient, real-time appointment
            booking system that matches patients with healthcare providers.
          </p>

          {/* Conditionally show remaining content based on screen size or showMore toggle */}
          {(isLargeScreen || showMore) && (
            <>
              <h3 className="text-xl font-bold mb-1">
                Empower Patients and Enhance Accessibility:
              </h3>
              <p className="text-lg mb-3">
                Medihub strives to make healthcare more accessible by enabling
                patients to book consultations remotely, manage their health
                through digital tools, and access timely, personalized care.
              </p>

              <h3 className="text-xl font-bold mb-1">
                Improve Healthcare Efficiency and Outcomes:
              </h3>
              <p className="text-lg mb-3">
                We leverage cutting-edge technology to streamline the healthcare
                process, reduce costs, and improve outcomes for patients and
                providers.
              </p>
            </>
          )}

          {/* Show toggle button only on small screens */}
          {!isLargeScreen && (
            <button
              onClick={() => setShowMore(!showMore)}
              className="text-blue-600 underline mt-2 md:hidden"
            >
              {showMore ? "See Less..." : "Know More..."}
            </button>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Whoarewe;

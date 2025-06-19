import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
const Preprivacyfoot = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const section = document.getElementById("preprivacyfoot");
      if (section) {
        const rect = section.getBoundingClientRect();
        const isInView = rect.top >= 0 && rect.bottom <= window.innerHeight;
        if (isInView) {
          setIsVisible(true);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // const handleBookNowClick = () => {
  //   console.log("Book Now button clicked");
  // };

  return (
    <motion.div
      id="preprivacyfoot"
      className="bg-slate-100 text-gray-950 py-10"
      initial={{ opacity: 0, y: 50 }}
      animate={isVisible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 1.2, ease: "easeOut" }}
    >
      <div className="container mx-auto text-center">
        <h2 className="text-5xl font-bold mb-2 mt-5">
          Book Health, Skip Queues
        </h2>
        <p className="mb-4 text-lg mt-5">
          Experience ultimate convenience with quick and easy doctor
          appointments online. MediHub <br /> connects you with top specialists
          across India, eliminating the wait.
        </p>
        <Link
          to="/clinics"
          className="mt-14 border bg-transparent border-gray-800 hover:bg-slate-300 text-gray-900 font-semibold py-3 px-6 rounded-lg transition duration-300 text-lg"
        >
          Book Now
        </Link>
      </div>
    </motion.div>
  );
};

export default Preprivacyfoot;

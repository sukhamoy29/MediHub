import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import whoweare from "../../assets/whoweare.jpg";
import Whoarewe from "./Whoarewe";

const Ourimpact = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Detect screen size on load and resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768); // Tailwind 'md' breakpoint
    };

    checkMobile(); // Initial check
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const element = document.getElementById("ourimpact-section");
      if (element) {
        const rect = element.getBoundingClientRect();
        const inView = rect.top >= 0 && rect.top <= window.innerHeight;
        if (inView) setIsVisible(true);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      id="ourimpact-section"
      className="bg-gradient-to-br from-neutral-100 to-gray-200 p-6 md:p-12 lg:p-16 font-sans text-gray-800"
    >
      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 lg:items-stretch mb-20 mt-20">
        {/* Image Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isVisible ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8 }}
          className="order-1 lg:order-none flex"
        >
          <img
            src={whoweare}
            alt="Who We Are"
            className="w-full object-cover rounded-lg shadow-lg h-64 sm:h-80 md:h-96 lg:h-full"
          />
        </motion.div>

        {/* Text Content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={isVisible ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="order-2 lg:order-none"
        >
          <p className="font-semibold text-lg mb-2">Who We Are</p>
          <h2 className="text-xl md:text-xl font-bold mb-4">
            Your Trusted Healthcare Partner:
          </h2>
          <p className="text-lg mb-3">
            MediHub serves as a reliable bridge between patients and healthcare
            providers. Our platform is designed to simplify the process of
            finding and booking appointments with reputable hospitals and
            clinics, ensuring timely — hassle-free healthcare access.
          </p>

          <h3 className="text-2xl font-bold mb-2">Improving health equity:</h3>
          <p className="text-lg mb-3">
            We&apos;ve empowered patients to book appointments with local
            healthcare providers at their convenience. This 24/7 accessibility
            has reduced the need for in-person scheduling, aligning with the
            benefits observed in online reservation systems that offer
            round-the-clock booking capabilities.
          </p>

          {/* Only show extra content if large screen or "showMore" is true */}
          {(!isMobile || showMore) && (
            <>
              <h3 className="text-2xl font-bold mb-2">
                Committed to Excellence and Security:
              </h3>
              <p className="text-lg mb-6">
                Your privacy and safety are our utmost priority. MediHub
                implements stringent data protection measures and ensures
                transparency in all interactions, aiming to build a trustworthy
                and secure healthcare environment.
              </p>
            </>
          )}

          {/* Show button only on small screens */}
          {isMobile && (
            <button
              onClick={() => setShowMore(!showMore)}
              className="text-blue-600 underline mt-2 md:hidden"
            >
              {showMore ? "See Less" : "See More"}
            </button>
          )}
        </motion.div>
      </div>

      {/* Extra Section */}
      <Whoarewe />
    </div>
  );
};

export default Ourimpact;

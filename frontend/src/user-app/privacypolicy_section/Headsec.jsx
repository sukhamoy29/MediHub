import { motion } from "framer-motion";
import privacyimg from "../assets/privacyimg.jpg";
// import Navbar from "../Header_components/herosection/Navbar";

const Headersec = () => {
  return (
    <>
      <motion.div
        className="relative h-[70vh] bg-cover bg-center"
        style={{ backgroundImage: `url(${privacyimg})` }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      >
        {/* <Navbar /> */}
        {/* Dark overlay for better contrast */}
        <div className="absolute inset-0 bg-gray-900 bg-opacity-75"></div>

        {/* Content Container */}
        <motion.div
          className="relative z-10 flex flex-col items-center justify-center h-full px-6 md:px-20"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          {/* Heading and Subheading */}
          <div className="text-center md:text-left mb-8 max-w-2xl">
            <h1 className="text-5xl sm:text-4xl md:text-5xl font-semibold text-white mb-4 text-center">
              Privacy policy
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-white ">
              Secure your path to better health: search, schedule, and step into
            </p>
            <p className="text-center text-gray-100">
              care with unwavering privacy protection.
            </p>
          </div>
        </motion.div>
      </motion.div>
    </>
  );
};

export default Headersec;

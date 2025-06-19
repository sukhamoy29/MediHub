import { motion } from "framer-motion";
import service from "../assets/service.jpg";
// import Navbar from "../Header_components/herosection/Navbar";

const Headersec = () => {
  return (
    <>
      <motion.div
        className="relative h-[80vh] bg-cover bg-center"
        style={{ backgroundImage: `url(${service})` }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      >
        {/* <Navbar /> */}
        {/* Dark overlay for better contrast */}
        <div className="absolute inset-0 bg-gray-700 bg-opacity-85"></div>

        {/* Content Container */}
        <motion.div
          className="relative z-10 flex flex-col items-center justify-center h-full px-6 md:px-20"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          {/* Heading and Subheading */}
          <div className="text-center justify-center md:text-left mb-8 max-w-5xl">
            <h1 className="text-7xl sm:text-4xl md:text-7xl  text-white mb-4 text-center">
              Services
            </h1>
            <p className="text-center sm:text-lg md:text-2xl text-2xl text-white mt-6">
              Our services are designed to simplify your healthcare journey —
              effortlessly search for hospitals, book appointments instantly,
              and get quality care without the wait.
            </p>
          </div>
        </motion.div>
      </motion.div>
    </>
  );
};

export default Headersec;

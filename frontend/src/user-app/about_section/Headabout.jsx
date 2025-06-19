import { useEffect } from "react";
import { motion } from "framer-motion";
import aboutimg from "../assets/aboutimg.jpg";
// import Navbar from "../Header_components/herosection/Navbar";

const Headabout = () => {
  useEffect(() => {}, []);

  return (
    <>
      {/* <Navbar /> */}

      <motion.div
        className="flex flex-col md:flex-row h-screen w-full overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {/* Left side with the image */}
        <motion.div
          className="flex-1 bg-slate-400 flex items-center justify-center"
          initial={{ x: "-100%" }}
          animate={{ x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <img
            src={aboutimg}
            alt="A doctor consulting with a patient"
            className="w-full h-full object-cover"
            loading="lazy"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "../assets/fallback-image.jpg";
            }}
          />
        </motion.div>

        {/* Right side with text content */}
        <motion.div
          className="flex-1 bg-gradient-to-bl from-stone-900 to-gray-400 text-slate-100 p-6 md:p-10 flex flex-col justify-center"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-6xl md:text-6xl font-bold mb-4">About Us</h1>
          <p className="text-2xl md:text-lg leading-relaxed">
            MediHub: Your gateway to streamlined healthcare. Find, <br />
            book, and visit with ease—where care meets <br />
            convenience in Midnapore.
          </p>
        </motion.div>
      </motion.div>
    </>
  );
};

export default Headabout;

import { motion } from "framer-motion";
import bookingFeaturesData from "./data/component1";

const Component1 = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="bg-gray-100 py-12"
      >
        <h1 className="text-center text-5xl font-bold text-gray-800">
          Effortless Booking: Find & Visit Nearby Healthcare
        </h1>
        <p className="text-lg text-center mt-4">
          Transforming healthcare in India, our site helps you find nearby
          hospitals and clinics, book online, and visit offline, slashing wait
          times.
        </p>
      </motion.div>

      {/* Features Section */}
      <div className="container mx-auto px-4 mb-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {bookingFeaturesData.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="bg-gray-100 shadow-md rounded-lg p-6 text-center hover:shadow-xl transition"
            >
              <img
                src={feature.img}
                alt={feature.title}
                className="w-full h-48 object-contain rounded-t-lg"
              />
              <h3 className="text-xl font-bold text-gray-800 mt-4">
                {feature.title}
              </h3>
              <p className="text-gray-600 mt-2">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Component1;

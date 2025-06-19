import Contact from "../assets/contact.jpg";
// import Navbar from "../Header_components/herosection/Navbar";

const ContactSection = () => {
  return (
    <>
      {/* <Navbar /> */}
      <div
        className="relative h-[70vh] bg-cover bg-center"
        style={{
          backgroundImage: `url(${Contact})`,
        }}
      >
        {/* Dark overlay for better contrast */}
        <div className="absolute inset-0 bg-gray-900 bg-opacity-60"></div>

        {/* Content Container */}
        <div className="relative z-10 flex flex-col items-start justify-center h-full px-6 md:px-20">
          {/* Heading and Subheading */}
          <div className="text-center md:text-left mb-8 max-w-2xl">
            <h1 className="text-5xl sm:text-4xl md:text-5xl font-semibold text-white mb-4">
              Contact Us
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-white">
              Contact us for any queries, support, or to learn more about our
              services.........
            </p>
          </div>

          {/* Button */}
          {/* <div className="mb-8">
            <button className="bg-transparent border-2 border-white text-white font-semibold py-2 px-6 sm:py-3 sm:px-8 rounded-lg hover:bg-white hover:text-black transition duration-300">
              Get in touch
            </button> */}
          {/* </div> */}
        </div>
      </div>
    </>
  );
};

export default ContactSection;

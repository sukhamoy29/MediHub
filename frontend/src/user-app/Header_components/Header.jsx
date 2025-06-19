import { useEffect, useState } from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom

const Header = () => {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setAnimate(true);
    };

    window.addEventListener("scroll", handleScroll);
    setAnimate(true); // Trigger animation on mount

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <section
        className="bg-cover bg-center h-screen"
        style={{ backgroundImage: "url('/bodyimg.jpg')" }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="relative z-10 flex flex-col items-start justify-center h-full px-6 md:px-20">
          <div
            className={`transform transition-all duration-1000 ease-out ${
              animate ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
            }`}
          >
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-2">
              Book Your Doctor Visit
            </h1>
            <h2 className="text-5xl md:text-7xl font-bold text-white mb-6">
              Instantly
            </h2>
            <p className="text-lg md:text-xl text-white mb-8 text-left">
              Experience healthcare on your schedule. Connect with top doctors
              in
              <br />
              Midnapore, West Bengal, and book your visit instantly.
            </p>

            <Link
              to="/clinics"
              className="border bg-transparent hover:bg-slate-900 text-white font-semibold py-4 px-10 rounded-lg transition duration-300 text-lg"
            >
              Book Appointments
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default Header;

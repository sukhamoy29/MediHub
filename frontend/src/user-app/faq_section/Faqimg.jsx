import { useEffect, useState } from "react";
import faq from "../assets/faq.jpg";

const Faqimg = () => {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      if (scrollPosition > 50) {
        setAnimate(true);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <section
        className="bg-cover w-screen h-screen bg-center "
        style={{ backgroundImage: `url(${faq})` }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="relative z-10 flex flex-col items-start justify-center h-full px-6 md:px-20">
          <div
            className={`transform transition-all duration-500 ease-in ${
              animate ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
            }`}
          >
            <h1 className="text-5xl md:text-7xl font-bold text-gray-200 mb-2">
              Frequently Asked <br /> Questions
            </h1>
          </div>
        </div>
      </section>
    </>
  );
};

export default Faqimg;

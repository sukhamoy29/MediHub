import { useState, useEffect, useMemo } from "react";
import { testimonials } from "../data/testimonials"; // ✅ importing the data

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const currentTestimonial = useMemo(
    () => testimonials[currentIndex],
    [currentIndex]
  );

  const handlePrevClick = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length
    );
  };

  const handleNextClick = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-slate-800 text-white py-8 px-4 sm:px-6 md:px-12 lg:px-20">
      {/* Title */}
      <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-8 text-center leading-tight mt-10">
        Testimonials from Satisfied Patients
      </h2>

      {/* Testimonial Content */}
      <div className="border-l-4 border-gray-600 pl-4 sm:pl-6 mb-8 max-w-3xl mx-auto">
        <p className="text-sm sm:text-base md:text-lg lg:text-xl italic leading-relaxed">
          {currentTestimonial.text}
        </p>
        <p className="mt-4 text-right text-xs sm:text-sm md:text-base font-semibold">
          {`- ${currentTestimonial.author}`}
        </p>
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-center gap-4 md:gap-6">
        <button
          className="bg-gray-700 hover:bg-gray-600 transition py-2 px-4 sm:py-2 sm:px-5 md:py-3 md:px-6 rounded-full text-sm sm:text-base"
          onClick={handlePrevClick}
        >
          &lt;
        </button>
        <button
          className="bg-gray-700 hover:bg-gray-600 transition py-2 px-4 sm:py-2 sm:px-5 md:py-3 md:px-6 rounded-full text-sm sm:text-base"
          onClick={handleNextClick}
        >
          &gt;
        </button>
      </div>

      {/* Pagination Dots */}
      <div className="flex justify-center items-center mt-6 gap-1 sm:gap-2 mb-10">
        {testimonials.map((_, index) => (
          <span
            key={index}
            className={`h-2 w-2 sm:h-3 sm:w-3 rounded-full ${
              currentIndex === index ? "bg-gray-400" : "bg-gray-700"
            }`}
          ></span>
        ))}
      </div>
    </div>
  );
};

export default Testimonials;

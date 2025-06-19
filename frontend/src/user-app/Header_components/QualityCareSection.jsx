import { Suspense } from "react";
import testimonial1 from "../assets/testimonial1.jpg";
import testimonials2 from "../assets/testimonials2.jpg";
import testimonials3 from "../assets/testimonials3.jpg";
import { Link } from "react-router-dom";
const cardData = [
  {
    image: testimonial1,
    alt: "Doctor Consultation",
    title: "Instant Doctor Consultations",
    description:
      "Connect with top doctors in minutes for immediate health advice and guidance, right from your device.",
    buttonText: "More info",
  },
  {
    image: testimonials2,
    alt: "Prescription Management",
    title: "Seamless Prescription Management",
    description:
      "Easily access and manage prescriptions online, ensuring you never miss a vital medication refill.",
    buttonText: "More info",
  },
  {
    image: testimonials3,
    alt: "Health Support",
    title: "24/7 Health Support Access",
    description:
      "Get round-the-clock assistance from medical professionals to address any health concerns anytime.",
    buttonText: "More info",
  },
];

const QualityCareSection = () => {
  return (
    <div className="bg-gray-100 py-12 lg:mt-10 md:mt-6 sm:mt-4">
      <div className="text-left mb-8 mx-4">
        <h2 className="text-5xl font-bsemibold text-gray-800">
          Easy Access to Quality Care
        </h2>
      </div>
      <div className="max-w-8xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-4">
        {cardData.map((card, index) => (
          <div
            key={index}
            className="relative bg-white shadow-lg rounded-3xl overflow-hidden h-[500px] sm:h-[350px] lg:h-[500px]"
          >
            <Suspense fallback={<div>Loading image...</div>}>
              <img
                src={card.image}
                alt={card.alt}
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
              />
            </Suspense>

            <div className="absolute bottom-0 left-0 w-fit h-[50%] bg-black bg-opacity-85 text-white px-2 py-1 flex flex-col justify-center">
              <h3 className="text-2xl sm:text-3xl">{card.title}</h3>
              <p className="text-xs sm:text-sm mt-4">{card.description}</p>
              <button className="border bg-transparent hover:bg-slate-900 text-white font-semibold py-3 px-2 mt-7 w-48 rounded-xl transition duration-300 text-lg">
                <Link to="/service">Know More..</Link>
              </button>
            </div>
          </div>
        ))}
      </div>
      {/* <div className="bg-gray-100 py-12 lg:mt-5 md:mt-4 justify-center sm:mt-2 ">
        <div className="text-center mx-4 text-5xl mb-8">
          Seamless Appointments at Your Fingertips
        </div>
        <div className="  text-center text-2xl italic ">
          In the heart of Midnapore, where tradition meets innovation, our
          online medical appointment platform acts as a bridge to better health
          and well-being. We set out with a simple yet profound mission: to make
          healthcare accessible, efficient, and personalized for every
          individual in our community. With a touch of empathy and a commitment
          to excellence, our platform streamlines the process of booking medical
          appointments, bringing trusted healthcare providers directly to your
          fingertips. Whether it&apos;s a routine check-up or specialized care,
          we&apos;re here to ensure you spend less time waiting and more time
          living vibrantly. Together, let&apos;s walk hand-in-hand towards a
          healthier tomorrow.
        </div>
      </div> */}
    </div>
  );
};

export default QualityCareSection;

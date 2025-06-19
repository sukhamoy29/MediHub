import image1 from "../../../assets/header.jpg";
import image2 from "../../../assets/header.jpg";
import image3 from "../../../assets/header.jpg";

const AboutSection = ({ clinic }) => (
  <div className="mt-4 space-y-6">
    <div className="text-base sm:text-lg text-gray-800 leading-relaxed">
      {clinic?.description}
    </div>

    {/* Responsive image grid: 1 per row on mobile, 2 on small screens, 3 on large */}
    <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {[image1, image2, image3].map((img, idx) => (
        <img
          key={idx}
          src={img}
          alt={`Clinic interior view ${idx + 1}`}
          className="w-full h-44 sm:h-52 md:h-60 object-cover rounded-xl shadow-md transition-transform hover:scale-105 duration-300"
        />
      ))}
    </div>
  </div>
);

export default AboutSection;

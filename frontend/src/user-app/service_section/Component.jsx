import PropTypes from "prop-types";
import featureCardsData from "./data/componentdata";

const FeatureCard = ({ image, title, description }) => (
  <div className="relative bg-gray-200 shadow-lg rounded-lg overflow-hidden group">
    <img
      src={image}
      alt={title}
      className="w-full h-56 object-cover transition-transform duration-300 group-hover:scale-110"
    />
    <div className="absolute inset-0 bg-black bg-opacity-80 flex flex-col justify-center items-center text-center opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-300">
      <h3 className="text-white text-2xl font-bold">{title}</h3>
      <p className="text-white text-sm text-balance mt-2 px-4">{description}</p>
    </div>
  </div>
);

const HealthcarePage = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="bg-gray-100 mt-8 py-12 ml-4 mr-4">
        <h1 className="text-center text-5xl font-bold text-gray-800">
          Swiftly Schedule Local Healthcare!
        </h1>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featureCardsData.map((card, index) => (
            <FeatureCard
              key={index}
              image={card.image}
              title={card.title}
              description={card.description}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

FeatureCard.propTypes = {
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

export default HealthcarePage;

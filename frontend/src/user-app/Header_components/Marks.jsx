import FeatureCard from "./FeatureCard";
import features from "../data/featuresData";

const Marks = () => {
  return (
    <div className="flex flex-col items-center px-4 py-12 sm:py-16 bg-gray-50">
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-10 text-center">
        Midnapore&apos;s Trusted Health Connection
      </h1>

      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 w-full max-w-6xl">
        {features.map((feature, index) => (
          <FeatureCard
            key={index}
            icon={feature.icon}
            title={feature.title}
            description={feature.description}
          />
        ))}
      </div>
    </div>
  );
};

export default Marks;

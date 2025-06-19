// eslint-disable-next-line no-unused-vars
import React from "react";
import PropTypes from "prop-types";

const FeatureCard = ({ icon, title, description }) => {
  return (
    <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow-md text-center">
      <span className="text-4xl text-orange-500 mb-4">{icon}</span>
      <h2 className="text-lg font-semibold mb-2">{title}</h2>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

FeatureCard.propTypes = {
  icon: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

export default FeatureCard;

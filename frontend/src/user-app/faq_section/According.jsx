import PropTypes from "prop-types";

const According = ({ data, onClick, isOpen }) => {
  return (
    <div className="border-b border-gray-300 overflow-hidden">
      <button
        onClick={onClick}
        aria-expanded={isOpen}
        className="flex justify-between w-full p-4 text-left bg-inherit focus:outline-none "
      >
        <span className="font-medium text-base md:text-lg lg:text-xl">
          {data.question}
        </span>
        <span className="font-bold text-base md:text-lg lg:text-xl">
          {isOpen ? "-" : "+"}
        </span>
      </button>
      {isOpen && (
        <div className="p-2 bg-transparent text-lg md:text-base lg:text-md">
          <div>{data.answer}</div>
        </div>
      )}
    </div>
  );
};

According.propTypes = {
  data: PropTypes.shape({
    question: PropTypes.string.isRequired,
    answer: PropTypes.string.isRequired,
  }).isRequired,
  onClick: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
};

export default According;

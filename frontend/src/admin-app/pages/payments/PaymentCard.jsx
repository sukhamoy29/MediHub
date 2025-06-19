import PropTypes from "prop-types";

const PaymentCard = ({ title, amount, subtitle, icon }) => {
  const formattedAmount =
    typeof amount === "number"
      ? amount.toFixed(2)
      : parseFloat(amount).toFixed(2);

  return (
    <div className="bg-white p-4 rounded shadow flex flex-col md:flex-row items-center gap-4">
      <span className="text-2xl">{icon}</span>
      <div className="text-center md:text-left">
        <p className="text-gray-500">{title}</p>
        <h2 className="text-2xl font-bold">${formattedAmount}</h2>
        <p className="text-gray-400 text-sm">{subtitle}</p>
      </div>
    </div>
  );
};

PaymentCard.propTypes = {
  title: PropTypes.string.isRequired,
  amount: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  subtitle: PropTypes.string,
  icon: PropTypes.string,
};

export default PaymentCard;

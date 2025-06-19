import { useState } from "react";
import { FaStar } from "react-icons/fa";
import PropTypes from "prop-types";

const FeedbackForm = ({ appointmentId, clinicName, doctorName, onSubmit }) => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(null);
  const [comment, setComment] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (rating === 0) return alert("Please select a rating.");
    onSubmit(appointmentId, rating, comment);
  };

  return (
    <form
      onSubmit={handleSubmit}
      //   className="bg-white border border-gray-300 rounded-lg p-6 shadow-lg"
    >
      <h2 className="text-2xl font-bold mb-2">Share Your Feedback</h2>
      <p className="text-gray-600 mb-4">
        Tell us about your experience at <strong>{clinicName}</strong> with{" "}
        <strong>{doctorName}</strong>
      </p>

      <div className="mb-4">
        <label className="block text-lg font-medium mb-2">
          Rate your experience
        </label>
        <div className="flex items-center">
          {[...Array(5)].map((_, i) => {
            const ratingValue = i + 1;
            return (
              <label key={i}>
                <input
                  type="radio"
                  name="rating"
                  className="hidden"
                  value={ratingValue}
                  onClick={() => setRating(ratingValue)}
                />
                <FaStar
                  className="cursor-pointer text-3xl transition-colors"
                  color={
                    ratingValue <= (hover || rating) ? "#facc15" : "#e5e7eb"
                  }
                  onMouseEnter={() => setHover(ratingValue)}
                  onMouseLeave={() => setHover(null)}
                />
              </label>
            );
          })}
          <span className="ml-4 text-gray-500">
            {rating > 0
              ? `${rating} Star${rating > 1 ? "s" : ""}`
              : "Select a rating"}
          </span>
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-lg font-medium mb-2">
          Share your experience (optional)
        </label>
        <textarea
          className="w-full border border-gray-300 rounded-md p-3"
          rows={4}
          placeholder="Tell us about your experience with the clinic and doctor..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        ></textarea>
      </div>

      <button
        type="submit"
        className="bg-emerald-600 text-white px-6 py-2 rounded hover:bg-emerald-700 cursor-pointer"
      >
        Submit Feedback
      </button>
    </form>
  );
};
FeedbackForm.propTypes = {
  appointmentId: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    .isRequired,
  clinicName: PropTypes.string.isRequired,
  doctorName: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default FeedbackForm;

import { reviews } from "../../../data/reviews";
import { useState } from "react";

const ReviewsSection = () => {
  const [showAll, setShowAll] = useState(false);

  const displayedReviews = showAll ? reviews : reviews.slice(0, 4);

  return (
    <div className="space-y-6 mt-6">
      {displayedReviews.map((review, idx) => (
        <div key={idx} className="border-b pb-4">
          <div className="flex items-start space-x-4">
            {/* <div className="w-10 h-10 bg-gray-200 rounded-full" /> */}
            <div>
              <h4 className="font-semibold text-gray-900">{review.name}</h4>
              <div className="flex items-center text-sm text-gray-500 space-x-2">
                <div className="text-yellow-500">
                  {"★".repeat(review.rating)}
                  {"☆".repeat(5 - review.rating)}
                </div>
                <span>{review.time}</span>
              </div>
              <p className="text-sm text-gray-800 mt-2">{review.comment}</p>
            </div>
          </div>
        </div>
      ))}
      {reviews.length > 4 && (
        <button
          className="text-blue-600 hover:underline cursor-pointer"
          onClick={() => setShowAll(!showAll)}
        >
          {showAll ? "see less" : "see more"}
        </button>
      )}
    </div>
  );
};

export default ReviewsSection;

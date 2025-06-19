import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";

const GeneralFeedbackForm = () => {
  const { user, isLoggedIn } = useContext(AuthContext);
  const [rating, setRating] = useState(0);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [feedbackType, setFeedbackType] = useState("");
  const [feedback, setFeedback] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isLoggedIn) {
      toast.error("Please log in to submit feedback");
      return;
    }

    if (!rating || !feedbackType || !feedback) {
      toast.error("Please fill in all required fields");
      return;
    }

    const feedbackData = {
      name: name || user?.name,
      email: email || user?.email,
      feedback_type: feedbackType,
      rating,
      feedback,
      user_id: user?.id,
    };

    try {
      const response = await fetch("http://localhost:8000/site-feedback/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(feedbackData),
      });

      if (response.ok) {
        toast.success("Thank you for your feedback!");
        setRating(0);
        setFeedbackType("");
        setFeedback("");
        setName("");
        setEmail("");
      } else {
        toast.error("Failed to submit feedback");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong!");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-100 to-gray-200 flex items-center justify-center px-6 py-12">
      <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
        {/* Left Section: Text Info */}
        <div className="space-y-4">
          <h1 className="text-6xl font-bold">We Value Your Feedback</h1>
          <p className="text-gray-600 text-sm">
            Your opinion matters to us. Help us make Medihub better by sharing
            your honest thoughts. We&apos;re committed to continuous improvement
            and truly value your input.
          </p>
        </div>

        {/* Right Section: Form */}
        <div className="bg-white border border-gray-200 shadow-md rounded-xl p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Name */}
              <div className="flex flex-col-reverse">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={user?.name || "Enter your name"}
                  className="border border-gray-300 rounded-md p-2 w-full text-sm"
                />
                <label className="text-sm text-gray-800 mb-1">Name</label>
              </div>

              {/* Email */}
              <div className="flex flex-col-reverse">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={user?.email || "Enter your email"}
                  className="border border-gray-300 rounded-md p-2 w-full text-sm"
                />
                <label className="text-sm text-gray-800 mb-1">Email</label>
              </div>
            </div>

            <div>
              <label className="block mb-1 text-sm font-medium">
                Feedback Type*
              </label>
              <select
                value={feedbackType}
                onChange={(e) => setFeedbackType(e.target.value)}
                className="border border-gray-300 rounded-md p-2 w-full text-sm"
                required
              >
                <option value="">Select Feedback Type</option>
                <option value="General Feedback">General Feedback</option>
                <option value="Bug Report">Bug Report</option>
                <option value="Feature Request">Feature Request</option>
              </select>
            </div>

            <div>
              <label className="block mb-1 text-sm font-medium">
                Rate your overall experience with MediHub*
              </label>
              <div className="flex items-center gap-1 text-yellow-400 text-2xl">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span
                    key={star}
                    onClick={() => setRating(star)}
                    className={`cursor-pointer ${
                      star <= rating ? "text-yellow-400" : "text-gray-300"
                    }`}
                  >
                    ★
                  </span>
                ))}
                <span className="ml-2 text-sm text-gray-500">
                  {rating
                    ? `${rating} star${rating > 1 ? "s" : ""}`
                    : "Select a rating"}
                </span>
              </div>
            </div>

            <div>
              <label className="block mb-1 text-sm font-medium">
                Your Feedback*
              </label>
              <textarea
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                rows="5"
                placeholder="Please share your thoughts, suggestions, or experiences with MediHub..."
                className="w-full p-2 border border-gray-300 rounded-md text-sm"
                required
              ></textarea>
            </div>

            <button
              type="submit"
              className="bg-emerald-600 hover:bg-emerald-700 text-white py-2 px-6 rounded-md w-full text-sm font-medium"
            >
              Submit Feedback
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default GeneralFeedbackForm;

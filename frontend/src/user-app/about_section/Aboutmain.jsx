import Headabout from "./Headabout";
import Def1 from "./Def1";

import Ourimpact from "./know_about_us/Ourimpact";
import FeedbackForm from "../components/FeedbackForm";
// import Navbar from "../Header_components/herosection/Navbar";
// import Footer from "../Header_components/herosection/Footer";

import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";

const Aboutmain = () => {
  const { isLoggedIn } = useContext(AuthContext);

  const handleFeedbackClick = () => {
    if (!isLoggedIn) {
      toast.error("Please log in to provide feedback.");
      return;
    }
    // Proceed with feedback logic if logged in
  };

  return (
    <div id="about" className="bg-gradient-to-br from-neutral-100 to-gray-200">
      {/* <Navbar /> */}
      <Headabout />
      <Def1 />
      <Ourimpact />
      <div onClick={handleFeedbackClick}>
        <FeedbackForm />
      </div>
      {/* <Footer /> */}
    </div>
  );
};

export default Aboutmain;

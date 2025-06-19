// import Footer from "../Header_components/herosection/Footer";
import Preprivacyfoot from "./Preprivacyfoot";
import Headsec from "./Headsec";
import Privacycontent from "./Privacycontent";
// import Navbar from "../Header_components/herosection/Navbar";

const Privacymain = () => {
  return (
    <div className="bg-zinc-900">
      {/* <Navbar /> */}
      <Headsec />
      <Privacycontent />
      <Preprivacyfoot />
      {/* <Footer /> */}
    </div>
  );
};

export default Privacymain;

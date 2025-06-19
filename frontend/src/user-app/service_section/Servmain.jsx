// import Footer from "../Header_components/herosection/Footer";
import Headerservice from "./Headerservice";
import Preservfoot from "./Preservfoot";
import Component from "./Component";
import Component1 from "./Component1";
// import Navbar from "../Header_components/herosection/Navbar";

const Servmain = () => {
  return (
    <div className="bg-gray-100">
      {/* <Navbar /> */}
      <Headerservice />
      <Component />
      <Component1 />
      <Preservfoot />
      {/* <Footer /> */}
    </div>
  );
};

export default Servmain;

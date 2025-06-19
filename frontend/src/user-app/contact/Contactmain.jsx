// import Footer from "../Header_components/herosection/Footer";
import Prevfaqfoot from "../faq_section/Prevfaqfoot";
import Piccontact from "./Piccontact";
import Fromcontact from "./Fromcontact";
// import Navbar from "../Header_components/herosection/Navbar";

const Contactmain = () => {
  return (
    <div className="bg-slate-100">
      {/* <Navbar /> */}
      <Piccontact />
      <Fromcontact />
      <div className=" mt-20">
        <Prevfaqfoot />
      </div>

      {/* <Footer /> */}
    </div>
  );
};

export default Contactmain;

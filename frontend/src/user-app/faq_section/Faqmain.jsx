import Faqimg from "./Faqimg";
import Faq from "./Faq";
import Prevfaqfoot from "./Prevfaqfoot";

const Faqmain = () => {
  return (
    <div id="faq" className="bg-slate-100">
      <Faqimg />
      <Faq />
      <Prevfaqfoot />
    </div>
  );
};

export default Faqmain;

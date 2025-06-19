import { useState } from "react";
import According from "./According";
import faqData from "../data/faqData"; // External file

const Faq = () => {
  const [showSelected, setShowSelected] = useState(null);

  const showAnswer = (index) => {
    setShowSelected(index === showSelected ? null : index);
  };

  return (
    <>
      <div className="h-screen p-10 bg-slate-200 text-gray-900 border border-white rounded-2xl mt-10 md:mt-10 sm:mt-8  m-2">
        {/* <div className="space-y-2"> */}
        <div className="space-y-2">
          {faqData.map((d, index) => (
            <According
              key={d.id}
              data={d}
              onClick={() => showAnswer(index)}
              isOpen={showSelected === index}
            />
          ))}
        </div>
      </div>
      {/* </div> */}
    </>
  );
};

export default Faq;

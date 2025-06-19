import React from "react";

const DoctorsSection = ({ clinic }) => {
  const doctors = clinic?.doctors || [];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
      {doctors.map((doc, index) => (
        <div
          key={index}
          className="bg-white border rounded-xl shadow-md p-4 hover:shadow-lg transition-shadow duration-300"
        >
          <div className="flex items-center space-x-4">
            <div className="w-14 h-14 bg-slate-100 rounded-full flex items-center justify-center text-2xl">
              👨‍⚕️
            </div>
            <div className="flex flex-col">
              <p className="font-semibold text-sm md:text-base">{doc.name}</p>
              <p className="text-xs text-gray-500">{doc.specialty}</p>
              <p className="text-sm text-gray-700">
                {doc.experience} years of experience
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DoctorsSection;

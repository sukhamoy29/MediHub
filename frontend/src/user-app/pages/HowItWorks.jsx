import { Search, CalendarCheck, UserCheck, MapPin } from "lucide-react";

const steps = [
  {
    icon: <Search className="w-8 h-8 text-teal-600" />,
    title: "Find Nearby Clinics",
    description:
      "Search for clinics based on location, specialty, and availability.",
  },
  {
    icon: <CalendarCheck className="w-8 h-8 text-teal-600" />,
    title: "Book Appointment",
    description:
      "Select a convenient time slot and book your appointment instantly.",
  },
  {
    icon: <UserCheck className="w-8 h-8 text-teal-600" />,
    title: "Visit the Clinic",
    description:
      "Get confirmation and visit the clinic at your scheduled time.",
  },
  {
    icon: <MapPin className="w-8 h-8 text-teal-600" />,
    title: "Rate Your Experience",
    description: "Share your feedback to help others find quality healthcare.",
  },
];

const HowItWorks = () => {
  return (
    <section className="py-16 px-4 bg-gray-50 ">
      <div className="max-w-7xl mx-auto text-center mb-4">
        <h2 className="text-5xl sm:text-3xl font-bold text-gray-900 mb-4">
          How It Works
        </h2>
        <p className="text-gray-500 text-base sm:text-lg mb-10">
          MediHub makes booking medical appointments simple and convenient.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center px-4"
            >
              <div className="bg-teal-50 p-4 rounded-full mb-4">
                {step.icon}
              </div>
              <h3 className="font-semibold text-lg text-gray-800 mb-2">
                {step.title}
              </h3>
              <p className="text-sm text-gray-500">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;

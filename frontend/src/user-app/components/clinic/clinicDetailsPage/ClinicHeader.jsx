import { MapPin, Phone, Star, IndianRupee } from "lucide-react";
import clinicBanner from "../../../assets/header.jpg"; // update this path as needed

const ClinicHeader = ({ clinic }) => {
  return (
    <div className="rounded-lg  border-slate-50 shadow-md bg-white overflow-hidden">
      {/* Banner Section */}
      <div className="relative h-48 sm:h-56 md:h-64">
        <img
          src={clinicBanner}
          alt="Clinic Banner"
          className="object-cover w-full h-full"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
        <div className="absolute bottom-4 left-4 z-10 text-white space-y-1">
          <span className="bg-emerald-600 text-white text-xs px-2 py-1 rounded-full">
            {clinic.specialty}
          </span>
          <h2 className="text-lg sm:text-xl font-semibold">{clinic.name}</h2>
          <div className="flex items-center gap-1 text-sm sm:text-base">
            <Star size={14} className="text-yellow-400" />
            <span>{clinic.rating}</span>
            <span className="text-gray-300">({clinic.reviews} reviews)</span>
          </div>
        </div>
      </div>

      {/* Contact Info */}
      <div className="flex flex-col sm:flex-row sm:justify-between gap-3 text-sm text-gray-700 px-4 py-3 border-t">
        <div className="flex items-center gap-2">
          <MapPin size={16} className="text-emerald-600" />
          <span className="leading-snug">{clinic.address}</span>
        </div>
        <div className="flex items-center gap-2">
          <Phone size={16} className="text-emerald-600" />
          <span className="leading-snug">{clinic.phone}</span>
        </div>
        <div className="flex items-center gap-2">
          <IndianRupee size={16} className="text-emerald-600" />
          <p className="text-teal-700 font-medium ">Fees:</p>
          <span className="leading-snug">{clinic.fees}</span>
        </div>
      </div>
    </div>
  );
};

export default ClinicHeader;

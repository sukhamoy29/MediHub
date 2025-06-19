import { Menu } from "lucide-react";
import PropTypes from "prop-types";

const Navbar = ({ toggleSidebar }) => {
  return (
    <nav className="bg-white  shadow-md p-4 flex items-center justify-between border-b-2 border-slate-200">
      <div className="flex items-center">
        <button onClick={toggleSidebar} className="md:hidden">
          <Menu size={24} />
        </button>
        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-cyan-500 bg-clip-text text-transparent ml-2">
          MediDash
        </h1>
      </div>
      {/* <div className="flex items-center space-x-4 mr-10  ">
        <button>
          <User size={24} />
        </button>
      </div> */}
    </nav>
  );
};

Navbar.propTypes = {
  toggleSidebar: PropTypes.func.isRequired,
};

export default Navbar;

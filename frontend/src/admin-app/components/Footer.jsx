const Footer = () => {
  return (
    <footer className="bg-white shadow-md p-4 border-t-2 border-slate-200 text-center">
      <p className="text-sm text-gray-500">
        &copy; {new Date().getFullYear()} MediDash. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;

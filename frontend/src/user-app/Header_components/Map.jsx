// import Footer from "./herosection/Footer";
// import MapComponent from "./MapComponent";
import Prevfoot from "./Prevfoot";

const MediHubPage = () => {
  return (
    <>
      <div className="flex flex-col items-cente bg-gradient-to-br from-neutral-400 to-gray-800">
        {/* Map Section */}
        <div className="flex flex-row w-full h-96">
          <div className="flex flex-col justify-center p-8 w-1/2 ">
            <h1 className="text-4xl font-bold">Find Nearby Clinics Quickly</h1>
            <p className="text-lg mt-2">Midnapore, West Bengal, India</p>
          </div>
          <div className="w-1/2 bg-gray-200 opacity-55 border rounded-2xl border-black border-b mb-3 mt-2 mr-4 justify-center items-center text-center gap-10">
            {/* <MapComponent /> */}
            Map section
          </div>
        </div>
      </div>
      <Prevfoot></Prevfoot>
      {/* <Footer /> */}
    </>
  );
};

export default MediHubPage;

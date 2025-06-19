import { lazy, Suspense } from "react";
const Header = lazy(() => import("../Header"));
const QualityCareSection = lazy(() => import("../QualityCareSection"));
const Conts = lazy(() => import("../Conts"));
const Marks = lazy(() => import("../Marks"));
const Testimonial = lazy(() => import("../Testimonial"));
// const Map = lazy(() => import("../Map"));
import HowItWorks from "../../pages/HowItWorks";
import FeaturedClinics from "../../pages/FeaturedClinics";
import JoinSection from "../JoinSection";

const Heromain = () => {
  return (
    <>
      <div className="bg-gray-100">
        <Suspense fallback={<div>Loading...</div>}>
          <Header />
          <HowItWorks />
          <FeaturedClinics />
          <QualityCareSection />
          <Conts />
          <Marks />
          <Testimonial />
          {/* <Map /> */}
          <JoinSection />
        </Suspense>
      </div>
    </>
  );
};

export default Heromain;

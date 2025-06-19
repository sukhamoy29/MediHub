import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContextProvider";
import ProtectedRoute from "./context/ProtectedRoute";

import Faqmain from "./faq_section/Faqmain";
import Aboutmain from "./about_section/Aboutmain";
import Contactmain from "./contact/Contactmain";
import Servmain from "./service_section/Servmain";
import Privacymain from "./privacypolicy_section/Privacymain";
import Heromain from "./Header_components/herosection/Heromain";
import Navbar from "./Header_components/herosection/Navbar";
import Footer from "./Header_components/herosection/Footer";
import ScrollToTop from "./ScrollToTop";
import LoginPage from "./Authentication/LoginPage";
// import BookingPage from "./Authentication/BookingPage";
import SignUp from "./Authentication/SignUp";
import ForgotPassword from "./Authentication/ForgotPasswordFlow";
import Dashboard from "./afterlogin_dasboard/Dashboard";
import FeedbackForm from "./components/FeedbackForm";
import DProfileSection from "./afterlogin_dasboard/dcomponents/DProfileSection";
import DAppointmentHistory from "./afterlogin_dasboard/dappointmenthistory/DAppointmentHistory";
import ClinicPage from "./pages/ClinicPage";
import ClinicDetailsPage from "./pages/ClinicDetailsPage";
import PaymentPage from "./components/clinic/paymentSection/PaymentPage";
import AppointmentConfirmed from "./components/clinic/paymentsection/AppointmentConfirmed";
import Invoice from "./components/clinic/paymentsection/Invoice";
import BookAppointment from "./components/clinic/paymentsection/BookAppointment";

const AppContent = () => {
  const location = useLocation();
  const isDashboard = location.pathname.startsWith("/dashboard");

  return (
    <AuthProvider>
      <div className="flex flex-col min-h-screen select-none cursor-default">
        {!isDashboard && <Navbar />}
        <main className="flex-grow">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Heromain />} />
            <Route path="/about" element={<Aboutmain />} />
            <Route path="/contact" element={<Contactmain />} />
            <Route path="/service" element={<Servmain />} />
            <Route path="/privacy" element={<Privacymain />} />
            <Route path="/faq" element={<Faqmain />} />
            <Route path="/clinics" element={<ClinicPage />} />
            <Route path="/clinic-details/:id" element={<ClinicDetailsPage />} />

            {/* Auth Routes */}
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/forgotpassword" element={<ForgotPassword />} />

            {/* Protected Patient Routes */}
            <Route element={<ProtectedRoute allowedRoles={["patient"]} />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/feedback" element={<FeedbackForm />} />
              <Route path="/DProfileSection" element={<DProfileSection />} />
              <Route
                path="/DAppointmentHistory"
                element={<DAppointmentHistory />}
              />
              <Route path="/bookappointment" element={<BookAppointment />} />
              <Route path="/payment" element={<PaymentPage />} />
              <Route
                path="/appointment-confirmed"
                element={<AppointmentConfirmed />}
              />
              <Route path="/invoice" element={<Invoice />} />
            </Route>

            {/* Redirects */}
            <Route
              path="/services"
              element={<Navigate to="/service" replace />}
            />
          </Routes>
        </main>
        {!isDashboard && <Footer />}
      </div>
    </AuthProvider>
  );
};

function UserAppContainer() {
  return (
    <>
      <ScrollToTop />
      <AppContent />
    </>
  );
}

export default UserAppContainer;

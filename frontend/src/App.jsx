import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserAppContainer from "./user-app/UserAppContainer";
import AdminAppContainer from "./admin-app/AdminAppContainer";
import { AuthProvider } from "./user-app/context/AuthContextProvider";
import ProtectedRoute from "./user-app/context/ProtectedRoute";
import SignUp from "./user-app/Authentication/SignUp";
import AuthPage from "./user-app/Authentication/LoginPage";
import Dashboard from "./user-app/afterlogin_dasboard/Dashboard";
import DAppointmentHistory from "./user-app/afterlogin_dasboard/dappointmenthistory/DAppointmentHistory";
import DProfileSection from "./user-app/afterlogin_dasboard/dcomponents/DProfileSection";
import DSettingsSection from "./user-app/afterlogin_dasboard/dcomponents/DSettingsSection";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <ToastContainer />
        <Routes>
          {/* Public Routes */}
          <Route path="/signup" element={<SignUp />} />
          <Route path="/AuthPage" element={<AuthPage />} />

          {/* Doctor/Admin Protected Routes */}
          <Route
            element={<ProtectedRoute allowedRoles={["doctor", "clinic"]} />}
          >
            <Route path="/admin/*" element={<AdminAppContainer />} />
          </Route>

          {/* Patient Protected Routes */}
          <Route element={<ProtectedRoute allowedRoles={["patient"]} />}>
            <Route path="/dashboard" element={<Dashboard />}>
              <Route path="profile" element={<DProfileSection />} />
              <Route path="appointments" element={<DAppointmentHistory />} />
              <Route path="settings" element={<DSettingsSection />} />
            </Route>
          </Route>

          {/* General Routes (can be accessed by anyone) */}
          <Route path="/*" element={<UserAppContainer />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default App;

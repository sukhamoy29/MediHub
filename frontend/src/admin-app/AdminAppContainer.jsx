import { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
// import { AuthContext } from "../user-app/context/AuthContext";
import ProtectedRoute from "../user-app/context/ProtectedRoute";
import Sidebar from "./components/Sidebar";
import Dashboard from "./components/Dashboard";
import Doctors from "./pages/doctors/Doctors";
import Patients from "./pages/Patients";
import Appointments from "./pages/Appointments";
import AddDoctorPage from "./pages/doctors/AddDoctorPage";
import EditDetailsDoctor from "./pages/doctors/EditDetailsDoctor";

const EditDetailsDoctorWrapper = () => <EditDetailsDoctor onClose={() => {}} />;
import Payments from "./pages/Payments";
import Settings from "./pages/Settings";
import Navbar from "./components/Navbar";
import Notifications from "./pages/Notifications";
import Footer from "./components/Footer";
const AddDoctorPageWrapper = () => <AddDoctorPage onClose={() => {}} />;

const AdminAppContainer = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <Navbar toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

      <div className="flex flex-1 overflow-hidden">
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black opacity-50 md:hidden"
            onClick={() => setSidebarOpen(false)}
          ></div>
        )}

        <div
          className={`fixed inset-y-0 left-0 z-50 transform ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          } transition-transform duration-300 ease-in-out md:relative md:translate-x-0 md:w-64`}
        >
          <Sidebar
            isOpen={sidebarOpen}
            toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
            setActivePage={() => {}}
            markAsRead={() => {}}
          />
        </div>

        <div className="flex-1 flex flex-col transition-all duration-300 overflow-hidden">
          <main className="flex-1 overflow-y-auto p-4">
            <Routes>
              <Route index element={<Navigate to="dashboard" replace />} />

              {/* Protected Doctor Routes */}
              <Route element={<ProtectedRoute allowedRoles={["clinic"]} />}>
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="doctors" element={<Doctors />} />
                <Route path="doctors/add" element={<AddDoctorPageWrapper />} />
                <Route
                  path="doctors/edit/:doctorId"
                  element={<EditDetailsDoctorWrapper />}
                />
                <Route path="patients" element={<Patients />} />
                <Route path="appointments/*" element={<Appointments />} />
                <Route path="payments" element={<Payments />} />
                <Route path="settings" element={<Settings />} />
                <Route path="notifications" element={<Notifications />} />
              </Route>
            </Routes>
          </main>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AdminAppContainer;

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  // PieChart,
  // Pie,
  // Cell,
} from "recharts";
import { FaCalendarAlt, FaUserMd, FaUsers, FaDollarSign } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../user-app/context/AuthContext";
import { getClinicAppointments } from "../api/clinicAppointmentsApi";
import { getDoctors } from "../api/doctorsApi";
import { fetchPaymentsByClinic } from "../api/clinicPaymentsApi";

const Dashboard = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [upcomingAppointments, setUpcomingAppointments] = useState([]);
  const [totalBookings, setTotalBookings] = useState(0);
  const [pendingAppointments, setPendingAppointments] = useState(0);
  const [activeDoctors, setActiveDoctors] = useState(0);
  const [revenue, setRevenue] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      if (user?.clinicName) {
        try {
          const appointments = await getClinicAppointments(user.clinicName);
          if (Array.isArray(appointments)) {
            setUpcomingAppointments(appointments.slice(0, 5));
            setTotalBookings(appointments.length);
            const pendingCount = appointments.filter(
              (appt) => appt.status === "Pending"
            ).length;
            setPendingAppointments(pendingCount);
          } else {
            setUpcomingAppointments([]);
            setTotalBookings(0);
            setPendingAppointments(0);
            // console.error("Appointments data is not an array:", appointments);
          }

          const doctors = await getDoctors();
          if (Array.isArray(doctors)) {
            setActiveDoctors(doctors.length);
          } else {
            setActiveDoctors(0);
            // console.error("Doctors data is not an array:", doctors);
          }

          const payments = await fetchPaymentsByClinic(user.clinicName);
          if (Array.isArray(payments)) {
            const totalRevenue = payments.reduce(
              (sum, payment) => sum + (payment.amount || 0),
              0
            );
            setRevenue(totalRevenue);
          } else {
            setRevenue(0);
            // console.error("Payments data is not an array:", payments);
          }
        } catch (error) {
          console.error("Failed to fetch dashboard data:", error);
          setUpcomingAppointments([]);
          setTotalBookings(0);
          setPendingAppointments(0);
          setActiveDoctors(0);
          setRevenue(0);
        }
      }
    };
    fetchData();
  }, [user?.clinicName]);

  const revenueData = [
    { name: "Jan", revenue: 15000 },
    { name: "Feb", revenue: 20000 },
    { name: "Mar", revenue: 25000 },
    { name: "Apr", revenue: 30000 },
    { name: "May", revenue: 35000 },
    { name: "Jun", revenue: 40000 },
    { name: "Jul", revenue: 45000 },
    { name: "Aug", revenue: 50000 },
    { name: "Sep", revenue: 55000 },
    { name: "Oct", revenue: 60000 },
    { name: "Nov", revenue: 45000 },
    { name: "Dec", revenue: 20000 },
  ];

  // const appointmentData = [
  //   { name: "Cardiology", value: 35, color: "#3b82f6" },
  //   { name: "Neurology", value: 25, color: "#22c55e" },
  //   { name: "Pediatrics", value: 20, color: "#facc15" },
  //   { name: "Orthopedics", value: 15, color: "#6366f1" },
  //   { name: "Dermatology", value: 5, color: "#ef4444" },
  // ];

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return (
    <>
      <div className="flex flex-col md:flex-row h-screen">
        <div className="flex-1 bg-gray-100 p-4 md:p-6">
          <h1 className="text-2xl md:text-3xl font-bold">Dashboard</h1>
          <p className="text-gray-500 mb-6">Welcome back, {user?.clinicName}</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {[
              {
                title: "Total Bookings",
                value: totalBookings.toLocaleString(),
                change: "+8.2%",
                icon: <FaCalendarAlt className="text-blue-500 text-2xl mr-4" />,
              },
              {
                title: "Pending Appointments",
                value: pendingAppointments.toLocaleString(),
                change: "-4.5%",
                icon: <FaUserMd className="text-blue-500 text-2xl mr-4" />,
              },
              {
                title: "Active Doctors",
                value: activeDoctors.toLocaleString(),
                change: "+2",
                icon: <FaUsers className="text-blue-500 text-2xl mr-4" />,
              },
              {
                title: "Revenue",
                value: `$${revenue.toLocaleString()}`,
                change: "+12.3%",
                icon: <FaDollarSign className="text-blue-500 text-2xl mr-4" />,
              },
            ].map(({ title, value, change, icon }, index) => (
              <div
                key={index}
                className="bg-white p-4 rounded shadow flex items-center"
              >
                {icon}
                <div>
                  <p className="text-gray-500 text-sm">{title}</p>
                  <h2 className="text-xl font-semibold">{value}</h2>
                  <p className="text-sm text-gray-400">
                    {change} from last month
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white p-6 rounded shadow">
              <h2 className="text-xl font-semibold mb-2">Revenue Trends</h2>
              <p className="text-sm text-gray-500 mb-4">
                Monthly revenue for the current year
              </p>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="revenue"
                    stroke="#3b82f6"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* <div className="bg-white p-6 rounded shadow">
              <h2 className="text-xl font-semibold mb-2">
                Appointment Distribution
              </h2>
              <p className="text-sm text-gray-500 mb-4">
                Distribution by department
              </p>
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={appointmentData}
                    dataKey="value"
                    nameKey="name"
                    outerRadius={80}
                    label
                  >
                    {appointmentData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div> */}
          </div>

          <div className="bg-white shadow-md rounded p-4 mt-6">
            <h2 className="text-xl font-semibold mb-4">
              Upcoming Appointments
            </h2>
            {Array.isArray(upcomingAppointments) &&
            upcomingAppointments.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="min-w-full text-sm text-left text-gray-500">
                  <thead className="bg-gray-100 text-gray-700">
                    <tr>
                      <th className="py-2 px-4">Patient</th>
                      <th className="py-2 px-4">Doctor</th>
                      <th className="py-2 px-4">Date</th>
                      <th className="py-2 px-4">Time</th>
                      <th className="py-2 px-4">Status</th>
                      <th className="py-2 px-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {upcomingAppointments.map((appt, index) => (
                      <tr key={index} className="border-t">
                        <td className="py-2 px-4">{appt.patient_name}</td>
                        <td className="py-2 px-4">{appt.doctor_name}</td>
                        <td className="py-2 px-4">{appt.date}</td>
                        <td className="py-2 px-4">{appt.time}</td>
                        <td className="py-2 px-4">
                          <span
                            className={
                              "px-2 py-1 text-xs rounded-md " +
                              (appt.status === "Confirmed"
                                ? "bg-green-100 text-green-600"
                                : appt.status === "Pending"
                                ? "bg-yellow-100 text-yellow-600"
                                : "bg-red-100 text-red-600")
                            }
                          >
                            {appt.status}
                          </span>
                        </td>
                        <td className="py-2 px-4">
                          <button
                            onClick={() => navigate("/admin/appointments")}
                            className="text-blue-600  cursor-pointer"
                          >
                            View
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-gray-500">No upcoming appointments found.</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;

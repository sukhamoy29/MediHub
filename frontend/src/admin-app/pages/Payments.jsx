import { useState, useEffect } from "react";
import PaymentCard from "./payments/PaymentCard";
import PaymentTable from "./payments/PaymentTable";
import PaymentNavbar from "./payments/PaymentNavbar";
import { fetchPayments } from "../api/clinicPaymentsApi";

const Payments = () => {
  const [, setActiveFilter] = useState({
    status: "All Statuses",
    method: "All Methods",
    date: "",
  });
  const [payments, setPayments] = useState([]);
  const [filteredPayments, setFilteredPayments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadPayments = async () => {
      try {
        const data = await fetchPayments();
        setPayments(data);
        setFilteredPayments(data);
      } catch (error) {
        console.error("Failed to fetch payments:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadPayments();
  }, []);
  const handleFilter = ({ status, method, date }) => {
    setActiveFilter({ status, method, date });

    const filtered = payments.filter((payment) => {
      const statusMatch =
        status === "All Statuses" ||
        payment.status.toLowerCase() === status.toLowerCase();
      const methodMatch =
        method === "All Methods" ||
        payment.payment_type?.toLowerCase() === method.toLowerCase();
      const dateMatch = date ? payment.payment_date === date : true;
      return statusMatch && methodMatch && dateMatch;
    });

    setFilteredPayments(filtered);
  };

  const handleSearch = (searchTerm) => {
    if (!searchTerm.trim()) {
      setFilteredPayments(payments);
      return;
    }

    const filtered = payments.filter((payment) =>
      payment.patient_name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredPayments(filtered);
  };

  const totalRevenue = filteredPayments.reduce(
    (sum, payment) => sum + Number(payment.amount),
    0
  );

  const pendingPayments = filteredPayments.reduce(
    (sum, payment) =>
      sum +
      (payment.status.toLowerCase() === "pending" ? Number(payment.amount) : 0),
    0
  );

  const averagePayment =
    filteredPayments.length > 0
      ? (
          filteredPayments.reduce(
            (sum, payment) => sum + Number(payment.amount),
            0
          ) / filteredPayments.length
        ).toFixed(2)
      : 0;

  if (isLoading) {
    return <div className="p-6">Loading payments...</div>;
  }

  return (
    <div className="">
      <PaymentNavbar onSearch={handleSearch} onFilter={handleFilter} />
      <div className="p-6 bg-gray-100 min-h-screen">
        {/* Header */}
        <div className="mb-4 text-center sm:text-left">
          <h2 className="text-2xl sm:text-3xl font-bold">Payments</h2>
          <p className="text-gray-600 text-sm sm:text-base">
            Manage and track patient payments and invoices
          </p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          <PaymentCard
            title="Total Revenue"
            amount={totalRevenue}
            subtitle={`From ${filteredPayments.length} payments`}
            icon="💰"
          />
          <PaymentCard
            title="Pending Payments"
            amount={pendingPayments}
            subtitle={`From ${
              filteredPayments.filter(
                (p) => p.status.toLowerCase() === "pending"
              ).length
            } payments`}
            icon="💳"
          />
          <PaymentCard
            title="Average Payment"
            amount={parseFloat(averagePayment)}
            subtitle={`Based on ${filteredPayments.length} payments`}
            icon="📊"
          />
        </div>

        {/* Payment History Section */}
        <div className="bg-white p-4 rounded shadow">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
            <div>
              <h3 className="text-lg sm:text-xl font-semibold">
                Payment History
              </h3>
              <p className="text-gray-500 text-sm sm:text-base">
                {filteredPayments.length} payments found
              </p>
            </div>
          </div>
          {/* Payment Table */}
          <PaymentTable payments={filteredPayments} setPayments={setPayments} />
        </div>
      </div>
    </div>
  );
};

export default Payments;

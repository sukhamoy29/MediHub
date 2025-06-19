export const getPayments = () => [
  {
    id: 1,
    patient: { name: "John Doe" },
    service: "Consultation",
    amount: 100,
    date: "2025-03-01", // Date format: YYYY-MM-DD
    status: "Paid",
    type: "Card",
  },
  {
    id: 2,
    patient: { name: "Jane Smith" },
    service: "Surgery",
    amount: 500,
    date: "2025-03-02", // Date format: YYYY-MM-DD
    status: "Pending",
    type: "Cash",
    notes: "Initial consultation",
  },
  {
    id: 3,
    patient: { name: "Sujit Hasda" },
    service: "Surgery",
    amount: 500,
    date: "2025-03-02", // Date format: YYYY-MM-DD
    status: "Pending",
    type: "Cash",
    notes: "Follow-up surgery",
  },
  {
    id: 4,
    patient: { name: "Riju Jana" },
    service: "Surgery",
    amount: 500,
    date: "2025-03-02", // Date format: YYYY-MM-DD
    status: "Paid",
    type: "Offline",
  },
  {
    id: 5,
    patient: { name: "Michael Brown" },
    service: "Dental Checkup",
    amount: 300,
    date: "2025-03-03",
    status: "Paid",
    type: "Bank Transfer",
  },
  {
    id: 6,
    patient: { name: "Sophia Wilson" },
    service: "Neurology Consultation",
    amount: 200,
    date: "2025-03-04",
    status: "Refunded",
    type: "Card",
  },
  {
    id: 7,
    patient: { name: "David Martinez" },
    service: "Physiotherapy",
    amount: 180,
    date: "2025-03-05",
    status: "Pending",
    type: "UPI",
  },
  {
    id: 8,
    patient: { name: "Emily Johnson" },
    service: "General Checkup",
    amount: 100,
    date: "2025-03-06",
    status: "Paid",
    type: "Cash",
  },
  {
    id: 9,
    patient: { name: "Robert Garcia" },
    service: "Orthopedic Surgery",
    amount: 3500,
    date: "2025-03-07",
    status: "Pending",
    type: "UPI",
  },
  {
    id: 10,
    patient: { name: "Olivia Davis" },
    service: "ENT Consultation",
    amount: 220,
    date: "2025-03-08",
    status: "Paid",
    type: "UPI",
  },
  {
    id: 11,
    patient: { name: "Daniel White" },
    service: "Eye Checkup",
    amount: 130,
    date: "2025-03-09",
    status: "Refunded",
    type: "Bank Transfer",
  },
  {
    id: 12,
    patient: { name: "Isabella Moore" },
    service: "Cardiology Consultation",
    amount: 160,
    date: "2025-03-10",
    status: "Paid",
    type: "Card",
  },
  {
    id: 13,
    patient: { name: "Ethan Taylor" },
    service: "Neurology Consultation",
    amount: 250,
    date: "2025-03-11",
    status: "Pending",
    type: "UPI",
  },
  {
    id: 14,
    patient: { name: "Charlotte Harris" },
    service: "General Checkup",
    amount: 90,
    date: "2025-03-12",
    status: "Paid",
    type: "Cash",
  },
  {
    id: 15,
    patient: { name: "Liam Clark" },
    service: "Surgery",
    amount: 4500,
    date: "2025-03-13",
    status: "Refunded",
    type: "Card",
  },
  {
    id: 16,
    patient: { name: "Amelia Young" },
    service: "Dental Checkup",
    amount: 280,
    date: "2025-03-14",
    status: "Paid",
    type: "Bank Transfer",
  },
  {
    id: 17,
    patient: { name: "Mason Hall" },
    service: "Cardiology Consultation",
    amount: 175,
    date: "2025-03-15",
    status: "Paid",
    type: "Offline",
  },
  {
    id: 18,
    patient: { name: "Mia Allen" },
    service: "Orthopedic Surgery",
    amount: 3700,
    date: "2025-03-16",
    status: "Paid",
    type: "UPI",
  },
  {
    id: 19,
    patient: { name: "James Scott" },
    service: "ENT Consultation",
    amount: 200,
    date: "2025-03-17",
    status: "Refunded",
    type: "Cash",
  },
  {
    id: 20,
    patient: { name: "Ava King" },
    service: "Physiotherapy",
    amount: 210,
    date: "2025-03-18",
    status: "Paid",
    type: " Card",
  },
];

export const addPayment = (paymentId) => {
  paymentId.push(paymentId);
};

export const deletePayment = (payments, paymentId) => {
  const index = payments.findIndex((payment) => payment.id === paymentId);
  if (index !== -1) {
    payments.splice(index, 1);
  }
};

export const updatePaymentStatus = (paymentId, newStatus) => {
  const Payments = Payments.find((Payment) => Payment.id === paymentId);
  if (Payments) {
    Payments.status = newStatus;
  }
};

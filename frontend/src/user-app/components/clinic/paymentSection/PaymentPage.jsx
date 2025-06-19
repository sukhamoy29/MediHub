import { useState } from "react";
import { CreditCard, Smartphone, ArrowLeft } from "lucide-react";
import { doctors } from "../../../data/doctors";
import { useNavigate, useLocation } from "react-router-dom";

const PaymentPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const {
    selectedDate,
    selectedSlot,
    selectedDoctor,
    isFirstVisit,
    firstName,
    lastName,
    phoneNumber,
    email,
    clinic,
  } = location.state || {};

  const selectedDoctorObj = selectedDoctor || doctors[0];

  const doctorFee = clinic?.fees || 0;
  const gst = +(doctorFee * 0.05).toFixed(2);
  const platformFee = 10;
  const totalBeforeDiscount = +(doctorFee + gst + platformFee).toFixed(2);

  const total =
    isFirstVisit === "yes"
      ? +(totalBeforeDiscount * 0.9).toFixed(2)
      : totalBeforeDiscount;

  const [selectedMethod, setSelectedMethod] = useState("card");

  const handlePayment = async () => {
    try {
      const res = await fetch("http://localhost:8000/razorpay/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: total,
          receipt: `receipt_${Date.now()}`,
          notes: {
            patient: `${firstName} ${lastName}`,
            email,
            phone: phoneNumber,
          },
        }),
      });

      const data = await res.json();

      const options = {
        key: data.razorpay_key,
        amount: total * 100,
        currency: "INR",
        name: clinic?.name || "MediHub",
        description: "Doctor Appointment Payment",
        order_id: data.order_id,
        handler: function (response) {
          const paymentTime = new Date().toLocaleString();

          navigate("/invoice", {
            state: {
              paymentSummary: {
                doctorFee,
                gst,
                platformFee,
                total,
                selectedMethod,
                paymentTime,
                razorpay_payment_id: response.razorpay_payment_id,
              },
              appointmentSummary: {
                selectedDate,
                selectedSlot,
                selectedDoctor: selectedDoctorObj,
                isFirstVisit,
                firstName,
                lastName,
                phoneNumber,
                email,
              },
              clinic,
            },
          });
        },
        prefill: {
          name: `${firstName} ${lastName}`,
          email: email,
          contact: phoneNumber,
        },
        theme: {
          color: "#14b8a6",
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error("Payment failed:", error);
      alert("Payment initiation failed. Please try again.");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white rounded-xl shadow p-6">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center text-sm text-teal-700 mb-4 hover:text-teal-300 cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4 mr-1" />
        Back
      </button>

      <h2 className="text-xl font-semibold text-gray-900 mb-1">
        Payment Details
      </h2>
      <p className="text-sm text-gray-500 mb-6">
        Complete your payment to confirm appointment
      </p>

      <div className="space-y-2 text-sm text-gray-700">
        <div className="flex justify-between">
          <span>
            Appointment with {selectedDoctor?.name || "Unknown Doctor"}
          </span>
          <span className="font-medium">₹{doctorFee.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span>GST (5%)</span>
          <span className="font-medium">₹{gst.toFixed(2)}</span>
        </div>
        <div className="flex justify-between mb-2">
          <span>Platform Fee</span>
          <span className="font-medium">₹{platformFee.toFixed(2)}</span>
        </div>
        <hr className="my-4" />
        <div className="flex justify-between font-semibold text-black text-base">
          <span>Total Amount</span>
          <span className="text-blue-500">₹{total.toFixed(2)}</span>
        </div>
      </div>

      <div className="mt-6">
        <p className="text-sm font-medium text-gray-900 mb-3">
          Select Payment Method
        </p>

        <div className="space-y-3">
          <label
            className={`flex items-center p-3 border rounded-lg cursor-pointer ${
              selectedMethod === "card" ? "border-black" : "border-gray-300"
            }`}
          >
            <input
              type="radio"
              name="payment"
              value="card"
              className="mr-3 accent-black"
              checked={selectedMethod === "card"}
              onChange={() => setSelectedMethod("card")}
            />
            <CreditCard className="w-4 h-4 mr-2" />
            Credit/Debit Card
          </label>

          <label
            className={`flex items-center p-3 border rounded-lg cursor-pointer ${
              selectedMethod === "upi" ? "border-black" : "border-gray-300"
            }`}
          >
            <input
              type="radio"
              name="payment"
              value="upi"
              className="mr-3 accent-black"
              checked={selectedMethod === "upi"}
              onChange={() => setSelectedMethod("upi")}
            />
            <Smartphone className="w-4 h-4 mr-2" />
            UPI
          </label>

          <label
            className={`flex items-center p-3 border rounded-lg cursor-pointer ${
              selectedMethod === "netbanking"
                ? "border-black"
                : "border-gray-300"
            }`}
          >
            <input
              type="radio"
              name="payment"
              value="netbanking"
              className="mr-3 accent-black"
              checked={selectedMethod === "netbanking"}
              onChange={() => setSelectedMethod("netbanking")}
            />
            <CreditCard className="w-4 h-4 mr-2" />
            Net Banking
          </label>
        </div>
      </div>

      <button
        onClick={handlePayment}
        className="mt-6 w-full bg-teal-600 hover:bg-teal-700 text-white py-2 rounded  text-sm font-medium cursor-pointer"
      >
        Pay ₹{total.toFixed(2)}
      </button>
    </div>
  );
};

export default PaymentPage;

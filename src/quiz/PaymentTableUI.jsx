import React, { useEffect, useState } from "react";
import axiosInstance from "../axiosInstance";

function PaymentTableUI() {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPayments = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get("/subscription/payments");
      setPayments(response.data.payments);
    } catch (err) {
      console.error("Error fetching payments:", err);
      setError("Failed to fetch payments. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const checkPaymentStatus = async (referenceId) => {
    setPayments((prevPayments) =>
      prevPayments.map((p) =>
        p.referenceId === referenceId ? { ...p, reloading: true } : p
      )
    );
    try {
      const response = await axiosInstance.get(`/subscription/status/${referenceId}`);
      const updatedPaymentRecord = response.data.paymentRecord;

      setPayments((prevPayments) =>
        prevPayments.map((p) =>
          p.referenceId === referenceId ? { ...p, ...updatedPaymentRecord, reloading: false } : p
        )
      );
    } catch (err) {
      console.error(`Error checking status for ${referenceId}:`, err);
      setPayments((prevPayments) =>
        prevPayments.map((p) =>
          p.referenceId === referenceId ? { ...p, reloading: false } : p
        )
      );
      // Handle error for individual payment status check
      // Optionally, show a toast notification or update an error state for the specific payment
    }
  };

  useEffect(() => {
    fetchPayments();
  }, []);

  if (loading) {
    return (
      <div className="p-4 sm:p-6 lg:p-8 bg-gray-900 min-h-screen text-white flex justify-center items-center">
        <p className="text-xl">Loading payments...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 sm:p-6 lg:p-8 bg-gray-900 min-h-screen text-white flex justify-center items-center">
        <p className="text-xl text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 bg-gray-900 min-h-screen text-white">
      <h2 className="text-2xl font-semibold mb-6">My Transactions</h2>

      <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {payments.length === 0 ? (
          <p className="text-lg col-span-full text-center">No payments found.</p>
        ) : (
          payments.map((p) => (
            <div
              key={p._id}
              className="bg-gray-800 rounded-lg p-4 shadow-lg flex flex-col justify-between"
            >
             
              <div className="mb-4">
                <p className="text-sm text-gray-400">Reference ID</p>
                <p className="font-medium">{p.referenceId}</p>
              </div>

              <div className="mb-4">
                <p className="text-sm text-gray-400">Phone</p>
                <p className="font-medium">{p.phone}</p>
              </div>

              <div className="mb-4">
                <p className="text-sm text-gray-400">Amount</p>
                <p className="font-medium">
                  {p.currency} {p.amount}
                </p>
              </div>

              <div className="mb-4">
                <p className="text-sm text-gray-400">Status</p>
                <span
                  className={`px-2 py-1 rounded-full font-semibold ${
                    p.status === "SUCCESSFUL"
                      ? "bg-green-500 text-white"
                      : p.status === "PENDING"
                      ? "bg-yellow-500 text-black"
                      : "bg-red-500 text-white"
                  }`}
                >
                  {p.status}
                </span>
              </div>

              {p.reason && (
                <div className="mb-4">
                  <p className="text-sm text-gray-400">Reason</p>
                  <p className="font-medium">{p.reason}</p>
                </div>
              )}

              <div className="mb-4">
                <p className="text-sm text-gray-400">Payment Date</p>
                <p className="font-medium">
                  {new Date(p.createdAt).toLocaleDateString()}
                </p>
              </div>

              {p.status === "PENDING" && (
                <button
                  onClick={() => checkPaymentStatus(p.referenceId)}
                  disabled={p.reloading}
                  className={`mt-2 py-2 px-4 rounded ${
                    p.reloading
                      ? "bg-gray-500 cursor-not-allowed"
                      : "bg-blue-600 hover:bg-blue-700 text-white"
                  }`}
                >
                  {p.reloading ? "Reloading..." : "Reload"}
                </button>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default PaymentTableUI;

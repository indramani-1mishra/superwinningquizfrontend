import React, { useState } from "react";
import axios from "axios";

function Subscription({ onClose }) {
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubscribe = async () => {
    if (!selected) return;
    setLoading(true);
    setMessage("");

    try {
      const token = localStorage.getItem("token"); // JWT from login
      const response = await axios.post(
        "http://localhost:8000/api/subscription/create",
        {
          phone: "+26876063360", // replace with actual user phone
          amount: 1,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        setMessage("Subscription successful ✅");
      } else {
        setMessage(response.data.error || "Subscription failed ❌");
      }
    } catch (err) {
      console.error("Subscription Error:", err.response || err.message);
      setMessage("Subscription failed ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-50 p-4 sm:p-6">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-xs sm:max-w-sm md:max-w-md text-center p-6 sm:p-8">
        <h2 className="text-lg sm:text-xl font-bold mb-4">
          Choose Payment Method
        </h2>

        {/* Payment Options */}
        <div className="flex flex-col gap-2 sm:gap-3 mb-4">
          <button
            className={`mx-4 py-2 rounded border text-sm sm:text-base ${
              selected === "MTN Air Time"
                ? "bg-yellow-500 text-white"
                : "bg-gray-100"
            }`}
            onClick={() => setSelected("MTN Air Time")}
          >
            MTN Air Time
          </button>
          <button
            className={`mx-4 py-2 rounded-border text-sm sm:text-base ${
              selected === "MOMO Mobile"
                ? "bg-green-600 text-white"
                : "bg-gray-100"
            }`}
            onClick={() => setSelected("MOMO Mobile")}
          >
            MOMO Mobile
          </button>
        </div>

        {/* Cancel & Subscribe Buttons (always horizontal) */}
        <div className="flex justify-between gap-2 mb-2
        ">
          <button
            onClick={onClose}
            className="flex-1 bg-red-500 text-white mx-4 py-2 rounded text-sm sm:text-base"
          >
            Cancel
          </button>
          <button
            onClick={handleSubscribe}
            disabled={!selected || loading}
            className={`flex-1 mx-4 py-2 rounded text-sm sm:text-base ${
              selected && !loading
                ? "bg-blue-600 text-white"
                : "bg-gray-300 text-gray-600"
            }`}
          >
            {loading ? "Subscribing..." : "Subscribe"}
          </button>
        </div>

        {/* Status Message */}
        {message && (
          <p className="mt-2 text-sm sm:text-base break-words">{message}</p>
        )}
      </div>
    </div>
  );
}

export default Subscription;

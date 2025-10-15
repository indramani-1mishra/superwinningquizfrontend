import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function OtpVerification() {
  const navigate = useNavigate();
  const location = useLocation();
  const mobile = location.state?.mobile || "";

  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const verifyOtp = () => {
    if (!otp || otp.length !== 6) return setError("Enter a valid OTP");
    setError("");
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      const savedOtp = localStorage.getItem("demoOtp");
      if (otp === savedOtp) {
        localStorage.setItem("token", "dummy-jwt-token"); // fake token
        navigate("/start/play");
      } else {
        setError("Invalid OTP");
      }
    }, 1000);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-150px)] text-center px-4 sm:px-6 md:px-12 lg:px-24">
      <div className="data-form w-full max-w-full sm:max-w-md">
        <h4 className="text-xl sm:text-2xl md:text-3xl lg:text-3xl">ENTER OTP</h4>
        <p className="text-sm sm:text-base md:text-lg lg:text-lg mb-2">
          A one time password has been sent to <strong>{mobile}</strong>
        </p>
        <input
          type="text"
          placeholder="OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          maxLength={6}
          autoComplete="off"
          className="w-full mt-2 px-3 py-2 sm:px-4 sm:py-3 border border-gray-300 rounded text-sm sm:text-base md:text-lg"
        />
        {error && <p className="text-red-600 mt-2 text-sm sm:text-base">{error}</p>}
        <button
          className="primary w-full mt-4 py-2 sm:py-3 text-sm sm:text-base md:text-lg"
          onClick={verifyOtp}
          disabled={loading}
        >
          {loading ? "Verifying..." : "Login"}
        </button>
      </div>
    </div>
  );
}

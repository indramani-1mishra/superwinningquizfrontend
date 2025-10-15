import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Otplogin() {
  const [mobile, setMobile] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    let interval;
    if (resendTimer > 0) {
      interval = setInterval(() => setResendTimer((t) => t - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [resendTimer]);

  const sendOtp = () => {
    if (!mobile) return setError("Please enter a mobile number");
    if (!/^\d{8}$/.test(mobile))
      return setError("Mobile number must be 8 digits");
    setError("");
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      const generatedOtp = "123456"; // fixed OTP for demo
      localStorage.setItem("demoOtp", generatedOtp);
      navigate("/otp/verify", { state: { mobile } });
      setResendTimer(60);
    }, 1000);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-150px)] text-center px-4 sm:px-6 md:px-12 lg:px-24">
      <div className="data-form w-full max-w-full sm:max-w-md">
        <h4 className="text-xl sm:text-2xl md:text-3xl lg:text-3xl">LOGIN</h4>
        <p className="text-sm sm:text-base md:text-lg lg:text-lg mb-2">
          Please enter your Mobile number
        </p>
        <input
          type="text"
          placeholder="Mobile number"
          value={mobile}
          onChange={(e) => {
            const val = e.target.value;
            if (/^\d*$/.test(val) && val.length <= 8) setMobile(val);
          }}
          maxLength={8}
          autoComplete="off"
          className="w-full mt-2 px-3 py-2 sm:px-4 sm:py-3 border border-gray-300 rounded text-sm sm:text-base md:text-lg"
        />
        {error && <p className="text-red-600 mt-2 text-sm sm:text-base">{error}</p>}
        <button
          className="primary w-full mt-4 py-2 sm:py-3 text-sm sm:text-base md:text-lg"
          onClick={sendOtp}
          disabled={loading}
        >
          {loading ? "Sending OTP..." : "Generate OTP"}
        </button>
        {resendTimer > 0 && (
          <p className="text-sm sm:text-base mt-2 text-gray-500">
            Resend OTP in {resendTimer}s
          </p>
        )}
      </div>
    </div>
  );
}

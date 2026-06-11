import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  useVerifyOtpMutation,
  useResendOtpMutation,
} from "../../Apis/user.api";
import "./otp.css";

const OTPPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const email = location.state?.email;

  const [verifyOtp, { isLoading }] = useVerifyOtpMutation();
  const [ResendOtp] = useResendOtpMutation();

  const [timer, setTimer] = useState(60);
  const [isActive, setIsActive] = useState(true);

  const [otp, setOtp] = useState([
    "",
    "",
    "",
    "",
    "",
    "",
  ]);

  useEffect(() => {
    let interval = null;

    if (isActive && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else if (timer === 0) {
      setIsActive(false);
    }

    return () => clearInterval(interval);
  }, [timer, isActive]);

  const handleChange = (index, value) => {
    if (!/^\d?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      document.getElementById(`otp-${index + 1}`)?.focus();
    }
  };

  const handleVerify = async () => {
    const finalOtp = otp.join("");

    if (finalOtp.length !== 6) {
      return toast.error("Please enter all 6 digits");
    }

    try {
      const res = await verifyOtp({
        email,
        otp: finalOtp,
      }).unwrap();

      const token =
        res?.accessToken ||
        res?.token ||
        res?.data?.accessToken ||
        res?.data?.token;

      if (!token) {
        throw new Error(
          "Server did not return a valid access token"
        );
      }

      localStorage.setItem("accessToken", token);
      toast.success(res.message || "OTP verified successfully");
      navigate("/home");
    } catch (error) {
      toast.error(
        error?.data?.message || error.message || "OTP verification failed"
      );
    }
  };

  const handleResend = async () => {
    try {
      const res = await ResendOtp({ email }).unwrap();

      toast.success(res.message);

      setTimer(60);
      setIsActive(true);

      setOtp(["", "", "", "", "", ""]);
    } catch (error) {
      toast.error(
        error?.data?.message || "Failed to resend OTP"
      );
    }
  };

  return (
    <div className="otp-container">
      <div className="otp-card">

        <div className="otp-header">
          <h1 className="otp-title">
            Verify your identity
          </h1>

          <p className="otp-subtitle">
            OTP sent to {email}
          </p>
        </div>

        <div className="otp-input-section">
          <label className="otp-label">
            Enter code
          </label>

          <div className="otp-input-container">
            {otp.map((digit, index) => (
              <input
                key={index}
                id={`otp-${index}`}
                type="text"
                className="otp-input"
                maxLength="1"
                value={digit}
                onChange={(e) =>
                  handleChange(index, e.target.value)
                }
              />
            ))}
          </div>
        </div>

        <button
          className="otp-submit-btn enabled"
          onClick={handleVerify}
          disabled={isLoading}
        >
          <span>
            {isLoading
              ? "Verifying..."
              : "Verify Code"}
          </span>
        </button>

        <div className="otp-footer">
          <p className="otp-footer-text">
            Didn't receive the code?
          </p>

          <button
            className="otp-resend-btn"
            onClick={handleResend}
            disabled={isActive}
          >
            {isActive
              ? `Resend in ${timer}s`
              : "Resend Code"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default OTPPage;
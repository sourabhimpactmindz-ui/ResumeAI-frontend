import { useState, useEffect } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import {
  useVerifyOtpMutation,
  useResendOtpMutation,
} from "../../Apis/user.api";
import { Card } from "../../components/Card";
import { Button } from "../../components/Button";
import { Badge } from "../../components/Badge";
import ParticleField from "../../components/ParticleField";
import { ArrowLeft, ShieldCheck, Mail, Clock } from "lucide-react";

export default function OTPPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || "your registered email";

  const [verifyOtp, { isLoading }] = useVerifyOtpMutation();
  const [ResendOtp] = useResendOtpMutation();

  const [timer, setTimer] = useState(60);
  const [isActive, setIsActive] = useState(true);
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);

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
      document.getElementById(`otp-input-${index + 1}`)?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      document.getElementById(`otp-input-${index - 1}`)?.focus();
    }
  };

  const handleVerify = async () => {
    const finalOtp = otp.join("");
    if (finalOtp.length !== 6) {
      toast.error("Please enter the complete 6-digit code");
      return;
    }

    try {
      const res = await verifyOtp({ email, otp: finalOtp }).unwrap();
      toast.success(res.message || "Email verified! Welcome to ResumeAI.");
      if (res.accessToken) {
        localStorage.setItem("accessToken", res.accessToken);
        localStorage.setItem("refreshToken", res.refreshToken);
      }
      setTimeout(() => {
        navigate("/dashboard");
      }, 800);
    } catch (error) {
      toast.error(error?.data?.message || "Invalid verification code. Please try again.");
    }
  };

  const handleResend = async () => {
    try {
      const res = await ResendOtp({ email }).unwrap();
      toast.success(res.message || "Fresh code sent to your email!");
      setTimer(60);
      setIsActive(true);
      setOtp(["", "", "", "", "", ""]);
    } catch (error) {
      toast.error(error?.data?.message || "Failed to resend code");
    }
  };

  return (
    <div className="relative min-h-screen bg-deep-space text-c-100 flex items-center justify-center p-6 overflow-hidden">
      <ParticleField count={20} />

      <div className="relative z-10 w-full max-w-md">
        <Card className="p-8 sm:p-10 shadow-[0_28px_60px_-15px_rgba(6,20,27,0.9),0_0_35px_rgba(155,168,171,0.12)] text-center" glow={true}>
          <div className="flex items-center justify-between mb-8">
            <Link
              to="/signup"
              className="inline-flex items-center gap-1.5 text-xs font-heading font-semibold text-c-300 hover:text-c-100 transition-colors"
            >
              <ArrowLeft size={14} />
              <span>Back to Signup</span>
            </Link>
            <Badge variant="status" pulsing={true}>
              Two-Factor
            </Badge>
          </div>

          <div className="w-14 h-14 rounded-2xl bg-c-700/60 border border-c-600/60 flex items-center justify-center text-c-100 mx-auto mb-4 shadow-md">
            <Mail size={26} />
          </div>

          <h1 className="font-heading font-extrabold text-2xl text-c-100">
            Verify your email
          </h1>

          <p className="mt-2 text-xs text-c-300 font-sans leading-relaxed">
            We sent a 6-digit confirmation code to{" "}
            <strong className="text-c-100 block font-semibold mt-0.5">{email}</strong>
          </p>

          {/* 6-Digit PIN Inputs */}
          <div className="flex items-center justify-center gap-2 sm:gap-2.5 my-8">
            {otp.map((digit, idx) => (
              <input
                key={idx}
                id={`otp-input-${idx}`}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(idx, e.target.value)}
                onKeyDown={(e) => handleKeyDown(idx, e.target.value ? e : e)}
                className="w-11 sm:w-12 h-14 text-center font-heading font-extrabold text-xl rounded-2xl bg-c-900 border border-c-700 text-c-100 outline-none focus:border-c-100 focus:shadow-[0_0_15px_rgba(204,208,207,0.2)] transition-all"
              />
            ))}
          </div>

          <Button
            onClick={handleVerify}
            disabled={isLoading}
            variant="primary"
            size="lg"
            className="w-full mb-6"
          >
            {isLoading ? "Verifying..." : "Confirm & Enter Dashboard →"}
          </Button>

          <div className="pt-4 border-t border-c-700/60 flex items-center justify-between text-xs font-sans text-c-600">
            <span>Didn't receive code?</span>
            {isActive ? (
              <span className="flex items-center gap-1 text-c-300">
                <Clock size={12} />
                <span>Resend in {timer}s</span>
              </span>
            ) : (
              <button
                type="button"
                onClick={handleResend}
                className="text-c-100 font-bold hover:underline cursor-pointer"
              >
                Resend code now
              </button>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}

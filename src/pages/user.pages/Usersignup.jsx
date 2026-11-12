import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { Eye, EyeOff, ArrowLeft, Sparkles, CheckCircle2, ShieldCheck, Lock } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import {
  GoogleAuthProvider,
  signInWithPopup,
  signInWithRedirect,
  getRedirectResult,
} from "firebase/auth";
import { auth } from "../../firebase/firebase";
import { useGoogleLoginMutation, useSignupUserMutation } from "../../Apis/user.api";
import { Card } from "../../components/Card";
import { Button } from "../../components/Button";
import { Badge } from "../../components/Badge";
import ParticleField from "../../components/ParticleField";
import FloatingWrapper from "../../components/animations/FloatingWrapper";

export default function UserSignUp() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [shake, setShake] = useState(false);

  const [SignupUser, { isLoading }] = useSignupUserMutation();
  const [GoogleLogin, { isLoading: isGoogleLoading }] = useGoogleLoginMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    mode: "onChange",
    defaultValues: { name: "", email: "", password: "" },
  });

  const passwordVal = watch("password", "");

  // Calculate password strength
  const calculateStrength = (pwd) => {
    if (!pwd) return { score: 0, label: "Empty", color: "bg-c-700" };
    let s = 0;
    if (pwd.length >= 8) s++;
    if (/[A-Z]/.test(pwd)) s++;
    if (/[0-9]/.test(pwd)) s++;
    if (/[^A-Za-z0-9]/.test(pwd)) s++;

    if (s <= 1) return { score: 25, label: "Weak", color: "bg-c-error" };
    if (s === 2) return { score: 50, label: "Fair", color: "bg-c-warning" };
    if (s === 3) return { score: 75, label: "Good", color: "bg-c-300" };
    return { score: 100, label: "Strong", color: "bg-c-success" };
  };

  const strength = calculateStrength(passwordVal);

  // Google redirect handler
  useEffect(() => {
    let isMounted = true;
    getRedirectResult(auth)
      .then(async (result) => {
        if (!isMounted || !result?.user) return;
        const firebaseToken = await result.user.getIdToken();
        const res = await GoogleLogin({ token: firebaseToken }).unwrap();
        localStorage.setItem("accessToken", res.accessToken);
        localStorage.setItem("refreshToken", res.refreshToken);
        toast.success("Account created via Google!");
        navigate("/dashboard", { replace: true });
      })
      .catch((error) => {
        if (error && error.code !== "auth/credential-already-in-use") {
          console.error("Redirect sign-in error:", error);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [GoogleLogin, navigate]);

  const handleSignUp = async (data) => {
    try {
      const res = await SignupUser(data).unwrap();
      if (res?.status) {
        toast.success("Verification code dispatched to your email!");
        navigate("/verifyOTP", {
          state: { email: data.email },
        });
      }
    } catch (err) {
      setShake(true);
      setTimeout(() => setShake(false), 600);
      toast.error(err?.data?.message || err?.error || "Registration failed. Please try again.");
    }
  };

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: "select_account" });

    try {
      const result = await signInWithPopup(auth, provider);
      const firebaseToken = await result.user.getIdToken();
      const res = await GoogleLogin({ token: firebaseToken }).unwrap();
      localStorage.setItem("accessToken", res.accessToken);
      localStorage.setItem("refreshToken", res.refreshToken);
      toast.success("Google registration successful!");
      navigate("/dashboard", { replace: true });
    } catch (popupError) {
      if (popupError.code === "auth/popup-blocked" || popupError.code === "auth/popup-closed-by-user") {
        await signInWithRedirect(auth, provider);
      } else {
        toast.error("Google sign up failed. Please try again.");
      }
    }
  };

  return (
    <div className="relative min-h-screen bg-deep-space text-c-100 flex items-center justify-center p-4 sm:p-6 overflow-hidden">
      <ParticleField count={20} />

      <div className="relative z-10 w-full max-w-5xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left Form Card */}
        <div className={`lg:col-span-7 ${shake ? "animate-[wiggle_0.4s_ease-in-out]" : ""}`}>
          <Card className="p-8 sm:p-12 shadow-[0_28px_60px_-15px_rgba(6,20,27,0.9),0_0_35px_rgba(155,168,171,0.12)]" glow={true}>
            <div className="flex items-center justify-between mb-8">
              <Link
                to="/"
                className="inline-flex items-center gap-2 text-xs font-heading font-semibold text-c-300 hover:text-c-100 transition-colors"
              >
                <ArrowLeft size={14} />
                <span>Return to Home</span>
              </Link>
              <Badge variant="status" pulsing={true}>
                Instant Free Access
              </Badge>
            </div>

            <div className="mb-8">
              <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-c-100">
                Create your ResumeAI account
              </h1>
              <p className="mt-1 text-xs sm:text-sm text-c-300 font-sans">
                Never get filtered out by applicant tracking software again.
              </p>
            </div>

            {/* Google Signup Button */}
            <button
              type="button"
              onClick={handleGoogleSignIn}
              disabled={isGoogleLoading}
              className="w-full py-3 px-4 rounded-2xl bg-c-900 border border-c-700/80 hover:border-c-300 hover:bg-c-800 text-c-100 font-heading font-semibold text-xs sm:text-sm flex items-center justify-center gap-3 transition-all cursor-pointer shadow-sm"
            >
              <FcGoogle size={20} />
              <span>Register with Google</span>
            </button>

            <div className="relative my-7 text-center">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-c-700/60" />
              </div>
              <span className="relative px-3 bg-c-800 text-[11px] font-heading font-bold text-c-600 uppercase tracking-widest">
                or with email
              </span>
            </div>

            <form onSubmit={handleSubmit(handleSignUp)} className="space-y-4">
              <div>
                <label className="block text-xs font-heading font-bold text-c-100 mb-1.5">
                  Full Name
                </label>
                <input
                  type="text"
                  {...register("name", { required: "Full name is required" })}
                  placeholder="e.g. Rohit Verma"
                  className="w-full px-5 py-3 rounded-2xl bg-c-900 border border-c-700 text-c-100 placeholder:text-c-600 font-sans text-sm outline-none focus:border-c-300 transition-all"
                />
                {errors.name && (
                  <span className="text-[11px] text-c-error mt-1 block">
                    {errors.name.message}
                  </span>
                )}
              </div>

              <div>
                <label className="block text-xs font-heading font-bold text-c-100 mb-1.5">
                  Email Address
                </label>
                <input
                  type="email"
                  {...register("email", { required: "Valid email is required" })}
                  placeholder="name@company.com"
                  className="w-full px-5 py-3 rounded-2xl bg-c-900 border border-c-700 text-c-100 placeholder:text-c-600 font-sans text-sm outline-none focus:border-c-300 transition-all"
                />
                {errors.email && (
                  <span className="text-[11px] text-c-error mt-1 block">
                    {errors.email.message}
                  </span>
                )}
              </div>

              <div>
                <label className="block text-xs font-heading font-bold text-c-100 mb-1.5">
                  Create Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    {...register("password", {
                      required: "Password is required",
                      minLength: { value: 6, message: "Minimum 6 characters" },
                    })}
                    placeholder="••••••••••••"
                    className="w-full px-5 py-3 pr-12 rounded-2xl bg-c-900 border border-c-700 text-c-100 placeholder:text-c-600 font-sans text-sm outline-none focus:border-c-300 transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-c-600 hover:text-c-300"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
                {errors.password && (
                  <span className="text-[11px] text-c-error mt-1 block">
                    {errors.password.message}
                  </span>
                )}

                {/* Password Strength Indicator */}
                {passwordVal && (
                  <div className="mt-2.5 space-y-1">
                    <div className="flex items-center justify-between text-[11px] font-sans">
                      <span className="text-c-600">Password strength:</span>
                      <span className="text-c-100 font-bold">{strength.label}</span>
                    </div>
                    <div className="h-1.5 w-full bg-c-900 rounded-full overflow-hidden">
                      <div
                        className={`h-full ${strength.color} transition-all duration-300`}
                        style={{ width: `${strength.score}%` }}
                      />
                    </div>
                  </div>
                )}
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                variant="primary"
                size="lg"
                className="w-full mt-4"
              >
                {isLoading ? "Creating Account..." : "Create Account & Verify →"}
              </Button>
            </form>

            <p className="mt-6 text-center text-xs text-c-600 font-sans">
              Already have an account?{" "}
              <Link to="/login" className="text-c-100 font-bold hover:underline">
                Sign in here
              </Link>
            </p>
          </Card>
        </div>

        {/* Right Floating Resume Visual with Parallax Depth */}
        <div className="hidden lg:block lg:col-span-5">
          <FloatingWrapper y={14} duration={6.8}>
            <div className="relative p-8 rounded-[36px] bg-gradient-to-br from-c-800 to-c-800/40 border border-c-700/80 shadow-[0_30px_70px_-15px_rgba(6,20,27,0.95)] overflow-hidden">
              <div className="flex items-center gap-3 mb-6">
                <span className="w-9 h-9 rounded-full bg-c-success/20 text-c-success border border-c-success/40 flex items-center justify-center">
                  <Sparkles size={18} />
                </span>
                <div>
                  <h3 className="font-heading font-bold text-sm text-c-100">
                    What you unlock free
                  </h3>
                  <p className="text-[11px] text-c-600">
                    Full candidate dashboard features
                  </p>
                </div>
              </div>

              <div className="space-y-3.5 mb-6 text-xs font-sans text-c-300">
                <div className="p-3.5 rounded-xl bg-c-900 border border-c-700 flex items-center gap-2.5">
                  <CheckCircle2 size={15} className="text-c-success shrink-0" />
                  <span>Unlimited ATS resume scans</span>
                </div>
                <div className="p-3.5 rounded-xl bg-c-900 border border-c-700 flex items-center gap-2.5">
                  <CheckCircle2 size={15} className="text-c-success shrink-0" />
                  <span>Automatic missing keyword gap detection</span>
                </div>
                <div className="p-3.5 rounded-xl bg-c-900 border border-c-700 flex items-center gap-2.5">
                  <CheckCircle2 size={15} className="text-c-success shrink-0" />
                  <span>AI quantified bullet point rewriting</span>
                </div>
                <div className="p-3.5 rounded-xl bg-c-900 border border-c-700 flex items-center gap-2.5">
                  <CheckCircle2 size={15} className="text-c-success shrink-0" />
                  <span>Saved scan history and score improvement trend</span>
                </div>
              </div>

              <div className="pt-4 border-t border-c-700/60 flex items-center gap-2 text-[11px] text-c-600">
                <Lock size={14} className="text-c-success" />
                <span>100% private in-memory document scanning</span>
              </div>
            </div>
          </FloatingWrapper>
        </div>
      </div>
    </div>
  );
}

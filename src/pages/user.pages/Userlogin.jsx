import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { Eye, EyeOff, ArrowLeft, Sparkles, CheckCircle2, ShieldCheck } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import {
  GoogleAuthProvider,
  signInWithPopup,
  signInWithRedirect,
  getRedirectResult,
} from "firebase/auth";
import { auth } from "../../firebase/firebase";
import { useGoogleLoginMutation, useLoginUserMutation } from "../../Apis/user.api";
import { Card } from "../../components/Card";
import { Button } from "../../components/Button";
import { Badge } from "../../components/Badge";
import ParticleField from "../../components/ParticleField";
import FloatingWrapper from "../../components/animations/FloatingWrapper";

export default function UserLogin() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [shake, setShake] = useState(false);

  const [GoogleLogin, { isLoading: isGoogleLoading }] = useGoogleLoginMutation();
  const [LoginUser, { isLoading }] = useLoginUserMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    defaultValues: { email: "", password: "" },
  });

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
        toast.success("Welcome back! Login successful.");
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

  const handleSignIn = async (data) => {
    try {
      const res = await LoginUser(data).unwrap();
      if (res?.status) {
        toast.success("Welcome back! Login successful.");
        localStorage.setItem("accessToken", res.accessToken);
        localStorage.setItem("refreshToken", res.refreshToken);
        navigate("/dashboard", { replace: true });
      }
    } catch (err) {
      setShake(true);
      setTimeout(() => setShake(false), 600);
      toast.error(err?.data?.message || err?.error || "Login failed. Please check credentials.");
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
      toast.success("Signed in with Google!");
      navigate("/dashboard", { replace: true });
    } catch (popupError) {
      if (popupError.code === "auth/popup-blocked" || popupError.code === "auth/popup-closed-by-user") {
        await signInWithRedirect(auth, provider);
      } else {
        toast.error("Google sign in failed. Please try again.");
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
                Live Authentication
              </Badge>
            </div>

            <div className="mb-8">
              <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-c-100">
                Sign in to ResumeAI
              </h1>
              <p className="mt-1 text-xs sm:text-sm text-c-300 font-sans">
                Access your saved scans, ATS score trendlines, and customized bullet rewrites.
              </p>
            </div>

            {/* Google Fast Sign-in */}
            <button
              type="button"
              onClick={handleGoogleSignIn}
              disabled={isGoogleLoading}
              className="w-full py-3 px-4 rounded-2xl bg-c-900 border border-c-700/80 hover:border-c-300 hover:bg-c-800 text-c-100 font-heading font-semibold text-xs sm:text-sm flex items-center justify-center gap-3 transition-all cursor-pointer shadow-sm"
            >
              <FcGoogle size={20} />
              <span>Continue with Google</span>
            </button>

            <div className="relative my-7 text-center">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-c-700/60" />
              </div>
              <span className="relative px-3 bg-c-800 text-[11px] font-heading font-bold text-c-600 uppercase tracking-widest">
                or with email
              </span>
            </div>

            <form onSubmit={handleSubmit(handleSignIn)} className="space-y-5">
              <div>
                <label className="block text-xs font-heading font-bold text-c-100 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  {...register("email", { required: "Email is required" })}
                  placeholder="name@company.com"
                  className="w-full px-5 py-3 rounded-2xl bg-c-900 border border-c-700 text-c-100 placeholder:text-c-600 font-sans text-sm outline-none focus:border-c-300 transition-all"
                />
                {errors.email && (
                  <span className="text-[11px] text-c-error mt-1.5 block">
                    {errors.email.message}
                  </span>
                )}
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-heading font-bold text-c-100">
                    Password
                  </label>
                  <Link
                    to="/contact"
                    className="text-[11px] font-sans text-c-300 hover:text-c-100 underline"
                  >
                    Forgot password?
                  </Link>
                </div>

                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    {...register("password", { required: "Password is required" })}
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
                  <span className="text-[11px] text-c-error mt-1.5 block">
                    {errors.password.message}
                  </span>
                )}
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                variant="primary"
                size="lg"
                className="w-full mt-2"
              >
                {isLoading ? "Authenticating..." : "Sign in to Dashboard →"}
              </Button>
            </form>

            <p className="mt-6 text-center text-xs text-c-600 font-sans">
              Don't have an account yet?{" "}
              <Link to="/signup" className="text-c-100 font-bold hover:underline">
                Create free account
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
                  <CheckCircle2 size={18} />
                </span>
                <div>
                  <h3 className="font-heading font-bold text-sm text-c-100">
                    Encrypted Candidate Vault
                  </h3>
                  <p className="text-[11px] text-c-600">
                    Session 256-bit encrypted
                  </p>
                </div>
              </div>

              <div className="space-y-3.5 mb-6">
                <div className="p-3.5 rounded-xl bg-c-900 border border-c-700 text-xs font-sans text-c-300 flex items-center justify-between">
                  <span>ATS Match Benchmark</span>
                  <span className="font-heading font-bold text-c-success text-sm">91%</span>
                </div>
                <div className="p-3.5 rounded-xl bg-c-900 border border-c-700 text-xs font-sans text-c-300 flex items-center justify-between">
                  <span>Parsing Trap Check</span>
                  <span className="font-heading font-bold text-c-100 text-xs">Passed (0 traps)</span>
                </div>
                <div className="p-3.5 rounded-xl bg-c-900 border border-c-700 text-xs font-sans text-c-300 flex items-center justify-between">
                  <span>Missing Keywords</span>
                  <span className="font-heading font-bold text-c-300 text-xs">All 14 resolved</span>
                </div>
              </div>

              <div className="pt-4 border-t border-c-700/60 flex items-center gap-2 text-[11px] text-c-600">
                <ShieldCheck size={14} className="text-c-success" />
                <span>Zero tracking · Never shared with brokers</span>
              </div>
            </div>
          </FloatingWrapper>
        </div>
      </div>
    </div>
  );
}

import { useState } from 'react';
import { Zap, KeySquare, PenTool, Eye, EyeOff } from 'lucide-react';
import './signup.css';
import { FcGoogle } from "react-icons/fc";
import { useForm } from 'react-hook-form';
import { useSignupUserMutation } from '../../Apis/user.api';
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../../firebase/firebase';
import { validateSignup } from '../../Validation/form.validation';

export default function ResumeAISignUp2() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [SignupUser, { isLoading }] = useSignupUserMutation();
  const [user, setuser] = useState(null);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [GoogleLogin] = useGoogleLoginMutation();
  

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
  } = useForm({
    mode: "onChange",
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const password = watch("password");

  // Password strength indicator
  const getPasswordStrength = (pwd) => {
    if (!pwd) return 0;
    let strength = 0;
    if (pwd.length >= 8) strength++;
    if (/[a-z]/.test(pwd)) strength++;
    if (/[A-Z]/.test(pwd)) strength++;
    if (/\d/.test(pwd)) strength++;
    if (/[@$!%*?&]/.test(pwd)) strength++;
    return strength;
  };

  const passwordStrength = getPasswordStrength(password);
  const getPasswordStrengthColor = () => {
    if (passwordStrength <= 1) return "#ef4444";
    if (passwordStrength <= 2) return "#f97316";
    if (passwordStrength <= 3) return "#eab308";
    if (passwordStrength <= 4) return "#84cc16";
    return "#22c55e";
  };

  const handleSignUp = async (data) => {
    try {
      const res = await SignupUser(data).unwrap();
      if (res?.status) {
        toast.success('OTP sent successfully');
        navigate('/verifyOTP', {
          state: {
            email: data.email,
          },
        });
      }
    } catch (err) {
      toast.error(err?.data?.message || 'Signup failed. Please try again.');
    }
  };

    const handleGoogleSignIn = async () => {
    try {
      const provider = new GoogleAuthProvider();
  
      const result = await signInWithPopup(
        auth,
        provider
      );
  
      const firebaseToken =
        await result.user.getIdToken();
  
      const res = await GoogleLogin({
        token: firebaseToken,
      }).unwrap();
  
      console.log(res)
  
      localStorage.setItem(
        "accessToken",
        res.accessToken
      );
  
      localStorage.setItem(
        "refreshToken",
        res.refreshToken
      );
  
      toast.success(
        "Login successful!"
      );
  
      navigate("/home");
  
    } catch (error) {
      console.error(error);
      toast.error(
        error?.data?.message ||
        error.message
      );
    }
  };
  return (
    <div className="signup-main-container">
      <div className="signup-dark-section">
        <div>
          <div className="dark-logo">
            <div className="dark-logo-icon">⚡</div>
            <span className="dark-logo-text">ResumeAI</span>
          </div>

          {/* Heading */}
          <div className="dark-content">
            <h1 className="dark-heading">Unlock your career potential with AI</h1>

            {/* Features */}
            <div className="features-list">
              {/* Feature 1 */}
              <div className="feature-item">
                <div className="feature-icon">
                  <Zap size={24} />
                </div>
                <div className="feature-content">
                  <h3>Instant Score Analysis</h3>
                  <p>Get real-time feedback on your resume in seconds</p>
                </div>
              </div>

              {/* Feature 2 */}
              <div className="feature-item">
                <div className="feature-icon">
                  <KeySquare size={24} />
                </div>
                <div className="feature-content">
                  <h3>Keyword Optimization</h3>
                  <p>Increase ATS match with AI-powered suggestions</p>
                </div>
              </div>

              {/* Feature 3 */}
              <div className="feature-item">
                <div className="feature-icon">
                  <PenTool size={24} />
                </div>
                <div className="feature-content">
                  <h3>AI Writing Assistant</h3>
                  <p>Craft compelling bullet points instantly</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Testimonial */}
        <div className="dark-testimonial">
          <div className="stars" style={{ color: '#fbbf24' }}>
            ★★★★★
          </div>
          <p className="testimonial-text">
            "This tool is a total game changer for candidates. The resumes I see coming through discussions are consistently better structured and more aligned with what we're looking for."
          </p>
        </div>
      </div>

      {/* RIGHT SECTION - Light Theme */}
      <div className="signup-light-section">
        <div>
          <h2 className="light-heading">Create your account</h2>
          <p className="light-subtitle">
            Join 50,000+ professionals advancing their careers.
          </p>

          <form className="signup-light-form" onSubmit={handleSubmit(handleSignUp)}>
            {/* Google Button */}
            <button
              type="button"
              className="google-btn"
              onClick={handleGoogleSignUp}
              disabled={isGoogleLoading}
            >
              <FcGoogle size={22} />
              {isGoogleLoading ? 'Signing in...' : 'Sign in with Google'}
            </button>

            {/* Divider */}
            <div className="light-divider">
              <span>OR EMAIL</span>
            </div>

            {/* Full Name */}
            <div className="light-form-group">
              <label htmlFor="fullName">Full Name</label>
              <input
                type="text"
                id="fullName"
                placeholder="Enter your full name"
                className={errors.name ? "error" : ""}
                {...register("name", validateSignup.name)}
              />
              {errors.name && (
                <span className="error-text">{errors.name.message}</span>
              )}
            </div>

            {/* Email */}
            <div className="light-form-group">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                placeholder="Enter your email"
                className={errors.email ? "error" : ""}
                {...register("email", validateSignup.email)}
              />
              {errors.email && (
                <span className="error-text">{errors.email.message}</span>
              )}
            </div>

            {/* Password */}
            <div className="light-form-group">
              <label htmlFor="password">Password</label>
              <div className="light-password-wrapper">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  placeholder="••••••••"
                  className={errors.password ? "error" : ""}
                  {...register("password", validateSignup.password)}
                />
                <button
                  type="button"
                  className="light-toggle-password"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
                </button>
              </div>

              {/* Password Requirements */}
              {password && (
                <div className="password-requirements">
                  <div className="requirement-item">
                    <span className={password.length >= 8 ? "met" : "unmet"}>
                      ✓ At least 8 characters
                    </span>
                  </div>
                  <div className="requirement-item">
                    <span className={/[a-z]/.test(password) ? "met" : "unmet"}>
                      ✓ Lowercase letter
                    </span>
                  </div>
                  <div className="requirement-item">
                    <span className={/[A-Z]/.test(password) ? "met" : "unmet"}>
                      ✓ Uppercase letter
                    </span>
                  </div>
                  <div className="requirement-item">
                    <span className={/\d/.test(password) ? "met" : "unmet"}>
                      ✓ Number
                    </span>
                  </div>
                  <div className="requirement-item">
                    <span
                      className={/[@$!%*?&]/.test(password) ? "met" : "unmet"}
                    >
                      ✓ Special character (@$!%*?&)
                    </span>
                  </div>

                  {/* Password Strength Bar */}
                  <div className="password-strength-bar">
                    <div
                      className="strength-fill"
                      style={{
                        width: `${(passwordStrength / 5) * 100}%`,
                        backgroundColor: getPasswordStrengthColor(),
                      }}
                    />
                  </div>
                </div>
              )}

              {errors.password && (
                <span className="error-text">{errors.password.message}</span>
              )}
            </div>

            {/* Create Button */}
            <button
              type="submit"
              disabled={isLoading || !isValid}
              className="create-light-btn"
            >
              {isLoading ? 'Creating account...' : 'Create Account →'}
            </button>
          </form>

          {/* Login Link */}
          <div className="light-login-link">
            Already have an account? <a href="/">Log in</a>
          </div>

          {/* Footer */}
          <div className="signup-footer-text">
            By clicking "Create Account", I agree to our{' '}
            <a href="#terms">Terms of Service</a> and{' '}
            <a href="#privacy">Privacy Policy</a>
          </div>
        </div>
      </div>
    </div>
  );
}
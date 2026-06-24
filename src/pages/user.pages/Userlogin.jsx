import { useState } from 'react';
import './UserLogin.css';
import { FcGoogle } from "react-icons/fc";
import { useLoginUserMutation } from '../../Apis/user.api';
import { useForm } from 'react-hook-form';
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../../firebase/firebase';
import { validateLogin } from '../../Validation/form.validation';


function getPasswordStrength(password) {
  if (!password) return { score: 0, label: '', color: '' };
  let score = 0;
  if (password.length >= 8) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[a-z]/.test(password)) score++;
  if (/\d/.test(password)) score++;
  if (/[@$!%*?&]/.test(password)) score++;

  if (score <= 2) return { score, label: 'Weak', color: 'strength-weak' };
  if (score === 3) return { score, label: 'Fair', color: 'strength-fair' };
  if (score === 4) return { score, label: 'Good', color: 'strength-good' };
  return { score, label: 'Strong', color: 'strength-strong' };
}

export default function ResumeAILogin() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [passwordValue, setPasswordValue] = useState('');
  const [LoginUser, { isLoading }] = useLoginUserMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    mode: 'onBlur',
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const watchedPassword = watch('password', '');
  const strength = getPasswordStrength(watchedPassword);

  const handleSignIn = async (data) => {
    try {
      const res = await LoginUser(data).unwrap();
      localStorage.setItem('accessToken', res.accessToken);
      if (res?.status) {
        toast.success('Login successful!');
        localStorage.setItem("accessToken", res.accessToken);
        localStorage.setItem("refreshToken", res.refreshToken);
        navigate('/home');
      }
    } catch (err) {
      toast.error(err?.data?.message || 'Login failed. Please try again.');
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const Provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, Provider);
      const token = await result.user.getIdToken();
      localStorage.setItem("accessToken", token);
      localStorage.setItem("refreshToken", result.user.refreshToken);
      toast.success('Login successful!');
      navigate('/home');
    } catch (error) {
      toast.error(error.message || 'Login failed. Please try again.');
    }
  };

  return (
    <div className="login-wrapper">
      {/* LEFT SECTION */}
      <div className="left-section">
        <div className="dark-logo">
            <div className="dark-logo-icon">⚡</div>
            <span className="dark-logo-text">ResumeAI</span>
          </div>

        <div className="left-center">
          <div className="left-badge">✦ Trusted by 50,000+ professionals</div>

          <h1 className="left-title">
            Optimize your <span className="left-title--highlight">career path</span> with precision.
          </h1>

          <p className="left-desc">
            Use AI to refine your resume and land interviews at top-tier companies.
          </p>

          <div className="stats-card">
            <div className="stats-grid">
              <div className="stat">
                <div className="stat-number">94%</div>
                <p className="stat-label">Success Rate</p>
              </div>
              <div className="stat">
                <div className="stat-number">2.4x</div>
                <p className="stat-label">More Interviews</p>
              </div>
              <div className="stat">
                <div className="stat-number">50k+</div>
                <p className="stat-label">Active Users</p>
              </div>
              <div className="stat">
                <div className="stat-number">4.9★</div>
                <p className="stat-label">User Rating</p>
              </div>
            </div>
          </div>
        </div>

        <div className="left-footer">
          <p className="testimonial">"Got my dream job in 3 weeks using ResumeAI"</p>
        </div>
      </div>

      {/* RIGHT SECTION - Login Form */}
      <div className="right-section">
        <div className="login-box">
          <h2 className="login-title">Welcome back</h2>
          <p className="login-subtitle">Please enter your details to sign in.</p>

          <form className="login-form" onSubmit={handleSubmit(handleSignIn)}>
            {/* Google Sign In Button */}
            <button
              type="button"
              className="google-btn"
              onClick={handleGoogleSignIn}
              disabled={isLoading}
            >
              <FcGoogle size={22} />
              Sign in with Google
            </button>

            {/* Divider */}
            <div className="divider">
              <span>OR CONTINUE WITH</span>
            </div>

            {/* Email Input */}
            <div className="form-group">
              <label htmlFor="email" className="form-label">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                placeholder="Enter your email"
                className={`form-input ${errors.email ? 'input-error' : ''}`}
                {...register('email', validateLogin.email)}
              />
              {errors.email && (
                <span className="error-message" role="alert">
                  <span className="error-icon">!</span>
                  {errors.email.message}
                </span>
              )}
            </div>

            {/* Password Input */}
            <div className="form-group">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <div className="password-wrapper">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  placeholder="••••••••"
                  className={`form-input ${errors.password ? 'input-error' : ''}`}
                  {...register('password', validateLogin.password)}
                />
                <button
                  type="button"
                  className="toggle-password-btn"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  tabIndex={0}
                >
                  {showPassword ? (
                    <Eye size={18} strokeWidth={2} />
                  ) : (
                    <EyeOff size={18} strokeWidth={2} />
                  )}
                </button>
              </div>

              {/* Password Strength Indicator */}
              {watchedPassword && !errors.password && (
                <div className="password-strength">
                  <div className="strength-bars">
                    {[1, 2, 3, 4, 5].map((bar) => (
                      <div
                        key={bar}
                        className={`strength-bar ${strength.score >= bar ? strength.color : ''}`}
                      />
                    ))}
                  </div>
                  <span className={`strength-label ${strength.color}`}>{strength.label}</span>
                </div>
              )}

              {/* Password Requirements Hints */}
              {watchedPassword && (
                <ul className="password-hints" aria-live="polite">
                  <li className={watchedPassword.length >= 8 ? 'hint-pass' : 'hint-fail'}>
                    <span className="hint-icon">{watchedPassword.length >= 8 ? '✓' : '✗'}</span>
                    At least 8 characters
                  </li>
                  <li className={/[A-Z]/.test(watchedPassword) ? 'hint-pass' : 'hint-fail'}>
                    <span className="hint-icon">{/[A-Z]/.test(watchedPassword) ? '✓' : '✗'}</span>
                    One uppercase letter
                  </li>
                  <li className={/[a-z]/.test(watchedPassword) ? 'hint-pass' : 'hint-fail'}>
                    <span className="hint-icon">{/[a-z]/.test(watchedPassword) ? '✓' : '✗'}</span>
                    One lowercase letter
                  </li>
                  <li className={/\d/.test(watchedPassword) ? 'hint-pass' : 'hint-fail'}>
                    <span className="hint-icon">{/\d/.test(watchedPassword) ? '✓' : '✗'}</span>
                    One number
                  </li>
                  <li className={/[@$!%*?&]/.test(watchedPassword) ? 'hint-pass' : 'hint-fail'}>
                    <span className="hint-icon">{/[@$!%*?&]/.test(watchedPassword) ? '✓' : '✗'}</span>
                    One special character (@$!%*?&)
                  </li>
                </ul>
              )}

              {errors.password && (
                <span className="error-message" role="alert">
                  <span className="error-icon">!</span>
                  {errors.password.message}
                </span>
              )}
            </div>

            {/* Forgot Password Link */}
            <div className="forgot-password-container">
              <a href="/forgot-password" className="forgot-password-link">
                Forgot password?
              </a>
            </div>

            {/* Sign In Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="signin-btn"
              aria-busy={isLoading}
            >
              {isLoading ? (
                <>
                  <span className="spinner"></span>
                  Signing in...
                </>
              ) : (
                'Sign In →'
              )}
            </button>
          </form>

          {/* Sign Up Link */}
          <div className="signup-link">
            <p>
              Don't have an account?{' '}
              <a href="/signup" className="signup-anchor">
                Sign up
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
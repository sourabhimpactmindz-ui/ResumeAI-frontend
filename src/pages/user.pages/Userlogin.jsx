import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import { Eye, EyeOff, ArrowLeft, AlertCircle } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../../firebase/firebase';
import { useGoogleLoginMutation, useLoginUserMutation } from '../../Apis/user.api';
import { validateLogin } from '../../Validation/form.validation';
import './auth.css';

function getPasswordStrength(password) {
  if (!password) return { score: 0, label: '', type: '' };
  let score = 0;
  if (password.length >= 8) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[a-z]/.test(password)) score++;
  if (/\d/.test(password)) score++;
  if (/[@$!%*?&]/.test(password)) score++;

  if (score <= 2) return { score, label: 'Weak', type: 'weak' };
  if (score === 3) return { score, label: 'Fair', type: 'fair' };
  if (score === 4) return { score, label: 'Good', type: 'good' };
  return { score, label: 'Strong', type: 'strong' };
}

export default function ResumeAILogin() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [GoogleLogin, { isLoading: isGoogleLoading }] = useGoogleLoginMutation();
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
      if (res?.status) {
        toast.success('Login successful!');
        localStorage.setItem('accessToken', res.accessToken);
        localStorage.setItem('refreshToken', res.refreshToken);
        navigate('/home', { replace: true });
      }
    } catch (err) {
      toast.error(err?.data?.message || 'Login failed. Please try again.');
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const firebaseToken = await result.user.getIdToken();

      const res = await GoogleLogin({
        token: firebaseToken,
      }).unwrap();

      localStorage.setItem('accessToken', res.accessToken);
      localStorage.setItem('refreshToken', res.refreshToken);
      toast.success('Login successful!');
      navigate('/home', { replace: true });
    } catch (error) {
      console.error(error);
      toast.error(error?.data?.message || error.message || 'Google sign in failed.');
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-progress" />

      {/* LEFT EDITORIAL SHOWCASE (Homee Style) */}
      <div className="auth-showcase">
        <div className="auth-showcase-top">
          <Link to="/" className="auth-logo">
            resumeAI
          </Link>
          <span className="auth-pill">✦ ATS Resume Checker</span>
        </div>

        <div className="auth-showcase-body">
          <h1 className="auth-showcase-title">
            An ATS reads your resume before any recruiter does.
          </h1>
          <p className="auth-showcase-desc">
            Sign in to check your ATS score, review keyword gaps, and tailor your resume for top roles in 30 seconds.
          </p>

          {/* Interactive Resume Mock from Homee */}
          <div className="auth-doc" aria-hidden="true">
            <div className="auth-scan-line" />
            <div className="auth-doc-head">
              <div className="auth-doc-name" />
              <div className="auth-doc-sub" />
            </div>
            <div className="auth-doc-block">
              <span className="auth-doc-h">Skills Match</span>
              <p>
                <mark className="auth-hit">React</mark>, <mark className="auth-hit">JavaScript</mark>,{' '}
                <mark className="auth-hit">REST API</mark>, Git, <mark className="auth-miss">TypeScript</mark>
              </p>
            </div>
            <div className="auth-doc-block">
              <span className="auth-doc-h">Experience</span>
              <div className="auth-line auth-w90" />
              <div className="auth-line auth-w75" />
            </div>
            <div className="auth-doc-tag">TypeScript is in the job post, not in your resume</div>
          </div>

          {/* Stats Bar */}
          <div className="auth-stats-grid">
            <div className="auth-stat-box">
              <strong>75%</strong>
              <p>rejected by ATS before human review</p>
            </div>
            <div className="auth-stat-box">
              <strong>40+</strong>
              <p>format & keyword checks in every scan</p>
            </div>
            <div className="auth-stat-box">
              <strong>30s</strong>
              <p>to get full score & actionable fixes</p>
            </div>
          </div>
        </div>

        <div className="auth-showcase-footer">
          <p className="auth-showcase-quote">
            "My score went from 48 to 86 and I got two interview calls within three weeks."
          </p>
          <span className="auth-showcase-author">Rohit S., Frontend Developer</span>
        </div>
      </div>

      {/* RIGHT AUTH FORM PANEL */}
      <div className="auth-form-panel">
        <div className="auth-form-container">
          {/* Mobile Header */}
          <div className="auth-mobile-header">
            <Link to="/" className="auth-logo">
              resumeAI
            </Link>
            <span className="auth-pill">ATS Score</span>
          </div>

          <div className="auth-form-header">
            <h2>Welcome back</h2>
            <p>Sign in with your email or Google account to continue.</p>
          </div>

          {/* Google Sign In */}
          <button
            type="button"
            className="auth-google-btn"
            onClick={handleGoogleSignIn}
            disabled={isLoading || isGoogleLoading}
          >
            <FcGoogle size={20} />
            <span>{isGoogleLoading ? 'Connecting...' : 'Sign in with Google'}</span>
          </button>

          <div className="auth-divider">
            <span>OR CONTINUE WITH EMAIL</span>
          </div>

          {/* Login Form */}
          <form className="auth-form" onSubmit={handleSubmit(handleSignIn)}>
            {/* Email Field */}
            <div className="auth-group">
              <label htmlFor="email" className="auth-label">
                Email Address
              </label>
              <div className="auth-input-wrapper">
                <input
                  type="email"
                  id="email"
                  placeholder="name@example.com"
                  className={`auth-input ${errors.email ? 'has-error' : ''}`}
                  {...register('email', validateLogin.email)}
                />
              </div>
              {errors.email && (
                <div className="auth-error-msg" role="alert">
                  <AlertCircle size={14} />
                  <span>{errors.email.message}</span>
                </div>
              )}
            </div>

            {/* Password Field */}
            <div className="auth-group">
              <div className="auth-label-row">
                <label htmlFor="password" className="auth-label">
                  Password
                </label>
                <a href="#forgot" className="auth-forgot-link">
                  Forgot password?
                </a>
              </div>
              <div className="auth-input-wrapper">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  placeholder="••••••••"
                  className={`auth-input ${errors.password ? 'has-error' : ''}`}
                  {...register('password', validateLogin.password)}
                />
                <button
                  type="button"
                  className="auth-toggle-pwd"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
                </button>
              </div>

              {/* Password Strength Indicator */}
              {watchedPassword && !errors.password && (
                <div className="auth-strength-container">
                  <div className="auth-strength-top">
                    <span>Password Strength</span>
                    <span style={{ textTransform: 'capitalize' }}>{strength.label}</span>
                  </div>
                  <div className="auth-strength-meter">
                    {[1, 2, 3, 4, 5].map((seg) => (
                      <div
                        key={seg}
                        className={`auth-strength-segment ${
                          strength.score >= seg ? `active-${strength.type}` : ''
                        }`}
                      />
                    ))}
                  </div>

                  <ul className="auth-requirements-list">
                    <li className={`auth-req-item ${watchedPassword.length >= 8 ? 'met' : ''}`}>
                      <span className="auth-req-icon">{watchedPassword.length >= 8 ? '✓' : '•'}</span>
                      8+ characters
                    </li>
                    <li className={`auth-req-item ${/[A-Z]/.test(watchedPassword) ? 'met' : ''}`}>
                      <span className="auth-req-icon">{/[A-Z]/.test(watchedPassword) ? '✓' : '•'}</span>
                      Uppercase letter
                    </li>
                    <li className={`auth-req-item ${/[a-z]/.test(watchedPassword) ? 'met' : ''}`}>
                      <span className="auth-req-icon">{/[a-z]/.test(watchedPassword) ? '✓' : '•'}</span>
                      Lowercase letter
                    </li>
                    <li className={`auth-req-item ${/\d/.test(watchedPassword) ? 'met' : ''}`}>
                      <span className="auth-req-icon">{/\d/.test(watchedPassword) ? '✓' : '•'}</span>
                      Number
                    </li>
                    <li className={`auth-req-item ${/[@$!%*?&]/.test(watchedPassword) ? 'met' : ''}`}>
                      <span className="auth-req-icon">{/[@$!%*?&]/.test(watchedPassword) ? '✓' : '•'}</span>
                      Special char (@$!%*?&)
                    </li>
                  </ul>
                </div>
              )}

              {errors.password && (
                <div className="auth-error-msg" role="alert">
                  <AlertCircle size={14} />
                  <span>{errors.password.message}</span>
                </div>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading || isGoogleLoading}
              className="auth-submit-btn"
            >
              {isLoading ? (
                <>
                  <span className="auth-spinner" />
                  <span>Signing in...</span>
                </>
              ) : (
                'Sign In →'
              )}
            </button>
          </form>

          {/* Switch to Signup */}
          <div className="auth-switch-text">
            Don't have an account?{' '}
            <Link to="/signup" className="auth-switch-link">
              Sign up
            </Link>
          </div>

          <div style={{ textAlign: 'center' }}>
            <Link to="/" className="auth-back-home">
              <ArrowLeft size={15} /> Back to home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

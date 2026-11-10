import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import { Eye, EyeOff, ArrowLeft, AlertCircle } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { GoogleAuthProvider, signInWithPopup, signInWithRedirect, getRedirectResult } from 'firebase/auth';
import { auth } from '../../firebase/firebase';
import { useGoogleLoginMutation, useLoginUserMutation } from '../../Apis/user.api';
import { validateLogin } from '../../Validation/form.validation';
import './auth.css';

// function getPasswordStrength(password) {
//   if (!password) return { score: 0, label: '', type: '' };
//   let score = 0;
//   if (password.length >= 8) score++;
//   if (/[A-Z]/.test(password)) score++;
//   if (/[a-z]/.test(password)) score++;
//   if (/\d/.test(password)) score++;
//   if (/[@$!%*?&]/.test(password)) score++;

//   if (score <= 2) return { score, label: 'Weak', type: 'weak' };
//   if (score === 3) return { score, label: 'Fair', type: 'fair' };
//   if (score === 4) return { score, label: 'Good', type: 'good' };
//   return { score, label: 'Strong', type: 'strong' };
// }

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

  // Handle redirect result (if popup was blocked and user was redirected to Google)
  useEffect(() => {
    let isMounted = true;
    getRedirectResult(auth)
      .then(async (result) => {
        if (!isMounted || !result?.user) return;
        const firebaseToken = await result.user.getIdToken();
        const res = await GoogleLogin({ token: firebaseToken }).unwrap();
        localStorage.setItem('accessToken', res.accessToken);
        localStorage.setItem('refreshToken', res.refreshToken);
        toast.success('Login successful!');
        navigate('/home', { replace: true });
      })
      .catch((error) => {
        if (error && error.code !== 'auth/credential-already-in-use') {
          console.error('Redirect sign-in error:', error);
          toast.error(error?.data?.message || error?.message || 'Google sign in failed.');
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
        toast.success('Login successful!');
        localStorage.setItem('accessToken', res.accessToken);
        localStorage.setItem('refreshToken', res.refreshToken);
        navigate('/home', { replace: true });
      }
    } catch (err) {
      if (err?.status === 'FETCH_ERROR' || err?.error?.includes('Failed to fetch')) {
        toast.error('Unable to connect to the backend server. Please verify your backend server is running and reachable.');
      } else {
        toast.error(err?.data?.message || err?.error || 'Login failed. Please try again.');
      }
    }
  };

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: 'select_account' });

    try {
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
      console.error('Google Sign-in error:', error);
      if (error?.code === 'auth/popup-blocked') {
        toast.info('Popup blocked by browser. Redirecting to Google Sign-in...');
        try {
          await signInWithRedirect(auth, provider);
        } catch (redirectErr) {
          console.error('Redirect error:', redirectErr);
          toast.error('Popup blocked by browser. Please allow popups in your address bar to continue.');
        }
      } else if (error?.code === 'auth/popup-closed-by-user') {
        toast.warn('Sign-in popup was closed.');
      } else if (error?.status === 'FETCH_ERROR' || error?.message?.includes('Failed to fetch') || error?.error?.includes('Failed to fetch')) {
        toast.error('Unable to connect to the backend server. Please verify your backend server is running and reachable.');
      } else {
        toast.error(error?.data?.message || error?.message || 'Google sign in failed.');
      }
    }
  };

  return (
    <div className="auth-page-centered">
      {/* Brand Header */}
      <div className="auth-brand-header">
        <Link to="/" className="auth-logo">
          resumeAI
        </Link>
        <span className="auth-pill">✦ ATS Resume Checker</span>
      </div>

      {/* Main Single-Column Auth Card */}
      <div className="auth-card">
        <div className="auth-card-header">
          <h2>Welcome back</h2>
          <p>Sign in to access your ATS scanner dashboard</p>
        </div>

        {/* Google Sign In */}
        <button
          type="button"
          className="auth-google-btn"
          onClick={handleGoogleSignIn}
          disabled={isLoading || isGoogleLoading}
        >
          <FcGoogle size={20} />
          <span>{isGoogleLoading ? 'Connecting...' : 'Continue with Google'}</span>
        </button>

        <div className="auth-divider">
          <span>OR CONTINUE WITH EMAIL</span>
        </div>

        {/* Login Form */}
        <form className="auth-form" onSubmit={handleSubmit(handleSignIn)}>
          {/* Email Address */}
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

          {/* Password */}
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
                      className={`auth-strength-segment ${strength.score >= seg ? `active-${strength.type}` : ''
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
                    Special (@$!%*?&)
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

        {/* Switch Link */}
        <div className="auth-switch-text">
          Don't have an account?{' '}
          <Link to="/signup" className="auth-switch-link">
            Sign up
          </Link>
        </div>
      </div>

      {/* Back to Home Link */}
      <Link to="/" className="auth-back-home">
        <ArrowLeft size={15} /> Back to home
      </Link>

      <p className="auth-trust-note">
        ✦ Safe & secure · Your resume is encrypted and private.
      </p>
    </div>
  );
}

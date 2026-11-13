import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import { Eye, EyeOff, ArrowLeft, AlertCircle } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { GoogleAuthProvider, signInWithPopup, signInWithRedirect, getRedirectResult } from 'firebase/auth';
import { auth } from '../../firebase/firebase';
import { useGoogleLoginMutation, useSignupUserMutation } from '../../Apis/user.api';
import { validateSignup } from '../../Validation/form.validation';
import './auth.css';

export default function ResumeAISignUp() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [SignupUser, { isLoading }] = useSignupUserMutation();
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [GoogleLogin] = useGoogleLoginMutation();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  });

  const password = watch('password', '');

  // Handle redirect result (if user was redirected to Google login)
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
        }
      });

    return () => {
      isMounted = false;
    };
  }, [GoogleLogin, navigate]);

  // Password strength calculation
  const getPasswordStrength = (pwd) => {
    if (!pwd) return { score: 0, label: '', type: '' };
    let score = 0;
    if (pwd.length >= 8) score++;
    if (/[a-z]/.test(pwd)) score++;
    if (/[A-Z]/.test(pwd)) score++;
    if (/\d/.test(pwd)) score++;
    if (/[@$!%*?&]/.test(pwd)) score++;

    if (score <= 2) return { score, label: 'Weak', type: 'weak' };
    if (score === 3) return { score, label: 'Fair', type: 'fair' };
    if (score === 4) return { score, label: 'Good', type: 'good' };
    return { score, label: 'Strong', type: 'strong' };
  };

  const strength = getPasswordStrength(password);

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
      if (err?.status === 'FETCH_ERROR' || err?.error?.includes('Failed to fetch')) {
        toast.error('Unable to connect to the backend server. Please verify your backend server is running and reachable.');
      } else {
        toast.error(err?.data?.message || err?.error || 'Signup failed. Please try again.');
      }
    }
  };

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: 'select_account' });

    try {
      setIsGoogleLoading(true);
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
        toast.error(error?.data?.message || error.message || 'Google sign in failed.');
      }
    } finally {
      setIsGoogleLoading(false);
    }
  };

  return (
    <div className="auth-page-centered">
      {/* Brand Header */}
      <div className="auth-brand-header">
        <Link to="/" className="auth-logo">
          resumeAI
        </Link>
        {/* <span className="auth-pill">✦ Free ATS Scan</span> */}
      </div>

      {/* Main Single-Column Auth Card */}
      <div className="auth-card">
        <div className="auth-card-header">
          <h2>Create your account</h2>
          <p>Start scanning your resume for ATS compatibility</p>
        </div>

        {/* Google Sign In */}
        <button
          type="button"
          className="auth-google-btn"
          onClick={handleGoogleSignIn}
          disabled={isLoading || isGoogleLoading}
        >
          <FcGoogle size={20} />
          <span>{isGoogleLoading ? 'Connecting...' : 'Sign up with Google'}</span>
        </button>

        <div className="auth-divider">
          <span>OR SIGN UP WITH EMAIL</span>
        </div>

        {/* Signup Form */}
        <form className="auth-form" onSubmit={handleSubmit(handleSignUp)}>
          {/* Full Name */}
          <div className="auth-group">
            <label htmlFor="fullName" className="auth-label">
              Full Name
            </label>
            <div className="auth-input-wrapper">
              <input
                type="text"
                id="fullName"
                placeholder="Enter your name"
                className={`auth-input ${errors.name ? 'has-error' : ''}`}
                {...register('name', validateSignup.name)}
              />
            </div>
            {errors.name && (
              <div className="auth-error-msg" role="alert">
                <AlertCircle size={14} />
                <span>{errors.name.message}</span>
              </div>
            )}
          </div>

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
                {...register('email', validateSignup.email)}
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
            <label htmlFor="password" className="auth-label">
              Password
            </label>
            <div className="auth-input-wrapper">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                placeholder="••••••••"
                className={`auth-input ${errors.password ? 'has-error' : ''}`}
                {...register('password', validateSignup.password)}
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
            {password && (
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
                  <li className={`auth-req-item ${password.length >= 8 ? 'met' : ''}`}>
                    <span className="auth-req-icon">{password.length >= 8 ? '✓' : '•'}</span>
                    8+ characters
                  </li>
                  <li className={`auth-req-item ${/[A-Z]/.test(password) ? 'met' : ''}`}>
                    <span className="auth-req-icon">{/[A-Z]/.test(password) ? '✓' : '•'}</span>
                    Uppercase letter
                  </li>
                  <li className={`auth-req-item ${/[a-z]/.test(password) ? 'met' : ''}`}>
                    <span className="auth-req-icon">{/[a-z]/.test(password) ? '✓' : '•'}</span>
                    Lowercase letter
                  </li>
                  <li className={`auth-req-item ${/\d/.test(password) ? 'met' : ''}`}>
                    <span className="auth-req-icon">{/\d/.test(password) ? '✓' : '•'}</span>
                    Number
                  </li>
                  <li className={`auth-req-item ${/[@$!%*?&]/.test(password) ? 'met' : ''}`}>
                    <span className="auth-req-icon">{/[@$!%*?&]/.test(password) ? '✓' : '•'}</span>
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
            disabled={isLoading || isGoogleLoading || !isValid}
            className="auth-submit-btn"
          >
            {isLoading ? (
              <>
                <span className="auth-spinner" />
                <span>Creating account...</span>
              </>
            ) : (
              'Create Account →'
            )}
          </button>
        </form>

        {/* Switch Link */}
        <div className="auth-switch-text">
          Already have an account?{' '}
          <Link to="/login" className="auth-switch-link">
            Sign in
          </Link>
        </div>

        <div className="auth-terms-text">
          By creating an account, you agree to our{' '}
          <Link to="/terms">Terms</Link> and <Link to="/policy">Privacy Policy</Link>.
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

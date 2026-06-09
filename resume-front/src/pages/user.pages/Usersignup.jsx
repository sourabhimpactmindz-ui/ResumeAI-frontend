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

export default function ResumeAISignUp2() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [SignupUser , {isLoading}] = useSignupUserMutation();
  const [user , setuser] = useState(null);

  const {
    register,
    handleSubmit,
    formState: {errors},

  } = useForm()

  const handleSignUp = async(data) => {
    try{
      const res = await SignupUser(data).unwrap();
      if(res?.status){
        toast.success('OTP Sent Successful');
        navigate('/verifyOTP',{
          state : {
            email : data.email,
          }
        });
      }
    }catch(err){
        toast.error(err?.data?.message || 'Signup failed. Please try again.');
      }
  };

  const handleGoogleSignUp = async() => {
    try{
      const Provider = new GoogleAuthProvider()
          const result = await signInWithPopup(auth , Provider)
            const token = await result.user.getIdToken()
            localStorage.setItem("accessToken",token)
          toast.success('Login successful!');
          setuser(result.user)
          navigate('/home'); 
    }catch(error){
      toast.error(error.message || 'Login failed. Please try again.');
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
          <div className="stars" style={{color: '#fbbf24'}}>★★★★★</div>
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
>
  <FcGoogle size={22} />
  Sign in with Google
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
                name="name"
                placeholder="enter your full name"
                {...register('name' , {required : 'Full name is required'})}
                required
              />
            </div>

            {/* Email */}
            <div className="light-form-group">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="enter your email"
                {...register('email' , {required : 'Email is required'})}
                required
              />
            </div>

            {/* Password */}
            <div className="light-form-group">
              <label htmlFor="password">Password</label>
              <div className="light-password-wrapper">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  placeholder="••••••••"
                  {...register('password' , {required : 'Password is required'})}
                  required
                />
                <button
                  type="button"
                  className="light-toggle-password"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
                </button>
              </div>
            </div>

            {/* Password Requirement */}
            <p className="password-requirement">
              Must be at least 8 characters.
            </p>

            {/* Create Button */}
            <button type="submit" disabled={isLoading} className="create-light-btn">
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
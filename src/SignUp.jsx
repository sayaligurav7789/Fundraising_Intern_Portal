import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, User, Mail, Lock, ArrowRight } from 'lucide-react';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from './firebaseConfig'; 

const SignUp = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    // Clear error message when user starts typing
    if (errorMsg) {
      setErrorMsg('');
    }
  };

  const validateForm = () => {
    const { fullName, email, password, confirmPassword } = formData;
    
    if (!fullName.trim()) {
      setErrorMsg("Full name is required");
      return false;
    }
    
    if (!email.trim()) {
      setErrorMsg("Email is required");
      return false;
    }
    
    if (password.length < 6) {
      setErrorMsg("Password must be at least 6 characters long");
      return false;
    }
    
    if (password !== confirmPassword) {
      setErrorMsg("Passwords do not match");
      return false;
    }
    
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!validateForm()) {
      return;
    }

    const { fullName, email, password } = formData;

    try {
      setIsLoading(true);
      
      // Create user with email and password
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      // Update the user's display name
      await updateProfile(user, {
        displayName: fullName
      });
      
      console.log('User created successfully:', {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName
      });

      // Navigate to sign in page with success message
      navigate('/signin', {
        state: { message: 'Account created successfully! Please sign in.' }
      });
      
    } catch (error) {
      console.error("Signup error:", error);
      
      // Handle specific Firebase errors
      switch (error.code) {
        case 'auth/email-already-in-use':
          setErrorMsg('This email is already registered. Please use a different email or sign in.');
          break;
        case 'auth/invalid-email':
          setErrorMsg('Please enter a valid email address.');
          break;
        case 'auth/operation-not-allowed':
          setErrorMsg('Email/password accounts are not enabled. Please contact support.');
          break;
        case 'auth/weak-password':
          setErrorMsg('Password is too weak. Please choose a stronger password.');
          break;
        case 'auth/network-request-failed':
          setErrorMsg('Network error. Please check your internet connection and try again.');
          break;
        default:
          setErrorMsg('An error occurred during signup. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex">
      {/* Form */}
      <div className="flex-1 flex items-center justify-center px-8 py-12 lg:px-12">
        <div className="w-full max-w-md">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">Create Account</h1>
            <p className="text-gray-400">Join us and start your fundraising journey today</p>
          </div>

          {errorMsg && (
            <div className="text-red-500 bg-red-900/30 border border-red-500/30 px-4 py-3 mb-4 rounded-lg">
              {errorMsg}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6" autoComplete="off">
            {/* Full Name */}
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-gray-300 mb-2">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your full name"
                  autoComplete="name"
                  required
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your email"
                  autoComplete="username"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-12 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your password"
                  autoComplete="new-password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-300 mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-12 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Confirm your password"
                  autoComplete="new-password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300"
                >
                  {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 disabled:cursor-not-allowed text-white font-semibold py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors duration-200"
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Creating Account...
                </>
              ) : (
                <>
                  Create Account
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </form>

          {/* Sign In Link */}
          <div className="mt-6 text-center">
            <p className="text-gray-400">
              Already have an account?{' '}
              <Link to="/signin" className="text-blue-500 hover:text-blue-400 font-medium transition-colors duration-200">
                Sign in here
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Illustration */}
      <div className="hidden lg:flex flex-1 items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-800 p-12">
        <div className="max-w-lg text-center">
            <div className="mb-8">
            <svg
              viewBox="0 0 500 400"
              className="w-full h-80 mb-6"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Background Circle */}
              <circle cx="250" cy="200" r="180" fill="url(#gradient2)" opacity="0.1" />
              
              {/* Desktop Computer */}
              <rect x="180" y="180" width="140" height="100" rx="8" fill="#1f2937" />
              <rect x="190" y="190" width="120" height="70" rx="4" fill="#111827" />
              
              {/* Screen Content - Dashboard */}
              <rect x="200" y="200" width="100" height="4" rx="2" fill="#3B82F6" />
              <rect x="200" y="210" width="60" height="4" rx="2" fill="#10B981" />
              <rect x="200" y="220" width="80" height="4" rx="2" fill="#6B7280" />
              
              {/* Charts/Graphics */}
              <circle cx="270" cy="230" r="12" fill="#8B5CF6" opacity="0.6" />
              <rect x="200" y="240" width="15" height="15" rx="2" fill="#F59E0B" />
              <rect x="220" y="240" width="15" height="15" rx="2" fill="#EF4444" />
              <rect x="240" y="240" width="15" height="15" rx="2" fill="#10B981" />
              
              {/* Computer Stand */}
              <rect x="240" y="280" width="20" height="20" fill="#374151" />
              <rect x="220" y="300" width="60" height="8" rx="4" fill="#374151" />
              
              {/* Person at Computer */}
              <ellipse cx="250" cy="360" rx="60" ry="10" fill="#1f2937" opacity="0.3" />
              
              {/* Person Body */}
              <ellipse cx="250" cy="320" rx="25" ry="35" fill="#3B82F6" />
              
              {/* Person Head */}
              <circle cx="250" cy="270" r="20" fill="#F3F4F6" />
              
              {/* Hair */}
              <path d="M235 260 Q250 250 265 260 Q260 255 250 255 Q240 255 235 260" fill="#1f2937" />
              
              {/* Face */}
              <circle cx="245" cy="270" r="1.5" fill="#1f2937" />
              <circle cx="255" cy="270" r="1.5" fill="#1f2937" />
              <path d="M247 275 Q250 277 253 275" stroke="#1f2937" strokeWidth="1" fill="none" />
              
              {/* Arms */}
              <ellipse cx="225" cy="300" rx="8" ry="20" fill="#F3F4F6" transform="rotate(-15 225 300)" />
              <ellipse cx="275" cy="300" rx="8" ry="20" fill="#F3F4F6" transform="rotate(15 275 300)" />
              
              {/* Floating UI Elements */}
              <g transform="translate(100, 100)" opacity="0.7">
                <rect width="40" height="30" rx="6" fill="#3B82F6" />
                <circle cx="20" cy="15" r="6" fill="white" />
                <path d="M16 15 L18 17 L24 11" stroke="#3B82F6" strokeWidth="2" fill="none" />
              </g>
              
              <g transform="translate(350, 130)" opacity="0.7">
                <circle r="20" fill="#10B981" />
                <path d="M-8 -4 L-4 0 L8 -12" stroke="white" strokeWidth="3" fill="none" />
                <path d="M-8 4 L-4 8 L8 -4" stroke="white" strokeWidth="3" fill="none" />
              </g>
              
              {/* Security Lock */}
              <g transform="translate(120, 160)" opacity="0.8">
                <rect x="-8" y="2" width="16" height="12" rx="2" fill="#EF4444" />
                <path d="M-4 2 Q-4 -2 0 -2 Q4 -2 4 2" stroke="#EF4444" strokeWidth="2" fill="none" />
                <circle cx="0" cy="8" r="1.5" fill="white" />
              </g>

              <defs>
                <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#8B5CF6" />
                  <stop offset="100%" stopColor="#3B82F6" />
                </linearGradient>
              </defs>
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-white mb-4">Welcome to the Fundraising Intern Portal</h2>
          <p className="text-gray-300 text-lg leading-relaxed">
            Join our mission-driven community of interns making a real impact. Sign up to track your referrals, monitor donations raised, and unlock exciting rewards!
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
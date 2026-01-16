'use client';

import { useState, useEffect } from 'react';
import { FaTimes, FaUser, FaEnvelope, FaLock, FaSpinner } from 'react-icons/fa';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: 'login' | 'signup';
  onSuccess: (user: { name?: string; email: string }, wasSignup: boolean) => void;
}

export default function AuthModal({ isOpen, onClose, mode: initialMode, onSuccess }: AuthModalProps) {
  const [mode, setMode] = useState<'login' | 'signup'>(initialMode);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  // Sync internal mode state with prop whenever it changes
  useEffect(() => {
    setMode(initialMode);
  }, [initialMode]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (mode === 'signup') {
        // SIGNUP FLOW
        const response = await fetch('/api/auth/signup', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });

        const data = await response.json();

        if (data.success) {
          // Store user credentials for future login validation
          const users = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
          users.push({
            name: formData.name,
            email: formData.email,
            password: formData.password, // In production, this should be hashed!
          });
          localStorage.setItem('registeredUsers', JSON.stringify(users));
          
          // Store current user session
          localStorage.setItem('user', JSON.stringify({ name: formData.name, email: formData.email }));
          
          alert(data.message);
          onSuccess({ name: formData.name, email: formData.email }, true);
          onClose();
          setFormData({ name: '', email: '', password: '' });
        } else {
          alert(data.message || 'Something went wrong!');
        }
      } else {
        // LOGIN FLOW - Validate against stored credentials
        const users = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
        const user = users.find((u: any) => u.email === formData.email);

        if (!user) {
          alert('😅 No account found with this email. Please sign up first!');
          setLoading(false);
          return;
        }

        if (user.password !== formData.password) {
          alert('😅 Incorrect password. Please try again!');
          setLoading(false);
          return;
        }

        // Login successful
        const response = await fetch('/api/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: formData.email, password: formData.password }),
        });

        const data = await response.json();

        if (data.success) {
          localStorage.setItem('user', JSON.stringify({ name: user.name, email: user.email }));
          alert(data.message);
          onSuccess({ name: user.name, email: user.email }, false);
          onClose();
          setFormData({ name: '', email: '', password: '' });
        } else {
          alert(data.message || 'Something went wrong!');
        }
      }
    } catch (error) {
      console.error('Auth error:', error);
      alert('😅 Oops! Something went wrong. Please check your connection and try again!');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const toggleMode = () => {
    setMode(mode === 'login' ? 'signup' : 'login');
    setFormData({ name: '', email: '', password: '' });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 relative animate-fade-in">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <FaTimes className="text-xl" />
        </button>

        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            {mode === 'login' ? '👋 Welcome Back!' : '🎉 Join PortfolioAI'}
          </h2>
          <p className="text-gray-600">
            {mode === 'login' 
              ? 'Great to see you again! Log in to continue building.' 
              : 'Create your account and start building amazing portfolios today!'}
          </p>
          {mode === 'signup' && !localStorage.getItem('hasSignedUp') && (
            <div className="mt-3 p-3 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-sm text-green-800 font-medium">
                ✨ First time here? You're in the right place!
              </p>
            </div>
          )}
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {mode === 'signup' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                <FaUser className="text-blue-600" /> Your Name
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => handleChange('name', e.target.value)}
                placeholder="Mahesh Kumar"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
              <FaEnvelope className="text-blue-600" /> Email Address
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => handleChange('email', e.target.value)}
              placeholder="you@example.com"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
              <FaLock className="text-blue-600" /> Password
            </label>
            <input
              type="password"
              value={formData.password}
              onChange={(e) => handleChange('password', e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
              minLength={6}
            />
            {mode === 'signup' && (
              <p className="text-xs text-gray-500 mt-1">
                💡 At least 6 characters
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <FaSpinner className="animate-spin" />
                {mode === 'login' ? 'Logging in...' : 'Creating account...'}
              </>
            ) : (
              mode === 'login' ? '🚀 Log In' : '✨ Create Account'
            )}
          </button>
        </form>

        {/* Toggle Mode */}
        <div className="mt-6 text-center">
          <p className="text-gray-600">
            {mode === 'login' ? "Don't have an account?" : 'Already have an account?'}
            {' '}
            <button
              onClick={toggleMode}
              className="text-blue-600 font-semibold hover:underline"
            >
              {mode === 'login' ? 'Sign Up' : 'Log In'}
            </button>
          </p>
        </div>

        {/* Additional Info for Signup */}
        {mode === 'signup' && (
          <div className="mt-4 p-4 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-800 text-center">
              📧 We'll send you a welcome email to get started!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

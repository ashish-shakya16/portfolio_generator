'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FaRocket, FaCode, FaPalette, FaDownload, FaArrowRight, FaUser, FaSignOutAlt } from 'react-icons/fa';
import AuthModal from '@/components/AuthModal';

export default function Home() {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState('login');
  const [user, setUser] = useState(null);
  const [isFirstTimeVisitor, setIsFirstTimeVisitor] = useState(false);

  useEffect(() => {
    // Check if user is logged in
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      return;
    }

    // Check if user has visited before
    const hasVisited = localStorage.getItem('hasVisitedBefore');
    const hasSignedUp = localStorage.getItem('hasSignedUp');
    
    if (!hasVisited && !hasSignedUp) {
      // First time visitor - mark as visited
      setIsFirstTimeVisitor(true);
      localStorage.setItem('hasVisitedBefore', 'true');
    } else {
      setIsFirstTimeVisitor(false);
    }
  }, []);

  const handleAuthSuccess = (userData, wasSignup) => {
    setUser(userData);
    
    // If they just signed up, mark it
    if (wasSignup) {
      localStorage.setItem('hasSignedUp', 'true');
    }
  };

  const handleLogout = () => {
    if (confirm('👋 Are you sure you want to log out?')) {
      localStorage.removeItem('user');
      setUser(null);
      alert('✨ Logged out successfully! See you soon!');
    }
  };

  const openAuthModal = (mode) => {
    // Auto-detect mode based on visitor status if not specified
    if (!mode) {
      const hasSignedUp = localStorage.getItem('hasSignedUp');
      mode = hasSignedUp ? 'login' : 'signup';
    }
    setAuthMode(mode);
    setShowAuthModal(true);
  };

  const handleCreatePortfolio = () => {
    if (user) {
      // User is logged in, go directly to builder
      window.location.href = '/builder';
    } else {
      // User not logged in, show auth modal
      openAuthModal();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="container mx-auto px-6 py-8">
        <nav className="flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <Image src="/logo.svg" alt="PortfolioAI" width={48} height={48} className="rounded-xl shadow-lg" />
            <h1 className="text-3xl font-bold text-gray-800 font-[family-name:var(--font-dancing)]">PortfolioAI</h1>
          </div>
          <div className="flex items-center gap-3">
            {user ? (
              <>
                <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg border border-gray-200">
                  <FaUser className="text-blue-600" />
                  <span className="text-sm font-medium text-gray-700">
                    {user.name || user.email}
                  </span>
                </div>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                >
                  <FaSignOutAlt />
                  <span className="text-sm font-medium">Logout</span>
                </button>
                <Link
                  href="/builder"
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  My Portfolio
                </Link>
              </>
            ) : (
              <>
                {isFirstTimeVisitor ? (
                  // First time visitor - emphasize signup
                  <>
                    <button
                      onClick={() => openAuthModal('login')}
                      className="px-6 py-2 text-gray-700 font-medium hover:text-blue-600 transition-colors"
                    >
                      Log In
                    </button>
                    <button
                      onClick={() => openAuthModal('signup')}
                      className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg animate-pulse-slow"
                    >
                      🎉 Get Started Free
                    </button>
                  </>
                ) : (
                  // Returning visitor - show both equally
                  <>
                    <button
                      onClick={() => openAuthModal('login')}
                      className="px-6 py-2 text-gray-700 font-medium hover:text-blue-600 transition-colors"
                    >
                      Log In
                    </button>
                    <button
                      onClick={() => openAuthModal('signup')}
                      className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Sign Up
                    </button>
                  </>
                )}
              </>
            )}
          </div>
        </nav>
      </header>

      {/* Auth Modal */}
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        mode={authMode}
        onSuccess={handleAuthSuccess}
      />

      {/* Hero Section */}
      <section className="container mx-auto px-6 py-20 text-center">
        <div className="max-w-4xl mx-auto animate-fade-in">
          <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Build Your Dream Portfolio ✨
            <span className="block text-blue-600 mt-2">In Minutes, Not Hours</span>
          </h2>
          <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
            Create a stunning portfolio that stands out. No coding required, completely free!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={handleCreatePortfolio}
              className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 hover:scale-105 transform duration-200"
            >
              {isFirstTimeVisitor ? '🚀 Start Building' : '🎨 Create Portfolio'} <FaArrowRight />
            </button>
            <Link
              href="/templates"
              className="bg-white text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold border-2 border-blue-600 hover:bg-blue-50 transition-colors hover:scale-105 transform duration-200"
            >
              👀 View Templates
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-6 py-20">
        <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">
          Everything You Need to Stand Out
        </h3>
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <FeatureCard
            icon={<FaPalette className="text-4xl text-purple-600" />}
            title="Templates That Make You Shine ✨"
            description="Pick from 5 gorgeous designs that match your style. Whether you're minimal, modern, or bold - we've got you covered!"
          />
          <FeatureCard
            icon={<FaCode className="text-4xl text-blue-600" />}
            title="Your AI Writing Assistant 🤖"
            description="Stuck on what to write? Our friendly AI helps polish your bio, suggests better wording, and makes everything sound professional."
          />
          <FeatureCard
            icon={<FaDownload className="text-4xl text-green-600" />}
            title="Share It With The World 🌍"
            description="Download your portfolio as a website or PDF. Show it off anywhere - it's yours to share however you like!"
          />
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          <FeatureCard
            icon={<FaRocket className="text-4xl text-orange-600" />}
            title="Fast & Simple"
            description="Build your complete portfolio in under 10 minutes with our intuitive step-by-step builder."
          />
          <FeatureCard
            icon={<FaPalette className="text-4xl text-pink-600" />}
            title="Fully Customizable"
            description="Change colors, fonts, and layout. Make it truly yours with complete design control."
          />
          <FeatureCard
            icon={<FaCode className="text-4xl text-indigo-600" />}
            title="SEO Optimized"
            description="Built-in SEO best practices to help your portfolio rank higher in search results."
          />
        </div>
      </section>

      {/* How It Works */}
      <section className="container mx-auto px-6 py-20 bg-white rounded-3xl shadow-xl my-20">
        <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">
          How It Works
        </h3>
        <div className="grid md:grid-cols-4 gap-8">
          <StepCard number="1" title="Enter Your Details" description="Add your info, skills, projects, and experience" />
          <StepCard number="2" title="Choose Template" description="Select from 5 beautiful design templates" />
          <StepCard number="3" title="Customize" description="Adjust colors, fonts, and section order" />
          <StepCard number="4" title="Export & Deploy" description="Download or deploy your portfolio instantly" />
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-6 py-20 text-center">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-12 text-white">
          <h3 className="text-4xl font-bold mb-4">Ready to Get Started?</h3>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of professionals who created their portfolio with PortfolioAI
          </p>
          <Link
            href="/builder"
            className="inline-block bg-white text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            Create Your Portfolio Now
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-gray-900 to-gray-800 text-white border-t border-gray-700 mt-12">
        <div className="container mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div>
                <p className="text-sm text-gray-300">Developed with ❤️ by</p>
                <p className="font-bold text-lg bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  Ashish Shakya
                </p>
              </div>
            </div>
            <div className="text-center md:text-right">
              <p className="text-sm text-gray-400">
                AI-Powered Portfolio Generator © {new Date().getFullYear()}
              </p>
              <p className="text-xs text-gray-500 mt-1">
                Create stunning portfolios in minutes
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, description }) {
  return (
    <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
      <div className="mb-4">{icon}</div>
      <h4 className="text-xl font-bold text-gray-900 mb-3">{title}</h4>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}

function StepCard({ number, title, description }) {
  return (
    <div className="text-center">
      <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
        {number}
      </div>
      <h4 className="text-lg font-bold text-gray-900 mb-2">{title}</h4>
      <p className="text-gray-600 text-sm">{description}</p>
    </div>
  );
}

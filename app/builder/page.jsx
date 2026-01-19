'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { usePortfolioStore } from '@/store/portfolioStore';
import PersonalInfoForm from '@/components/forms/PersonalInfoForm';
import SkillsForm from '@/components/forms/SkillsFormSimple';
import EducationForm from '@/components/forms/EducationForm';
import ExperienceForm from '@/components/forms/ExperienceForm';
import ProjectsForm from '@/components/forms/ProjectsForm';
import ContactForm from '@/components/forms/ContactForm';
import TemplateSelector from '@/components/TemplateSelector';
import CustomizationPanel from '@/components/CustomizationPanel';
import PortfolioPreview from '@/components/PortfolioPreview';
import ExportPanel from '@/components/ExportPanel';
import { FaArrowLeft, FaArrowRight, FaEye, FaDownload, FaUser } from 'react-icons/fa';
import Link from 'next/link';
import { sampleData } from '@/data/sampleData';



export default function BuilderPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState('personal');
  const [showPreview, setShowPreview] = useState(false);
  const [showExport, setShowExport] = useState(false);
  const [user, setUser] = useState(null);
  const [isChecking, setIsChecking] = useState(true);
  const loadSampleData = usePortfolioStore((state) => state.loadSampleData);
  const updateConfig = usePortfolioStore((state) => state.updateConfig);

  // Check authentication - redirect if not logged in
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedUser = localStorage.getItem('user');
      
      if (!storedUser) {
        // Not logged in - redirect to home with message
        alert('🔒 Please login or signup to access the Portfolio Builder!');
        router.push('/');
        return;
      }
      
      setUser(JSON.parse(storedUser));
      setIsChecking(false);
      
      // Check if this is their first time in builder
      const hasUsedBuilder = localStorage.getItem('hasUsedBuilder');
      if (!hasUsedBuilder) {
        localStorage.setItem('hasUsedBuilder', 'true');
        // Show welcome message for first time in builder
        setTimeout(() => {
          alert('🎉 Welcome to the Portfolio Builder! Let\'s create something amazing together. Start by filling in your personal info, or click "Load Sample" to see an example!');
        }, 500);
      }
    }
  }, [router]);

  // Load selected template from templates page
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const selectedTemplate = localStorage.getItem('selectedTemplate');
      if (selectedTemplate) {
        updateConfig({ template: selectedTemplate });
        localStorage.removeItem('selectedTemplate'); // Clear after loading
        setCurrentStep('template'); // Go to template step to show the selection
      }
    }
  }, [updateConfig]);

  const steps = [
    { id: 'personal', label: 'Personal Info', icon: '👤' },
    { id: 'skills', label: 'Skills', icon: '💪' },
    { id: 'education', label: 'Education', icon: '🎓' },
    { id: 'experience', label: 'Experience', icon: '💼' },
    { id: 'projects', label: 'Projects', icon: '🚀' },
    { id: 'contact', label: 'Contact', icon: '📧' },
    { id: 'template', label: 'Template', icon: '🎨' },
    { id: 'customize', label: 'Customize', icon: '⚙️' },
    { id: 'preview', label: 'Preview', icon: '👁️' },
  ];

  const currentStepIndex = steps.findIndex((s) => s.id === currentStep);

  const nextStep = () => {
    if (currentStepIndex < steps.length - 1) {
      setCurrentStep(steps[currentStepIndex + 1].id);
    }
  };

  const prevStep = () => {
    if (currentStepIndex > 0) {
      setCurrentStep(steps[currentStepIndex - 1].id);
    }
  };

  const handleLoadSample = () => {
    const confirmed = window.confirm('Want to see an example? 💡\n\nThis will replace your current data with sample content to help you understand how it works.');
    if (confirmed) {
      try {
        loadSampleData(sampleData);
        alert('🎉 Perfect! Take a look at the sample content. Feel free to edit anything!');
      } catch (error) {
        console.error('Error loading sample data:', error);
        alert('😅 Oops! Something went wrong loading the sample. Mind trying again?');
      }
    }
  };

  // Show loading while checking auth
  if (isChecking) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Checking authentication...</p>
        </div>
      </div>
    );
  }

  // If no user after checking, return null (will redirect)
  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-40">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/" className="text-blue-600 hover:text-blue-700">
                <FaArrowLeft className="text-xl" />
              </Link>
              <h1 className="text-2xl font-bold text-gray-800">Portfolio Builder</h1>
              {user && (
                <div className="flex items-center gap-2 px-3 py-1.5 bg-blue-50 rounded-lg border border-blue-200 ml-4">
                  <FaUser className="text-blue-600 text-sm" />
                  <span className="text-sm font-medium text-blue-800">
                    {user.name || user.email}
                  </span>
                </div>
              )}
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={handleLoadSample}
                className="px-4 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Load Sample
              </button>
              <button
                onClick={() => setShowPreview(!showPreview)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
              >
                <FaEye /> {showPreview ? 'Hide' : 'Show'} Preview
              </button>
              <button
                onClick={() => setShowExport(true)}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
              >
                <FaDownload /> Export
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Progress Bar */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between overflow-x-auto">
            {steps.map((step, index) => (
              <button
                key={step.id}
                onClick={() => setCurrentStep(step.id)}
                className={`flex flex-col items-center space-y-1 px-4 py-2 rounded-lg transition-colors ${
                  currentStep === step.id
                    ? 'bg-blue-100 text-blue-600'
                    : index < currentStepIndex
                    ? 'text-green-600'
                    : 'text-gray-400'
                }`}
              >
                <span className="text-2xl">{step.icon}</span>
                <span className="text-xs font-medium whitespace-nowrap">{step.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-8">
        <div className={`grid ${showPreview ? 'grid-cols-1 lg:grid-cols-2' : 'grid-cols-1'} gap-8`}>
          {/* Form Section */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                {steps.find((s) => s.id === currentStep)?.label}
              </h2>
              <p className="text-gray-600 mt-2">
                {currentStep === 'personal' && 'Tell us about yourself'}
                {currentStep === 'skills' && 'What are your key skills?'}
                {currentStep === 'education' && 'Add your educational background'}
                {currentStep === 'experience' && 'Share your work experience'}
                {currentStep === 'projects' && 'Showcase your best projects'}
                {currentStep === 'contact' && 'How can people reach you?'}
                {currentStep === 'template' && 'Choose a design template'}
                {currentStep === 'customize' && 'Personalize colors and layout'}
                {currentStep === 'preview' && 'Review your portfolio'}
              </p>
            </div>

            {/* Form Components */}
            {currentStep === 'personal' && <PersonalInfoForm />}
            {currentStep === 'skills' && <SkillsForm />}
            {currentStep === 'education' && <EducationForm />}
            {currentStep === 'experience' && <ExperienceForm />}
            {currentStep === 'projects' && <ProjectsForm />}
            {currentStep === 'contact' && <ContactForm />}
            {currentStep === 'template' && <TemplateSelector />}
            {currentStep === 'customize' && <CustomizationPanel />}
            {currentStep === 'preview' && (
              <div className="text-center py-8">
                <p className="text-gray-600 mb-4">Your portfolio is ready!</p>
                <button
                  onClick={() => setShowExport(true)}
                  className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  Export Portfolio
                </button>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8 pt-6 border-t">
              <button
                onClick={prevStep}
                disabled={currentStepIndex === 0}
                className={`px-6 py-3 rounded-lg flex items-center gap-2 transition-colors ${
                  currentStepIndex === 0
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                <FaArrowLeft /> Previous
              </button>
              <button
                onClick={nextStep}
                disabled={currentStepIndex === steps.length - 1}
                className={`px-6 py-3 rounded-lg flex items-center gap-2 transition-colors ${
                  currentStepIndex === steps.length - 1
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
              >
                Next <FaArrowRight />
              </button>
            </div>
          </div>

          {/* Preview Section */}
          {showPreview && (
            <div className="bg-white rounded-xl shadow-lg p-8 sticky top-24 max-h-[calc(100vh-120px)] overflow-y-auto">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Live Preview</h3>
              <div className="border rounded-lg overflow-hidden">
                <PortfolioPreview />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Export Modal */}
      {showExport && <ExportPanel onClose={() => setShowExport(false)} />}

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

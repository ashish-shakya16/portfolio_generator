'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { FaArrowLeft, FaArrowRight, FaCheck } from 'react-icons/fa';
import MinimalTemplate from '@/components/templates/MinimalTemplate';
import ModernTemplate from '@/components/templates/ModernTemplate';
import DarkTemplate from '@/components/templates/DarkTemplate';
import StudentTemplate from '@/components/templates/StudentTemplate';
import ProfessionalTemplate from '@/components/templates/ProfessionalTemplate';

const sampleData = {
  personalInfo: {
    fullName: 'Mahesh Kumar',
    title: 'Full-Stack Developer & UI/UX Designer',
    bio: 'Passionate developer with 5+ years of experience creating beautiful and functional web applications.',
    photo: '',
  },
  contact: {
    email: 'mahesh@example.com',
    phone: '+1 234 567 8900',
    location: 'San Francisco, CA',
    website: 'maheshkumar.dev',
    linkedin: 'linkedin.com/in/maheshkumar',
    github: 'github.com/maheshkumar',
  },
  skills: [
    { name: 'React', category: 'Frontend', level: 90 },
    { name: 'TypeScript', category: 'Frontend', level: 85 },
    { name: 'Node.js', category: 'Backend', level: 88 },
    { name: 'Python', category: 'Backend', level: 80 },
    { name: 'PostgreSQL', category: 'Database', level: 75 },
    { name: 'Docker', category: 'DevOps', level: 70 },
  ],
  education: [
    {
      degree: 'B.S. Computer Science',
      institution: 'Stanford University',
      duration: '2015 - 2019',
      description: 'Focus on Software Engineering and AI',
    },
  ],
  experience: [
    {
      position: 'Senior Full-Stack Developer',
      company: 'Tech Corp',
      duration: '2021 - Present',
      description: 'Led development of enterprise SaaS platform serving 10k+ users.',
    },
    {
      position: 'Frontend Developer',
      company: 'StartupXYZ',
      duration: '2019 - 2021',
      description: 'Built responsive web applications using React and TypeScript.',
    },
  ],
  projects: [
    {
      title: 'E-Commerce Platform',
      description: 'Full-stack e-commerce solution with payment integration',
      technologies: ['React', 'Node.js', 'MongoDB', 'Stripe'],
      link: 'https://example.com',
      github: 'https://github.com/example',
    },
    {
      title: 'Task Management App',
      description: 'Collaborative task management with real-time updates',
      technologies: ['Next.js', 'Firebase', 'Tailwind CSS'],
      link: 'https://example.com',
    },
  ],
};

const sampleConfig = {
  template: 'minimal',
  theme: {
    primary: '#3b82f6',
    secondary: '#1e293b',
    accent: '#f59e0b',
    font: 'inter',
  },
  sections: {
    about: true,
    skills: true,
    education: true,
    experience: true,
    projects: true,
    contact: true,
  },
  sectionOrder: ['about', 'skills', 'experience', 'education', 'projects', 'contact'],
};

interface Template {
  id;
  name;
  description;
  component: React.ComponentType<any>;
  preview;
  features[];
}

const templates: Template[] = [
  {
    id: 'minimal',
    name: 'Minimal',
    description: 'Clean and simple design focusing on content',
    component: MinimalTemplate,
    preview: '/previews/minimal.png',
    features: ['Clean Layout', 'Easy to Read', 'Professional', 'ATS-Friendly'],
  },
  {
    id: 'modern',
    name: 'Modern',
    description: 'Contemporary design with bold colors and sections',
    component: ModernTemplate,
    preview: '/previews/modern.png',
    features: ['Bold Colors', 'Card Layout', 'Eye-Catching', 'Modern Design'],
  },
  {
    id: 'dark',
    name: 'Dark',
    description: 'Sleek dark theme perfect for developers',
    component: DarkTemplate,
    preview: '/previews/dark.png',
    features: ['Dark Theme', 'High Contrast', 'Developer-Friendly', 'Unique Look'],
  },
  {
    id: 'student',
    name: 'Student',
    description: 'Perfect for students and recent graduates',
    component: StudentTemplate,
    preview: '/previews/student.png',
    features: ['Education Focus', 'Projects Highlight', 'Fresh Design', 'Entry-Level'],
  },
  {
    id: 'professional',
    name: 'Professional',
    description: 'Corporate and executive-friendly design',
    component: ProfessionalTemplate,
    preview: '/previews/professional.png',
    features: ['Corporate Style', 'Experience Focus', 'Elegant', 'Executive-Level'],
  },
];

export default function TemplatesPage() {
  const router = useRouter();
  const [selectedTemplate, setSelectedTemplate] = useState('minimal');
  const [previewTemplate, setPreviewTemplate] = useState(templates[0]);
  const [isChecking, setIsChecking] = useState(true);

  // Check authentication
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedUser = localStorage.getItem('user');
      
      if (!storedUser) {
        alert('🔒 Please login or signup to view templates!');
        router.push('/');
        return;
      }
      
      setIsChecking(false);
    }
  }, [router]);

  const handleSelectTemplate = (template: Template) => {
    setSelectedTemplate(template.id);
    setPreviewTemplate(template);
  };

  const handleUseTemplate = () => {
    // Store the selected template in localStorage for the builder to pick up
    if (typeof window !== 'undefined') {
      localStorage.setItem('selectedTemplate', selectedTemplate);
    }
    window.location.href = '/builder';
  };

  // Show loading while checking auth
  if (isChecking) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading templates...</p>
        </div>
      </div>
    );
  }

  const TemplateComponent = previewTemplate.component;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-40">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/" className="text-blue-600 hover:text-blue-700">
                <FaArrowLeft className="text-xl" />
              </Link>
              <h1 className="text-2xl font-bold text-gray-800">Choose Your Template</h1>
            </div>
            <Link
              href="/builder"
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
            >
              Start Building <FaArrowRight />
            </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Pick a Template That Suits You
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Choose from our professionally designed templates. You can customize everything later!
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Template List */}
          <div className="lg:col-span-1 space-y-4">
            {templates.map((template) => (
              <button
                key={template.id}
                onClick={() => handleSelectTemplate(template)}
                className={`w-full text-left p-6 rounded-xl transition-all ${
                  selectedTemplate === template.id
                    ? 'bg-blue-600 text-white shadow-lg scale-105'
                    : 'bg-white text-gray-800 hover:shadow-md hover:scale-102 border-2 border-gray-200'
                }`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-xl font-bold mb-1">{template.name}</h3>
                    <p
                      className={`text-sm ${
                        selectedTemplate === template.id ? 'text-blue-100' : 'text-gray-600'
                      }`}
                    >
                      {template.description}
                    </p>
                  </div>
                  {selectedTemplate === template.id && (
                    <FaCheck className="text-2xl flex-shrink-0 ml-2" />
                  )}
                </div>
                <div className="flex flex-wrap gap-2 mt-4">
                  {template.features.map((feature, idx) => (
                    <span
                      key={idx}
                      className={`text-xs px-3 py-1 rounded-full ${
                        selectedTemplate === template.id
                          ? 'bg-blue-500 text-white'
                          : 'bg-gray-100 text-gray-700'
                      }`}
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </button>
            ))}
          </div>

          {/* Preview */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-xl p-8 sticky top-24">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-2xl font-bold text-gray-900">Live Preview</h3>
                <button
                  onClick={handleUseTemplate}
                  className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
                >
                  Use This Template
                </button>
              </div>
              <div className="border-4 border-gray-200 rounded-lg overflow-hidden bg-white max-h-[600px] overflow-y-auto">
                <div className="transform scale-75 origin-top-left w-[133.33%]">
                  <TemplateComponent data={sampleData} config={sampleConfig} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

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

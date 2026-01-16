'use client';

import { useState } from 'react';
import { usePortfolioStore } from '@/store/portfolioStore';
import { FaMagic, FaUpload, FaStar } from 'react-icons/fa';
import { improveWithAI } from '@/utils/aiService';

export default function PersonalInfoForm() {
  const { data, updatePersonalInfo } = usePortfolioStore();
  const { personalInfo } = data;
  const [improving, setImproving] = useState(false);
  const [improvingTitle, setImprovingTitle] = useState(false);

  const handleChange = (field: string, value: string) => {
    updatePersonalInfo({ [field]: value });
  };

  const handleImproveBio = async () => {
    if (!personalInfo.bio) return;
    setImproving(true);
    try {
      const result = await improveWithAI(personalInfo.bio, 'bio');
      if (result.success) {
        updatePersonalInfo({ bio: result.content });
        alert('🎉 Great! Your bio looks much better now!');
      } else {
        alert('😅 Oops! Looks like we need to add some credits to the AI service. Head over to platform.openai.com/account/billing to top up!');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('😓 Hmm, something went wrong. Could you check your internet connection and try again?');
    } finally {
      setImproving(false);
    }
  };

  const handleImproveTitle = async () => {
    if (!personalInfo.title) return;
    setImprovingTitle(true);
    try {
      const result = await improveWithAI(personalInfo.title, 'project');
      if (result.success) {
        updatePersonalInfo({ title: result.content });
        alert('🎊 Awesome! Your title is now more impactful!');
      } else {
        alert('😔 We couldn\'t enhance that right now. Mind giving it another shot?');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('🤔 Hmm, we hit a snag. Check your connection and let\'s try again!');
    } finally {
      setImprovingTitle(false);
    }
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        updatePersonalInfo({ profilePhoto: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-6">
      {/* Profile Photo */}
      <div className="flex flex-col items-center space-y-4">
        {personalInfo.profilePhoto ? (
          <img
            src={personalInfo.profilePhoto}
            alt="Profile"
            className="w-32 h-32 rounded-full object-cover border-4 border-blue-500"
          />
        ) : (
          <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center text-gray-400 text-4xl">
            👤
          </div>
        )}
        <label className="cursor-pointer px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors flex items-center gap-2">
          <FaUpload /> Upload Photo
          <input
            type="file"
            accept="image/*"
            onChange={handlePhotoUpload}
            className="hidden"
          />
        </label>
      </div>

      {/* Full Name */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          What's your name? *
        </label>
        <input
          type="text"
          value={personalInfo.fullName}
          onChange={(e) => handleChange('fullName', e.target.value)}
          placeholder="e.g., Mahesh Kumar"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          required
        />
        <p className="text-xs text-gray-500 mt-1">
          💡 Use your full name as you'd like it to appear professionally
        </p>
      </div>

      {/* Professional Title */}
      <div>
        <div className="flex justify-between items-center mb-2">
          <label className="block text-sm font-medium text-gray-700">
            What do you do? *
          </label>
          <button
            type="button"
            onClick={handleImproveTitle}
            disabled={improvingTitle || !personalInfo.title}
            className="text-sm px-3 py-1 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors flex items-center gap-1 disabled:opacity-50"
          >
            <FaStar /> {improvingTitle ? 'Making it better...' : '✨ Polish This'}
          </button>
        </div>
        <input
          type="text"
          value={personalInfo.title}
          onChange={(e) => handleChange('title', e.target.value)}
          placeholder="e.g., Full-Stack Developer | Creative Designer"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          required
        />
        <p className="text-xs text-gray-500 mt-1">
          💡 Describe your role in a few words. Don't worry if it's not perfect - our AI can help!
        </p>
      </div>

      {/* Bio */}
      <div>
        <div className="flex justify-between items-center mb-2">
          <label className="block text-sm font-medium text-gray-700">
            Tell us about yourself *
          </label>
          <button
            type="button"
            onClick={handleImproveBio}
            disabled={improving || !personalInfo.bio}
            className="text-sm px-3 py-1 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition-colors flex items-center gap-1 disabled:opacity-50"
          >
            <FaMagic /> {improving ? 'Working magic...' : '✨ Make it shine'}
          </button>
        </div>
        <textarea
          value={personalInfo.bio}
          onChange={(e) => handleChange('bio', e.target.value)}
          placeholder="Write a brief bio about yourself, your expertise, and what you're passionate about..."
          rows={5}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
          required
        />
        <p className="text-xs text-gray-500 mt-1">
          {personalInfo.bio.length} characters (recommended: 150-300)
        </p>
      </div>

      {/* Tips */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h4 className="font-semibold text-blue-900 mb-2">💡 Tips:</h4>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• Keep your bio concise (2-3 sentences)</li>
          <li>• Highlight your key skills and what makes you unique</li>
          <li>• Use the AI Improve button to enhance your writing</li>
          <li>• Upload a professional photo for better impression</li>
        </ul>
      </div>
    </div>
  );
}

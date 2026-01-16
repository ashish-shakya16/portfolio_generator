'use client';

import { usePortfolioStore } from '@/store/portfolioStore';
import { FaEnvelope, FaPhone, FaLinkedin, FaGithub, FaTwitter, FaGlobe, FaMapMarkerAlt } from 'react-icons/fa';

export default function ContactForm() {
  const { data, updateContact } = usePortfolioStore();
  const { contact } = data;

  const handleChange = (field: string, value: string) => {
    updateContact({ [field]: value });
  };

  return (
    <div className="space-y-6">
      {/* Required Fields */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">📬 How can people reach you?</h3>
        <p className="text-sm text-gray-600">Let's make sure people can get in touch!</p>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
            <FaEnvelope className="text-blue-600" /> Your email address *
          </label>
          <input
            type="email"
            value={contact.email}
            onChange={(e) => handleChange('email', e.target.value)}
            placeholder="you@example.com"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
          <p className="text-xs text-gray-500 mt-1">
            💡 This is how employers and clients will contact you
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
            <FaPhone className="text-green-600" /> Phone number *
          </label>
          <input
            type="tel"
            value={contact.phone}
            onChange={(e) => handleChange('phone', e.target.value)}
            placeholder="+1 (555) 123-4567"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
          <p className="text-xs text-gray-500 mt-1">
            💡 Include your country code so international clients can call
          </p>
        </div>
      </div>

      {/* Optional Fields */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">🌐 Connect on social media (Optional)</h3>
        <p className="text-sm text-gray-600">Show off your professional presence! Skip any you don't use.</p>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
            <FaLinkedin className="text-blue-700" /> LinkedIn
          </label>
          <input
            type="url"
            value={contact.linkedin || ''}
            onChange={(e) => handleChange('linkedin', e.target.value)}
            placeholder="https://linkedin.com/in/yourprofile"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <p className="text-xs text-gray-500 mt-1">
            💼 Great for professional networking!
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
            <FaGithub className="text-gray-900" /> GitHub Profile
          </label>
          <input
            type="url"
            value={contact.github || ''}
            onChange={(e) => handleChange('github', e.target.value)}
            placeholder="https://github.com/yourusername"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
            <FaTwitter className="text-blue-400" /> Twitter Profile
          </label>
          <input
            type="url"
            value={contact.twitter || ''}
            onChange={(e) => handleChange('twitter', e.target.value)}
            placeholder="https://twitter.com/yourusername"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
            <FaGlobe className="text-purple-600" /> Personal Website
          </label>
          <input
            type="url"
            value={contact.website || ''}
            onChange={(e) => handleChange('website', e.target.value)}
            placeholder="https://yourwebsite.com"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
            <FaMapMarkerAlt className="text-red-600" /> Location
          </label>
          <input
            type="text"
            value={contact.location || ''}
            onChange={(e) => handleChange('location', e.target.value)}
            placeholder="San Francisco, CA"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Preview */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h4 className="font-semibold text-blue-900 mb-3">Contact Preview</h4>
        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2 text-blue-800">
            <FaEnvelope /> {contact.email || 'Not provided'}
          </div>
          <div className="flex items-center gap-2 text-blue-800">
            <FaPhone /> {contact.phone || 'Not provided'}
          </div>
          {contact.location && (
            <div className="flex items-center gap-2 text-blue-800">
              <FaMapMarkerAlt /> {contact.location}
            </div>
          )}
          {contact.linkedin && (
            <div className="flex items-center gap-2 text-blue-800">
              <FaLinkedin /> LinkedIn
            </div>
          )}
          {contact.github && (
            <div className="flex items-center gap-2 text-blue-800">
              <FaGithub /> GitHub
            </div>
          )}
          {contact.twitter && (
            <div className="flex items-center gap-2 text-blue-800">
              <FaTwitter /> Twitter
            </div>
          )}
          {contact.website && (
            <div className="flex items-center gap-2 text-blue-800">
              <FaGlobe /> Website
            </div>
          )}
        </div>
      </div>

      {/* Tips */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <h4 className="font-semibold text-yellow-900 mb-2">💡 Tips:</h4>
        <ul className="text-sm text-yellow-800 space-y-1">
          <li>• Use a professional email address</li>
          <li>• Add complete profile URLs for social media</li>
          <li>• Ensure your LinkedIn and GitHub profiles are up-to-date</li>
          <li>• Location helps recruiters find you for local opportunities</li>
        </ul>
      </div>
    </div>
  );
}

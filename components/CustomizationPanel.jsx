'use client';

import { useState } from 'react';
import { usePortfolioStore } from '@/store/portfolioStore';
import { HexColorPicker } from 'react-colorful';
import { FaPalette, FaFont } from 'react-icons/fa';

export default function CustomizationPanel() {
  const { config, updateTheme, updateSections } = usePortfolioStore();
  const [showColorPicker, setShowColorPicker] = useState(null);

  const fonts = [
    { id: 'inter', name: 'Inter', preview: 'font-inter', description: 'Modern & Clean' },
    { id: 'poppins', name: 'Poppins', preview: 'font-poppins', description: 'Friendly & Rounded' },
    { id: 'playfair', name: 'Playfair Display', preview: 'font-playfair', description: 'Elegant & Classic' },
  ];

  const sections = [
    { id: 'about', label: 'About Section' },
    { id: 'skills', label: 'Skills Section' },
    { id: 'education', label: 'Education Section' },
    { id: 'experience', label: 'Experience Section' },
    { id: 'projects', label: 'Projects Section' },
    { id: 'contact', label: 'Contact Section' },
  ];

  return (
    <div className="space-y-8">
      {/* Color Theme */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <FaPalette className="text-purple-600" /> Color Theme
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Primary Color
            </label>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowColorPicker(showColorPicker === 'primary' ? null : 'primary')}
                className="w-12 h-12 rounded-lg border-2 border-gray-300 shadow-sm"
                style={{ backgroundColor: config.theme.primary }}
              />
              <input
                type="text"
                value={config.theme.primary}
                onChange={(e) => updateTheme({ primary: e.target.value })}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm"
              />
            </div>
            {showColorPicker === 'primary' && (
              <div className="mt-3">
                <HexColorPicker
                  color={config.theme.primary}
                  onChange={(color) => updateTheme({ primary: color })}
                />
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Secondary Color
            </label>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowColorPicker(showColorPicker === 'secondary' ? null : 'secondary')}
                className="w-12 h-12 rounded-lg border-2 border-gray-300 shadow-sm"
                style={{ backgroundColor: config.theme.secondary }}
              />
              <input
                type="text"
                value={config.theme.secondary}
                onChange={(e) => updateTheme({ secondary: e.target.value })}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm"
              />
            </div>
            {showColorPicker === 'secondary' && (
              <div className="mt-3">
                <HexColorPicker
                  color={config.theme.secondary}
                  onChange={(color) => updateTheme({ secondary: color })}
                />
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Accent Color
            </label>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowColorPicker(showColorPicker === 'accent' ? null : 'accent')}
                className="w-12 h-12 rounded-lg border-2 border-gray-300 shadow-sm"
                style={{ backgroundColor: config.theme.accent }}
              />
              <input
                type="text"
                value={config.theme.accent}
                onChange={(e) => updateTheme({ accent: e.target.value })}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm"
              />
            </div>
            {showColorPicker === 'accent' && (
              <div className="mt-3">
                <HexColorPicker
                  color={config.theme.accent}
                  onChange={(color) => updateTheme({ accent: color })}
                />
              </div>
            )}
          </div>
        </div>

        {/* Preset Colors */}
        <div className="mt-4">
          <p className="text-sm text-gray-600 mb-2">Quick Presets:</p>
          <div className="flex gap-2">
            {[
              { name: 'Blue', primary: '#3b82f6', secondary: '#1e293b', accent: '#f59e0b' },
              { name: 'Purple', primary: '#8b5cf6', secondary: '#1e1b4b', accent: '#ec4899' },
              { name: 'Green', primary: '#10b981', secondary: '#064e3b', accent: '#fbbf24' },
              { name: 'Red', primary: '#ef4444', secondary: '#7f1d1d', accent: '#f59e0b' },
            ].map((preset) => (
              <button
                key={preset.name}
                onClick={() => updateTheme(preset)}
                className="px-4 py-2 rounded-lg border border-gray-300 hover:border-gray-400 text-sm"
                style={{ backgroundColor: preset.primary, color: 'white' }}
              >
                {preset.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Font Selection */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <FaFont className="text-blue-600" /> Font Style
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {fonts.map((font) => (
            <button
              key={font.id}
              onClick={() => updateTheme({ font: font.id })}
              className={`p-5 rounded-xl border-2 transition-all hover:shadow-lg ${
                config.theme.font === font.id
                  ? 'border-blue-600 bg-blue-50 shadow-md'
                  : 'border-gray-200 hover:border-blue-300'
              }`}
            >
              <p className={`${font.preview} text-2xl font-bold mb-2`}>{font.name}</p>
              <p className={`${font.preview} text-sm text-gray-600 mb-1`}>The quick brown fox jumps</p>
              <p className="text-xs text-gray-500 mt-2">{font.description}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Section Toggle */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Visible Sections</h3>
        <div className="space-y-3">
          {sections.map((section) => (
            <label key={section.id} className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={config.sections[section.id]}
                onChange={(e) => updateSections({ [section.id]: e.target.checked })}
                className="w-5 h-5 text-blue-600 rounded"
              />
              <span className="text-gray-700">{section.label}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <h4 className="font-semibold text-yellow-900 mb-2">💡 Customization Tips:</h4>
        <ul className="text-sm text-yellow-800 space-y-1">
          <li>• Choose colors that match your personal brand</li>
          <li>• Ensure good contrast for readability</li>
          <li>• Select fonts that reflect your professional style</li>
          <li>• Toggle sections to focus on your strengths</li>
        </ul>
      </div>
    </div>
  );
}

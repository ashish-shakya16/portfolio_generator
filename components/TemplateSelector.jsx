'use client';

import { usePortfolioStore } from '@/store/portfolioStore';
import { Template } from '@/types';
import { FaCheck } from 'react-icons/fa';

const templates: Template[] = [
  {
    id: 'minimal',
    name: 'Minimal Clean',
    description: 'Simple and elegant design focusing on content',
    thumbnail: '/templates/minimal.png',
    category: 'minimal',
  },
  {
    id: 'modern',
    name: 'Modern Creative',
    description: 'Bold and colorful design with modern aesthetics',
    thumbnail: '/templates/modern.png',
    category: 'modern',
  },
  {
    id: 'dark',
    name: 'Dark Mode',
    description: 'Sleek dark theme perfect for tech professionals',
    thumbnail: '/templates/dark.png',
    category: 'dark',
  },
  {
    id: 'student',
    name: 'Student Fresh',
    description: 'Perfect for students and fresh graduates',
    thumbnail: '/templates/student.png',
    category: 'student',
  },
  {
    id: 'professional',
    name: 'Professional Corporate',
    description: 'Formal and sophisticated for corporate roles',
    thumbnail: '/templates/professional.png',
    category: 'professional',
  },
];

export default function TemplateSelector() {
  const { config, updateConfig } = usePortfolioStore();

  const selectTemplate = (templateId) => {
    console.log('Selecting template:', templateId);
    updateConfig({ template: templateId });
  };

  return (
    <div className="space-y-6">
      <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <p className="text-sm text-blue-800">
          <strong>Current Template:</strong> {config.template || 'minimal'}
        </p>
        <p className="text-xs text-blue-600 mt-1">
          Click any template below to preview it
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {templates.map((template) => (
          <button
            key={template.id}
            onClick={() => selectTemplate(template.id)}
            className={`relative cursor-pointer rounded-xl border-2 p-6 transition-all hover:shadow-lg ${
              config.template === template.id
                ? 'border-blue-600 bg-blue-50 shadow-lg'
                : 'border-gray-200 hover:border-blue-300'
            }`}
          >
            {config.template === template.id && (
              <div className="absolute top-3 right-3 bg-blue-600 text-white rounded-full p-2">
                <FaCheck />
              </div>
            )}
            
            <div className="mb-4 h-40 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center">
              <span className="text-6xl">{getTemplateEmoji(template.category)}</span>
            </div>
            
            <h3 className="text-xl font-bold text-gray-900 mb-2">{template.name}</h3>
            <p className="text-sm text-gray-600">{template.description}</p>
          </button>
        ))}
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h4 className="font-semibold text-blue-900 mb-2">💡 Tip:</h4>
        <p className="text-sm text-blue-800">
          You can switch templates anytime without losing your data. Preview each template to see which one suits your style best.
        </p>
      </div>
    </div>
  );
}

function getTemplateEmoji(category) {
  const emojis: Record<string, string> = {
    minimal: '📄',
    modern: '🎨',
    dark: '🌙',
    student: '🎓',
    professional: '💼',
  };
  return emojis[category] || '📄';
}

'use client';

import { useState } from 'react';
import { usePortfolioStore } from '@/store/portfolioStore';
import { Experience } from '@/types';
import { FaPlus, FaTimes, FaEdit, FaMagic } from 'react-icons/fa';
import { improveWithAI } from '@/utils/aiService';

export default function ExperienceForm() {
  const { data, updateExperience } = usePortfolioStore();
  const { experience } = data;
  const [editingIndex, setEditingIndex] = useState(null);
  const [improvingDesc, setImprovingDesc] = useState(false);
  const [formData, setFormData] = useState({
    id: '',
    company: '',
    position: '',
    startDate: '',
    endDate: '',
    current: false,
    description: '',
    achievements: [],
  });
  const [achievementInput, setAchievementInput] = useState('');

  const handleImproveDescription = async () => {
    if (!formData.description) return;
    setImprovingDesc(true);
    const result = await improveWithAI(formData.description, 'project');
    if (result.success) {
      setFormData({ ...formData, description: result.content });
    }
    setImprovingDesc(false);
  };

  const resetForm = () => {
    setFormData({
      id: '',
      company: '',
      position: '',
      startDate: '',
      endDate: '',
      current: false,
      description: '',
      achievements: [],
    });
    setAchievementInput('');
    setEditingIndex(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingIndex !== null) {
      const updated = [...experience];
      updated[editingIndex] = { ...formData, id: formData.id || Date.now().toString() };
      updateExperience(updated);
    } else {
      updateExperience([...experience, { ...formData, id: Date.now().toString() }]);
    }
    resetForm();
  };

  const handleEdit = (index) => {
    setFormData(experience[index]);
    setEditingIndex(index);
  };

  const handleDelete = (index) => {
    updateExperience(experience.filter((_, i) => i !== index));
  };

  const addAchievement = () => {
    if (achievementInput.trim()) {
      setFormData({
        ...formData,
        achievements: [...(formData.achievements || []), achievementInput.trim()],
      });
      setAchievementInput('');
    }
  };

  const removeAchievement = (index) => {
    setFormData({
      ...formData,
      achievements: formData.achievements?.filter((_, i) => i !== index) || [],
    });
  };

  return (
    <div className="space-y-6">
      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4 bg-gray-50 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900">
          {editingIndex !== null ? 'Edit Experience' : 'Add Experience'}
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Company *
            </label>
            <input
              type="text"
              value={formData.company}
              onChange={(e) => setFormData({ ...formData, company: e.target.value })}
              placeholder="Tech Corp Inc."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Position *
            </label>
            <input
              type="text"
              value={formData.position}
              onChange={(e) => setFormData({ ...formData, position: e.target.value })}
              placeholder="Senior Developer"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Start Date *
            </label>
            <input
              type="month"
              value={formData.startDate}
              onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              End Date
            </label>
            <input
              type="month"
              value={formData.endDate}
              onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
              disabled={formData.current}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg disabled:bg-gray-100"
            />
          </div>
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            id="current"
            checked={formData.current}
            onChange={(e) =>
              setFormData({ ...formData, current: e.target.checked, endDate: e.target.checked ? '' : formData.endDate })
            }
            className="mr-2"
          />
          <label htmlFor="current" className="text-sm text-gray-700">
            I currently work here
          </label>
        </div>

        <div>
          <div className="flex justify-between items-center mb-1">
            <label className="block text-sm font-medium text-gray-700">
              Description *
            </label>
            <button
              type="button"
              onClick={handleImproveDescription}
              disabled={improvingDesc || !formData.description}
              className="text-sm px-3 py-1 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition-colors flex items-center gap-1 disabled:opacity-50"
            >
              <FaMagic /> {improvingDesc ? 'Improving...' : 'AI Improve'}
            </button>
          </div>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            placeholder="Brief description of your role and responsibilities..."
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg resize-none"
            required
          />
          <p className="text-xs text-gray-500 mt-1">
            💡 Write your description, then click AI Improve to enhance it
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Key Achievements (Optional)
          </label>
          <div className="flex gap-2 mb-2">
            <input
              type="text"
              value={achievementInput}
              onChange={(e) => setAchievementInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addAchievement())}
              placeholder="Add an achievement..."
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg"
            />
            <button
              type="button"
              onClick={addAchievement}
              className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
            >
              <FaPlus />
            </button>
          </div>
          {formData.achievements && formData.achievements.length > 0 && (
            <ul className="space-y-2">
              {formData.achievements.map((achievement, index) => (
                <li key={index} className="flex items-center gap-2 bg-white p-2 rounded border">
                  <span className="flex-1 text-sm">{achievement}</span>
                  <button
                    type="button"
                    onClick={() => removeAchievement(index)}
                    className="text-red-600 hover:bg-red-50 p-1 rounded"
                  >
                    <FaTimes />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="flex gap-2">
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
          >
            <FaPlus /> {editingIndex !== null ? 'Update' : 'Add'} Experience
          </button>
          {editingIndex !== null && (
            <button
              type="button"
              onClick={resetForm}
              className="px-6 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      {/* Experience List */}
      <div className="space-y-3">
        <h3 className="text-lg font-semibold text-gray-900">Work Experience ({experience.length})</h3>
        {experience.length === 0 ? (
          <p className="text-gray-500 text-center py-8">No experience added yet.</p>
        ) : (
          experience.map((exp, index) => (
            <div key={exp.id} className="bg-white border rounded-lg p-4">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900">{exp.position}</h4>
                  <p className="text-gray-700">{exp.company}</p>
                  <p className="text-sm text-gray-500">
                    {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                  </p>
                  <p className="text-sm text-gray-600 mt-2">{exp.description}</p>
                  {exp.achievements && exp.achievements.length > 0 && (
                    <ul className="mt-2 space-y-1">
                      {exp.achievements.map((achievement, i) => (
                        <li key={i} className="text-sm text-gray-600">• {achievement}</li>
                      ))}
                    </ul>
                  )}
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(index)}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleDelete(index)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <FaTimes />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

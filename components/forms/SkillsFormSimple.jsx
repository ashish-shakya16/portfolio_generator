'use client';

import { useState } from 'react';
import { usePortfolioStore } from '@/store/portfolioStore';
import { FaPlus, FaTimes, FaLightbulb } from 'react-icons/fa';

export default function SkillsForm() {
  const { data, updateSkills } = usePortfolioStore();
  const { skills } = data;
  const [newSkill, setNewSkill] = useState('');

  const addSkill = () => {
    if (newSkill.trim()) {
      const skill: Skill = {
        name: newSkill.trim(),
      };
      updateSkills([...skills, skill]);
      setNewSkill('');
    }
  };

  const removeSkill = (index) => {
    updateSkills(skills.filter((_, i) => i !== index));
  };

  const updateSkill = (index, value) => {
    const updated = skills.map((skill, i) =>
      i === index ? { name: value } : skill
    );
    updateSkills(updated);
  };

  const addBulkSkills = (text) => {
    const skillNames = text.split(',').map((s) => s.trim()).filter(Boolean);
    const newSkills: Skill[] = skillNames.map((name) => ({
      name,
    }));
    updateSkills([...skills, ...newSkills]);
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Header Section */}
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center justify-center gap-2">
          💪 Your Superpowers
        </h2>
        <p className="text-gray-600">What are you great at? Don't be shy - this is your time to shine!</p>
      </div>

      {/* Bulk Add */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-4">
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
            <FaPlus className="text-blue-600" />
          </div>
          <div className="flex-1">
            <label className="block text-base font-semibold text-gray-800 mb-1">
              ⚡ Quick Add (Save time!)
            </label>
            <p className="text-sm text-gray-500 mb-3">
              List your skills with commas between them, then hit Enter. Easy peasy!
            </p>
            <input
              type="text"
              placeholder="React, Python, Teamwork, Creative Thinking, Docker..."
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  addBulkSkills(e.currentTarget.value);
                  e.currentTarget.value = '';
                }
              }}
            />
          </div>
        </div>
      </div>

      {/* Add Single Skill */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-4">
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0 w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
            <FaPlus className="text-green-600" />
          </div>
          <div className="flex-1">
            <label className="block text-base font-semibold text-gray-800 mb-1">
              Add Single Skill
            </label>
            <p className="text-sm text-gray-500 mb-3">
              Add one skill at a time
            </p>
            <div className="flex gap-3">
              <input
                type="text"
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && addSkill()}
                placeholder="e.g., JavaScript, Leadership, Design..."
                className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
              />
              <button
                onClick={addSkill}
                disabled={!newSkill.trim()}
                className="px-6 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-xl hover:from-green-700 hover:to-green-800 transition-all shadow-md hover:shadow-lg flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
              >
                <FaPlus /> Add
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Skills List */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-800">
          Your Skills ({skills.length})
        </h3>
        
        {skills.length === 0 ? (
          <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-xl border-2 border-dashed border-gray-300 p-12 text-center">
            <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaLightbulb className="text-4xl text-blue-600" />
            </div>
            <h4 className="text-lg font-semibold text-gray-700 mb-2">No skills added yet</h4>
            <p className="text-gray-500">Add your first skill above to get started!</p>
          </div>
        ) : (
          <div className="flex flex-wrap gap-3">
            {skills.map((skill, index) => (
              <div 
                key={index} 
                className="group bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-xl px-4 py-2 flex items-center gap-2 hover:shadow-md transition-all"
              >
                <input
                  type="text"
                  value={skill.name}
                  onChange={(e) => updateSkill(index, e.target.value)}
                  className="bg-transparent border-none focus:outline-none font-medium text-gray-800 min-w-[100px]"
                  placeholder="Skill name"
                />
                <button
                  onClick={() => removeSkill(index)}
                  className="p-1 text-red-500 hover:bg-red-50 rounded-lg transition-all opacity-0 group-hover:opacity-100"
                  title="Remove skill"
                >
                  <FaTimes />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Tips */}
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-xl p-6 shadow-sm">
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0 w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
            <FaLightbulb className="text-white text-lg" />
          </div>
          <div>
            <h4 className="font-bold text-blue-900 mb-3 text-lg">Pro Tips:</h4>
            <ul className="space-y-2 text-sm text-blue-800">
              <li className="flex items-start gap-2">
                <span className="text-blue-600 font-bold">•</span>
                <span><strong>8-15 skills</strong> is ideal for a balanced portfolio</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 font-bold">•</span>
                <span>Include both <strong>technical</strong> and <strong>soft skills</strong></span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 font-bold">•</span>
                <span>List skills that are <strong>relevant to your target role</strong></span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 font-bold">•</span>
                <span>Click on any skill to <strong>edit</strong> it directly</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

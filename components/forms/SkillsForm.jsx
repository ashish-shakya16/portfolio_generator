'use client';

import { useState } from 'react';
import { usePortfolioStore } from '@/store/portfolioStore';
import { Skill } from '@/types';
import { FaPlus, FaTimes, FaMagic, FaCheckCircle, FaExclamationCircle, FaLightbulb, FaRocket } from 'react-icons/fa';
import { categorizeSkills } from '@/utils/aiService';

export default function SkillsForm() {
  const { data, updateSkills } = usePortfolioStore();
  const { skills } = data;
  const [newSkill, setNewSkill] = useState('');
  const [categorizing, setCategorizing] = useState(false);
  const [message, setMessage] = useState(null);

  const categories = ['Frontend', 'Backend', 'Database', 'DevOps', 'Tools', 'Design', 'Soft Skills', 'Other'];

  const addSkill = () => {
    if (newSkill.trim()) {
      const skill: Skill = {
        name: newSkill.trim(),
        category: 'Other',
        level: 70,
      };
      updateSkills([...skills, skill]);
      setNewSkill('');
    }
  };

  const removeSkill = (index) => {
    updateSkills(skills.filter((_, i) => i !== index));
  };

  const updateSkill = (index, field: keyof Skill, value) => {
    const updated = skills.map((skill, i) =>
      i === index ? { ...skill, [field]: value } : skill
    );
    updateSkills(updated);
  };

  const handleAutoCategorize = async () => {
    if (skills.length === 0) {
      setMessage({ type: 'error', text: 'Add some skills first!' });
      setTimeout(() => setMessage(null), 3000);
      return;
    }
    
    setCategorizing(true);
    setMessage(null);
    
    try {
      const skillNames = skills.map((s) => s.name);
      const categories = await categorizeSkills(skillNames);
      
      const updated = skills.map((skill) => {
        for (const [category, skillList] of Object.entries(categories)) {
          if (skillList.includes(skill.name)) {
            return { ...skill, category };
          }
        }
        return skill;
      });
      
      updateSkills(updated);
      setMessage({ type: 'success', text: '✨ Skills categorized successfully!' });
      setTimeout(() => setMessage(null), 3000);
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to categorize skills. Please try again.' });
      setTimeout(() => setMessage(null), 3000);
    } finally {
      setCategorizing(false);
    }
  };

  const addBulkSkills = (text) => {
    const skillNames = text.split(',').map((s) => s.trim()).filter(Boolean);
    const newSkills: Skill[] = skillNames.map((name) => ({
      name,
      category: 'Other',
      level: 70,
    }));
    updateSkills([...skills, ...newSkills]);
    return skillNames.length;
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Header Section */}
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center justify-center gap-2">
          💪 Skills
        </h2>
        <p className="text-gray-600">What are your technical skills?</p>
      </div>

      {/* Success/Error Message */}
      {message && (
        <div
          className={`flex items-center gap-3 p-4 rounded-xl shadow-sm animate-in slide-in-from-top ${
            message.type === 'success'
              ? 'bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 text-green-800'
              : 'bg-gradient-to-r from-red-50 to-rose-50 border-2 border-red-200 text-red-800'
          }`}
        >
          {message.type === 'success' ? 
            <FaCheckCircle className="text-xl flex-shrink-0" /> : 
            <FaExclamationCircle className="text-xl flex-shrink-0" />
          }
          <span className="font-medium">{message.text}</span>
        </div>
      )}

      {/* Bulk Add with Auto-Categorize */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-4">
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0 w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
            <FaMagic className="text-purple-600" />
          </div>
          <div className="flex-1">
            <label className="block text-base font-semibold text-gray-800 mb-1">
              Add Multiple Skills (comma-separated)
            </label>
            <p className="text-sm text-gray-500 mb-3">
              Type your skills separated by commas, then let AI organize them for you! ✨
            </p>
            <div className="flex gap-3">
              <input
                type="text"
                id="bulk-skills-input"
                placeholder="e.g., React, Python, Docker, Figma, Communication..."
                className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    const count = addBulkSkills(e.currentTarget.value);
                    e.currentTarget.value = '';
                    if (count > 0) {
                      setTimeout(() => handleAutoCategorize(), 100);
                    }
                  }
                }}
              />
              <button
                onClick={() => {
                  const input = document.getElementById('bulk-skills-input');
                  if (input && input.value.trim()) {
                    const count = addBulkSkills(input.value);
                    input.value = '';
                    if (count > 0) {
                      setTimeout(() => handleAutoCategorize(), 100);
                    }
                  } else if (skills.length > 0) {
                    handleAutoCategorize();
                  }
                }}
                disabled={categorizing}
                className="px-6 py-3 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-xl hover:from-purple-700 hover:to-purple-800 transition-all shadow-md hover:shadow-lg flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap font-medium"
              >
                <FaMagic className={categorizing ? 'animate-spin' : ''} /> 
                {categorizing ? 'Categorizing...' : 'Auto-Categorize'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Add Single Skill */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-4">
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
            <FaPlus className="text-blue-600" />
          </div>
          <div className="flex-1">
            <label className="block text-base font-semibold text-gray-800 mb-1">
              Add Single Skill
            </label>
            <p className="text-sm text-gray-500 mb-3">
              Add one skill at a time for more control
            </p>
            <div className="flex gap-3">
              <input
                type="text"
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && addSkill()}
                placeholder="e.g., React, Communication, Problem Solving..."
                className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              />
              <button
                onClick={addSkill}
                disabled={!newSkill.trim()}
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all shadow-md hover:shadow-lg flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
              >
                <FaPlus /> Add
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Skills List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
            <FaRocket className="text-blue-600" />
            Your Skills ({skills.length})
          </h3>
          {skills.length > 0 && (
            <button
              onClick={handleAutoCategorize}
              disabled={categorizing}
              className="text-sm text-purple-600 hover:text-purple-700 font-medium flex items-center gap-1 disabled:opacity-50"
            >
              <FaMagic className={categorizing ? 'animate-spin' : ''} />
              Re-categorize
            </button>
          )}
        </div>
        
        {skills.length === 0 ? (
          <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-xl border-2 border-dashed border-gray-300 p-12 text-center">
            <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaLightbulb className="text-4xl text-blue-600" />
            </div>
            <h4 className="text-lg font-semibold text-gray-700 mb-2">No skills added yet</h4>
            <p className="text-gray-500">Add your first skill above to get started!</p>
          </div>
        ) : (
          <div className="grid gap-3 max-h-[500px] overflow-y-auto pr-2 scroll-smooth">
            {skills.map((skill, index) => (
              <div 
                key={index} 
                className="bg-gradient-to-br from-white to-gray-50 rounded-xl border-2 border-gray-200 p-5 space-y-4 hover:shadow-md transition-all hover:border-blue-300 group"
              >
                <div className="flex items-center gap-3">
                  <input
                    type="text"
                    value={skill.name}
                    onChange={(e) => updateSkill(index, 'name', e.target.value)}
                    className="flex-1 px-4 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-medium transition-all"
                    placeholder="Skill name"
                  />
                  <select
                    value={skill.category}
                    onChange={(e) => updateSkill(index, 'category', e.target.value)}
                    className="px-4 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-medium bg-white transition-all cursor-pointer"
                  >
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                  <button
                    onClick={() => removeSkill(index)}
                    className="p-3 text-red-500 hover:bg-red-50 rounded-lg transition-all hover:scale-110 group-hover:opacity-100 opacity-70"
                    title="Remove skill"
                  >
                    <FaTimes className="text-lg" />
                  </button>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2 min-w-[100px]">
                    <span className="text-sm font-semibold text-gray-700">Level:</span>
                    <span className="text-lg font-bold text-blue-600">{skill.level}%</span>
                  </div>
                  <div className="flex-1 relative">
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={skill.level}
                      onChange={(e) => updateSkill(index, 'level', parseInt(e.target.value))}
                      className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                      style={{
                        background: `linear-gradient(to right, rgb(37, 99, 235) 0%, rgb(37, 99, 235) ${skill.level}%, rgb(229, 231, 235) ${skill.level}%, rgb(229, 231, 235) 100%)`
                      }}
                    />
                  </div>
                </div>
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
                <span><strong>8-15 skills</strong> is the sweet spot for a balanced portfolio</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 font-bold">•</span>
                <span>Use <strong>Auto-Categorize</strong> to let AI organize skills intelligently</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 font-bold">•</span>
                <span>Be honest with skill levels: <strong>70-90%</strong> is recommended</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 font-bold">•</span>
                <span>Include both <strong>technical</strong> and <strong>soft skills</strong> for well-rounded profile</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

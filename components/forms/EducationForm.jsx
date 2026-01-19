'use client';

import { useState } from 'react';
import { usePortfolioStore } from '@/store/portfolioStore';
import { FaPlus, FaTimes, FaEdit, FaMagic } from 'react-icons/fa';
import { improveWithAI } from '@/utils/aiService';

export default function EducationForm() {
  const { data, updateEducation } = usePortfolioStore();
  const { education } = data;
  const [editingIndex, setEditingIndex] = useState(null);
  const [improvingDesc, setImprovingDesc] = useState(false);
  const [formData, setFormData] = useState({
    id: '',
    institution: '',
    degree: '',
    field: '',
    startDate: '',
    endDate: '',
    description: '',
    gpa: '',
  });

  const resetForm = () => {
    setFormData({
      id: '',
      institution: '',
      degree: '',
      field: '',
      startDate: '',
      endDate: '',
      description: '',
      gpa: '',
    });
    setEditingIndex(null);
  };

  const handleImproveDescription = async () => {
    if (!formData.description) return;
    
    setImprovingDesc(true);
    try {
      const result = await improveWithAI(formData.description, 'project');
      if (result.success) {
        setFormData({ ...formData, description: result.content });
      }
    } catch (error) {
      console.error('Error improving description:', error);
      alert('Failed to improve description. Please try again.');
    } finally {
      setImprovingDesc(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingIndex !== null) {
      const updated = [...education];
      updated[editingIndex] = { ...formData, id: formData.id || Date.now().toString() };
      updateEducation(updated);
    } else {
      updateEducation([...education, { ...formData, id: Date.now().toString() }]);
    }
    resetForm();
  };

  const handleEdit = (index) => {
    setFormData(education[index]);
    setEditingIndex(index);
  };

  const handleDelete = (index) => {
    updateEducation(education.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-6">
      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4 bg-gray-50 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900">
          {editingIndex !== null ? 'Edit Education' : 'Add Education'}
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Institution *
            </label>
            <input
              type="text"
              value={formData.institution}
              onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
              placeholder="University of Example"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Degree *
            </label>
            <input
              type="text"
              value={formData.degree}
              onChange={(e) => setFormData({ ...formData, degree: e.target.value })}
              placeholder="Bachelor of Science"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Field of Study *
            </label>
            <input
              type="text"
              value={formData.field}
              onChange={(e) => setFormData({ ...formData, field: e.target.value })}
              placeholder="Computer Science"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              GPA (Optional)
            </label>
            <input
              type="text"
              value={formData.gpa}
              onChange={(e) => setFormData({ ...formData, gpa: e.target.value })}
              placeholder="3.8/4.0"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
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
              End Date *
            </label>
            <input
              type="month"
              value={formData.endDate}
              onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              required
            />
          </div>
        </div>

        <div>
          <div className="flex justify-between items-center mb-1">
            <label className="block text-sm font-medium text-gray-700">
              Description (Optional)
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
            placeholder="Relevant coursework, achievements, honors..."
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg resize-none"
          />
          <p className="text-xs text-gray-500 mt-1">
            💡 Add your description, then click AI Improve to enhance it
          </p>
        </div>

        <div className="flex gap-2">
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
          >
            <FaPlus /> {editingIndex !== null ? 'Update' : 'Add'} Education
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

      {/* Education List */}
      <div className="space-y-3">
        <h3 className="text-lg font-semibold text-gray-900">Education History ({education.length})</h3>
        {education.length === 0 ? (
          <p className="text-gray-500 text-center py-8">No education added yet.</p>
        ) : (
          education.map((edu, index) => (
            <div key={edu.id} className="bg-white border rounded-lg p-4">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900">{edu.degree} in {edu.field}</h4>
                  <p className="text-gray-700">{edu.institution}</p>
                  <p className="text-sm text-gray-500">
                    {edu.startDate} - {edu.endDate}
                    {edu.gpa && ` • GPA: ${edu.gpa}`}
                  </p>
                  {edu.description && (
                    <p className="text-sm text-gray-600 mt-2">{edu.description}</p>
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

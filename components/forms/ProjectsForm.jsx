'use client';

import { useState } from 'react';
import { usePortfolioStore } from '@/store/portfolioStore';
import { Project } from '@/types';
import { FaPlus, FaTimes, FaEdit, FaMagic } from 'react-icons/fa';
import { generateProjectDescription } from '@/utils/aiService';

export default function ProjectsForm() {
  const { data, updateProjects } = usePortfolioStore();
  const { projects } = data;
  const [editingIndex, setEditingIndex] = useState(null);
  const [generating, setGenerating] = useState(false);
  const [formData, setFormData] = useState({
    id: '',
    title: '',
    description: '',
    technologies: [],
    githubUrl: '',
    liveUrl: '',
    imageUrl: '',
  });
  const [techInput, setTechInput] = useState('');

  const resetForm = () => {
    setFormData({
      id: '',
      title: '',
      description: '',
      technologies: [],
      githubUrl: '',
      liveUrl: '',
      imageUrl: '',
    });
    setTechInput('');
    setEditingIndex(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingIndex !== null) {
      const updated = [...projects];
      updated[editingIndex] = { ...formData, id: formData.id || Date.now().toString() };
      updateProjects(updated);
    } else {
      updateProjects([...projects, { ...formData, id: Date.now().toString() }]);
    }
    resetForm();
  };

  const handleEdit = (index) => {
    setFormData(projects[index]);
    setEditingIndex(index);
  };

  const handleDelete = (index) => {
    updateProjects(projects.filter((_, i) => i !== index));
  };

  const addTechnology = () => {
    if (techInput.trim() && !formData.technologies.includes(techInput.trim())) {
      setFormData({
        ...formData,
        technologies: [...formData.technologies, techInput.trim()],
      });
      setTechInput('');
    }
  };

  const removeTechnology = (index) => {
    setFormData({
      ...formData,
      technologies: formData.technologies.filter((_, i) => i !== index),
    });
  };

  const handleGenerateDescription = async () => {
    if (!formData.title || formData.technologies.length === 0) {
      alert('Please add project title and technologies first');
      return;
    }
    setGenerating(true);
    const description = await generateProjectDescription(formData.title, formData.technologies);
    if (description) {
      setFormData({ ...formData, description });
    }
    setGenerating(false);
  };

  return (
    <div className="space-y-6">
      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4 bg-gray-50 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900">
          {editingIndex !== null ? 'Edit Project' : 'Add Project'}
        </h3>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Project Title *
          </label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            placeholder="E-Commerce Platform"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            required
          />
        </div>

        <div>
          <div className="flex justify-between items-center mb-1">
            <label className="block text-sm font-medium text-gray-700">
              Description *
            </label>
            <button
              type="button"
              onClick={handleGenerateDescription}
              disabled={generating}
              className="text-sm px-3 py-1 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition-colors flex items-center gap-1 disabled:opacity-50"
            >
              <FaMagic /> {generating ? 'Generating...' : 'AI Generate'}
            </button>
          </div>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            placeholder="Describe what this project does and its key features..."
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg resize-none"
            required
          />
          <p className="text-xs text-gray-500 mt-1">
            💡 Add title & technologies first, then click AI Generate for instant description
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Technologies Used *
          </label>
          <div className="flex gap-2 mb-2">
            <input
              type="text"
              value={techInput}
              onChange={(e) => setTechInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addTechnology())}
              placeholder="Add a technology..."
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg"
            />
            <button
              type="button"
              onClick={addTechnology}
              className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
            >
              <FaPlus />
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {formData.technologies.map((tech, index) => (
              <span
                key={index}
                className="inline-flex items-center gap-1 bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
              >
                {tech}
                <button
                  type="button"
                  onClick={() => removeTechnology(index)}
                  className="hover:bg-blue-200 rounded-full p-0.5"
                >
                  <FaTimes className="text-xs" />
                </button>
              </span>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              GitHub URL (Optional)
            </label>
            <input
              type="url"
              value={formData.githubUrl}
              onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
              placeholder="https://github.com/username/project"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Live URL (Optional)
            </label>
            <input
              type="url"
              value={formData.liveUrl}
              onChange={(e) => setFormData({ ...formData, liveUrl: e.target.value })}
              placeholder="https://project-demo.com"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Project Image URL (Optional)
          </label>
          <input
            type="url"
            value={formData.imageUrl}
            onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
            placeholder="https://example.com/project-screenshot.png"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
          />
        </div>

        <div className="flex gap-2">
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
          >
            <FaPlus /> {editingIndex !== null ? 'Update' : 'Add'} Project
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

      {/* Projects List */}
      <div className="space-y-3">
        <h3 className="text-lg font-semibold text-gray-900">Your Projects ({projects.length})</h3>
        {projects.length === 0 ? (
          <p className="text-gray-500 text-center py-8">No projects added yet.</p>
        ) : (
          projects.map((project, index) => (
            <div key={project.id} className="bg-white border rounded-lg p-4">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900 text-lg">{project.title}</h4>
                  <p className="text-sm text-gray-600 mt-1">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {project.technologies.map((tech, i) => (
                      <span key={i} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-4 mt-2 text-sm">
                    {project.githubUrl && (
                      <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                        GitHub
                      </a>
                    )}
                    {project.liveUrl && (
                      <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                        Live Demo
                      </a>
                    )}
                  </div>
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

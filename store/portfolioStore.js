import { create } from 'zustand';

const initialData = {
  personalInfo: {
    fullName: '',
    title: '',
    bio: '',
  },
  contact: {
    email: '',
    phone: '',
  },
  skills: [],
  education: [],
  experience: [],
  projects: [],
};

const initialConfig = {
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

export const usePortfolioStore = create((set) => ({
  data: initialData,
  config: initialConfig,

  updatePersonalInfo: (info) =>
    set((state) => ({
      data: {
        ...state.data,
        personalInfo: { ...state.data.personalInfo, ...info },
      },
    })),

  updateContact: (contact) =>
    set((state) => ({
      data: {
        ...state.data,
        contact: { ...state.data.contact, ...contact },
      },
    })),

  updateSkills: (skills) =>
    set((state) => ({
      data: { ...state.data, skills },
    })),

  updateEducation: (education) =>
    set((state) => ({
      data: { ...state.data, education },
    })),

  updateExperience: (experience) =>
    set((state) => ({
      data: { ...state.data, experience },
    })),

  updateProjects: (projects) =>
    set((state) => ({
      data: { ...state.data, projects },
    })),

  updateConfig: (config) =>
    set((state) => ({
      config: { ...state.config, ...config },
    })),

  updateTheme: (theme) =>
    set((state) => ({
      config: {
        ...state.config,
        theme: { ...state.config.theme, ...theme },
      },
    })),

  updateSections: (sections) =>
    set((state) => ({
      config: {
        ...state.config,
        sections: { ...state.config.sections, ...sections },
      },
    })),

  updateSectionOrder: (order) =>
    set((state) => ({
      config: { ...state.config, sectionOrder: order },
    })),

  loadSampleData: (data) => set((state) => ({ data: { ...data } })),

  resetData: () => set({ data: initialData, config: initialConfig }),
}));

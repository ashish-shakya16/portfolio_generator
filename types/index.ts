// Type definitions for Portfolio Data

export interface PersonalInfo {
  fullName: string;
  title: string;
  bio: string;
  profilePhoto?: string;
}

export interface ContactInfo {
  email: string;
  phone: string;
  linkedin?: string;
  github?: string;
  twitter?: string;
  website?: string;
  location?: string;
}

export interface Skill {
  name: string;
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  description?: string;
  gpa?: string;
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
  achievements?: string[];
}

export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  imageUrl?: string;
}

export interface PortfolioData {
  personalInfo: PersonalInfo;
  contact: ContactInfo;
  skills: Skill[];
  education: Education[];
  experience: Experience[];
  projects: Project[];
}

export interface Template {
  id: string;
  name: string;
  description: string;
  thumbnail: string;
  category: 'minimal' | 'modern' | 'dark' | 'student' | 'professional';
}

export interface ThemeConfig {
  primary: string;
  secondary: string;
  accent: string;
  font: 'inter' | 'poppins' | 'playfair';
}

export interface PortfolioConfig {
  template: string;
  theme: ThemeConfig;
  sections: {
    about: boolean;
    skills: boolean;
    education: boolean;
    experience: boolean;
    projects: boolean;
    contact: boolean;
  };
  sectionOrder: string[];
}

'use client';

import { PortfolioData, PortfolioConfig } from '@/types';
import { FaEnvelope, FaPhone, FaLinkedin, FaGithub, FaExternalLinkAlt, FaMapMarkerAlt } from 'react-icons/fa';

interface TemplateProps {
  data: PortfolioData;
  config: PortfolioConfig;
}

export default function ModernTemplate({ data, config }: TemplateProps) {
  const { personalInfo, contact, skills, education, experience, projects } = data;
  const fontClass = `font-${config.theme.font}`;

  return (
    <div className={`${fontClass} bg-gradient-to-br from-blue-50 to-purple-50 min-h-screen`}>
      {/* Hero Section */}
      <header className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-90"></div>
        <div className="relative z-10 max-w-6xl mx-auto px-8 py-20 text-white">
          <div className="flex flex-col md:flex-row items-center gap-8">
            {personalInfo.profilePhoto && (
              <img
                src={personalInfo.profilePhoto}
                alt={personalInfo.fullName}
                className="w-40 h-40 rounded-full border-4 border-white shadow-2xl object-cover"
              />
            )}
            <div className="text-center md:text-left">
              <h1 className="text-5xl font-bold mb-3">{personalInfo.fullName || 'Your Name'}</h1>
              <p className="text-2xl mb-4 opacity-90">{personalInfo.title || 'Your Professional Title'}</p>
              <p className="text-lg opacity-80 max-w-2xl">{personalInfo.bio}</p>
              <div className="flex gap-4 mt-6 justify-center md:justify-start">
                {contact.linkedin && (
                  <a href={contact.linkedin} className="bg-white text-blue-600 p-3 rounded-full hover:scale-110 transition-transform">
                    <FaLinkedin className="text-xl" />
                  </a>
                )}
                {contact.github && (
                  <a href={contact.github} className="bg-white text-gray-900 p-3 rounded-full hover:scale-110 transition-transform">
                    <FaGithub className="text-xl" />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-8 py-16">
        {/* Skills Section with Cards */}
        {config.sections.skills && skills.length > 0 && (
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-8 text-center" style={{ color: config.theme.primary }}>
              Skills & Expertise
            </h2>
            <div className="flex flex-wrap gap-3 justify-center">
              {skills.map((skill, index) => (
                <span
                  key={index}
                  className="px-6 py-3 rounded-full text-sm font-semibold shadow-md hover:shadow-lg transition-shadow"
                  style={{ backgroundColor: config.theme.primary, color: 'white' }}
                >
                  {skill.name}
                </span>
              ))}
            </div>
          </section>
        )}

        {/* Projects Showcase */}
        {config.sections.projects && projects.length > 0 && (
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-8 text-center" style={{ color: config.theme.primary }}>
              Featured Projects
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {projects.map((project) => (
                <div key={project.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow">
                  {project.imageUrl && (
                    <img src={project.imageUrl} alt={project.title} className="w-full h-48 object-cover" />
                  )}
                  <div className="p-6">
                    <h3 className="text-2xl font-bold mb-3">{project.title}</h3>
                    <p className="text-gray-600 mb-4">{project.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.technologies.map((tech, i) => (
                        <span key={i} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                          {tech}
                        </span>
                      ))}
                    </div>
                    <div className="flex gap-4">
                      {project.githubUrl && (
                        <a href={project.githubUrl} className="flex items-center gap-2 text-gray-700 hover:text-blue-600">
                          <FaGithub /> Code
                        </a>
                      )}
                      {project.liveUrl && (
                        <a href={project.liveUrl} className="flex items-center gap-2 text-gray-700 hover:text-blue-600">
                          <FaExternalLinkAlt /> Demo
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Experience Timeline */}
        {config.sections.experience && experience.length > 0 && (
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-8 text-center" style={{ color: config.theme.primary }}>
              Work Experience
            </h2>
            <div className="space-y-8">
              {experience.map((exp) => (
                <div key={exp.id} className="bg-white rounded-xl p-6 shadow-lg">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="text-2xl font-bold">{exp.position}</h3>
                      <p className="text-lg text-gray-700">{exp.company}</p>
                    </div>
                    <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                      {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                    </span>
                  </div>
                  <p className="text-gray-600 mb-3">{exp.description}</p>
                  {exp.achievements && (
                    <ul className="space-y-1">
                      {exp.achievements.map((achievement, i) => (
                        <li key={i} className="flex items-start gap-2 text-gray-700">
                          <span className="text-blue-600 mt-1">✓</span>
                          {achievement}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Contact Section */}
        {config.sections.contact && (
          <section className="bg-white rounded-xl p-8 shadow-lg text-center">
            <h2 className="text-3xl font-bold mb-6" style={{ color: config.theme.primary }}>
              Get In Touch
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <FaEnvelope className="text-3xl mx-auto mb-2" style={{ color: config.theme.primary }} />
                <p className="font-semibold">Email</p>
                <a href={`mailto:${contact.email}`} className="text-gray-600 hover:underline">{contact.email}</a>
              </div>
              <div>
                <FaPhone className="text-3xl mx-auto mb-2" style={{ color: config.theme.primary }} />
                <p className="font-semibold">Phone</p>
                <p className="text-gray-600">{contact.phone}</p>
              </div>
              {contact.location && (
                <div>
                  <FaMapMarkerAlt className="text-3xl mx-auto mb-2" style={{ color: config.theme.primary }} />
                  <p className="font-semibold">Location</p>
                  <p className="text-gray-600">{contact.location}</p>
                </div>
              )}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

function getSkillIcon(category?: string): string {
  const icons: Record<string, string> = {
    Frontend: '🎨',
    Backend: '⚙️',
    Database: '🗄️',
    DevOps: '🚀',
    Tools: '🔧',
    Design: '✨',
  };
  return icons[category || 'Other'] || '💻';
}

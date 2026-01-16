'use client';

import { PortfolioData, PortfolioConfig } from '@/types';
import { FaEnvelope, FaPhone, FaLinkedin, FaGithub, FaExternalLinkAlt } from 'react-icons/fa';



export default function MinimalTemplate({ data, config }: TemplateProps) {
  const { personalInfo, contact, skills, education, experience, projects } = data;
  const fontClass = `font-${config.theme.font}`;

  return (
    <div className={`${fontClass} bg-white text-gray-900 min-h-screen`}>
      {/* Header */}
      <header className="border-b-2 border-gray-200 py-12 px-8">
        <div className="max-w-4xl mx-auto text-center">
          {personalInfo.profilePhoto && (
            <img
              src={personalInfo.profilePhoto}
              alt={personalInfo.fullName}
              className="w-32 h-32 rounded-full mx-auto mb-6 object-cover border-4"
              style={{ borderColor: config.theme.primary }}
            />
          )}
          <h1 className="text-4xl font-bold mb-2">{personalInfo.fullName || 'Your Name'}</h1>
          <p className="text-xl mb-4" style={{ color: config.theme.primary }}>
            {personalInfo.title || 'Your Professional Title'}
          </p>
          <p className="text-gray-600 max-w-2xl mx-auto">{personalInfo.bio}</p>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-8 py-12">
        {/* Skills */}
        {config.sections.skills && skills.length > 0 && (
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6 border-b-2 pb-2" style={{ borderColor: config.theme.primary }}>
              Skills
            </h2>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill, index) => (
                <span
                  key={index}
                  className="px-4 py-2 rounded-lg text-sm font-medium"
                  style={{ backgroundColor: `${config.theme.primary}20`, color: config.theme.primary }}
                >
                  {skill.name}
                </span>
              ))}
            </div>
          </section>
        )}

        {/* Experience */}
        {config.sections.experience && experience.length > 0 && (
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6 border-b-2 pb-2" style={{ borderColor: config.theme.primary }}>
              Experience
            </h2>
            <div className="space-y-6">
              {experience.map((exp) => (
                <div key={exp.id} className="border-l-2 pl-6" style={{ borderColor: config.theme.primary }}>
                  <h3 className="text-xl font-semibold">{exp.position}</h3>
                  <p className="text-gray-600">{exp.company}</p>
                  <p className="text-sm text-gray-500 mb-2">
                    {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                  </p>
                  <p className="text-gray-700">{exp.description}</p>
                  {exp.achievements && exp.achievements.length > 0 && (
                    <ul className="mt-2 space-y-1">
                      {exp.achievements.map((achievement, i) => (
                        <li key={i} className="text-sm text-gray-600">• {achievement}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Education */}
        {config.sections.education && education.length > 0 && (
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6 border-b-2 pb-2" style={{ borderColor: config.theme.primary }}>
              Education
            </h2>
            <div className="space-y-4">
              {education.map((edu) => (
                <div key={edu.id}>
                  <h3 className="text-lg font-semibold">{edu.degree} in {edu.field}</h3>
                  <p className="text-gray-600">{edu.institution}</p>
                  <p className="text-sm text-gray-500">
                    {edu.startDate} - {edu.endDate}
                    {edu.gpa && ` • GPA: ${edu.gpa}`}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Projects */}
        {config.sections.projects && projects.length > 0 && (
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6 border-b-2 pb-2" style={{ borderColor: config.theme.primary }}>
              Projects
            </h2>
            <div className="space-y-6">
              {projects.map((project) => (
                <div key={project.id} className="border rounded-lg p-4">
                  <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                  <p className="text-gray-600 mb-3">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {project.technologies.map((tech, i) => (
                      <span key={i} className="bg-gray-100 px-3 py-1 rounded-full text-sm">
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-4 text-sm">
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 hover:underline"
                        style={{ color: config.theme.primary }}
                      >
                        <FaGithub /> GitHub
                      </a>
                    )}
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 hover:underline"
                        style={{ color: config.theme.primary }}
                      >
                        <FaExternalLinkAlt /> Live Demo
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Contact */}
        {config.sections.contact && (
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6 border-b-2 pb-2" style={{ borderColor: config.theme.primary }}>
              Contact
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center gap-3">
                <FaEnvelope style={{ color: config.theme.primary }} />
                <span>{contact.email}</span>
              </div>
              <div className="flex items-center gap-3">
                <FaPhone style={{ color: config.theme.primary }} />
                <span>{contact.phone}</span>
              </div>
              {contact.linkedin && (
                <div className="flex items-center gap-3">
                  <FaLinkedin style={{ color: config.theme.primary }} />
                  <a href={contact.linkedin} target="_blank" rel="noopener noreferrer" className="hover:underline">
                    LinkedIn
                  </a>
                </div>
              )}
              {contact.github && (
                <div className="flex items-center gap-3">
                  <FaGithub style={{ color: config.theme.primary }} />
                  <a href={contact.github} target="_blank" rel="noopener noreferrer" className="hover:underline">
                    GitHub
                  </a>
                </div>
              )}
            </div>
          </section>
        )}
      </div>

      <footer className="text-center py-6 border-t">
        <p className="text-gray-600 text-sm">© {new Date().getFullYear()} {personalInfo.fullName}. All rights reserved.</p>
      </footer>
    </div>
  );
}

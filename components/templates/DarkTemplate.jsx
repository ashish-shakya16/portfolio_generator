'use client';
import { FaEnvelope, FaPhone, FaLinkedin, FaGithub, FaExternalLinkAlt } from 'react-icons/fa';



export default function DarkTemplate({ data, config }) {
  const { personalInfo, contact, skills, education, experience, projects } = data;
  const fontClass = `font-${config.theme.font}`;

  return (
    <div className={`${fontClass} bg-gray-900 text-white min-h-screen`}>
      {/* Header */}
      <header className="bg-gradient-to-r from-gray-800 to-gray-900 border-b border-gray-700 py-16 px-8">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-8">
          {personalInfo.profilePhoto && (
            <img
              src={personalInfo.profilePhoto}
              alt={personalInfo.fullName}
              className="w-36 h-36 rounded-full border-4 border-purple-500 shadow-2xl shadow-purple-500/50 object-cover"
            />
          )}
          <div className="text-center md:text-left">
            <h1 className="text-5xl font-bold mb-3 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              {personalInfo.fullName || 'Your Name'}
            </h1>
            <p className="text-2xl text-gray-300 mb-4">{personalInfo.title || 'Your Professional Title'}</p>
            <p className="text-gray-400 max-w-2xl">{personalInfo.bio}</p>
          </div>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-8 py-12">
        {/* Skills */}
        {config.sections.skills && skills.length > 0 && (
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-8 text-purple-400">Skills</h2>
            <div className="flex flex-wrap gap-3">
              {skills.map((skill, index) => (
                <span
                  key={index}
                  className="px-4 py-2 bg-gray-800 text-purple-300 border border-purple-500/30 rounded-lg font-medium hover:bg-gray-700 transition-colors"
                >
                  {skill.name}
                </span>
              ))}
            </div>
          </section>
        )}

        {/* Projects */}
        {config.sections.projects && projects.length > 0 && (
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-8 text-purple-400">Projects</h2>
            <div className="space-y-6">
              {projects.map((project) => (
                <div key={project.id} className="bg-gray-800 rounded-lg p-6 border border-gray-700 hover:border-purple-500 transition-colors">
                  <h3 className="text-2xl font-bold mb-3 text-white">{project.title}</h3>
                  <p className="text-gray-400 mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map((tech, i) => (
                      <span key={i} className="bg-gray-700 text-purple-300 px-3 py-1 rounded-full text-sm border border-gray-600">
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-4 text-sm">
                    {project.githubUrl && (
                      <a href={project.githubUrl} className="flex items-center gap-2 text-purple-400 hover:text-purple-300">
                        <FaGithub /> GitHub
                      </a>
                    )}
                    {project.liveUrl && (
                      <a href={project.liveUrl} className="flex items-center gap-2 text-purple-400 hover:text-purple-300">
                        <FaExternalLinkAlt /> Live Demo
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Experience */}
        {config.sections.experience && experience.length > 0 && (
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-8 text-purple-400">Experience</h2>
            <div className="space-y-6">
              {experience.map((exp) => (
                <div key={exp.id} className="bg-gray-800 rounded-lg p-6 border border-gray-700 border-l-4 border-l-purple-500">
                  <h3 className="text-xl font-bold text-white">{exp.position}</h3>
                  <p className="text-gray-300">{exp.company}</p>
                  <p className="text-sm text-purple-400 mb-3">
                    {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                  </p>
                  <p className="text-gray-400">{exp.description}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Contact */}
        {config.sections.contact && (
          <section className="bg-gray-800 rounded-lg p-8 border border-gray-700">
            <h2 className="text-3xl font-bold mb-6 text-purple-400 text-center">Contact Me</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="flex items-center gap-3">
                <FaEnvelope className="text-2xl text-purple-400" />
                <a href={`mailto:${contact.email}`} className="text-gray-300 hover:text-purple-400">{contact.email}</a>
              </div>
              <div className="flex items-center gap-3">
                <FaPhone className="text-2xl text-purple-400" />
                <span className="text-gray-300">{contact.phone}</span>
              </div>
              {contact.linkedin && (
                <div className="flex items-center gap-3">
                  <FaLinkedin className="text-2xl text-purple-400" />
                  <a href={contact.linkedin} className="text-gray-300 hover:text-purple-400">LinkedIn</a>
                </div>
              )}
              {contact.github && (
                <div className="flex items-center gap-3">
                  <FaGithub className="text-2xl text-purple-400" />
                  <a href={contact.github} className="text-gray-300 hover:text-purple-400">GitHub</a>
                </div>
              )}
            </div>
          </section>
        )}
      </div>

      <footer className="text-center py-8 border-t border-gray-800">
        <p className="text-gray-500">© {new Date().getFullYear()} {personalInfo.fullName}. Crafted with passion.</p>
      </footer>
    </div>
  );
}

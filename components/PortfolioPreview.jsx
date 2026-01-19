'use client';

import { usePortfolioStore } from '@/store/portfolioStore';
import MinimalTemplate from './templates/MinimalTemplate';
import ModernTemplate from './templates/ModernTemplate';
import DarkTemplate from './templates/DarkTemplate';
import StudentTemplate from './templates/StudentTemplate';
import ProfessionalTemplate from './templates/ProfessionalTemplate';

export default function PortfolioPreview() {
  const { data, config } = usePortfolioStore();

  const renderTemplate = () => {
    switch (config.template) {
      case 'minimal':
        return <MinimalTemplate data={data} config={config} />;
      case 'modern':
        return <ModernTemplate data={data} config={config} />;
      case 'dark':
        return <DarkTemplate data={data} config={config} />;
      case 'student':
        return <StudentTemplate data={data} config={config} />;
      case 'professional':
        return <ProfessionalTemplate data={data} config={config} />;
      default:
        return <MinimalTemplate data={data} config={config} />;
    }
  };

  return (
    <div 
      id="portfolio-preview" 
      className="w-full"
      style={{
        '--color-primary': config.theme.primary,
        '--color-secondary': config.theme.secondary,
        '--color-accent': config.theme.accent,
      }}
    >
      {renderTemplate()}
    </div>
  );
}

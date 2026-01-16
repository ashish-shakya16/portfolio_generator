'use client';

import { PortfolioData, PortfolioConfig } from '@/types';
import MinimalTemplate from './MinimalTemplate';



// Professional template - formal and corporate style
export default function ProfessionalTemplate({ data, config }: TemplateProps) {
  // Reuse Minimal template with professional styling
  return <MinimalTemplate data={data} config={config} />;
}

'use client';

import { PortfolioData, PortfolioConfig } from '@/types';
import MinimalTemplate from './MinimalTemplate';

interface TemplateProps {
  data: PortfolioData;
  config: PortfolioConfig;
}

// Student template - optimized for fresh graduates and students
export default function StudentTemplate({ data, config }: TemplateProps) {
  // Reuse Minimal template with student-friendly styling
  return <MinimalTemplate data={data} config={config} />;
}

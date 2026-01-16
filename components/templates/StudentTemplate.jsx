'use client';

import { PortfolioData, PortfolioConfig } from '@/types';
import MinimalTemplate from './MinimalTemplate';



// Student template - optimized for fresh graduates and students
export default function StudentTemplate({ data, config }: TemplateProps) {
  // Reuse Minimal template with student-friendly styling
  return <MinimalTemplate data={data} config={config} />;
}

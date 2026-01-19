'use client';
import MinimalTemplate from './MinimalTemplate';



// Student template - optimized for fresh graduates and students
export default function StudentTemplate({ data, config }) {
  // Reuse Minimal template with student-friendly styling
  return <MinimalTemplate data={data} config={config} />;
}

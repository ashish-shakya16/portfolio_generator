import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';

/**
 * Export portfolio as PDF
 */
export async function exportToPDF(elementId: string, filename: string = 'portfolio.pdf'): Promise<void> {
  const element = document.getElementById(elementId);
  if (!element) throw new Error('Element not found');

  const canvas = await html2canvas(element, {
    scale: 2,
    useCORS: true,
    logging: false,
  });

  const imgData = canvas.toDataURL('image/png');
  const pdf = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const imgWidth = 210;
  const pageHeight = 297;
  const imgHeight = (canvas.height * imgWidth) / canvas.width;
  let heightLeft = imgHeight;
  let position = 0;

  pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
  heightLeft -= pageHeight;

  while (heightLeft >= 0) {
    position = heightLeft - imgHeight;
    pdf.addPage();
    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;
  }

  pdf.save(filename);
}

/**
 * Export portfolio as HTML/CSS/JS files in ZIP
 */
export async function exportToHTML(
  elementId: string,
  data: any,
  template: string,
  filename: string = 'portfolio.zip'
): Promise<void> {
  const element = document.getElementById(elementId);
  if (!element) throw new Error('Element not found');

  const zip = new JSZip();

  // Get the rendered HTML
  const htmlContent = element.outerHTML;

  // Create HTML file with inline styles
  const fullHTML = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="${data.personalInfo.title} - Professional Portfolio">
  <title>${data.personalInfo.fullName} - Portfolio</title>
  <style>
    ${getInlineStyles(template)}
  </style>
</head>
<body>
  ${htmlContent}
  <script>
    // Add any interactive functionality here
    console.log('Portfolio loaded');
  </script>
</body>
</html>`;

  // Add files to ZIP
  zip.file('index.html', fullHTML);
  zip.file('README.md', generateReadme(data));
  
  // Add data.json for reference
  zip.file('data.json', JSON.stringify(data, null, 2));

  // Generate and download ZIP
  const content = await zip.generateAsync({ type: 'blob' });
  saveAs(content, filename);
}

/**
 * Get inline styles for the template
 */
function getInlineStyles(template: string): string {
  return `
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
      line-height: 1.6;
      color: #333;
    }
    
    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 20px;
    }
    
    h1, h2, h3 {
      margin-bottom: 1rem;
    }
    
    a {
      color: #3b82f6;
      text-decoration: none;
    }
    
    a:hover {
      text-decoration: underline;
    }
    
    section {
      margin-bottom: 3rem;
    }
    
    .skill-item, .project-card, .experience-item {
      margin-bottom: 1.5rem;
    }
    
    @media (max-width: 768px) {
      .container {
        padding: 10px;
      }
    }
  `;
}

/**
 * Generate README for the exported portfolio
 */
function generateReadme(data: any): string {
  return `# ${data.personalInfo.fullName} - Portfolio

## About
This portfolio was generated using AI-powered Portfolio Generator.

## Setup
1. Extract the ZIP file
2. Open \`index.html\` in your browser
3. To deploy online:
   - Upload to GitHub Pages
   - Use Netlify Drop
   - Use Vercel

## Contents
- \`index.html\` - Main portfolio page
- \`data.json\` - Portfolio data in JSON format
- \`README.md\` - This file

## Customization
Edit the HTML file directly to customize your portfolio.

## Contact
- Email: ${data.contact.email}
- GitHub: ${data.contact.github || 'N/A'}
- LinkedIn: ${data.contact.linkedin || 'N/A'}

---
Generated on ${new Date().toLocaleDateString()}
`;
}

/**
 * Copy HTML to clipboard
 */
export async function copyToClipboard(elementId: string): Promise<boolean> {
  const element = document.getElementById(elementId);
  if (!element) return false;

  try {
    await navigator.clipboard.writeText(element.outerHTML);
    return true;
  } catch (error) {
    console.error('Failed to copy:', error);
    return false;
  }
}

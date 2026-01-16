'use client';

import { useState } from 'react';
import { usePortfolioStore } from '@/store/portfolioStore';
import { exportToPDF, exportToHTML } from '@/utils/exportUtils';
import { FaTimes, FaDownload, FaFilePdf, FaFileCode, FaSpinner } from 'react-icons/fa';

interface ExportPanelProps {
  onClose: () => void;
}

export default function ExportPanel({ onClose }: ExportPanelProps) {
  const { data, config } = usePortfolioStore();
  const [exporting, setExporting] = useState(false);
  const [exportType, setExportType] = useState<'pdf' | 'html' | null>(null);

  const handleExportPDF = async () => {
    setExporting(true);
    setExportType('pdf');
    try {
      await exportToPDF('portfolio-preview', `${data.personalInfo.fullName}-portfolio.pdf`);
      alert('Portfolio exported as PDF successfully!');
    } catch (error) {
      console.error('Export failed:', error);
      alert('Failed to export portfolio. Please try again.');
    } finally {
      setExporting(false);
      setExportType(null);
    }
  };

  const handleExportHTML = async () => {
    setExporting(true);
    setExportType('html');
    try {
      await exportToHTML('portfolio-preview', data, config.template, `${data.personalInfo.fullName}-portfolio.zip`);
      alert('Portfolio exported as HTML successfully!');
    } catch (error) {
      console.error('Export failed:', error);
      alert('Failed to export portfolio. Please try again.');
    } finally {
      setExporting(false);
      setExportType(null);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-2xl font-bold text-gray-900">Export Portfolio</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <FaTimes className="text-xl text-gray-600" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* PDF Export */}
          <div className="border-2 border-gray-200 rounded-lg p-6 hover:border-blue-300 transition-colors">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-red-100 rounded-lg">
                <FaFilePdf className="text-3xl text-red-600" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Export as PDF</h3>
                <p className="text-gray-600 mb-4">
                  Download your portfolio as a PDF file. Perfect for printing or sending as an attachment.
                </p>
                <button
                  onClick={handleExportPDF}
                  disabled={exporting}
                  className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center gap-2 disabled:opacity-50"
                >
                  {exporting && exportType === 'pdf' ? (
                    <>
                      <FaSpinner className="animate-spin" /> Exporting...
                    </>
                  ) : (
                    <>
                      <FaDownload /> Export PDF
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* HTML Export */}
          <div className="border-2 border-gray-200 rounded-lg p-6 hover:border-blue-300 transition-colors">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-blue-100 rounded-lg">
                <FaFileCode className="text-3xl text-blue-600" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Export as HTML</h3>
                <p className="text-gray-600 mb-4">
                  Download complete HTML/CSS/JS files in a ZIP archive. Ready to deploy on any web hosting service.
                </p>
                <button
                  onClick={handleExportHTML}
                  disabled={exporting}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 disabled:opacity-50"
                >
                  {exporting && exportType === 'html' ? (
                    <>
                      <FaSpinner className="animate-spin" /> Exporting...
                    </>
                  ) : (
                    <>
                      <FaDownload /> Export HTML
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Deployment Options */}
          <div className="bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200 rounded-lg p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-3">🚀 Deployment Options</h3>
            <p className="text-gray-700 mb-4">
              After exporting as HTML, you can deploy your portfolio to:
            </p>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-start gap-2">
                <span className="text-blue-600 mt-0.5">•</span>
                <span><strong>GitHub Pages:</strong> Free hosting for static websites</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 mt-0.5">•</span>
                <span><strong>Netlify:</strong> Drag and drop deployment with custom domains</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 mt-0.5">•</span>
                <span><strong>Vercel:</strong> Fast deployment with automatic HTTPS</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 mt-0.5">•</span>
                <span><strong>Any Web Host:</strong> Upload via FTP to your hosting provider</span>
              </li>
            </ul>
          </div>

          {/* Tips */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <h4 className="font-semibold text-yellow-900 mb-2">💡 Export Tips:</h4>
            <ul className="text-sm text-yellow-800 space-y-1">
              <li>• Make sure all your information is complete before exporting</li>
              <li>• PDF is great for job applications and email attachments</li>
              <li>• HTML export gives you full control to customize further</li>
              <li>• Test your portfolio in different browsers after deployment</li>
            </ul>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t bg-gray-50 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

import React from 'react';
import { useTemplateById } from '../../hooks/useDocuments';

interface DocumentPreviewProps {
  template: string;
  formData: Record<string, any>;
}

export const DocumentPreview: React.FC<DocumentPreviewProps> = ({
  template,
  formData,
}) => {
  const { data: templateData, isLoading, error } = useTemplateById(template);

  if (!template) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
        <p className="text-gray-500 text-center">
          Select a template to preview the document
        </p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 animate-pulse">
        <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
        <div className="space-y-2">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-4 bg-gray-200 rounded"></div>
          ))}
        </div>
      </div>
    );
  }

  if (error || !templateData) {
    return (
      <div className="bg-red-50 p-4 rounded-lg">
        <p className="text-red-600">
          Error loading preview: {error instanceof Error ? error.message : 'Unknown error'}
        </p>
      </div>
    );
  }

  const renderPreview = () => {
    // Replace template placeholders with form data
    let previewContent = templateData.content || '';
    
    Object.entries(formData).forEach(([key, value]) => {
      const placeholder = `{{${key}}}`;
      previewContent = previewContent.replace(
        new RegExp(placeholder, 'g'),
        String(value || placeholder)
      );
    });

    return previewContent.split('\n').map((line, index) => (
      <p key={index} className="mb-4">
        {line || '\u00A0'}
      </p>
    ));
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Document Preview</h3>
        <div className="flex gap-2">
          <button className="btn-secondary text-sm">
            Print
          </button>
          <button className="btn-secondary text-sm">
            Download
          </button>
        </div>
      </div>
      <div className="prose max-w-none">
        {renderPreview()}
      </div>
    </div>
  );
};
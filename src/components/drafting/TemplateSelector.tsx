import React from 'react';
import { useTemplates } from '../../hooks/useDocuments';
import type { DocumentTemplate } from '../../types';

interface TemplateSelectorProps {
  selectedTemplate: string;
  onSelect: (templateId: string) => void;
}

export const TemplateSelector: React.FC<TemplateSelectorProps> = ({
  selectedTemplate,
  onSelect,
}) => {
  const { data: templates, isLoading, error } = useTemplates();

  if (isLoading) {
    return (
      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-gray-900">Select Template</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="animate-pulse bg-white p-6 rounded-lg">
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 p-4 rounded-lg">
        <p className="text-red-600">Error loading templates: {error instanceof Error ? error.message : 'Unknown error'}</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-gray-900">Select Template</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {templates?.map((template: DocumentTemplate) => (
          <button
            key={template.id}
            onClick={() => onSelect(template.id)}
            className={`p-6 rounded-lg border transition-all ${
              selectedTemplate === template.id
                ? 'border-indigo-500 bg-indigo-50'
                : 'border-gray-200 bg-white hover:border-indigo-200'
            }`}
          >
            <h3 className="text-lg font-medium text-gray-900">{template.name}</h3>
            <p className="mt-2 text-sm text-gray-500">{template.description}</p>
          </button>
        ))}
      </div>
    </div>
  );
};
import React, { useState } from 'react';
import { FileText, Download, Save, Users, History } from 'lucide-react';
import { TemplateSelector } from './TemplateSelector';
import { DocumentForm } from './DocumentForm';
import { DocumentPreview } from './DocumentPreview';
import { CollaborationPanel } from './CollaborationPanel';
import { DocumentHistory } from './DocumentHistory';
import { useSaveDocument } from '../../hooks/useDocuments';

export const DocumentDrafting: React.FC = () => {
  const [selectedTemplate, setSelectedTemplate] = useState('');
  const [formData, setFormData] = useState({});
  const [showCollaboration, setShowCollaboration] = useState(false);
  const [showHistory, setShowHistory] = useState(false);

  const { mutate: saveDocument, isLoading: isSaving } = useSaveDocument();

  const handleSaveDraft = () => {
    saveDocument({
      templateId: selectedTemplate,
      data: formData,
    });
  };

  const handleDownload = () => {
    // TODO: Implement download functionality
    console.log('Downloading document...');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-display font-bold text-gray-900">Document Drafting</h1>
          <p className="mt-1 text-sm text-gray-500">Create and manage legal documents with ease</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => setShowCollaboration(!showCollaboration)}
            className="btn-secondary"
          >
            <Users className="w-4 h-4 mr-2" />
            Collaborate
          </button>
          <button
            onClick={() => setShowHistory(!showHistory)}
            className="btn-secondary"
          >
            <History className="w-4 h-4 mr-2" />
            History
          </button>
          <button 
            onClick={handleSaveDraft} 
            disabled={isSaving}
            className="btn-secondary"
          >
            <Save className="w-4 h-4 mr-2" />
            {isSaving ? 'Saving...' : 'Save Draft'}
          </button>
          <button onClick={handleDownload} className="btn-primary">
            <Download className="w-4 h-4 mr-2" />
            Download
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-7 space-y-6">
          <TemplateSelector 
            selectedTemplate={selectedTemplate}
            onSelect={setSelectedTemplate}
          />
          {selectedTemplate && (
            <DocumentForm
              template={selectedTemplate}
              formData={formData}
              onChange={setFormData}
            />
          )}
        </div>
        <div className="lg:col-span-5 space-y-6">
          <DocumentPreview template={selectedTemplate} formData={formData} />
          {showCollaboration && <CollaborationPanel documentId={selectedTemplate} />}
          {showHistory && <DocumentHistory documentId={selectedTemplate} />}
        </div>
      </div>
    </div>
  );
};
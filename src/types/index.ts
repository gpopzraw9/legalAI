export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user';
}

export interface SearchResult {
  id: string;
  title: string;
  type: 'Statute' | 'Case Law' | 'Legal Document';
  excerpt: string;
  date: string;
}

export interface DocumentTemplate {
  id: string;
  name: string;
  description: string;
  content?: string;
  fields: FormField[];
}

export interface FormField {
  id: string;
  label: string;
  type: 'text' | 'select' | 'date' | 'textarea';
  required: boolean;
  options?: string[];
}
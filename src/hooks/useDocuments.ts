import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { DocumentTemplate } from '../types';
import { useAuth } from './useAuth';

async function fetchTemplates(token: string): Promise<DocumentTemplate[]> {
  const response = await fetch('/api/templates', {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch templates');
  }

  return response.json();
}

async function fetchTemplateById(id: string, token: string): Promise<DocumentTemplate> {
  const response = await fetch(`/api/templates/${id}`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch template');
  }

  return response.json();
}

async function saveDocument(data: any, token: string) {
  const response = await fetch('/api/documents', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error('Failed to save document');
  }

  return response.json();
}

export function useTemplates() {
  const { token } = useAuth();

  return useQuery({
    queryKey: ['templates'],
    queryFn: () => fetchTemplates(token!),
    enabled: !!token,
  });
}

export function useTemplateById(id: string) {
  const { token } = useAuth();

  return useQuery({
    queryKey: ['templates', id],
    queryFn: () => fetchTemplateById(id, token!),
    enabled: !!token && !!id,
  });
}

export function useSaveDocument() {
  const { token } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: any) => saveDocument(data, token!),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['documents'] });
    },
  });
}
import { useQuery } from '@tanstack/react-query';
import { SearchResult } from '../types';
import { useAuth } from './useAuth';

async function fetchSearchResults(query: string, token: string): Promise<SearchResult[]> {
  if (!query.trim()) return [];
  
  const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error('Search failed');
  }

  return response.json();
}

export function useSearch(query: string) {
  const { token } = useAuth();

  return useQuery({
    queryKey: ['search', query],
    queryFn: () => fetchSearchResults(query, token!),
    enabled: !!query && !!token,
  });
}
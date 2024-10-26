import React from 'react';
import { BookOpen, Scale, FileText } from 'lucide-react';
import type { SearchResult } from '../../types';

interface SearchResultsProps {
  query: string;
  isLoading?: boolean;
  error?: Error;
  results: SearchResult[];
}

export const SearchResults: React.FC<SearchResultsProps> = ({ 
  query, 
  isLoading, 
  error, 
  results 
}) => {
  if (isLoading) {
    return (
      <div className="space-y-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="animate-pulse bg-white p-6 rounded-lg">
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 p-4 rounded-lg">
        <p className="text-red-600">Error: {error.message}</p>
      </div>
    );
  }

  const getIcon = (type: SearchResult['type']) => {
    switch (type) {
      case 'Statute': return Scale;
      case 'Case Law': return BookOpen;
      default: return FileText;
    }
  };

  return (
    <div className="space-y-6">
      {query && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-600">Showing results for "{query}"</p>
          <p className="text-sm text-gray-600">{results.length} results found</p>
        </div>
      )}
      
      {results.map((result) => {
        const Icon = getIcon(result.type);
        return (
          <div 
            key={result.id} 
            className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <Icon className="w-6 h-6 text-indigo-600" />
              </div>
              <div className="flex-grow">
                <div className="flex items-start justify-between">
                  <h3 className="text-lg font-semibold text-gray-900">{result.title}</h3>
                  <span className="text-sm text-gray-500">{result.date}</span>
                </div>
                <span className="inline-block px-2 py-1 text-xs font-medium text-indigo-600 bg-indigo-50 rounded-full mt-2">
                  {result.type}
                </span>
                <p className="mt-2 text-gray-600 leading-relaxed">{result.excerpt}</p>
                <div className="mt-4 flex items-center gap-4">
                  <button className="text-sm font-medium text-indigo-600 hover:text-indigo-800 transition-colors">
                    View Full Document
                  </button>
                  <button className="text-sm font-medium text-gray-500 hover:text-gray-700 transition-colors">
                    Save for Later
                  </button>
                  <button className="text-sm font-medium text-gray-500 hover:text-gray-700 transition-colors">
                    Share
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
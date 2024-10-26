import React, { useState } from 'react';
import { Search, BookOpen, Filter, Clock } from 'lucide-react';
import { SearchResults } from './SearchResults';
import { SearchFilters } from './SearchFilters';
import { RecentSearches } from './RecentSearches';
import { useSearch } from '../../hooks/useSearch';

export const LegalResearch: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  
  const { data: results, isLoading, error } = useSearch(searchQuery);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Legal Research</h1>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center px-4 py-2 text-sm text-gray-600 hover:text-gray-900"
        >
          <Filter className="w-4 h-4 mr-2" />
          Filters
        </button>
      </div>

      <div className="relative">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search Nigerian case law, statutes, and legal documents..."
          className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
        />
        <Search className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3">
          {showFilters && <SearchFilters />}
          <SearchResults 
            query={searchQuery}
            results={results || []}
            isLoading={isLoading}
            error={error instanceof Error ? error : undefined}
          />
        </div>
        <div className="lg:col-span-1">
          <RecentSearches />
        </div>
      </div>
    </div>
  );
}
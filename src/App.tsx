import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ErrorBoundary } from './components/ErrorBoundary';
import { Auth } from './components/Auth';
import { Dashboard } from './components/Dashboard';
import { PrivateRoute } from './components/PrivateRoute';
import { DocumentDrafting } from './components/drafting/DocumentDrafting';
import { LegalResearch } from './components/research/LegalResearch';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      retry: 1,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ErrorBoundary>
        <Router>
          <Routes>
            <Route path="/auth" element={<Auth />} />
            <Route
              path="/dashboard"
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            />
            <Route
              path="/drafting"
              element={
                <PrivateRoute>
                  <DocumentDrafting />
                </PrivateRoute>
              }
            />
            <Route
              path="/research"
              element={
                <PrivateRoute>
                  <LegalResearch />
                </PrivateRoute>
              }
            />
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </Router>
      </ErrorBoundary>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}

export default App;
import { useState, useEffect, useCallback } from 'react';
import { User } from '../types';

interface AuthState {
  user: User | null;
  token: string | null;
}

export function useAuth() {
  const [authState, setAuthState] = useState<AuthState>(() => {
    const token = localStorage.getItem('auth_token');
    const userStr = localStorage.getItem('auth_user');
    return {
      token,
      user: userStr ? JSON.parse(userStr) : null,
    };
  });

  const setAuth = useCallback((token: string, user: User) => {
    localStorage.setItem('auth_token', token);
    localStorage.setItem('auth_user', JSON.stringify(user));
    setAuthState({ token, user });
  }, []);

  const clearAuth = useCallback(() => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('auth_user');
    setAuthState({ token: null, user: null });
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error('Invalid credentials');
      }

      const { token, user } = await response.json();
      setAuth(token, user);
    } catch (error) {
      throw new Error('Login failed');
    }
  }, [setAuth]);

  const register = useCallback(async (email: string, password: string) => {
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error('Registration failed');
      }

      const { token, user } = await response.json();
      setAuth(token, user);
    } catch (error) {
      throw new Error('Registration failed');
    }
  }, [setAuth]);

  const logout = useCallback(() => {
    clearAuth();
  }, [clearAuth]);

  return {
    user: authState.user,
    token: authState.token,
    login,
    register,
    logout,
    isAuthenticated: !!authState.token,
  };
}
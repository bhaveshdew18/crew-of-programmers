import { useState } from 'react';
import { AuthContext } from './auth-context';

const TOKEN_STORAGE_KEY = 'token';
const USER_STORAGE_KEY = 'user';

const readStoredAuth = () => {
  if (typeof window === 'undefined') {
    return { token: null, user: null };
  }

  const savedToken = window.localStorage.getItem(TOKEN_STORAGE_KEY);
  const savedUser = window.localStorage.getItem(USER_STORAGE_KEY);

  if (!savedToken || !savedUser) {
    return { token: null, user: null };
  }

  try {
    return {
      token: savedToken,
      user: JSON.parse(savedUser),
    };
  } catch (error) {
    console.error('Error loading auth state:', error);
    window.localStorage.removeItem(TOKEN_STORAGE_KEY);
    window.localStorage.removeItem(USER_STORAGE_KEY);
    return { token: null, user: null };
  }
};

const persistAuth = (token, user) => {
  window.localStorage.setItem(TOKEN_STORAGE_KEY, token);
  window.localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
};

const clearStoredAuth = () => {
  window.localStorage.removeItem(TOKEN_STORAGE_KEY);
  window.localStorage.removeItem(USER_STORAGE_KEY);
};

export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState(readStoredAuth);

  const login = (loginResponse) => {
    const payload = loginResponse?.data ?? loginResponse;

    if (!payload?.token) {
      throw new Error('Missing auth token in login response.');
    }

    const nextUser = {
      id: payload.userId,
      email: payload.email,
      role: payload.role,
      fullName: payload.fullName,
    };

    persistAuth(payload.token, nextUser);
    setAuthState({ token: payload.token, user: nextUser });
  };

  const logout = () => {
    clearStoredAuth();
    setAuthState({ token: null, user: null });
  };

  const value = {
    user: authState.user,
    token: authState.token,
    isAuthenticated: Boolean(authState.token && authState.user),
    loading: false,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

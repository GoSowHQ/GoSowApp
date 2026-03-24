import { create } from 'zustand';
import { api, setAccessToken, setRefreshToken, getAccessToken } from '@/lib/api';
import type { User } from '@/types';

interface AuthState {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  logout: () => Promise<void>;
  setTokens: (accessToken: string, refreshToken: string) => void;
  loadUser: () => Promise<void>;
  initialize: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isLoading: true,
  isAuthenticated: false,

  initialize: () => {
    const token = getAccessToken();
    if (token) {
      api<User>('/auth/me')
        .then((user) => set({ user, isAuthenticated: true, isLoading: false }))
        .catch(() => {
          setAccessToken(null);
          setRefreshToken(null);
          set({ user: null, isAuthenticated: false, isLoading: false });
        });
    } else {
      set({ isLoading: false });
    }
  },

  login: async (email: string, password: string) => {
    const res = await api<{ user: User; accessToken: string; refreshToken: string }>(
      '/auth/login',
      {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      },
    );
    setAccessToken(res.accessToken);
    setRefreshToken(res.refreshToken);
    set({ user: res.user, isAuthenticated: true });
  },

  register: async (email: string, password: string, name: string) => {
    const res = await api<{ user: User; accessToken: string; refreshToken: string }>(
      '/auth/register',
      {
        method: 'POST',
        body: JSON.stringify({ email, password, name }),
      },
    );
    setAccessToken(res.accessToken);
    setRefreshToken(res.refreshToken);
    set({ user: res.user, isAuthenticated: true });
  },

  logout: async () => {
    try {
      await api('/auth/logout', { method: 'POST' });
    } catch {
      // ignore
    }
    setAccessToken(null);
    setRefreshToken(null);
    set({ user: null, isAuthenticated: false });
  },

  setTokens: (accessToken: string, refreshToken: string) => {
    setAccessToken(accessToken);
    setRefreshToken(refreshToken);
    set({ isAuthenticated: true });
  },

  loadUser: async () => {
    try {
      const user = await api<User>('/auth/me');
      set({ user, isAuthenticated: true, isLoading: false });
    } catch {
      set({ isLoading: false });
    }
  },
}));

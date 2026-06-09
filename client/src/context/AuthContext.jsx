import { createContext, useContext, useEffect, useState } from 'react';
import api, { setAuthToken } from '../services/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('bl_token') || '');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const restoreSession = async () => {
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        setAuthToken(token);
        const storedUser = localStorage.getItem('bl_user');
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      } catch (error) {
        setAuthToken(null);
        setToken('');
      } finally {
        setLoading(false);
      }
    };

    restoreSession();
  }, [token]);

  const login = async (credentials) => {
    const { data } = await api.post('/auth/login', credentials);
    setToken(data.token);
    setUser(data.user);
    setAuthToken(data.token);
    localStorage.setItem('bl_user', JSON.stringify(data.user));
    return data;
  };

  const logout = () => {
    setUser(null);
    setToken('');
    setAuthToken(null);
    localStorage.removeItem('bl_user');
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, login, logout, setUser, setToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used inside AuthProvider');
  }

  return context;
};

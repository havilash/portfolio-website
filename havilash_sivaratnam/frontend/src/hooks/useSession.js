import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import { refresh } from 'src/lib/api';

const STORAGE_KEY = 'session';
const BUFFER_TIME = 60 * 1000; // 1 min
const defaultModel = { user: null, accessToken: null };

export default function useSession() {
  const [session, setSession] = useState(defaultModel);
  const [ready, setReady] = useState(false);

  function login(value) {
    setSession(value);
  }

  function logout() {
    setSession(defaultModel);
  }

  useEffect(() => {
    const savedSession = localStorage.getItem(STORAGE_KEY);
    if (savedSession) {
      try {
        const value = JSON.parse(savedSession);
        const { exp } = jwtDecode(value.accessToken);
        const expirationDate = new Date(0);
        expirationDate.setUTCSeconds(exp);
        const now = new Date();
        setSession(now >= expirationDate ? defaultModel : value);
      } catch (e) {
        console.log(e);
      }
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (session.user) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, [session]);

  const refreshToken = async () => {
    try {
      const response = await refresh({token: session.accessToken})
      login({ user: session.user, accessToken: response.access_token });
    } catch (e) {
      logout();
    }
  };

  useEffect(() => {
    if (session.accessToken) {
      const { exp } = jwtDecode(session.accessToken);
      const expirationDate = new Date(0);
      expirationDate.setUTCSeconds(exp);
      const now = new Date();
      const refreshInterval = Math.max((expirationDate - now - BUFFER_TIME), 0);
      const timeoutId = setTimeout(refreshToken, refreshInterval);
      return () => clearTimeout(timeoutId);
    }
  }, [session.accessToken]);

  return {
    ...session,
    ready,
    login,
    logout,
  };
}

export function useRedirectToLogin(session) {
  const navigate = useNavigate();

  useEffect(() => {
    if (session.ready && !session.user) navigate('/login');
  }, [session, navigate]);
}

export function useRedirectToHome(session) {
  const navigate = useNavigate();

  useEffect(() => {
    if (session.ready && session.user) navigate('/');
  }, [session, navigate]);
}
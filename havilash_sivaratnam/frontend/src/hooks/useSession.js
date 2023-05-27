import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";
import { refresh } from "src/lib/api";
import useLocalStorage from "./useLocalStorage"; // changed

const STORAGE_KEY = "session";
const BUFFER_TIME = 60 * 1000; // 1 min
const defaultModel = { user: null, token: null };

export default function useSession() {
  const [session, setSession] = useState(defaultModel);
  const [ready, setReady] = useState(false);
  const [savedSession, setSavedSession] = useLocalStorage(STORAGE_KEY, null); // changed

  function login(value) {
    setSession(value);
  }

  function logout() {
    setSession(defaultModel);
  }

  useEffect(() => {
    if (savedSession) {
      // changed
      try {
        const value = savedSession; // changed
        const { exp } = jwtDecode(value.token);
        const expirationDate = new Date(0);
        expirationDate.setUTCSeconds(exp);
        const now = new Date();
        setSession(now >= expirationDate ? defaultModel : value);
      } catch (e) {
        console.error(e);
      }
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (session.user) {
      setSavedSession(session); // changed
    } else {
      setSavedSession(null); // changed
    }
  }, [session]);

  const refreshToken = async () => {
    try {
      const response = await refresh(session);
      login({ user: session.user, token: response.access_token });
    } catch (e) {
      logout();
    }
  };

  useEffect(() => {
    if (session.token) {
      const { exp } = jwtDecode(session.token);
      const expirationDate = new Date(0);
      expirationDate.setUTCSeconds(exp);
      const now = new Date();
      const refreshInterval = Math.max(expirationDate - now - BUFFER_TIME, 0);
      const timeoutId = setTimeout(refreshToken, refreshInterval);
      return () => clearTimeout(timeoutId);
    }
  }, [session.token]);

  return {
    ...session,
    ready,
    login,
    logout,
  };
}

export function useRedirectToLogin(session, access) {
  const navigate = useNavigate();

  useEffect(() => {
    if (session.ready && (!session.user || session.user.access < access))
      navigate("/login");
  }, [session, navigate]);
}

export function useRedirectToHome(session) {
  const navigate = useNavigate();

  useEffect(() => {
    if (session.ready && session.user) navigate("/");
  }, [session, navigate]);
}

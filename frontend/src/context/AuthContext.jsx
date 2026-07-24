import { createContext, useCallback, useEffect, useMemo, useState } from "react";
import { AUTH_EXPIRED_EVENT } from "../services/apiClient.js";
import { authService } from "../services/authService.js";

export const AuthContext = createContext(null);

const STORAGE_KEY = "accessToken";

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => window.localStorage.getItem(STORAGE_KEY));
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(Boolean(token));

  const logout = useCallback(() => {
    window.localStorage.removeItem(STORAGE_KEY);
    setToken(null);
    setUser(null);
  }, []);

  const loadCurrentUser = useCallback(async () => {
    if (!token) {
      setIsLoading(false);
      return;
    }

    try {
      const response = await authService.me();
      setUser(response.data);
    } catch {
      logout();
    } finally {
      setIsLoading(false);
    }
  }, [logout, token]);

  useEffect(() => {
    loadCurrentUser();
  }, [loadCurrentUser]);

  useEffect(() => {
    window.addEventListener(AUTH_EXPIRED_EVENT, logout);
    return () => window.removeEventListener(AUTH_EXPIRED_EVENT, logout);
  }, [logout]);

  const login = useCallback(async (credentials) => {
    const response = await authService.login(credentials);
    const accessToken = response.data.access_token;

    window.localStorage.setItem(STORAGE_KEY, accessToken);
    setToken(accessToken);

    const userResponse = await authService.me();
    setUser(userResponse.data);

    return userResponse.data;
  }, []);

  const register = useCallback(async (payload) => {
    await authService.register(payload);
    return login({ email: payload.email, password: payload.password });
  }, [login]);

  const value = useMemo(
    () => ({
      token,
      user,
      isLoading,
      isAuthenticated: Boolean(token && user),
      login,
      register,
      logout
    }),
    [isLoading, login, logout, register, token, user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

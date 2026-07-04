import { createContext, useContext, useState, type ReactNode } from "react";
import { blogApi } from "@/react-app/lib/blogApi";

interface AuthContextValue {
  token: string | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(() =>
    localStorage.getItem("blog_token")
  );

  const login = async (email: string, password: string) => {
    const res = await blogApi.signin(email, password);
    localStorage.setItem("blog_token", res.access_token);
    setToken(res.access_token);
  };

  const logout = async () => {
    try {
      await blogApi.signout();
    } catch {
      // ignore signout errors
    }
    localStorage.removeItem("blog_token");
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ token, isAuthenticated: !!token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}

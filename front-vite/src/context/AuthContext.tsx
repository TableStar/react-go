import { createContext, useState, type ReactNode } from "react";
import Cookies from "js-cookie";

type AuthContextType = {
  isAuthenticated: boolean;
  login: (token: string) => void;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextType | null>(null);

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    !!Cookies.get("token")
  );

  const login = (token: string) => {
    Cookies.set("token", token);
    setIsAuthenticated(true);
  };

  const logout = () => {
    Cookies.remove("token");
    Cookies.remove("user");
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

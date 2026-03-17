import { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => localStorage.getItem("admin_token"));

  useEffect(() => {
    if (!token) return;

    try {
      const decoded = jwtDecode(token);
      const expirationTime = decoded.exp * 1000;
      const timeRemaining = expirationTime - Date.now();
      const warningTime = timeRemaining - 120000;

      if (timeRemaining <= 0) {
        logout();
        return;
      }

      if (warningTime > 0) {
        const warningTimeout = setTimeout(() => {
          alert("⚠️ Heads up! Your admin session expires in 2 minutes. Save any text you are writing!");
        }, warningTime);

        return () => clearTimeout(warningTimeout);
      }
    } catch (error) {
      console.error("Invalid token format, logging out...");
      logout();
    }
  }, [token]);

  const login = (newToken) => {
    localStorage.setItem("admin_token", newToken);
    setToken(newToken);
  };

  const logout = () => {
    localStorage.removeItem("admin_token");
    setToken(null);
    window.location.href = "/admin-actions/admin-login";
  };

  return (
    <AuthContext.Provider value={{ token, isAuthenticated: !!token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
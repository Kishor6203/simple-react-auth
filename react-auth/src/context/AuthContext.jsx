// src/context/AuthContext.jsx

import {
    createContext,
    useContext,
    useEffect,
    useMemo,
    useState,
  } from "react";
  
  import { authService } from "../services/authService";
  
  const AuthContext = createContext(null);
  
  export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
  
    useEffect(() => {
      const currentUser = authService.getCurrentUser();
  
      setUser(currentUser);
      setIsLoading(false);
    }, []);
  
    const register = async (credentials) => {
      const newUser = authService.register(credentials);
  
      setUser(newUser);
  
      return newUser;
    };
  
    const login = async (credentials) => {
      const loggedInUser = authService.login(credentials);
  
      setUser(loggedInUser);
  
      return loggedInUser;
    };
  
    const logout = () => {
      authService.logout();
  
      setUser(null);
    };
  
    const value = useMemo(
      () => ({
        user,
        isLoading,
        isAuthenticated: Boolean(user),
        register,
        login,
        logout,
      }),
      [user, isLoading]
    );
  
    return (
      <AuthContext.Provider value={value}>
        {children}
      </AuthContext.Provider>
    );
  };
  
  export const useAuth = () => {
    const context = useContext(AuthContext);
  
    if (!context) {
      throw new Error(
        "useAuth must be used inside an AuthProvider."
      );
    }
  
    return context;
  };

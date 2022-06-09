// Auth context

import { createContext, useContext, useState } from "react";
import { loginUser } from "actions/auth";
const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within a AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = async (payload) => {
    setIsLoading(true);
    let response = await loginUser(payload);
    if (response.status === true || response.status === "200") {
      setUser(response.data.user);
      setToken(response.data.token);
      setIsLoggedIn(true);
      setIsLoading(false);
    }
    return response;
  };
  const logout = () => {
    setUser(null);
    setIsLoggedIn(false);
  };
  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isLoading,
        isLoggedIn,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

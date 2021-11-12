import { signInWithPopup } from "@firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { auth, provider } from "../fire";
import Loading from "./Loading";

export const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
        setIsAuthenticated(true);
      } else {
        setUser({});
        setIsAuthenticated(false);
      }
      setLoading(false);
    });
  }, []);

  const login = async () => {
    const { user } = await signInWithPopup(auth, provider);
    setUser(user);
    setIsAuthenticated(true);
  };

  const logout = async () => {
    await auth.signOut();
    setIsAuthenticated(false);
  };

  if (loading) return <Loading />;

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

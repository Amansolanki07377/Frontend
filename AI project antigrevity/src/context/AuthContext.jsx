import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('antigravity_user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('antigravity_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('antigravity_user');
    }
  }, [user]);

  const login = (email, password) => {
    // Mock login logic
    if (email === 'admin@antigravity.com' && password === 'admin') {
      setUser({ email, name: 'Admin User', isAdmin: true });
      return true;
    } else if (email && password) {
      setUser({ email, name: email.split('@')[0], isAdmin: false });
      return true;
    }
    return false;
  };

  const signup = (name, email, password) => {
    // Mock signup logic
    setUser({ email, name, isAdmin: false });
    return true;
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

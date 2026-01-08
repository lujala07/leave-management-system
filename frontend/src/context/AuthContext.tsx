import { createContext, useState } from "react";
import { type MockUser, mockUsers } from "../data/mockUsers";

interface AuthContextType {
  user: MockUser | null;
  login: (email: string, password: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<MockUser | null>(null);

  const login = (email: string, password: string): boolean => {
    const foundUser = mockUsers.find(
      (u) => u.email === email && u.password === password
    );
    if (!foundUser) return false;

    setUser(foundUser);
    localStorage.setItem("user", JSON.stringify(foundUser));
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext };
import { useAuth } from "./context/useAuth";
import { AuthProvider } from "./context/AuthContext";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";

const AppContent = () => {
  const { user } = useAuth();
  return user ? <Dashboard /> : <Login />;
};

const App = () => {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
};

export default App;
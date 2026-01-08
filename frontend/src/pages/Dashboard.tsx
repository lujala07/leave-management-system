import { useAuth } from "../context/useAuth";

const Dashboard = () => {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded drop-shadow-lg w-90 text-center pt-4">
        <h1 className="text-xl">Welcome!</h1>
        <p className="mb-2">
          <span className="font-medium">Name:</span> {user?.name}
        </p>
        <p className="mb-2">
          <span className="font-medium">Email:</span> {user?.email}
        </p>
        <p className="mb-2">
          <span className="font-medium">Role:</span> {user?.role}
        </p>
        <p className="mb-6">
          <span className="font-medium">Status:</span> {user?.status}
        </p>
        <button 
          onClick={logout} 
          className="bg-red-500 text-white px-4 py-2 rounded drop-shadow-md hover:bg-red-600 mx-auto block"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Dashboard;

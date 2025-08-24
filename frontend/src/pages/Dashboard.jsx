import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    }
  }, [navigate]);

  const handleLogout = async () => {
    try {
      // Call backend logout API
      await fetch("http://localhost:5000/api/auth/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`, // send token if needed
        },
      });
    } catch (error) {
      console.error("Logout request failed", error);
    } finally {
      // Clear token and redirect
      localStorage.removeItem("token");
      navigate("/login");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-blue-200 p-6">
      <div className="bg-white shadow-lg rounded-2xl p-8 max-w-md w-full text-center">
        <h1 className="text-4xl font-bold mb-4 text-blue-700">Dashboard</h1>
        <p className="text-lg mb-6 text-gray-600">Welcome to your dashboard! You are logged in successfully.</p>

        <div className="flex flex-col gap-4 items-center">
          <button
            onClick={() => navigate('/upload')}
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-full font-semibold w-full"
          >
            Upload Trash
          </button>

          <button
            onClick={() => navigate('/tokens')}
            className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-full font-semibold w-full"
          >
            View Tokens
          </button>

          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-full font-semibold w-full"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

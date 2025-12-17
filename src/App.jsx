import { Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import api from './services/api';

function App() {
  const [isAuth, setIsAuth] = useState(null);
  const [moderator, setModerator] = useState(null);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const res = await api.get('/api/check-auth');
      setIsAuth(true);
      setModerator(res.data);
    } catch {
      setIsAuth(false);
    }
  };

  const handleLogin = (data) => {
    setIsAuth(true);
    setModerator(data);
  };

  const handleLogout = async () => {
    await api.post('/api/logout');
    setIsAuth(false);
    setModerator(null);
  };

  if (isAuth === null) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-50 flex items-center justify-center">
        <div className="text-center animate-fade-in">
          <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
            <span className="text-3xl">📊</span>
          </div>
          <p className="text-slate-600 text-lg font-medium">Yuklanmoqda...</p>
          <div className="mt-4 flex justify-center gap-1">
            <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
            <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
            <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <Routes>
      <Route 
        path="/" 
        element={isAuth ? <Navigate to="/dashboard" /> : <Login onLogin={handleLogin} />} 
      />
      <Route 
        path="/dashboard" 
        element={isAuth ? <Dashboard moderator={moderator} onLogout={handleLogout} /> : <Navigate to="/" />} 
      />
    </Routes>
  );
}

export default App;

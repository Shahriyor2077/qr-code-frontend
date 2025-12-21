import { Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import api from './services/api';

function App() {
  const [isAuth, setIsAuth] = useState(null);
  const [moderator, setModerator] = useState(null);

  useEffect(() => {
    api.get('/api/check-auth')
      .then(res => { setIsAuth(true); setModerator(res.data); })
      .catch(() => setIsAuth(false));
  }, []);

  const handleLogin = (data) => { setIsAuth(true); setModerator(data); };
  
  const handleLogout = async () => {
    await api.post('/api/logout');
    setIsAuth(false);
    setModerator(null);
  };

  if (isAuth === null) return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-50 flex items-center justify-center">
      <p className="text-slate-600 text-lg">Yuklanmoqda...</p>
    </div>
  );

  return (
    <Routes>
      <Route path="/" element={isAuth ? <Navigate to="/dashboard" /> : <Login onLogin={handleLogin} />} />
      <Route path="/dashboard" element={isAuth ? <Dashboard moderator={moderator} onLogout={handleLogout} /> : <Navigate to="/" />} />
    </Routes>
  );
}

export default App;

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await api.post('/api/login', { username, password });
      onLogin(res.data);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.error || 'Xatolik yuz berdi');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center p-5">
      <div className="bg-white rounded-3xl p-10 w-full max-w-md shadow-xl border border-slate-100">
        <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-2xl flex items-center justify-center shadow-lg">
          <span className="text-4xl">🔐</span>
        </div>
        
        <h1 className="text-3xl font-bold text-center text-slate-800 mb-2">Xush kelibsiz!</h1>
        <p className="text-slate-500 text-center mb-8">Moderator paneliga kirish</p>
        
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-slate-600 font-medium mb-2 text-sm">Login</label>
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Login kiriting" className="input-modern" required />
          </div>
          <div>
            <label className="block text-slate-600 font-medium mb-2 text-sm">Parol</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Parol kiriting" className="input-modern" required />
          </div>
          <button type="submit" disabled={loading} className="w-full btn-primary py-4 text-lg disabled:opacity-50">
            {loading ? 'Kirish...' : 'Kirish'}
          </button>
          {error && <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-600 text-center text-sm">⚠️ {error}</div>}
        </form>
        
        <div className="mt-8 p-4 bg-slate-50 rounded-xl border border-slate-200 text-center">
          <p className="text-xs text-slate-500 mb-2">Default: admin / admin123</p>
        </div>
      </div>
    </div>
  );
}

export default Login;

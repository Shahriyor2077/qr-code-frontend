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
      <div className="bg-white rounded-3xl p-10 w-full max-w-md shadow-xl shadow-slate-200/50 border border-slate-100 animate-slide-up">
        <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-500/30">
          <span className="text-4xl">🔐</span>
        </div>
        
        <h1 className="text-3xl font-bold text-center text-slate-800 mb-2">Xush kelibsiz!</h1>
        <p className="text-slate-500 text-center mb-8">Moderator paneliga kirish</p>
        
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-slate-600 font-medium mb-2 text-sm">Login</label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"></span>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Login kiriting"
                className="input-modern pl-12"
                required
              />
            </div>
          </div>
          
          <div>
            <label className="block text-slate-600 font-medium mb-2 text-sm">Parol</label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"></span>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Parol kiriting"
                className="input-modern pl-12"
                required
              />
            </div>
          </div>
          
          <button
            type="submit"
            disabled={loading}
            className="w-full btn-primary py-4 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                </svg>
                Kirish...
              </span>
            ) : 'Kirish'}
          </button>
          
          {error && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-600 text-center text-sm animate-fade-in">
              ⚠️ {error}
            </div>
          )}
        </form>
        
        <div className="mt-8 p-4 bg-gradient-to-r from-slate-50 to-indigo-50 rounded-xl border border-slate-200">
          <p className="text-xs text-slate-500 mb-2 text-center">🔓 Default kirish ma'lumotlari</p>
          <div className="flex justify-center gap-4 text-sm">
            <span className="px-3 py-1.5 bg-white rounded-lg text-slate-700 font-mono shadow-sm">admin</span>
            <span className="px-3 py-1.5 bg-white rounded-lg text-slate-700 font-mono shadow-sm">admin123</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;

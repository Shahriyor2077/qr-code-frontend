import { useState } from 'react';
import api from '../services/api';

function UserForm({ onUserCreated }) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [branch, setBranch] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await api.post('/api/users', { name, phone, branch });
      setName('');
      setPhone('');
      setBranch('');
      onUserCreated(res.data);
    } catch (err) {
      alert('Xatolik: ' + (err.response?.data?.error || 'Noma\'lum xatolik'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-5">
        <div>
          <label className="block text-slate-600 font-medium mb-2 text-sm">👤 Ism</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Ism kiriting"
            className="input-modern"
            required
          />
        </div>
        <div>
          <label className="block text-slate-600 font-medium mb-2 text-sm">📞 Telefon raqami</label>
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="+998 90 123 45 67"
            className="input-modern"
            required
          />
        </div>
        <div>
          <label className="block text-slate-600 font-medium mb-2 text-sm">🏢 Shaxobcha nomi</label>
          <input
            type="text"
            value={branch}
            onChange={(e) => setBranch(e.target.value)}
            placeholder="Shaxobcha nomi"
            className="input-modern"
            required
          />
        </div>
      </div>
      <button
        type="submit"
        disabled={loading}
        className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? (
          <span className="flex items-center gap-2">
            <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
            </svg>
            Yaratilmoqda...
          </span>
        ) : (
          <span className="flex items-center gap-2">
            <span>📱</span> Qo'shish va QR yaratish
          </span>
        )}
      </button>
    </form>
  );
}

export default UserForm;

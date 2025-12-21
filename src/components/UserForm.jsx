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
      setName(''); setPhone(''); setBranch('');
      onUserCreated(res.data);
    } catch (err) {
      alert('Xatolik: ' + (err.response?.data?.error || 'Nomalum xatolik'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-5">
        <div>
          <label className="block text-slate-600 font-medium mb-2 text-sm">👤 Ism</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Ism kiriting" className="input-modern" required />
        </div>
        <div>
          <label className="block text-slate-600 font-medium mb-2 text-sm">📞 Telefon</label>
          <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+998 90 123 45 67" className="input-modern" required />
        </div>
        <div>
          <label className="block text-slate-600 font-medium mb-2 text-sm">🏢 Shaxobcha</label>
          <input type="text" value={branch} onChange={(e) => setBranch(e.target.value)} placeholder="Shaxobcha nomi" className="input-modern" required />
        </div>
      </div>
      <button type="submit" disabled={loading} className="btn-primary disabled:opacity-50">
        {loading ? 'Yaratilmoqda...' : '📱 Qoshish va QR yaratish'}
      </button>
    </form>
  );
}

export default UserForm;

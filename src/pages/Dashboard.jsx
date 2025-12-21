import { useState, useEffect } from 'react';
import api from '../services/api';
import UserForm from '../components/UserForm';
import UserTable from '../components/UserTable';
import QRModal from '../components/QRModal';
import HistoryModal from '../components/HistoryModal';

function Dashboard({ moderator, onLogout }) {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [showQR, setShowQR] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [stats, setStats] = useState({ total: 0, checks: 0 });

  useEffect(() => {
    loadUsers();
  }, []);

  useEffect(() => {
    const totalChecks = users.reduce((sum, u) => sum + (u.checkCount || 0), 0);
    setStats({ total: users.length, checks: totalChecks });
  }, [users]);

  const loadUsers = async () => {
    try {
      const res = await api.get('/api/users');
      setUsers(res.data);
    } catch (err) {
      console.error('Xatolik:', err);
    }
  };

  const searchUsers = async () => {
    if (!searchQuery.trim()) return loadUsers();
    try {
      const res = await api.get(`/api/users/search/${encodeURIComponent(searchQuery)}`);
      setUsers(res.data);
    } catch (err) {
      console.error('Xatolik:', err);
    }
  };

  const handleUserCreated = (user) => {
    setSelectedUser(user);
    setShowQR(true);
    loadUsers();
  };

  const handleShowQR = async (userId) => {
    const res = await api.get(`/api/users/${userId}`);
    setSelectedUser(res.data);
    setShowQR(true);
  };

  const handleShowHistory = async (userId) => {
    const res = await api.get(`/api/users/${userId}`);
    setSelectedUser(res.data);
    setShowHistory(true);
  };

  const handleAddCheck = async (userId) => {
    if (!window.confirm('Chek qoshishni tasdiqlaysizmi?')) return;
    try {
      const res = await api.post(`/api/users/${userId}/add-check`);
      alert(`Chek qo'shildi! Jami: ${res.data.checkCount} ta`);
      loadUsers();
    } catch (err) {
      alert('Xatolik yuz berdi');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-50 p-5">
      <div className="max-w-7xl mx-auto space-y-6">
        <header className="bg-white rounded-2xl p-5 flex justify-between items-center shadow-sm border border-slate-100">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-md">
              <span className="text-2xl">📊</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-800">QR Check System</h1>
              <p className="text-sm text-slate-500">Moderator boshqaruv paneli</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2 px-4 py-2 bg-slate-100 rounded-xl">
              <span className="text-slate-400">👤</span>
              <span className="text-slate-700 font-medium">{moderator?.name || 'Moderator'}</span>
            </div>
            <button onClick={onLogout} className="px-4 py-2.5 bg-slate-100 text-slate-600 rounded-xl hover:bg-red-50 hover:text-red-600 transition-all font-medium">
              🚪 Chiqish
            </button>
          </div>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-2xl">👥</div>
              <div>
                <p className="text-sm text-slate-500">Jami foydalanuvchilar</p>
                <p className="text-2xl font-bold text-slate-800">{stats.total}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center text-2xl">🧾</div>
              <div>
                <p className="text-sm text-slate-500">Jami cheklar</p>
                <p className="text-2xl font-bold text-slate-800">{stats.checks}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center text-2xl">📱</div>
              <div>
                <p className="text-sm text-slate-500">QR kodlar</p>
                <p className="text-2xl font-bold text-slate-800">{stats.total}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center text-2xl">📈</div>
              <div>
                <p className="text-sm text-slate-500">O'rtacha chek</p>
                <p className="text-2xl font-bold text-slate-800">{stats.total > 0 ? (stats.checks / stats.total).toFixed(1) : 0}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
            <div className="w-10 h-10 bg-indigo-50 rounded-lg flex items-center justify-center text-xl">➕</div>
            <h2 className="text-lg font-semibold text-slate-800">Yangi foydalanuvchi qo'shish</h2>
          </div>
          <UserForm onUserCreated={handleUserCreated} />
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
            <div className="w-10 h-10 bg-emerald-50 rounded-lg flex items-center justify-center text-xl">👥</div>
            <h2 className="text-lg font-semibold text-slate-800">Foydalanuvchilar ro'yxati</h2>
          </div>
          
          <div className="flex gap-3 mb-6 flex-wrap">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && searchUsers()}
              placeholder="Qidirish (ism, telefon, shaxobcha)..."
              className="input-modern flex-1 min-w-[250px]"
            />
            <button onClick={searchUsers} className="btn-primary">Qidirish</button>
            <button onClick={loadUsers} className="btn-secondary">🔄 Yangilash</button>
          </div>

          <UserTable users={users} onShowQR={handleShowQR} onAddCheck={handleAddCheck} onShowHistory={handleShowHistory} />
        </div>
      </div>

      {showQR && selectedUser && <QRModal user={selectedUser} onClose={() => setShowQR(false)} />}
      {showHistory && selectedUser && <HistoryModal user={selectedUser} onClose={() => setShowHistory(false)} />}
    </div>
  );
}

export default Dashboard;

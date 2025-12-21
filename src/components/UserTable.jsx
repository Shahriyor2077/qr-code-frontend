function UserTable({ users, onShowQR, onAddCheck, onShowHistory }) {
  if (users.length === 0) return (
    <div className="text-center py-16">
      <div className="text-6xl mb-4">📭</div>
      <p className="text-slate-500 text-lg">Foydalanuvchilar topilmadi</p>
    </div>
  );

  return (
    <div className="overflow-x-auto rounded-xl border border-slate-200">
      <table className="table-modern">
        <thead>
          <tr>
            <th>#</th>
            <th>Ism</th>
            <th>Telefon</th>
            <th>Shaxobcha</th>
            <th>Cheklar</th>
            <th>Amallar</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, i) => (
            <tr key={user._id}>
              <td className="text-slate-500">{i + 1}</td>
              <td className="font-medium text-slate-800">{user.name}</td>
              <td className="text-slate-600">{user.phone}</td>
              <td><span className="px-3 py-1.5 bg-slate-100 rounded-lg text-sm">🏢 {user.branch}</span></td>
              <td><span className="badge badge-success">🧾 {user.checkCount} ta</span></td>
              <td>
                <div className="flex gap-2 flex-wrap">
                  <button onClick={() => onShowQR(user._id)} className="px-3 py-1.5 bg-indigo-600 text-white text-sm rounded-lg hover:bg-indigo-700">📱 QR</button>
                  <button onClick={() => onAddCheck(user._id)} className="px-3 py-1.5 bg-emerald-600 text-white text-sm rounded-lg hover:bg-emerald-700">➕ Chek</button>
                  <button onClick={() => onShowHistory(user._id)} className="px-3 py-1.5 bg-slate-100 text-slate-600 text-sm rounded-lg hover:bg-slate-200">📋 Tarix</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UserTable;

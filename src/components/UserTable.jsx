function UserTable({ users, onShowQR, onAddCheck, onShowHistory }) {
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
          {users.map((user, index) => (
            <tr key={user._id}>
              <td className="text-slate-500 font-medium">{index + 1}</td>
              <td>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 bg-indigo-100 text-indigo-700 rounded-lg flex items-center justify-center font-semibold text-sm">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <span className="font-medium text-slate-800">{user.name}</span>
                </div>
              </td>
              <td className="text-slate-600">{user.phone}</td>
              <td>
                <span className="px-3 py-1.5 bg-slate-100 text-slate-600 rounded-lg text-sm">
                  🏢 {user.branch}
                </span>
              </td>
              <td>
                <span className="badge badge-success">
                  🧾 {user.checkCount} ta
                </span>
              </td>
              <td>
                <div className="flex gap-2 flex-wrap">
                  <button
                    onClick={() => onShowQR(user._id)}
                    className="px-3 py-1.5 bg-indigo-600 text-white text-sm rounded-lg hover:bg-indigo-700 transition-colors font-medium"
                  >
                    📱 QR
                  </button>
                  <button
                    onClick={() => onAddCheck(user._id)}
                    className="px-3 py-1.5 bg-emerald-600 text-white text-sm rounded-lg hover:bg-emerald-700 transition-colors font-medium"
                  >
                    ➕ Chek
                  </button>
                  <button
                    onClick={() => onShowHistory(user._id)}
                    className="px-3 py-1.5 bg-slate-100 text-slate-600 text-sm rounded-lg hover:bg-slate-200 transition-colors font-medium"
                  >
                    📋 Tarix
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {users.length === 0 && (
        <div className="text-center py-16">
          <div className="text-6xl mb-4">📭</div>
          <p className="text-slate-500 text-lg">Foydalanuvchilar topilmadi</p>
          <p className="text-slate-400 text-sm mt-1">Yangi foydalanuvchi qo'shing</p>
        </div>
      )}
    </div>
  );
}

export default UserTable;

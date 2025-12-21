function HistoryModal({ user, onClose }) {
  return (
    <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal-content">
        <div className="p-6 text-center border-b border-slate-100">
          <h3 className="text-xl font-bold text-slate-800 mb-1">📋 Chek tarixi</h3>
          <p className="text-slate-500 text-sm">{user.name} • {user.branch}</p>
        </div>
        
        <div className="p-4 bg-slate-50 border-b border-slate-100 text-center">
          <span className="text-2xl font-bold text-indigo-600">{user.checkCount}</span>
          <span className="text-slate-500 ml-2">ta chek</span>
        </div>
        
        <div className="p-4 max-h-80 overflow-y-auto">
          {user.checkHistory?.length > 0 ? (
            <div className="space-y-2">
              {user.checkHistory.map((item, i) => (
                <div key={i} className="flex justify-between items-center p-3 bg-slate-50 rounded-xl">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-emerald-100 text-emerald-700 rounded-lg flex items-center justify-center text-sm font-semibold">{i + 1}</div>
                    <div>
                      <p className="text-slate-700 font-medium text-sm">{item.addedBy?.name || 'Moderator'}</p>
                      <p className="text-slate-400 text-xs">{new Date(item.addedAt).toLocaleString('uz-UZ')}</p>
                    </div>
                  </div>
                  <span className="text-emerald-500">✓</span>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-5xl mb-3">📭</div>
              <p className="text-slate-500">Hali chek qoshilmagan</p>
            </div>
          )}
        </div>
        
        <div className="p-4 border-t border-slate-100">
          <button onClick={onClose} className="btn-secondary w-full">Yopish</button>
        </div>
      </div>
    </div>
  );
}

export default HistoryModal;

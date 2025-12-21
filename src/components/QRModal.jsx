function QRModal({ user, onClose }) {
  const downloadQR = () => {
    const link = document.createElement('a');
    link.download = `QR_${user.name}_${user.branch}.png`;
    link.href = user.qrCode;
    link.click();
  };

  return (
    <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal-content p-6 text-center">
        <h3 className="text-xl font-bold text-slate-800 mb-1">📱 QR Kod</h3>
        <p className="text-slate-500 text-sm mb-5">{user.name} • {user.branch}</p>
        
        <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 inline-block mb-5">
          <img src={user.qrCode} alt="QR Code" className="w-48 h-48 object-contain" />
        </div>
        
        <div className="bg-slate-50 rounded-xl p-4 mb-5 text-sm">
          <p className="text-slate-600">📞 {user.phone}</p>
          <p className="text-slate-600 mt-1">🧾 Cheklar: <span className="font-semibold text-indigo-600">{user.checkCount}</span></p>
        </div>
        
        <div className="flex gap-3 justify-center">
          <button onClick={downloadQR} className="btn-primary">⬇️ Yuklab olish</button>
          <button onClick={onClose} className="btn-secondary">Yopish</button>
        </div>
      </div>
    </div>
  );
}

export default QRModal;

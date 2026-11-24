import { useEffect, useState } from 'react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export default function UserHome() {
  const [packages, setPackages] = useState([]);

  useEffect(() => {
    fetch(`${API_URL}/api/goitap`)
      .then((res) => res.json())
      .then((data) => setPackages(data))
      .catch((err) => console.error('Lỗi tải gói tập:', err));
  }, []);

  return (
    <div>
      <h1>Danh sách Gói tập GYM</h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px', marginTop: '20px' }}>
        {packages.map((pkg) => (
          <div key={pkg.MaGoi} style={{ border: '1px solid #cbd5e1', borderRadius: '8px', padding: '20px', background: '#fff' }}>
            <h3 style={{ marginTop: 0, color: '#0f172a' }}>{pkg.TenGoi}</h3>
            <p style={{ color: '#475569' }}>{pkg.MoTa}</p>
            <p><strong>Thời hạn:</strong> {pkg.ThoiHanThang} tháng</p>
            <p style={{ fontSize: '20px', fontWeight: 'bold', color: '#dc2626' }}>
              {Number(pkg.GiaTien).toLocaleString('vi-VN')} VNĐ
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
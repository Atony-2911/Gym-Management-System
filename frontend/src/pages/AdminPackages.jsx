import { useEffect, useState } from 'react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export default function AdminPackages() {
  const [packages, setPackages] = useState([]);
  const [form, setForm] = useState({ TenGoi: '', MoTa: '', GiaTien: '', ThoiHanThang: '' });
  const [editingId, setEditingId] = useState(null);

  const loadPackages = () => {
    fetch(`${API_URL}/api/goitap`)
      .then((res) => res.json())
      .then((data) => setPackages(data))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    loadPackages();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = editingId ? `${API_URL}/api/goitap/${editingId}` : `${API_URL}/api/goitap`;
    const method = editingId ? 'PUT' : 'POST';

    await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        TenGoi: form.TenGoi,
        MoTa: form.MoTa,
        GiaTien: Number(form.GiaTien),
        ThoiHanThang: Number(form.ThoiHanThang),
      }),
    });

    setForm({ TenGoi: '', MoTa: '', GiaTien: '', ThoiHanThang: '' });
    setEditingId(null);
    loadPackages();
  };

  const handleEdit = (pkg) => {
    setEditingId(pkg.MaGoi);
    setForm({
      TenGoi: pkg.TenGoi,
      MoTa: pkg.MoTa || '',
      GiaTien: pkg.GiaTien,
      ThoiHanThang: pkg.ThoiHanThang,
    });
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Bạn có chắc muốn xóa gói tập này?')) return;
    await fetch(`${API_URL}/api/goitap/${id}`, { method: 'DELETE' });
    loadPackages();
  };

  return (
    <div>
      <h2>Quản lý Danh mục Gói tập</h2>

      <form onSubmit={handleSubmit} style={{ background: '#fff', padding: '20px', borderRadius: '8px', marginBottom: '25px', display: 'grid', gap: '10px', maxWidth: '500px', border: '1px solid #e2e8f0' }}>
        <input placeholder="Tên gói tập" value={form.TenGoi} onChange={(e) => setForm({ ...form, TenGoi: e.target.value })} required style={{ padding: '8px' }} />
        <input placeholder="Mô tả" value={form.MoTa} onChange={(e) => setForm({ ...form, MoTa: e.target.value })} style={{ padding: '8px' }} />
        <input type="number" min="0" placeholder="Giá tiền (VNĐ)" value={form.GiaTien} onChange={(e) => setForm({ ...form, GiaTien: e.target.value })} required style={{ padding: '8px' }} />
        <input type="number" min="1" placeholder="Thời hạn (tháng)" value={form.ThoiHanThang} onChange={(e) => setForm({ ...form, ThoiHanThang: e.target.value })} required style={{ padding: '8px' }} />
        <div style={{ display: 'flex', gap: '10px' }}>
          <button type="submit" style={{ padding: '10px 16px', background: '#2563eb', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
            {editingId ? 'Lưu cập nhật' : 'Thêm gói tập'}
          </button>
          {editingId && (
            <button type="button" onClick={() => { setEditingId(null); setForm({ TenGoi: '', MoTa: '', GiaTien: '', ThoiHanThang: '' }); }} style={{ padding: '10px 16px', cursor: 'pointer' }}>
              Hủy
            </button>
          )}
        </div>
      </form>

      <table border="1" cellPadding="10" style={{ width: '100%', borderCollapse: 'collapse', background: '#fff' }}>
     <thead>
        <tr style={{ background: '#e2e8f0' }}>
            <th>STT</th>
            <th>Mã</th>
            <th>Tên gói</th>
            <th>Mô tả</th>
            <th>Giá tiền</th>
            <th>Thời hạn</th>
            <th>Thao tác</th>
        </tr>
        </thead>
        <tbody>
        {packages.map((pkg, index) => (
            <tr key={pkg.MaGoi}>
            <td>{index + 1}</td>
            <td>{pkg.MaGoi}</td>
            <td>{pkg.TenGoi}</td>
            <td>{pkg.MoTa}</td>
            <td>{Number(pkg.GiaTien).toLocaleString('vi-VN')} VNĐ</td>
            <td>{pkg.ThoiHanThang} tháng</td>
            <td>
                <button onClick={() => handleEdit(pkg)} style={{ marginRight: '8px', cursor: 'pointer' }}>Sửa</button>
                <button onClick={() => handleDelete(pkg.MaGoi)} style={{ color: 'red', cursor: 'pointer' }}>Xóa</button>
            </td>
            </tr>
        ))}
        </tbody>
      </table>
    </div>
  );
}
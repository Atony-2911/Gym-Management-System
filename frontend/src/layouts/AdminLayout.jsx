import { Link, Outlet } from 'react-router-dom';

export default function AdminLayout() {
  return (
    <div style={{ fontFamily: 'Arial, sans-serif', display: 'flex', minHeight: '100vh' }}>
      <aside style={{ width: '240px', background: '#0f172a', color: '#fff', padding: '20px' }}>
        <h2 style={{ marginTop: 0, color: '#38bdf8' }}>GYM ADMIN</h2>
        <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <li><Link to="/admin" style={{ color: '#fff', textDecoration: 'none' }}>📦 Quản lý Gói tập (CRUD)</Link></li>
          <li><Link to="/" style={{ color: '#94a3b8', textDecoration: 'none' }}>← Về giao diện User</Link></li>
        </ul>
      </aside>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: '#f8fafc' }}>
        <header style={{ background: '#fff', padding: '15px 30px', borderBottom: '1px solid #e2e8f0' }}>
          <strong>Bảng điều khiển Quản trị viên</strong>
        </header>
        <main style={{ padding: '30px' }}>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
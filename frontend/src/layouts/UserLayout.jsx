import { Link, Outlet } from 'react-router-dom';

export default function UserLayout() {
  return (
    <div style={{ fontFamily: 'Arial, sans-serif', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <header style={{ background: '#1e293b', color: '#fff', padding: '15px 30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 style={{ margin: 0 }}>GYM FITNESS CENTER</h2>
        <nav style={{ display: 'flex', gap: '20px' }}>
          <Link to="/" style={{ color: '#fff', textDecoration: 'none', fontWeight: 'bold' }}>Trang chủ (Gói tập)</Link>
          <Link to="/admin" style={{ color: '#38bdf8', textDecoration: 'none', fontWeight: 'bold' }}>Vào trang Admin →</Link>
        </nav>
      </header>

      <main style={{ flex: 1, padding: '30px', maxWidth: '1100px', width: '100%', margin: '0 auto' }}>
        <Outlet />
      </main>

      <footer style={{ background: '#f1f5f9', textAlign: 'center', padding: '15px', color: '#475569' }}>
        © 2026 Hệ thống Quản lý & Đặt lịch Trung tâm GYM
      </footer>
    </div>
  );
}
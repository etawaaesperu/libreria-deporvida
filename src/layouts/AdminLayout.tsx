import { useDeporvida } from '../context/DeporvidaContext';

export function AdminLayout({ children, userName }: { children: React.ReactNode; userName?: string }) {
  const { navigate, doLogout } = useDeporvida();

  const sidebarItems = [
    { view: 'admin-dashboard', label: 'Panel', icon: '💻' },
    { view: 'admin-colaborador', label: 'Colaboradores', icon: '👤' },
    { view: 'admin-cliente', label: 'Clientes', icon: '📚' },
    { view: 'admin-pedidos', label: 'Pedidos', icon: '📋' },
    { view: 'admin-compras', label: 'Compras', icon: '💰' },
    { view: 'admin-avisos', label: 'Avisos', icon: '📢' },
  ];

  return (
    <div id="admin-layout" className="deporvida-root">
      <nav className="navbar">
        <a href="#" className="navbar-brand" onClick={(e) => { e.preventDefault(); navigate('home'); }} style={{ cursor: 'pointer' }}>
          Librería <span>Deporvida</span>
        </a>
        <div>
          <button className="logout-btn" style={{ marginRight: '8px' }} onClick={() => navigate('home')}>🏠 Tienda</button>
          <button className="logout-btn" onClick={doLogout}>Cerrar Sesión</button>
        </div>
      </nav>
      <div className="layout">
        <div className="sidebar">
          <a href="#" className="sidebar-home-link" onClick={(e) => { e.preventDefault(); navigate('home'); }}>
            ← Volver a Tienda
          </a>
          <div className="profile">
            <div className="avatar">A</div>
            <h4 id="admin-user-name">{userName || 'Admin'}</h4>
          </div>
          {sidebarItems.map(item => (
            <a
              key={item.view}
              href="#"
              data-view={item.view}
              onClick={(e) => { e.preventDefault(); navigate(item.view as any); }}
            >
              {item.icon} {item.label}
            </a>
          ))}
        </div>
        <div className="main-content" id="admin-content">
          {children}
        </div>
      </div>
    </div>
  );
}

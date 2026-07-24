import { useDeporvida } from '../context/DeporvidaContext';

export function ClienteLayout({ children, userName }: { children: React.ReactNode; userName?: string }) {
  const { navigate, doLogout } = useDeporvida();

  const sidebarItems = [
    { view: 'cliente-dashboard', label: 'Panel', icon: '💻' },
    { view: 'cliente-pedidos', label: 'Mis Pedidos', icon: '📋' },
  ];

  return (
    <div id="cliente-layout" className="deporvida-root">
      <nav className="navbar">
        <a href="#" className="navbar-brand" onClick={(e) => { e.preventDefault(); navigate('home'); }} style={{ cursor: 'pointer' }}>
          Librería <span>Deporvida</span>
        </a>
        <div><button className="logout-btn" onClick={() => navigate('home')}>🏠 Tienda</button></div>
      </nav>
      <div className="layout">
        <div className="sidebar">
          <a href="#" className="sidebar-home-link" onClick={(e) => { e.preventDefault(); navigate('home'); }}>
            ← Volver a Tienda
          </a>
          <div className="profile">
            <div className="avatar" style={{ background: '#FFB64D', position: 'relative' }}>
              {userName?.charAt(0).toUpperCase() || 'C'}
              <div className="avatar-tooltip">
                <div className="tooltip-arrow"></div>
                <div className="tooltip-content">
                  <button className="tooltip-btn" onClick={() => navigate('cliente-dashboard')}>👤 Mi Perfil</button>
                  <button className="tooltip-btn" onClick={() => navigate('cliente-pedidos')}>📋 Mis Pedidos</button>
                  <button className="tooltip-btn" onClick={doLogout}>🔴 Cerrar Sesión</button>
                </div>
              </div>
            </div>
            <h4 id="cliente-user-name">{userName || 'Cliente'}</h4>
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
        <div className="main-content" id="cliente-content">
          {children}
        </div>
      </div>
    </div>
  );
}

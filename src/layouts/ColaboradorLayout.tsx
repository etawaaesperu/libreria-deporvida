import { useDeporvida } from '../context/DeporvidaContext';

export function ColaboradorLayout({ children, userName }: { children: React.ReactNode; userName?: string }) {
  const { navigate, doLogout } = useDeporvida();

  const sidebarItems = [
    { view: 'colaborador-dashboard', label: 'Panel', icon: '💻' },
    { view: 'colaborador-pedidos', label: 'Pedidos', icon: '📋' },
    { view: 'colaborador-avisos', label: 'Avisos', icon: '📢' },
  ];

  return (
    <div id="colaborador-layout" className="deporvida-root">
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
            <div className="avatar" style={{ background: '#2ed8b6', position: 'relative' }}>
              {userName?.charAt(0).toUpperCase() || 'C'}
              <div className="avatar-tooltip">
                <div className="tooltip-arrow"></div>
                <div className="tooltip-content">
                  <button className="tooltip-btn" onClick={() => navigate('colaborador-dashboard')}>👤 Mi Perfil</button>
                  <button className="tooltip-btn" onClick={() => navigate('colaborador-pedidos')}>📋 Pedidos</button>
                  <button className="tooltip-btn" onClick={() => navigate('colaborador-avisos')}>📢 Avisos</button>
                  <button className="tooltip-btn" onClick={doLogout}>🔴 Cerrar Sesión</button>
                </div>
              </div>
            </div>
            <h4 id="colaborador-user-name">{userName || 'Colaborador'}</h4>
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
        <div className="main-content" id="colaborador-content">
          {children}
        </div>
      </div>
    </div>
  );
}

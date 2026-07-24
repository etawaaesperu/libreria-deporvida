import { useDeporvida } from '../context/DeporvidaContext';
import { useState, useCallback } from 'react';
import '../styles/crisol-layout.css';

export function PublicLayout({ children }: { children: React.ReactNode }) {
  const { navigate, getCartCount, data, currentUser, doLogout } = useDeporvida();
  const cartCount = getCartCount();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate('catalogo', { searchTerm: searchQuery.trim() } as any);
    }
  }, [searchQuery, navigate]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div id="public-layout" className="deporvida-root">
      <header className="crisol-header">
        <div className="crisol-header-top">
          <a href="#" className="crisol-logo" onClick={(e) => { e.preventDefault(); navigate('home'); }}>
            Librería <span>Deporvida</span>
          </a>

          <form className="crisol-search-bar" onSubmit={handleSearch} role="search">
            <label htmlFor="crisol-search" className="visually-hidden">Buscar libros</label>
            <input
              id="crisol-search"
              type="search"
              placeholder="Buscar libros, autores, categorías..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="crisol-search-input"
              autoComplete="off"
            />
            <button type="submit" className="crisol-search-btn" aria-label="Buscar">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8"></circle>
                <path d="M21 21l-4.35-4.35"></path>
              </svg>
            </button>
          </form>

          <div className="crisol-header-actions">
            <a href="#" className="crisol-icon-btn" onClick={(e) => { e.preventDefault(); navigate('favoritos'); }} aria-label="Mis favoritos">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
              </svg>
            </a>
            <a href="#" className="crisol-icon-btn" onClick={(e) => {
              e.preventDefault();
              if (!currentUser) { navigate('login'); return; }
              if (currentUser.role === 'admin') navigate('admin-dashboard');
              else if (currentUser.role === 'colaborador') navigate('colaborador-dashboard');
              else navigate('cliente-dashboard');
            }} aria-label="Mi cuenta">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
            </a>
            {currentUser && (
              <a href="#" className="crisol-icon-btn" onClick={(e) => { e.preventDefault(); doLogout(); }} aria-label="Cerrar sesión">
                Salir
              </a>
            )}
            <a href="#" className="crisol-cart-link" onClick={(e) => { e.preventDefault(); navigate('carrito'); }} aria-label="Carrito de compras">
              <span className="crisol-cart-icon">🛒</span>
              <span className="crisol-cart-badge">{cartCount}</span>
            </a>
          </div>
        </div>

        <nav className="crisol-nav-bar" role="navigation" aria-label="Categorías principales">
          <ul className="crisol-nav-list">
            <li className="crisol-nav-item">
              <a href="#" className="crisol-nav-link" onClick={(e) => { e.preventDefault(); navigate('home'); }}>Inicio</a>
            </li>
            <li className="crisol-nav-item">
              <a href="#" className="crisol-nav-link" onClick={(e) => { e.preventDefault(); navigate('catalogo'); }}>Catálogo</a>
            </li>
            <li className="crisol-nav-item">
              <a href="#" className="crisol-nav-link" onClick={(e) => { e.preventDefault(); navigate('about'); }}>Nosotros</a>
            </li>
            <li className="crisol-nav-item">
              <a href="#" className="crisol-nav-link" onClick={(e) => { e.preventDefault(); navigate('contact'); }}>Contacto</a>
            </li>
          </ul>
        </nav>
      </header>

      <main id="public-content" className="crisol-main">
        {children}
      </main>

      <footer className="crisol-footer">
  <div className="crisol-footer-top">
    <div className="crisol-footer-col">
      <a href="#" className="crisol-footer-brand-logo" onClick={(e) => { e.preventDefault(); navigate('home'); }}>
        Librería <span>Deporvida</span>
      </a>
      <p className="crisol-footer-tagline">Libros y más</p>

      <p className="crisol-footer-label">Síguenos en redes sociales:</p>
      <div className="crisol-footer-social">
        <a href="#" aria-label="Facebook">📘</a>
        <a href="#" aria-label="Instagram">📸</a>
        <a href="#" aria-label="X (Twitter)">🐦</a>
        <a href="#" aria-label="LinkedIn">💼</a>
        <a href="#" aria-label="YouTube">▶️</a>
      </div>

      <p className="crisol-footer-label">Métodos de Pago</p>
      <div className="crisol-payment-icons">
        <span className="crisol-payment-badge">💳 Mastercard</span>
        <span className="crisol-payment-badge">💳 Visa</span>
        <span className="crisol-payment-badge">📱 Yape</span>
        <span className="crisol-payment-badge">💳 Diners</span>
        <span className="crisol-payment-badge">💳 Amex</span>
        <span className="crisol-payment-badge">📱 Plin</span>
      </div>

      <p className="crisol-footer-label">Libro de reclamaciones</p>
      <a href="#" className="crisol-reclamos-link" onClick={(e) => { e.preventDefault(); navigate('contact'); }}>
        📋 Libro de Reclamaciones
      </a>
    </div>

    <div>
      <div className="crisol-footer-col">
        <h4>Mi cuenta</h4>
        <a href="#" onClick={(e) => { e.preventDefault(); navigate(currentUser ? 'cliente-pedidos' : 'login'); }}>Mis pedidos</a>
        <a href="#" onClick={(e) => { e.preventDefault(); navigate('favoritos'); }}>Mis deseos</a>
        <a href="#" onClick={(e) => { e.preventDefault(); navigate('contact'); }}>Recojo en tienda</a>
        <a href="#" onClick={(e) => { e.preventDefault(); navigate('contact'); }}>Preguntas frecuentes</a>
      </div>
      <div className="crisol-footer-col">
        <h4>Sobre Nosotros</h4>
        <a href="#" onClick={(e) => { e.preventDefault(); navigate('about'); }}>Quiénes somos</a>
        <a href="#" onClick={(e) => { e.preventDefault(); navigate('contact'); }}>Nuestras tiendas</a>
      </div>
    </div>

    <div className="crisol-footer-col">
      <h4>Contáctanos</h4>
      <a href="tel:+51174XXXXX">(+51) 933080551</a>
      <span className="crisol-footer-static">Lun a Sáb de 8am a 8pm</span>
      <a href="mailto:atencion@deporvida.com">atencion@deporvida.com</a>
    </div>

    <div className="crisol-footer-col">
      <h4>Términos y condiciones</h4>
      <a href="#" onClick={(e) => e.preventDefault()}>Términos y condiciones del usuario</a>
      <a href="#" onClick={(e) => e.preventDefault()}>Políticas de privacidad</a>
      <a href="#" onClick={(e) => e.preventDefault()}>Política de cambios y devoluciones</a>
    </div>
  </div>

  <div className="crisol-footer-bottom">
    LIBRERÍA DEPORVIDA | Todos los Derechos Reservados &copy; 2025
  </div>
</footer>
    </div>
  );
}
import { useDeporvida } from '../../context/DeporvidaContext';
import { BookCard } from './BookCard';

export function FavoritosView() {
  const { getFavoritos, addToCart, navigate } = useDeporvida();
  const favoritos = getFavoritos();

  return (
    <>
      <div className="hero" style={{ padding: '60px 20px' }}>
        <h1>Mis Favoritos</h1>
        <p>{favoritos.length === 0 ? 'Aún no has agregado libros a favoritos' : `${favoritos.length} libro(s) guardado(s)`}</p>
      </div>

      <div style={{ padding: '20px 5%', maxWidth: '1200px', margin: '0 auto' }}>
        {favoritos.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 20px' }}>
            <p style={{ fontSize: '48px', marginBottom: '16px' }}>♡</p>
            <p style={{ color: '#888', marginBottom: '24px', fontSize: '16px' }}>
              Explora nuestro catálogo y agrega tus libros favoritos
            </p>
            <button className="btn btn-primary" onClick={() => navigate('catalogo')}>
              Ir al catálogo
            </button>
          </div>
        ) : (
          <div className="cards-grid">
            {favoritos.map(libro => (
              <BookCard
                key={libro.id}
                libro={libro}
                onAddToCart={addToCart}
                variant="default"
              />
            ))}
          </div>
        )}
      </div>
    </>
  );
}

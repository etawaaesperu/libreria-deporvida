import { useState } from 'react';
import type { Libro } from '../../types';
import { useDeporvida } from '../../context/DeporvidaContext';
import { API_BASE_URL } from '../../services/api';

interface BookCardProps {
  libro: Libro;
  onAddToCart: (libro: Libro) => void;
  showFavorite?: boolean;
  variant?: 'default' | 'compact';
}

export function getImageUrl(url: string | undefined): string {
  if (!url) return `${API_BASE_URL}/imagenes/default.png`;
  if (url.startsWith('http')) return url;
  if (url.startsWith('/imagenes/')) return `${API_BASE_URL}${url}`;
  return `${API_BASE_URL}/imagenes/${url}`;
}

const DEFAULT_IMAGE = `${API_BASE_URL}/imagenes/default.png`;

export function BookCard({ libro, onAddToCart, showFavorite = true, variant = 'default' }: BookCardProps) {
  const { toggleFavorite, isFavorito, carrito } = useDeporvida();
  const [imgError, setImgError] = useState(false);
  const isFavorite = isFavorito(libro.id);
  const isInCart = carrito.some(item => item.libro.id === libro.id);

  const handleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleFavorite(libro.id);
  };

  const isOutOfStock = libro.stock === 0;
  const cardClass = `role-card book-card ${variant === 'compact' ? 'book-card-compact' : ''}`;
  const imageUrl = getImageUrl(libro.urlPortada || libro.imagen);

  return (
    <div className={cardClass} style={{ position: 'relative' }}>
      {showFavorite && (
        <button
          className={`crisol-favorite-btn ${isFavorite ? 'active' : ''}`}
          onClick={handleFavorite}
          aria-label={isFavorite ? 'Quitar de favoritos' : 'Agregar a favoritos'}
          aria-pressed={isFavorite}
        >
          {isFavorite ? '♥' : '♡'}
        </button>
      )}
      <div className="book-cover">
        <img
          src={imgError ? DEFAULT_IMAGE : imageUrl}
          alt={libro.titulo}
          style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '8px' }}
          onError={() => setImgError(true)}
          loading="lazy"
        />
      </div>
      <h3>{libro.titulo}</h3>
      <p className="book-author">{libro.autor}</p>
      <p className="book-category">{libro.categoria}</p>
      <p className="book-price">
        {libro.enOferta && libro.precioEfectivo != null && libro.precioEfectivo < libro.precio ? (
          <>
            <span style={{ textDecoration: 'line-through', color: '#999', marginRight: '8px' }}>
              S/ {libro.precio.toFixed(2)}
            </span>
            S/ {libro.precioEfectivo.toFixed(2)}
          </>
        ) : (
          `S/ ${libro.precio.toFixed(2)}`
        )}
      </p>
      <button
        className={`btn ${isInCart ? 'btn-success' : 'btn-primary'}`}
        onClick={(e) => {
          e.stopPropagation();
          if (!isInCart) onAddToCart(libro);
        }}
        disabled={isOutOfStock || isInCart}
        aria-label={isOutOfStock ? `${libro.titulo} está agotado` : isInCart ? `${libro.titulo} ya está en el carrito` : `Agregar ${libro.titulo} al carrito`}
      >
        {isOutOfStock ? 'Agotado' : isInCart ? 'En el carrito' : 'Agregar al carrito'}
      </button>
    </div>
  );
}

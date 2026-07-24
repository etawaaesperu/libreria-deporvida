import { Libro } from '../../types';
import { BookCard } from './BookCard';

interface ProductCarouselProps {
  title: string;
  libros: Libro[];
  onSeeMore: () => void;
  onAddToCart: (libro: Libro) => void;
  variant?: 'default' | 'compact';
  showFavorite?: boolean;
}

export function ProductCarousel({
  title,
  libros,
  onSeeMore,
  onAddToCart,
  variant = 'default',
  showFavorite = true
}: ProductCarouselProps) {
  if (libros.length === 0) return null;

  return (
    <section className="crisol-carousel-section" aria-labelledby={`carousel-${title}`}>
      <div className="crisol-carousel-header">
        <h2 id={`carousel-${title}`} className="crisol-section-title">{title}</h2>
        <button className="crisol-see-more" onClick={onSeeMore} aria-label={`Ver más ${title}`}>
          Ver más ›
        </button>
      </div>
      <div className="crisol-carousel" role="region" aria-label={`Carrusel ${title}`}>
        <div className="crisol-carousel-track" role="list">
          {libros.map(libro => (
            <div key={libro.id} className="crisol-carousel-item" role="listitem">
              <BookCard
                libro={libro}
                onAddToCart={onAddToCart}
                variant={variant}
                showFavorite={showFavorite}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
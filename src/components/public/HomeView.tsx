import { useState, useEffect, useCallback } from 'react';
import { useDeporvida } from '../../context/DeporvidaContext';
import { ProductCarousel } from './ProductCarousel';
import type { Libro } from '../../types';
import '../../styles/crisol-layout.css';

export function HomeView() {
  const { data, navigate, addToCart, apiLibros, apiLoading, fetchApiLibros } = useDeporvida();
  const libros = apiLibros;

  useEffect(() => {
    if (apiLibros.length === 0) {
      fetchApiLibros(); 
    }
  }, []);

  const [heroSlide, setHeroSlide] = useState(0);

  const heroSlides = [
    {
      title: 'Descubre tu próxima gran lectura',
      subtitle: 'Miles de títulos en novela, ciencia, historia, infantil y más',
      bg: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)'
    },
    {
      title: 'Novedades cada semana',
      subtitle: 'Los últimos lanzamientos de tus autores favoritos',
      bg: 'linear-gradient(135deg, #2d1b4e 0%, #11998e 50%, #38ef7d 100%)'
    },
    {
      title: 'Envío gratis desde S/ 150',
      subtitle: 'Recibe tus libros en la puerta de tu casa',
      bg: 'linear-gradient(135deg, #f7971e 0%, #ffd200 100%)'
    }
  ];

  const currentSlide = heroSlides[heroSlide];

  useEffect(() => {
    const timer = setInterval(() => {
      setHeroSlide(prev => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const goToSlide = (index: number) => setHeroSlide(index);
  const prevSlide = () => setHeroSlide(prev => (prev - 1 + heroSlides.length) % heroSlides.length);
  const nextSlide = () => setHeroSlide(prev => (prev + 1) % heroSlides.length);

  const getUniqueCategories = useCallback(() => {
    return [...new Set(libros.map(l => l.categoria))];
  }, [libros]);

  const buildCarouselSections = useCallback(() => {
    const cats = getUniqueCategories();
    const sections: { title: string; libros: Libro[] }[] = [];

    sections.push({
      title: 'Novedades',
      libros: [...libros].sort((a, b) => b.id - a.id).slice(0, 10)
    });

    sections.push({
      title: 'Los más destacados',
      libros: [...libros].sort((a, b) => b.precio - a.precio).slice(0, 10)
    });

    cats.slice(0, 3).forEach(cat => {
      const catLibros = libros.filter(l => l.categoria === cat).slice(0, 10);
      if (catLibros.length > 0) {
        sections.push({ title: cat, libros: catLibros });
      }
    });

    return sections;
  }, [libros, getUniqueCategories]);

  const carouselSections = buildCarouselSections();
  const categories = getUniqueCategories();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.currentTarget as HTMLFormElement;
    const input = form.querySelector('input[type="search"]') as HTMLInputElement;
    const searchTerm = input?.value.trim();
    navigate('catalogo', searchTerm ? { searchTerm } : {});
  };

  if (apiLoading && apiLibros.length === 0) {
    return <div style={{ textAlign: 'center', padding: '60px 20px', color: '#888' }}>Cargando catálogo...</div>;
  }

  return (
    <>
      <main className="crisol-main">
        <section className="crisol-hero" role="region" aria-label="Banner principal">
          <div className="crisol-hero-slide" style={{ background: currentSlide.bg }}>
            <div className="crisol-hero-content">
              <h1 className="crisol-hero-title">{currentSlide.title}</h1>
              <p className="crisol-hero-subtitle">{currentSlide.subtitle}</p>
              <a href="#" className="btn btn-primary crisol-hero-cta" onClick={(e) => { e.preventDefault(); navigate('catalogo'); }}>
                Explorar catálogo
              </a>
            </div>
            <div className="crisol-hero-dots" role="tablist" aria-label="Slides del carrusel">
              {heroSlides.map((_, i) => (
                <button
                  key={i}
                  className={`crisol-hero-dot ${i === heroSlide ? 'active' : ''}`}
                  onClick={() => goToSlide(i)}
                  role="tab"
                  aria-selected={i === heroSlide}
                  aria-label={`Ir a slide ${i + 1}`}
                />
              ))}
            </div>
            <button className="crisol-hero-arrow prev" onClick={prevSlide} aria-label="Slide anterior">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M15 18l-6-6 6-6"></path>
              </svg>
            </button>
            <button className="crisol-hero-arrow next" onClick={nextSlide} aria-label="Slide siguiente">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 18l6-6-6-6"></path>
              </svg>
            </button>
          </div>
        </section>

        <section className="crisol-banner-row" aria-label="Banners promocionales">
          {[
            { title: '2x1 en Novelas', subtitle: 'Solo esta semana', icon: '📚' },
            { title: 'Nuevos Ebooks', subtitle: 'Descarga inmediata', icon: '📱' },
            { title: 'Infantil & Juvenil', subtitle: 'Descuentos especiales', icon: '🧸' },
            { title: 'Envío Gratis', subtitle: 'Compras sobre S/ 150', icon: '🚚' }
          ].map((banner, i) => (
            <article key={i} className="crisol-banner">
              <div className="crisol-banner-content">
                <span style={{ fontSize: '48px', marginBottom: '12px' }}>{banner.icon}</span>
                <h3 className="crisol-banner-title">{banner.title}</h3>
                <p className="crisol-banner-subtitle">{banner.subtitle}</p>
              </div>
            </article>
          ))}
        </section>

        {carouselSections.map((section, idx) => (
          <ProductCarousel
            key={idx}
            title={section.title}
            libros={section.libros}
            onSeeMore={() => navigate('catalogo')}
            onAddToCart={addToCart}
            variant="compact"
          />
        ))}

        <section className="crisol-category-section" aria-labelledby="categorias-title">
          <h2 id="categorias-title" className="crisol-category-title">Un mundo para cada lector</h2>
          <div className="crisol-category-grid" role="list">
            {categories.map(cat => (
              <a
                key={cat}
                href="#"
                className="crisol-category-circle"
                onClick={(e) => { e.preventDefault(); navigate('catalogo', { category: cat } as any); }}
                role="listitem"
              >
                <span className="crisol-category-icon" aria-hidden="true">
                  {({
                    'Novela': '📖', 'Ficción': '🔮', 'Infantil': '🧸', 'Autoayuda': '💡',
                    'Negocios': '💼', 'Historia': '🏛️', 'Ciencia': '🔬', 'Poesía': '📜',
                    'Cómics': '💬', 'Académico': '🎓'
                  })[cat] || '📚'}
                </span>
                <span className="crisol-category-name">{cat}</span>
              </a>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}

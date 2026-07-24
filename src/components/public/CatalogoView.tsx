import { useEffect, useState } from 'react';
import { useDeporvida } from '../../context/DeporvidaContext';
import { BookCard } from './BookCard';
import { categoriaService } from '../../services/categoriaService';
import { libroService } from '../../services/libroService';
import type { CategoriaResponse } from '../../services/categoriaService';

export function CatalogoView() {
  const { apiLibros, apiLoading, apiError, addToCart, fetchApiLibros, navParams } = useDeporvida();
  const [categorias, setCategorias] = useState<CategoriaResponse[]>([]);
  const [selectedCategoria, setSelectedCategoria] = useState<number | null>(null);
  const [searchResults, setSearchResults] = useState<typeof apiLibros | null>(null);

  useEffect(() => {
    fetchApiLibros();
    categoriaService.getAllActivo()
      .then(res => setCategorias(res.data))
      .catch(() => {});
  }, []);

  useEffect(() => {
    if (navParams.searchTerm) {
      libroService.search(navParams.searchTerm, { size: 50 })
        .then(res => setSearchResults(res.data.content))
        .catch(() => setSearchResults([]));
    } else {
      setSearchResults(null);
    }
  }, [navParams.searchTerm]);

  const baseLibros = searchResults ?? apiLibros;
  const filteredLibros = selectedCategoria
    ? baseLibros.filter(l => l.categoria === categorias.find(c => c.id === selectedCategoria)?.nombre)
    : baseLibros;

  return (
    <>
      <div className="hero" style={{ padding: '60px 20px' }}>
        <h1>Catálogo de Libros</h1>
        <p>Todos nuestros títulos disponibles</p>
      </div>

      <div style={{ padding: '20px 5%', maxWidth: '1200px', margin: '0 auto' }}>
        {apiError && (
          <div style={{ color: '#c00', background: '#fff0f0', padding: '16px', borderRadius: '8px', marginBottom: '20px', textAlign: 'center' }}>
            {apiError}
            <br />
            <button className="btn btn-blue" style={{ marginTop: '10px' }} onClick={fetchApiLibros}>
              Reintentar
            </button>
          </div>
        )}

        <div style={{ display: 'flex', gap: '10px', marginBottom: '30px', flexWrap: 'wrap' }}>
          <button
            className={`btn ${!selectedCategoria ? 'btn-primary' : 'btn-blue'}`}
            onClick={() => setSelectedCategoria(null)}
          >
            Todos
          </button>
          {categorias.map(cat => (
            <button
              key={cat.id}
              className={`btn ${selectedCategoria === cat.id ? 'btn-primary' : 'btn-blue'}`}
              onClick={() => setSelectedCategoria(cat.id)}
            >
              {cat.nombre}
            </button>
          ))}
        </div>

        <div className="cards-grid">
          {apiLoading ? (
            <p style={{ gridColumn: '1/-1', textAlign: 'center', color: '#888', padding: '40px' }}>
              Cargando libros...
            </p>
          ) : filteredLibros.length === 0 && !apiError ? (
            <p style={{ gridColumn: '1/-1', textAlign: 'center', color: '#888', padding: '40px' }}>
              No hay libros disponibles.
            </p>
          ) : (
            filteredLibros.map(libro => (
              <BookCard
                key={libro.id}
                libro={libro}
                onAddToCart={addToCart}
                variant="default"
              />
            ))
          )}
        </div>
      </div>
    </>
  );
}

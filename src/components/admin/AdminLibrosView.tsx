import { useEffect, useState } from 'react';
import { libroService } from '../../services/libroService';
import type { LibroResponse } from '../../services/libroService';

export function AdminLibrosView() {
  const [libros, setLibros] = useState<LibroResponse[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchLibros = () => {
    setLoading(true);
    libroService.getAll({ size: 100 })
      .then(res => setLibros(res.data.content))
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchLibros(); }, []);

  const toggleActivo = (id: number) => {
    libroService.toggleActivo(id)
      .then(() => fetchLibros())
      .catch(() => {});
  };

  if (loading) return <p style={{ padding: '20px', color: '#888' }}>Cargando libros...</p>;

  return (
    <>
      <h2 className="section-title">Gestión de Libros</h2>
      <div className="table-container">
        <div className="table-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span>Libros ({libros.length})</span>
          <button className="btn btn-primary btn-sm" onClick={() => {}}>+ Nuevo Libro</button>
        </div>
        <table className="data-table">
          <thead>
            <tr>
              <th>Título</th>
              <th>Precio</th>
              <th>Stock</th>
              <th>Categoría</th>
              <th>Activo</th>
              <th>Destacado</th>
              <th>Más Vendido</th>
              <th>Acción</th>
            </tr>
          </thead>
          <tbody>
            {libros.length > 0 ? libros.map(l => (
              <tr key={l.id}>
                <td>{l.titulo}</td>
                <td>S/ {(l.precioEfectivo || l.precio).toFixed(2)}</td>
                <td>{l.inventario?.cantidad ?? 0}</td>
                <td>{l.categoria?.nombre || '-'}</td>
                <td>{l.activo ? 'Sí' : 'No'}</td>
                <td>{l.destacado ? 'Sí' : 'No'}</td>
                <td>{l.masVendido ? 'Sí' : 'No'}</td>
                <td>
                  <button className="btn btn-warning btn-sm" onClick={() => toggleActivo(l.id)} style={{ marginRight: '4px' }}>
                    {l.activo ? 'Desactivar' : 'Activar'}
                  </button>
                </td>
              </tr>
            )) : (
              <tr><td colSpan={8} style={{ textAlign: 'center' }}>No hay libros</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}

import { useDeporvida } from '../../context/DeporvidaContext';
import { CATEGORIES } from '../../utils/constants';

export function AdminComprasMenuView() {
  const { navigate } = useDeporvida();

  return (
    <>
      <h2 className="section-title">Gestión de Compras</h2>
      <div className="class-grid">
        {CATEGORIES.map(c => (
          <div key={c} className="class-card" onClick={() => navigate('admin-view-compras', { class: c })}>
            <h3>{c}</h3><p>Ver Detalle de Compras</p>
          </div>
        ))}
      </div>
    </>
  );
}

import { useDeporvida } from '../../context/DeporvidaContext';
import { CATEGORIES } from '../../utils/constants';

export function ColaboradorPedidosMenuView() {
  const { navigate } = useDeporvida();

  return (
    <>
      <h2 className="section-title">Registrar Pedidos</h2>
      <div className="class-grid">
        {CATEGORIES.map(c => (
          <div key={c} className="class-card" onClick={() => navigate('colaborador-registrar-pedido', { class: c })}>
            <h3>{c}</h3><p>Registrar Pedidos</p>
          </div>
        ))}
      </div>
      <h2 className="section-title" style={{ marginTop: '30px' }}>Ver Pedidos</h2>
      <div className="class-grid">
        {CATEGORIES.map(c => (
          <div key={c} className="class-card" onClick={() => navigate('colaborador-view-pedidos', { class: c })}>
            <h3>{c}</h3><p>Ver Pedidos</p>
          </div>
        ))}
      </div>
    </>
  );
}

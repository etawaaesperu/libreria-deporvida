import { useDeporvida } from '../../context/DeporvidaContext';

export function AdminClienteMenuView() {
  const { navigate } = useDeporvida();

  return (
    <>
      <h2 className="section-title">Gestión de Clientes</h2>
      <div className="action-cards">
        <div className="dash-card bg-blue" style={{ cursor: 'pointer' }} onClick={() => navigate('admin-view-cliente')}>
          <h6>Ver Todos los Clientes</h6><h2><span className="icon-left">&#128065;</span></h2>
        </div>
        <div className="dash-card bg-green" style={{ cursor: 'pointer' }} onClick={() => navigate('admin-add-cliente')}>
          <h6>Agregar Cliente</h6><h2><span className="icon-left">+</span></h2>
        </div>
        <div className="dash-card bg-yellow" style={{ cursor: 'pointer' }} onClick={() => navigate('admin-approve-cliente')}>
          <h6>Aprobar Cliente</h6><h2><span className="icon-left">&#10003;</span></h2>
        </div>
        <div className="dash-card bg-pink" style={{ cursor: 'pointer' }} onClick={() => navigate('admin-view-cliente-compras')}>
          <h6>Ver Compras de Clientes</h6><h2><span className="icon-left">$</span></h2>
        </div>
      </div>
    </>
  );
}

import { useDeporvida } from '../../context/DeporvidaContext';

export function AdminViewClienteComprasView() {
  const { data } = useDeporvida();

  const rows = data.clientes.map(c => {
    const u = data.users.find(u => u.id === c.userId);
    return <tr key={c.id}><td>{u?.firstName} {u?.lastName}</td><td>{c.compras || 0}</td></tr>;
  });

  return (
    <>
      <h2 className="section-title">Compras de Clientes</h2>
      <div className="table-container">
        <div className="table-header">Compras de Clientes</div>
        <table className="data-table">
          <thead><tr><th>Nombre del Cliente</th><th>Compras</th></tr></thead>
          <tbody>{rows.length > 0 ? rows : <tr><td colSpan={2} style={{ textAlign: 'center' }}>No hay clientes</td></tr>}</tbody>
        </table>
      </div>
    </>
  );
}

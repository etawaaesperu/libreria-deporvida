import { useDeporvida } from '../../context/DeporvidaContext';

export function AdminApproveClienteView() {
  const { data, approveCliente, deleteCliente } = useDeporvida();

  const rows = data.clientes.filter(c => !c.status).map(c => {
    const u = data.users.find(u => u.id === c.userId);
    return (
      <tr key={c.id}>
        <td>{u?.firstName} {u?.lastName}</td>
        <td>{c.categoria}</td>
        <td>{c.compras || 0}</td>
        <td>{c.mobile}</td>
        <td><button className="btn btn-success btn-sm" onClick={() => approveCliente(c.id)}>&#10003;</button></td>
        <td><button className="btn btn-danger btn-sm" onClick={() => { if (confirm('¿Estás seguro?')) deleteCliente(c.id); }}>&#128465;</button></td>
      </tr>
    );
  });

  return (
    <>
      <h2 className="section-title">Aprobar Clientes</h2>
      <div className="table-container">
        <div className="table-header">Clientes Pendientes</div>
        <table className="data-table">
          <thead><tr><th>Nombre</th><th>Categoría</th><th>Compras</th><th>Celular</th><th>Aprobar</th><th>Eliminar</th></tr></thead>
          <tbody>{rows.length > 0 ? rows : <tr><td colSpan={6} style={{ textAlign: 'center' }}>No hay clientes pendientes</td></tr>}</tbody>
        </table>
      </div>
    </>
  );
}

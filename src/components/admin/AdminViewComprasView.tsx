import { useDeporvida } from '../../context/DeporvidaContext';

interface AdminViewComprasViewProps {
  className?: string;
}

export function AdminViewComprasView({ className }: AdminViewComprasViewProps) {
  const { data } = useDeporvida();
  const categoria = className || 'Novela';

  const clientes = data.clientes.filter(c => c.categoria === categoria);
  const rows = clientes.map(c => {
    const u = data.users.find(u => u.id === c.userId);
    return <tr key={c.id}><td>{u?.firstName} {u?.lastName}</td><td>{c.compras || 0}</td></tr>;
  });

  return (
    <>
      <h2 className="section-title">Detalle de Compras - {categoria}</h2>
      <div className="table-container">
        <div className="table-header">Detalle de Compras</div>
        <table className="data-table">
          <thead><tr><th>Nombre del Cliente</th><th>Compras</th></tr></thead>
          <tbody>{rows.length > 0 ? rows : <tr><td colSpan={2} style={{ textAlign: 'center' }}>No hay clientes</td></tr>}</tbody>
        </table>
      </div>
    </>
  );
}

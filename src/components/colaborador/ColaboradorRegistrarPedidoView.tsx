import { useState } from 'react';
import { useDeporvida } from '../../context/DeporvidaContext';

interface ColaboradorRegistrarPedidoViewProps {
  className?: string;
}

export function ColaboradorRegistrarPedidoView({ className }: ColaboradorRegistrarPedidoViewProps) {
  const { data, guardarPedidos, navigate } = useDeporvida();
  const categoria = className || 'Novela';
  const [date, setDate] = useState(() => new Date().toISOString().split('T')[0]);
  const [records, setRecords] = useState<Record<string, 'Entregado' | 'Pendiente'>>({});

  const clientes = data.clientes.filter(c => c.categoria === categoria && c.status);

  const handleStatusChange = (codigo: string, estado: 'Entregado' | 'Pendiente') => {
    setRecords(prev => ({ ...prev, [codigo]: estado }));
  };

  const handleSave = () => {
    if (!date) { alert('Selecciona una fecha'); return; }
    const recordsArray = clientes.map(c => ({ codigo: c.codigo, estado: records[c.codigo] || 'Pendiente' }));
    guardarPedidos(categoria, date, recordsArray);
    navigate('colaborador-pedidos');
  };

  return (
    <>
      <h2 className="section-title">Registrar Pedidos - {categoria}</h2>
      <div className="form-container" style={{ maxWidth: '100%' }}>
        <div className="form-body">
          <div className="form-group" style={{ maxWidth: '300px', marginBottom: '20px' }}>
            <label>Fecha</label>
            <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
          </div>
          <div className="table-container">
            <div className="table-header">Clientes - {categoria}</div>
            <table className="data-table">
              <thead><tr><th>Código</th><th>Nombre</th><th>Estado</th></tr></thead>
              <tbody>
                {clientes.map((c) => {
                  const u = data.users.find(u => u.id === c.userId);
                  return (
                    <tr key={c.id}>
                      <td>{c.codigo}</td>
                      <td>{u?.firstName} {u?.lastName}</td>
                      <td>
                        <select
                          value={records[c.codigo] || 'Pendiente'}
                          onChange={(e) => handleStatusChange(c.codigo, e.target.value as 'Entregado' | 'Pendiente')}
                          style={{ padding: '6px 12px', borderRadius: '15px', border: '1px solid #ced4da' }}
                        >
                          <option value="Entregado">Entregado</option>
                          <option value="Pendiente">Pendiente</option>
                        </select>
                      </td>
                    </tr>
                  );
                })}
                {clientes.length === 0 && <tr><td colSpan={3} style={{ textAlign: 'center' }}>No hay clientes</td></tr>}
              </tbody>
            </table>
          </div>
          <div className="form-actions" style={{ marginTop: '20px' }}>
            <button className="btn btn-primary" onClick={handleSave}>Guardar Pedidos</button>
            <button className="btn btn-danger" style={{ marginLeft: '10px' }} onClick={() => navigate('colaborador-pedidos')}>Cancelar</button>
          </div>
        </div>
      </div>
    </>
  );
}

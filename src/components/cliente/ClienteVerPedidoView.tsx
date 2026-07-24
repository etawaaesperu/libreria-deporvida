import { useEffect, useState } from 'react';
import { useDeporvida } from '../../context/DeporvidaContext';
import { pedidoService } from '../../services/pedidoService';
import type { PedidoResponse } from '../../services/pedidoService';
import { formatDate } from '../../utils/constants';

interface ClienteVerPedidoViewProps {
  id?: number;
}

export function ClienteVerPedidoView({ id }: ClienteVerPedidoViewProps) {
  const { navigate } = useDeporvida();
  const [pedido, setPedido] = useState<PedidoResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) { setLoading(false); setError('Pedido no especificado'); return; }
    let active = true;
    setLoading(true);
    pedidoService.getById(id)
      .then(res => { if (active) setPedido(res.data); })
      .catch(err => {
        if (!active) return;
        setError(err.response?.data?.message || err.message || 'No se pudo cargar el pedido');
      })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, [id]);

  const color = pedido?.estado === 'ENTREGADO' ? 'green' : pedido?.estado === 'CANCELADO' ? '#c0392b' : '#b8860b';

  return (
    <>
      <h2 className="section-title">Detalle de Pedido</h2>
      <div className="table-container" style={{ maxWidth: '500px' }}>
        <div className="table-header">Registro de Pedido</div>
        {loading && <p style={{ padding: '20px' }}>Cargando...</p>}
        {!loading && error && <p style={{ padding: '20px', color: '#c0392b' }}>{error}</p>}
        {!loading && !error && pedido && (
          <table className="data-table">
            <thead><tr><th>N° Pedido</th><th>Fecha</th><th>Estado</th><th>Total</th></tr></thead>
            <tbody>
              <tr>
                <td>{pedido.numeroPedido}</td>
                <td>{formatDate(pedido.createdAt)}</td>
                <td style={{ color, fontWeight: 700 }}>{pedido.estado}</td>
                <td>S/ {pedido.montoTotal.toFixed(2)}</td>
              </tr>
            </tbody>
          </table>
        )}
      </div>
      <button className="btn btn-danger" onClick={() => navigate('cliente-pedidos')} style={{ marginTop: '15px' }}>Volver</button>
    </>
  );
}

import { useEffect, useState } from 'react';
import { useDeporvida } from '../../context/DeporvidaContext';
import { pedidoService } from '../../services/pedidoService';
import type { PedidoResponse } from '../../services/pedidoService';
import { formatDate } from '../../utils/constants';

export function ClienteMisPedidosView() {
  const { navigate } = useDeporvida();
  const [pedidos, setPedidos] = useState<PedidoResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    setLoading(true);
    pedidoService.getMisPedidos({ size: 50 })
      .then(res => { if (active) setPedidos(res.data.content); })
      .catch(err => {
        if (!active) return;
        setError(err.response?.data?.message || err.message || 'No se pudieron cargar tus pedidos');
      })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, []);

  return (
    <>
      <h2 className="section-title">Mis Pedidos</h2>
      <div className="table-container">
        <div className="table-header">Historial de Pedidos</div>
        {loading && <p style={{ padding: '20px' }}>Cargando pedidos...</p>}
        {!loading && error && (
          <p style={{ padding: '20px', color: '#c0392b' }}>{error}</p>
        )}
        {!loading && !error && (
          <table className="data-table">
            <thead><tr><th>N° Pedido</th><th>Fecha</th><th>Estado</th><th>Total</th><th></th></tr></thead>
            <tbody>
              {pedidos.length === 0 && (
                <tr><td colSpan={5} style={{ textAlign: 'center' }}>Aún no tienes pedidos</td></tr>
              )}
              {pedidos.map(p => (
                <tr key={p.id}>
                  <td>{p.numeroPedido}</td>
                  <td>{formatDate(p.createdAt)}</td>
                  <td style={{ color: p.estado === 'ENTREGADO' ? 'green' : '#b8860b', fontWeight: 700 }}>{p.estado}</td>
                  <td>S/ {p.montoTotal.toFixed(2)}</td>
                  <td>
                    <button className="btn btn-blue" onClick={() => navigate('cliente-ver-pedido', { id: p.id })}>
                      Ver detalle
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
}

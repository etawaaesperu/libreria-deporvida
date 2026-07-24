import { useEffect, useState } from 'react';
import { useDeporvida } from '../../context/DeporvidaContext';
import { authService } from '../../services/authService';
import { pedidoService } from '../../services/pedidoService';
import { formatDate } from '../../utils/constants';

export function ClienteDashboardView() {
  const { data, currentUser } = useDeporvida();
  const [perfil, setPerfil] = useState<{ correo: string; telefono?: string } | null>(null);
  const [totalPedidos, setTotalPedidos] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      authService.me(),
      pedidoService.getMisPedidos({ size: 1 }),
    ])
      .then(([meRes, pedidosRes]) => {
        setPerfil({ correo: (meRes.data as any).correo, telefono: (meRes.data as any).telefono });
        setTotalPedidos(pedidosRes.data.totalElements);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const avisos = data.avisos.map(a => (
    <div key={a.id} className="notice-item">
      <button className="notice-close" onClick={() => {}}>&times;</button>
      <strong>{formatDate(a.date)} || Por: {a.by}</strong><br />{a.message}
    </div>
  ));

  if (loading) return <div>Cargando...</div>;

  return (
    <>
      <h2 className="section-title">Panel del Cliente</h2>
      <div className="dashboard-cards">
        <div className="dash-card bg-blue"><h6>Usuario</h6><h2 style={{ fontSize: '20px' }}>{currentUser?.firstName} {currentUser?.lastName}</h2></div>
        <div className="dash-card bg-green"><h6>Correo</h6><h2 style={{ fontSize: '16px' }}>{perfil?.correo || '-'}</h2></div>
        <div className="dash-card bg-yellow"><h6>Pedidos realizados</h6><h2>{totalPedidos ?? 0}</h2></div>
      </div>
      <div className="notice-section" style={{ padding: '0 30px' }}>
        <div className="notice-board-title">Tablón de Avisos</div>
        {avisos.length > 0 ? avisos : <p style={{ color: '#888', padding: '15px' }}>Sin avisos</p>}
      </div>
    </>
  );
}

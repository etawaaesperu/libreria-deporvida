import { useEffect, useState } from 'react';
import { useDeporvida } from '../../context/DeporvidaContext';
import { usuarioService } from '../../services/usuarioService';
import { formatDate } from '../../utils/constants';

export function AdminDashboardView() {
  const { data } = useDeporvida();
  const [stats, setStats] = useState({ admins: 0, usuarios: 0, vendedores: 0, total: 0 });

  useEffect(() => {
    usuarioService.getAll({ size: 100 })
      .then(res => {
        const users = res.data.content;
        setStats({
          total: users.length,
          admins: users.filter(u => u.roles.includes('ROL_ADMIN')).length,
          usuarios: users.filter(u => u.roles.includes('ROL_USUARIO')).length,
          vendedores: users.filter(u => u.roles.includes('ROL_VENDEDOR')).length,
        });
      })
      .catch(() => {});
  }, []);

  const avisos = data.avisos.map(a => (
    <div key={a.id} className="notice-item">
      <button className="notice-close" onClick={() => {}}>&times;</button>
      <strong>{formatDate(a.date)} || Por: {a.by}</strong><br />{a.message}
    </div>
  ));

  return (
    <>
      <h2 className="section-title">Panel de Administración</h2>
      <div className="dashboard-cards">
        <div className="dash-card bg-blue">
          <h6>Total Usuarios</h6>
          <h2><span className="icon-left">&#128101;</span> {stats.total}</h2>
        </div>
        <div className="dash-card bg-green">
          <h6>Clientes (ROL_USUARIO)</h6>
          <h2><span className="icon-left">&#128218;</span> {stats.usuarios}</h2>
        </div>
        <div className="dash-card bg-yellow">
          <h6>Administradores</h6>
          <h2><span className="icon-left">&#128188;</span> {stats.admins}</h2>
        </div>
        <div className="dash-card bg-pink">
          <h6>Vendedores</h6>
          <h2><span className="icon-left">&#128176;</span> {stats.vendedores}</h2>
        </div>
      </div>
      <div className="notice-section" style={{ padding: '0 30px' }}>
        <div className="notice-board-title">Tablón de Avisos</div>
        {avisos.length > 0 ? avisos : <p style={{ color: '#888', padding: '15px' }}>Sin avisos</p>}
      </div>
      <div style={{ padding: '16px 30px', marginTop: '20px', background: '#fff8e1', border: '1px solid #ffe082', borderRadius: '8px' }}>
        <p style={{ color: '#8a6d00', fontSize: '13px' }}>
          <strong>Nota:</strong> La gestión de colaboradores (salarios, aprobación) es una funcionalidad
          pendiente de implementación en el backend.
        </p>
      </div>
    </>
  );
}

import { useDeporvida } from '../../context/DeporvidaContext';
import { formatDate } from '../../utils/constants';

export function ColaboradorDashboardView() {
  const { data, currentUser } = useDeporvida();

  const colaborador = data.colaboradores.find(c => c.userId === currentUser?.id);
  const avisos = data.avisos.map(a => (
    <div key={a.id} className="notice-item">
      <button className="notice-close" onClick={() => {}}>&times;</button>
      <strong>{formatDate(a.date)} || Por: {a.by}</strong><br />{a.message}
    </div>
  ));

  if (!colaborador) return <div>Cargando...</div>;

  return (
    <>
      <h2 className="section-title">Panel del Colaborador</h2>
      <div className="dashboard-cards">
        <div className="dash-card bg-blue"><h6>Salario</h6><h2><span className="icon-left">$</span> {colaborador.salary}</h2></div>
        <div className="dash-card bg-green"><h6>Celular</h6><h2 style={{ fontSize: '20px' }}>{colaborador.mobile}</h2></div>
        <div className="dash-card bg-yellow"><h6>Fecha de Ingreso</h6><h2 style={{ fontSize: '16px' }}>{formatDate(colaborador.joinDate)}</h2></div>
      </div>
      <div className="notice-section" style={{ padding: '0 30px' }}>
        <div className="notice-board-title">Tablón de Avisos</div>
        {avisos.length > 0 ? avisos : <p style={{ color: '#888', padding: '15px' }}>Sin avisos</p>}
      </div>
    </>
  );
}

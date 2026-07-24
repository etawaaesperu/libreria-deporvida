import { useDeporvida } from '../../context/DeporvidaContext';

export function WaitingApprovalView({ role: _role }: { role: 'colaborador' | 'cliente' }) {
  const { doLogout } = useDeporvida();

  return (
    <div className="wait-page">
      <div>
        <div className="icon">&#8987;</div>
        <h2>Esperando Aprobación</h2>
        <p>Tu cuenta está pendiente de aprobación por el administrador.</p>
        <br />
        <button className="btn btn-primary" onClick={doLogout}>Cerrar Sesión</button>
      </div>
    </div>
  );
}

import { useState } from 'react';
import { useDeporvida } from '../../context/DeporvidaContext';

export function LoginView() {
  const { navigate, doLogin, navParams } = useDeporvida();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const result = await doLogin(username, password, navParams.redirectTo);
    if (!result.success) {
      setError(result.message || 'Usuario o contraseña inválidos');
    }
  };

  const title = 'Inicio de Sesión';

  return (
    <div className="auth-page">
      <div className="form-container" style={{ maxWidth: '600px' }}>
        <div className="form-header">{title}</div>
        <div className="form-body">
          <form onSubmit={handleSubmit}>
            {error && <div style={{ color: 'red', marginBottom: '15px', textAlign: 'center' }}>{error}</div>}
            <div className="form-group">
              <label>Usuario</label>
              <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Usuario" required />
            </div>
            <div className="form-group">
              <label>Contraseña</label>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Contraseña" required />
            </div>
            <div className="form-actions">
              <button type="submit" className="btn btn-primary">Ingresar</button>
            </div>
            <div className="form-footer">
              ¿No tienes cuenta? <a href="#" onClick={(e) => { e.preventDefault(); navigate('cliente-click'); }}>Regístrate aquí</a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

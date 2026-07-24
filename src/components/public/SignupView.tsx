import { useState } from 'react';
import { useDeporvida } from '../../context/DeporvidaContext';

const ROLE_LABELS: Record<string, string> = {
  admin: 'Administrador',
  colaborador: 'Colaborador',
  cliente: 'Cliente'
};

export function SignupView({ role }: { role: 'admin' | 'colaborador' | 'cliente' }) {
  const { navigate, doSignup, navParams } = useDeporvida();
  const [formData, setFormData] = useState({
    firstName: '', lastName: '', username: '', email: '', password: '',
    salary: '', mobile: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const result = await doSignup(role, formData, navParams.redirectTo);
    if (!result.success) {
      setError(result.message || 'El registro falló. Intenta de nuevo.');
    }
  };

  return (
    <div className="auth-page">
      <div className="form-container" style={{ maxWidth: '600px' }}>
        <div className="form-header">Registro de {ROLE_LABELS[role] || role}</div>
        <div className="form-body">
          <form onSubmit={handleSubmit}>
            {error && <div style={{ color: 'red', marginBottom: '15px', textAlign: 'center' }}>{error}</div>}
            <div className="form-row">
              <div className="form-group"><label>Nombre</label><input type="text" name="firstName" value={formData.firstName} onChange={handleChange} placeholder="Nombre" required /></div>
              <div className="form-group"><label>Apellido</label><input type="text" name="lastName" value={formData.lastName} onChange={handleChange} placeholder="Apellido" required /></div>
            </div>
            <div className="form-row">
              <div className="form-group"><label>Usuario</label><input type="text" name="username" value={formData.username} onChange={handleChange} placeholder="Usuario" required /></div>
              <div className="form-group"><label>Email</label><input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="correo@ejemplo.com" required /></div>
            </div>
            <div className="form-row">
              <div className="form-group"><label>Contraseña</label><input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Contraseña" required /></div>
            </div>
            {role === 'colaborador' && (
              <>
                <div className="form-group"><label>Salario</label><input type="number" name="salary" value={formData.salary} onChange={handleChange} placeholder="Salario" /></div>
                <div className="form-group"><label>Celular</label><input type="text" name="mobile" value={formData.mobile} onChange={handleChange} placeholder="Celular" /></div>
              </>
            )}
            {role === 'cliente' && (
              <div className="form-group"><label>Celular</label><input type="text" name="mobile" value={formData.mobile} onChange={handleChange} placeholder="Celular" /></div>
            )}
            <div className="form-actions">
              <button type="submit" className="btn btn-primary">Enviar</button>
            </div>
            <div className="form-footer">
              ¿Ya tienes cuenta? <a href="#" onClick={(e) => { e.preventDefault(); navigate('login'); }}>Inicia sesión aquí</a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

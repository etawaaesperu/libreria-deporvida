import { useState, useEffect } from 'react';
import { useDeporvida } from '../../context/DeporvidaContext';
import { usuarioService } from '../../services/usuarioService';
import type { UsuarioResponse } from '../../services/usuarioService';

interface Props {
  clienteId?: number;
}

export function AdminUpdateClienteView({ clienteId }: Props) {
  const { navigate } = useDeporvida();
  const [user, setUser] = useState<UsuarioResponse | null>(null);
  const [formData, setFormData] = useState({
    nombres: '', apellidos: '', nombreUsuario: '', correo: '', telefono: ''
  });
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!clienteId) { navigate('admin-view-cliente'); return; }
    usuarioService.getById(clienteId)
      .then(res => {
        const u = res.data;
        setUser(u);
        setFormData({
          nombres: u.nombres || '',
          apellidos: u.apellidos || '',
          nombreUsuario: u.nombreUsuario,
          correo: u.correo,
          telefono: u.telefono || '',
        });
      })
      .catch(() => navigate('admin-view-cliente'));
  }, [clienteId, navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!clienteId) return;
    setError('');
    setSaving(true);
    try {
      await usuarioService.update(clienteId, {
        ...user,
        nombres: formData.nombres,
        apellidos: formData.apellidos,
        nombreUsuario: formData.nombreUsuario,
        correo: formData.correo,
        telefono: formData.telefono,
      });
      navigate('admin-view-cliente');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Error al actualizar');
    } finally {
      setSaving(false);
    }
  };

  if (!clienteId) return null;

  return (
    <>
      <h2 className="section-title">Actualizar Cliente</h2>
      <div className="form-container">
        <div className="form-header">Actualizar Datos del Cliente</div>
        <div className="form-body">
          <form onSubmit={handleSubmit}>
            {error && <div style={{ color: 'red', marginBottom: '15px' }}>{error}</div>}
            <div className="form-row">
              <div className="form-group"><label>Nombre</label><input type="text" name="nombres" value={formData.nombres} onChange={handleChange} required /></div>
              <div className="form-group"><label>Apellido</label><input type="text" name="apellidos" value={formData.apellidos} onChange={handleChange} required /></div>
            </div>
            <div className="form-row">
              <div className="form-group"><label>Usuario</label><input type="text" name="nombreUsuario" value={formData.nombreUsuario} onChange={handleChange} required /></div>
              <div className="form-group"><label>Email</label><input type="email" name="correo" value={formData.correo} onChange={handleChange} required /></div>
            </div>
            <div className="form-row">
              <div className="form-group"><label>Teléfono</label><input type="text" name="telefono" value={formData.telefono} onChange={handleChange} /></div>
            </div>
            <div className="form-actions">
              <button type="submit" className="btn btn-primary" disabled={saving}>
                {saving ? 'Guardando...' : 'Guardar'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

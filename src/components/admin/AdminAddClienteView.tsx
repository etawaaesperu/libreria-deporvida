import { useState } from 'react';
import { useDeporvida } from '../../context/DeporvidaContext';
import { CATEGORIES } from '../../utils/constants';

export function AdminAddClienteView() {
  const { addCliente, navigate } = useDeporvida();
  const [formData, setFormData] = useState({
    firstName: '', lastName: '', username: '', password: '',
    codigo: '', categoria: 'Novela', mobile: '', compras: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!formData.firstName || !formData.lastName || !formData.username || !formData.password) {
      setError('Completa todos los campos requeridos');
      return;
    }
    const success = await addCliente(formData);
    if (success) {
      navigate('admin-view-cliente');
    } else {
      setError('El usuario ya existe');
    }
  };

  return (
    <>
      <h2 className="section-title">Nuevo Cliente</h2>
      <div className="form-container">
        <div className="form-header">Registrar Nuevo Cliente en la Librería</div>
        <div className="form-body">
          <form onSubmit={handleSubmit}>
            {error && <div style={{ color: 'red', marginBottom: '15px' }}>{error}</div>}
            <div className="form-row">
              <div className="form-group"><label>Nombre</label><input type="text" name="firstName" value={formData.firstName} onChange={handleChange} placeholder="Nombre" required /></div>
              <div className="form-group"><label>Apellido</label><input type="text" name="lastName" value={formData.lastName} onChange={handleChange} placeholder="Apellido" required /></div>
            </div>
            <div className="form-row">
              <div className="form-group"><label>Usuario</label><input type="text" name="username" value={formData.username} onChange={handleChange} placeholder="Usuario" required /></div>
              <div className="form-group"><label>Contraseña</label><input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Contraseña" required /></div>
            </div>
            <div className="form-row">
              <div className="form-group"><label>Código de Cliente</label><input type="text" name="codigo" value={formData.codigo} onChange={handleChange} placeholder="Código de Cliente" /></div>
              <div className="form-group"><label>Categoría</label><select name="categoria" value={formData.categoria} onChange={handleChange}>{CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}</select></div>
            </div>
            <div className="form-row">
              <div className="form-group"><label>Celular</label><input type="text" name="mobile" value={formData.mobile} onChange={handleChange} placeholder="Celular" /></div>
              <div className="form-group"><label>Compras</label><input type="number" name="compras" value={formData.compras} onChange={handleChange} placeholder="Compras" /></div>
            </div>
            <div className="form-actions"><button type="submit" className="btn btn-primary">Enviar</button></div>
          </form>
        </div>
      </div>
    </>
  );
}

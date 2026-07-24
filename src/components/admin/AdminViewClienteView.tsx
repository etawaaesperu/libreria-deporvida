import { useEffect, useState } from 'react';
import { usuarioService } from '../../services/usuarioService';
import type { UsuarioResponse } from '../../services/usuarioService';

export function AdminViewClienteView() {
  const [usuarios, setUsuarios] = useState<UsuarioResponse[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    usuarioService.getAll({ size: 100 })
      .then(res => setUsuarios(res.data.content))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const clientes = usuarios.filter(u => u.roles.includes('ROL_USUARIO'));

  if (loading) return <p style={{ padding: '20px', color: '#888' }}>Cargando clientes...</p>;

  return (
    <>
      <h2 className="section-title">Todos los Clientes</h2>
      <div className="table-container">
        <div className="table-header">Clientes</div>
        <table className="data-table">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Usuario</th>
              <th>Email</th>
              <th>Teléfono</th>
              <th>Activo</th>
              <th>Rol</th>
            </tr>
          </thead>
          <tbody>
            {clientes.length > 0 ? clientes.map(c => (
              <tr key={c.id}>
                <td>{c.nombreCompleto || `${c.nombres || ''} ${c.apellidos || ''}`}</td>
                <td>{c.nombreUsuario}</td>
                <td>{c.correo}</td>
                <td>{c.telefono || '-'}</td>
                <td>{c.activo ? 'Sí' : 'No'}</td>
                <td>{c.roles.join(', ')}</td>
              </tr>
            )) : (
              <tr><td colSpan={6} style={{ textAlign: 'center' }}>No hay clientes</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}

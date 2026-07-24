import { useDeporvida } from '../../context/DeporvidaContext';

export function RoleClickView({ role, roleKey, color }: { role: string; roleKey: string; color: string }) {
  const { navigate } = useDeporvida();

  return (
    <div className="hero" style={{ marginTop: '70px', padding: '80px 20px' }}>
      <h1 style={{ fontSize: '40px' }}>Hola, {role}</h1>
      <p style={{ fontSize: '18px' }}>Bienvenido al Sistema de Gestión de Librería Deporvida.</p>
      <hr style={{ borderColor: '#444', maxWidth: '500px', margin: '20px auto' }} />
      <p>Puedes acceder a distintas funciones luego de iniciar sesión o registrarte.</p>
      <br />
      <button className="btn" style={{ background: color, margin: '5px' }} onClick={() => navigate(`${roleKey}-signup` as any)}>Registrarse</button>
      <button className="btn" style={{ background: color, marginLeft: '10px' }} onClick={() => navigate('login')}>Iniciar Sesión</button>
    </div>
  );
}

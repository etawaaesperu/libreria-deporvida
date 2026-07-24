export function AdminViewColaboradorView() {
  return (
    <>
      <h2 className="section-title">Gestión de Colaboradores</h2>
      <div style={{ padding: '40px', textAlign: 'center' }}>
        <div style={{ background: '#fff8e1', border: '1px solid #ffe082', borderRadius: '8px', padding: '30px', maxWidth: '500px', margin: '0 auto' }}>
          <h3 style={{ color: '#8a6d00', marginBottom: '16px' }}>Funcionalidad pendiente de backend</h3>
          <p style={{ color: '#666', lineHeight: '1.6' }}>
            La gestión de colaboradores (registro, salarios, aprobación) requiere
            un módulo de RRHH que aún no está implementado en el backend.
            <br /><br />
            El backend actual maneja usuarios con roles (ROL_ADMIN, ROL_USUARIO, ROL_VENDEDOR)
            pero no incluye una entidad Colaborador con salario ni flujo de aprobación.
          </p>
        </div>
      </div>
    </>
  );
}

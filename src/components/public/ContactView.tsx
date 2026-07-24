import { useState } from 'react';

export function ContactView() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) {
      alert('Por favor completa todos los campos');
      return;
    }
    setSent(true);
  };

  if (sent) {
    return (
      <div className="about-page">
        <h2>¡Tu mensaje fue enviado con éxito!</h2>
        <p>Responderemos a tu consulta muy pronto</p>
        <br />
        <button className="btn btn-primary" onClick={() => window.location.href = '#home'}>INICIO</button>
      </div>
    );
  }

  return (
    <div style={{ marginTop: '100px', textAlign: 'center', padding: '20px 10%' }}>
      <h2 style={{ color: '#2ed8b6', marginBottom: '30px' }}>¡Envíanos tus comentarios!</h2>
      <div className="form-container" style={{ display: 'inline-block', textAlign: 'left' }}>
        <div className="form-header">Contáctanos</div>
        <div className="form-body">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Nombre</label>
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Tu Nombre" required />
            </div>
            <div className="form-group">
              <label>Correo</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Tu Correo" required />
            </div>
            <div className="form-group">
              <label>Mensaje</label>
              <textarea value={message} onChange={(e) => setMessage(e.target.value)} rows={4} placeholder="Tu Mensaje" required />
            </div>
            <div className="form-actions">
              <button type="submit" className="btn btn-primary">Enviar Mensaje</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

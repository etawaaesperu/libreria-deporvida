import { useState } from 'react';
import { useDeporvida } from '../../context/DeporvidaContext';

export function ColaboradorAvisoView() {
  const { postAviso } = useDeporvida();
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    await postAviso(message);
    setMessage('');
    alert('¡Aviso publicado!');
  };

  return (
    <>
      <h2 className="section-title">Crear Aviso</h2>
      <div className="form-container" style={{ maxWidth: '500px' }}>
        <div className="form-header">Publicar un Aviso</div>
        <div className="form-body">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Mensaje</label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={4}
                placeholder="Escribe tu aviso aquí..."
                required
              />
            </div>
            <div className="form-actions">
              <button type="submit" className="btn btn-success">Publicar Aviso</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

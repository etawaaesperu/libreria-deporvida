import { useDeporvida } from '../../context/DeporvidaContext';
import { getImageUrl } from './BookCard';

export function CarritoView() {
  const { carrito, removeFromCart, updateCartQuantity, clearCart, getCartTotal, getCartCount, navigate } = useDeporvida();

  if (carrito.length === 0) {
    return (
      <div className="about-page" style={{ minHeight: '50vh' }}>
        <h2>🛒 Tu carrito está vacío</h2>
        <p>No has agregado ningún libro aún.</p>
        <br />
        <button className="btn btn-primary" onClick={() => navigate('catalogo')}>Ir al Catálogo</button>
      </div>
    );
  }

  return (
    <div style={{ marginTop: '100px', padding: '20px', maxWidth: '900px', margin: '100px auto 0' }}>
      <h2 className="section-title">Carrito de Compras</h2>
      
      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>Libro</th>
              <th>Precio</th>
              <th>Cantidad</th>
              <th>Subtotal</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {carrito.map(item => (
              <tr key={item.libro.id}>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <img
                      src={getImageUrl(item.libro.urlPortada || item.libro.imagen)}
                      alt={item.libro.titulo}
                      style={{ width: '50px', height: '70px', objectFit: 'cover', borderRadius: '4px' }}
                    />
                    <div>
                      <strong>{item.libro.titulo}</strong>
                      <br />
                      <small style={{ color: '#888' }}>{item.libro.autor}</small>
                    </div>
                  </div>
                </td>
                <td>S/ {item.libro.precio.toFixed(2)}</td>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <button 
                      className="btn btn-sm" 
                      style={{ background: '#19b3d3', padding: '5px 12px' }}
                      onClick={() => updateCartQuantity(item.libro.id, item.cantidad - 1)}
                      disabled={item.cantidad <= 1}
                    >-</button>
                    <span style={{ minWidth: '30px', textAlign: 'center' }}>{item.cantidad}</span>
                    <button 
                      className="btn btn-sm" 
                      style={{ background: '#19b3d3', padding: '5px 12px' }}
                      onClick={() => updateCartQuantity(item.libro.id, item.cantidad + 1)}
                      disabled={item.cantidad >= 1000}
                    >+</button>
                  </div>
                </td>
                <td><strong>S/ {(item.libro.precio * item.cantidad).toFixed(2)}</strong></td>
                <td>
                  <button 
                    className="btn btn-sm btn-danger" 
                    onClick={() => removeFromCart(item.libro.id)}
                  >Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '30px', flexWrap: 'wrap', gap: '20px' }}>
        <div>
          <button className="btn btn-warning" onClick={clearCart}>Vaciar Carrito</button>
          <button className="btn btn-blue" style={{ marginLeft: '10px' }} onClick={() => navigate('catalogo')}>Seguir Comprando</button>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#19b3d3' }}>
            Total: S/ {getCartTotal().toFixed(2)}
          </div>
          <div style={{ color: '#888', fontSize: '14px', marginTop: '5px' }}>
            {getCartCount()} producto{getCartCount() !== 1 ? 's' : ''} en el carrito
          </div>
          <button 
            className="btn btn-success" 
            style={{ marginTop: '15px', padding: '15px 40px', fontSize: '18px' }}
            onClick={() => navigate('checkout')}
          >
            Finalizar Compra
          </button>
        </div>
      </div>
    </div>
  );
}
import { useState, FormEvent } from 'react';
import { useDeporvida } from '../../context/DeporvidaContext';
import { pedidoService } from '../../services/pedidoService';
import { paymentClient } from '../../services/paymentClient';
import { getImageUrl } from './BookCard';
import type { MetodoPago } from '../../services/paymentClient';
import '../../styles/checkout.css';

interface CardData {
  cardholderName: string;
  cardNumber: string;
  expiry: string;
  cvv: string;
}

interface ShippingData {
  direccionEnvio: string;
  ciudadEnvio: string;
  departamentoEnvio: string;
  codigoPostalEnvio: string;
  paisEnvio: string;
  telefonoEnvio: string;
  notas: string;
}

export function CheckoutView() {
  const { carrito, getCartTotal, clearCart, navigate, token } = useDeporvida();
  const [cardData, setCardData] = useState<CardData>({
    cardholderName: '',
    cardNumber: '',
    expiry: '',
    cvv: ''
  });
  const [shippingData, setShippingData] = useState<ShippingData>({
    direccionEnvio: '',
    ciudadEnvio: '',
    departamentoEnvio: '',
    codigoPostalEnvio: '',
    paisEnvio: 'Perú',
    telefonoEnvio: '',
    notas: '',
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [completedTotal, setCompletedTotal] = useState(0);
  const [completedCount, setCompletedCount] = useState(0);

  const total = getCartTotal();

  if (!token) {
    return (
      <div className="checkout-container">
        <div className="checkout-empty">
          <h2>Inicia sesión para continuar</h2>
          <p>Debes iniciar sesión para realizar una compra.</p>
          <button className="btn btn-primary" onClick={() => navigate('login', { redirectTo: 'checkout' })}>
            Iniciar Sesión
          </button>
        </div>
      </div>
    );
  }

  if (carrito.length === 0 && !success) {
    return (
      <div className="checkout-container">
        <div className="checkout-empty">
          <h2>Tu carrito está vacío</h2>
          <p>No has agregado ningún libro aún.</p>
          <button className="btn btn-primary" onClick={() => navigate('catalogo')}>
            Ir al Catálogo
          </button>
        </div>
      </div>
    );
  }

  if (success) {
    return (
      <div className="checkout-container">
        <div className="checkout-success">
          <div className="success-icon">&#10003;</div>
          <h2>&iexcl;Pago realizado con &eacute;xito!</h2>
          <p>Tu pedido ha sido confirmado. Recibir&aacute;s un email con los detalles.</p>
          <div className="order-summary">
            <p><strong>Total pagado:</strong> S/ {completedTotal.toFixed(2)}</p>
            <p><strong>Productos:</strong> {completedCount} libro{completedCount !== 1 ? 's' : ''}</p>
          </div>
          <button className="btn btn-primary" onClick={() => navigate('cliente-pedidos')}>
            Ver mis pedidos
          </button>
          <button className="btn btn-blue" style={{ marginLeft: '10px' }} onClick={() => navigate('home')}>
            Volver al Inicio
          </button>
        </div>
      </div>
    );
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCardData(prev => ({ ...prev, [name]: value }));
    setError(null);
  };

  const handleShippingChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setShippingData(prev => ({ ...prev, [name]: value }));
    setError(null);
  };

  const formatCardNumber = (value: string) => {
    const digits = value.replace(/\D/g, '').slice(0, 16);
    const groups = digits.match(/.{1,4}/g) || [];
    return groups.join(' ');
  };

  const formatExpiry = (value: string) => {
    const digits = value.replace(/\D/g, '').slice(0, 4);
    if (digits.length >= 3) {
      return `${digits.slice(0, 2)}/${digits.slice(2)}`;
    }
    return digits;
  };

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCardNumber(e.target.value);
    setCardData(prev => ({ ...prev, cardNumber: formatted }));
  };

  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatExpiry(e.target.value);
    setCardData(prev => ({ ...prev, expiry: formatted }));
  };

  const validateForm = (): boolean => {
    if (!shippingData.direccionEnvio.trim()) {
      setError('Ingresa la direcci&oacute;n de env&iacute;o');
      return false;
    }
    if (!shippingData.ciudadEnvio.trim()) {
      setError('Ingresa la ciudad de env&iacute;o');
      return false;
    }
    if (!shippingData.departamentoEnvio.trim()) {
      setError('Ingresa el departamento de env&iacute;o');
      return false;
    }
    if (!shippingData.codigoPostalEnvio.trim()) {
      setError('Ingresa el c&oacute;digo postal');
      return false;
    }
    if (!shippingData.paisEnvio.trim()) {
      setError('Ingresa el pa&iacute;s de env&iacute;o');
      return false;
    }
    if (!cardData.cardholderName.trim()) {
      setError('Ingresa el nombre del titular de la tarjeta');
      return false;
    }
    if (cardData.cardNumber.replace(/\s/g, '').length !== 16) {
      setError('El n&uacute;mero de tarjeta debe tener 16 d&iacute;gitos');
      return false;
    }
    if (!/^\d{2}\/\d{2}$/.test(cardData.expiry)) {
      setError('La fecha de expiraci&oacute;n debe ser MM/AA');
      return false;
    }
    if (cardData.cvv.length !== 3) {
      setError('El CVV debe tener 3 d&iacute;gitos');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!validateForm()) return;

    setIsProcessing(true);

    const finalTotal = total;
    const finalCount = carrito.reduce((sum, item) => sum + item.cantidad, 0);

    try {
      const pedidoResponse = await pedidoService.create({
        direccionEnvio: shippingData.direccionEnvio,
        ciudadEnvio: shippingData.ciudadEnvio,
        departamentoEnvio: shippingData.departamentoEnvio,
        codigoPostalEnvio: shippingData.codigoPostalEnvio,
        paisEnvio: shippingData.paisEnvio,
        telefonoEnvio: shippingData.telefonoEnvio || undefined,
        notas: shippingData.notas || undefined,
      });
      const pedidoId = pedidoResponse.data.id;

      const pagoResponse = await paymentClient.createPago({
        pedidoId,
        metodoPago: 'TARJETA_CREDITO' as MetodoPago,
        monto: finalTotal,
      });
      const pagoId = pagoResponse.data.id;

      await paymentClient.processPago(pagoId);

      setCompletedTotal(finalTotal);
      setCompletedCount(finalCount);
      setSuccess(true);
      clearCart();
    } catch (err: any) {
      const msg = err.response?.data?.message || err.message || 'Error al procesar el pago. Intenta nuevamente.';
      setError(msg);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="checkout-container">
      <div className="checkout-wrapper">
        <div className="checkout-summary">
          <h2 className="section-title">Resumen del Pedido</h2>
          <div className="checkout-items">
            {carrito.map(item => (
              <div key={item.libro.id} className="checkout-item">
                <img
                  src={getImageUrl(item.libro.urlPortada || item.libro.imagen)}
                  alt={item.libro.titulo}
                  className="checkout-item-image"
                  style={{ width: '50px', height: '70px', objectFit: 'cover', borderRadius: '4px' }}
                />
                <div className="checkout-item-details">
                  <strong>{item.libro.titulo}</strong>
                  <br />
                  <small style={{ color: '#888' }}>{item.libro.autor}</small>
                </div>
                <div className="checkout-item-price">
                  <span>x{item.cantidad}</span>
                  <strong>S/ {(item.libro.precio * item.cantidad).toFixed(2)}</strong>
                </div>
              </div>
            ))}
          </div>
          <div className="checkout-total">
            <span>Total</span>
            <strong>S/ {total.toFixed(2)}</strong>
          </div>
        </div>

        <form className="checkout-form" onSubmit={handleSubmit}>
          <h2 className="section-title">Direcci&oacute;n de Env&iacute;o</h2>

          <div className="form-group">
            <label htmlFor="direccionEnvio">Direcci&oacute;n</label>
            <input
              type="text"
              id="direccionEnvio"
              name="direccionEnvio"
              value={shippingData.direccionEnvio}
              onChange={handleShippingChange}
              placeholder="Av. Principal 123"
              required
              disabled={isProcessing}
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="ciudadEnvio">Ciudad</label>
              <input
                type="text"
                id="ciudadEnvio"
                name="ciudadEnvio"
                value={shippingData.ciudadEnvio}
                onChange={handleShippingChange}
                placeholder="Lima"
                required
                disabled={isProcessing}
              />
            </div>
            <div className="form-group">
              <label htmlFor="departamentoEnvio">Departamento</label>
              <input
                type="text"
                id="departamentoEnvio"
                name="departamentoEnvio"
                value={shippingData.departamentoEnvio}
                onChange={handleShippingChange}
                placeholder="Lima"
                required
                disabled={isProcessing}
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="codigoPostalEnvio">C&oacute;digo Postal</label>
              <input
                type="text"
                id="codigoPostalEnvio"
                name="codigoPostalEnvio"
                value={shippingData.codigoPostalEnvio}
                onChange={handleShippingChange}
                placeholder="15000"
                required
                disabled={isProcessing}
              />
            </div>
            <div className="form-group">
              <label htmlFor="paisEnvio">Pa&iacute;s</label>
              <input
                type="text"
                id="paisEnvio"
                name="paisEnvio"
                value={shippingData.paisEnvio}
                onChange={handleShippingChange}
                placeholder="Per&uacute;"
                required
                disabled={isProcessing}
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="telefonoEnvio">Tel&eacute;fono (opcional)</label>
              <input
                type="text"
                id="telefonoEnvio"
                name="telefonoEnvio"
                value={shippingData.telefonoEnvio}
                onChange={handleShippingChange}
                placeholder="999 888 777"
                disabled={isProcessing}
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="notas">Notas (opcional)</label>
            <textarea
              id="notas"
              name="notas"
              value={shippingData.notas}
              onChange={handleShippingChange}
              placeholder="Instrucciones especiales de entrega..."
              rows={3}
              style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #ddd', fontSize: '14px' }}
              disabled={isProcessing}
            />
          </div>

          <h2 className="section-title" style={{ marginTop: '20px' }}>Datos de Pago</h2>

          {error && <div className="checkout-error" role="alert">{error}</div>}

          <div className="form-group">
            <label htmlFor="cardholderName">Nombre en la tarjeta</label>
            <input
              type="text"
              id="cardholderName"
              name="cardholderName"
              value={cardData.cardholderName}
              onChange={handleInputChange}
              placeholder="JUAN PEREZ"
              required
              autoComplete="cc-name"
              disabled={isProcessing}
            />
          </div>

          <div className="form-group">
            <label htmlFor="cardNumber">N&uacute;mero de tarjeta</label>
            <input
              type="text"
              id="cardNumber"
              name="cardNumber"
              value={cardData.cardNumber}
              onChange={handleCardNumberChange}
              placeholder="1234 5678 9012 3456"
              maxLength={19}
              required
              autoComplete="cc-number"
              disabled={isProcessing}
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="expiry">Expiraci&oacute;n (MM/AA)</label>
              <input
                type="text"
                id="expiry"
                name="expiry"
                value={cardData.expiry}
                onChange={handleExpiryChange}
                placeholder="12/25"
                maxLength={5}
                required
                autoComplete="cc-exp"
                disabled={isProcessing}
              />
            </div>
            <div className="form-group">
              <label htmlFor="cvv">CVV</label>
              <input
                type="text"
                id="cvv"
                name="cvv"
                value={cardData.cvv}
                onChange={handleInputChange}
                placeholder="123"
                maxLength={3}
                required
                autoComplete="cc-csc"
                disabled={isProcessing}
              />
            </div>
          </div>

          <button
            type="submit"
            className="btn btn-success checkout-submit-btn"
            disabled={isProcessing}
          >
            {isProcessing ? 'Procesando...' : `Pagar S/ ${total.toFixed(2)}`}
          </button>
        </form>
      </div>
    </div>
  );
}

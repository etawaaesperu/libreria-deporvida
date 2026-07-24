import api from './api';

export type MetodoPago =
  | 'TARJETA_CREDITO'
  | 'TARJETA_DEBITO'
  | 'PAYPAL'
  | 'STRIPE'
  | 'TRANSFERENCIA_BANCARIA'
  | 'CONTRA_ENTREGA'
  | 'APPLE_PAY'
  | 'GOOGLE_PAY';

export interface PagoRequest {
  pedidoId: number;
  metodoPago: MetodoPago;
  monto: number;
}

export interface PagoResponse {
  id: number;
  referenciaPago: string;
  metodoPago: string;
  estado: string;
  monto: number;
  moneda: string;
  fechaCreacion: string;
}

export const paymentClient = {
  createPago: (data: PagoRequest) =>
    api.post<PagoResponse>('/pagos', data),

  processPago: (id: number) =>
    api.put<PagoResponse>(`/pagos/${id}/procesar`),
};

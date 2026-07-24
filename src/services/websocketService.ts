import { Client, IMessage } from '@stomp/stompjs';
import { API_BASE_URL } from './api';

let client: Client | null = null;
let reconnectDelay = 5000;

function getWsBaseUrl(): string {
  const base = API_BASE_URL.replace(/^http/, 'ws');
  const clean = base.replace(/\/api$/, '');
  return `${clean}/ws`;
}

export function connectWebSocket(
  token: string,
  onPedidoUpdate: (message: any) => void,
): () => void {
  if (client?.active) {
    return () => {};
  }

  client = new Client({
    brokerURL: getWsBaseUrl(),
    connectHeaders: {
      Authorization: `Bearer ${token}`,
    },
    reconnectDelay,
    onConnect: () => {
      client?.subscribe('/topic/pedidos', (msg: IMessage) => {
        try {
          const data = JSON.parse(msg.body);
          onPedidoUpdate(data);
        } catch {
          // ignore malformed messages
        }
      });
    },
    onWebSocketClose: () => {
      client?.deactivate();
    },
  });

  client.activate();

  return () => {
    client?.deactivate();
    client = null;
  };
}

export function disconnectWebSocket() {
  client?.deactivate();
  client = null;
}

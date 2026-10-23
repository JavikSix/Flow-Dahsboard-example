export type Channel = 'whatsapp' | 'instagram';

export type ConversationStatus = 'pago_validado' | 'asesor_humano' | 'bot_auto' | 'pendiente_pago';

export interface ChatMessage {
  id: string;
  sender: 'client' | 'bot' | 'human';
  senderName?: string;
  senderInitials?: string;
  text?: string;
  time: string;
  type?: 'text' | 'order_calc' | 'payment_card' | 'receipt' | 'payment_verified' | 'menu_card' | 'location_card';
  data?: any;
}

export interface OrderItem {
  name: string;
  description: string;
  price: number;
  qty: number;
}

export interface OrderTelemetry {
  orderId: string;
  items: OrderItem[];
  deliveryZone: string;
  deliveryFee: number;
  total: number;
  gateway: string;
  receiptRef: string;
  reconcileLatency: string;
  sheetsRow: string;
  sheetsTab: string;
  kitchenStatus: 'en_preparacion' | 'comanda_lista' | 'en_camino' | 'entregado';
  ltv: number;
}

export interface Conversation {
  id: string;
  clientName: string;
  initials: string;
  phone: string;
  location: string;
  channel: Channel;
  customerTag: string;
  lastMessage: string;
  timeAgo: string;
  status: ConversationStatus;
  botActive: boolean;
  messages: ChatMessage[];
  order: OrderTelemetry;
}

export interface TransactionRecord {
  id: string;
  orderId: string;
  client: string;
  channel: Channel;
  amount: number;
  method: 'Nequi' | 'PSE' | 'Bancolombia QR' | 'Daviplata';
  reference: string;
  latency: string;
  sheetsRow: string;
  timestamp: string;
  status: 'validado_auto' | 'revision_manual' | 'pendiente' | 'rechazado';
}

export interface BotAutomationRule {
  id: string;
  name: string;
  description: string;
  category: 'pagos' | 'cocina' | 'sheets' | 'handoff' | 'facturacion';
  enabled: boolean;
  triggers: string;
  latencyTarget: string;
  successRate: string;
}

export type NavView =
  | 'bandeja-de-chats'
  | 'metricas-kpis'
  | 'conciliacion-de-pagos'
  | 'automatizaciones-bots'
  | 'integraciones'
  | 'configuracion';

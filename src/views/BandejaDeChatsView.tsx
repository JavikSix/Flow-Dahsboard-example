import React, { useState } from 'react';
import { Conversation, ChatMessage } from '../types';
import { NequiQRModal } from '../components/NequiQRModal';
import { PSEModal } from '../components/PSEModal';
import { ReceiptZoomModal } from '../components/ReceiptZoomModal';
import { GoogleSheetsModal } from '../components/GoogleSheetsModal';
import { DIANInvoiceModal } from '../components/DIANInvoiceModal';
import { QuickTemplatesModal } from '../components/QuickTemplatesModal';

interface Props {
  conversations: Conversation[];
  selectedId: string;
  onSelectConversation: (id: string) => void;
  onToggleBot: (id: string, active: boolean) => void;
  onSendMessage: (id: string, message: ChatMessage) => void;
  onUpdateKitchenStatus: (id: string, status: 'en_preparacion' | 'comanda_lista' | 'en_camino' | 'entregado') => void;
}

export const BandejaDeChatsView: React.FC<Props> = ({
  conversations,
  selectedId,
  onSelectConversation,
  onToggleBot,
  onSendMessage,
  onUpdateKitchenStatus,
}) => {
  const [filter, setFilter] = useState<'todos' | 'whatsapp' | 'instagram' | 'humano' | 'pendientes'>('todos');
  const [searchQuery, setSearchQuery] = useState('');
  const [inputMessage, setInputMessage] = useState('');
  const [notificationToast, setNotificationToast] = useState<string | null>(null);

  // Modals state
  const [showNequiModal, setShowNequiModal] = useState(false);
  const [showPSEModal, setShowPSEModal] = useState(false);
  const [showReceiptZoom, setShowReceiptZoom] = useState(false);
  const [showSheetsModal, setShowSheetsModal] = useState(false);
  const [showDIANModal, setShowDIANModal] = useState(false);
  const [showTemplatesModal, setShowTemplatesModal] = useState(false);

  const activeConv = conversations.find((c) => c.id === selectedId) || conversations[0];

  const triggerToast = (msg: string) => {
    setNotificationToast(msg);
    setTimeout(() => setNotificationToast(null), 3000);
  };

  // Filter conversations
  const filteredConversations = conversations.filter((c) => {
    const matchesSearch =
      c.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.phone.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.order.orderId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.lastMessage.toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchesSearch) return false;

    if (filter === 'whatsapp') return c.channel === 'whatsapp';
    if (filter === 'instagram') return c.channel === 'instagram';
    if (filter === 'humano') return c.status === 'asesor_humano';
    if (filter === 'pendientes') return c.status === 'pendiente_pago';
    return true;
  });

  const handleSendManual = () => {
    if (!inputMessage.trim()) return;

    const newMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: activeConv.botActive ? 'bot' : 'human',
      senderName: activeConv.botActive ? 'Flow Bot' : 'Admin Sede',
      text: inputMessage.trim(),
      time: new Date().toLocaleTimeString('es-CO', { hour: '2-digit', minute: '2-digit', hour12: false }),
      type: 'text',
    };

    onSendMessage(activeConv.id, newMsg);
    setInputMessage('');
  };

  const handleSimulatePaymentDone = () => {
    const verifyMsg: ChatMessage = {
      id: `msg-verif-${Date.now()}`,
      sender: 'bot',
      text: `¡Pago Verificado con Éxito! Tu orden ${activeConv.order.orderId} ha sido enviada a cocina y registrada en tu Google Sheets en tiempo récord (0.7s).`,
      time: new Date().toLocaleTimeString('es-CO', { hour: '2-digit', minute: '2-digit', hour12: false }),
      type: 'payment_verified',
      data: {
        orderId: activeConv.order.orderId,
        latency: '0.7s',
        etaMinutes: '35 minutos',
      },
    };
    onSendMessage(activeConv.id, verifyMsg);
    triggerToast(`¡Pago de ${activeConv.clientName} validado en 0.7s! Comanda enviada a KDS.`);
  };

  const handleSendPaymentLink = () => {
    const payMsg: ChatMessage = {
      id: `msg-pay-${Date.now()}`,
      sender: 'bot',
      text: 'Pasarela Instantánea: Paga al instante escaneando la llave Nequi #300-881-2290 o haz clic para PSE Directo.',
      time: new Date().toLocaleTimeString('es-CO', { hour: '2-digit', minute: '2-digit', hour12: false }),
      type: 'payment_card',
      data: {
        key: '#300-881-2290',
        gateway: 'Nequi / PSE Instantáneo',
      },
    };
    onSendMessage(activeConv.id, payMsg);
    triggerToast('Link y llave de cobro Nequi/PSE enviados al chat.');
  };

  const handleSendMenu = () => {
    const menuMsg: ChatMessage = {
      id: `msg-menu-${Date.now()}`,
      sender: 'bot',
      text: '🍔 ¡Conoce nuestra carta artesanal! Combos dobles, smash trufadas, papas rústicas y bebidas frías disponibles ahora.',
      time: new Date().toLocaleTimeString('es-CO', { hour: '2-digit', minute: '2-digit', hour12: false }),
      type: 'text',
    };
    onSendMessage(activeConv.id, menuMsg);
    triggerToast('Menú digital compartido con el cliente.');
  };

  const handleSendLocationRequest = () => {
    const locMsg: ChatMessage = {
      id: `msg-loc-${Date.now()}`,
      sender: 'bot',
      text: '📍 Por favor comparte tu ubicación de WhatsApp o confirma la dirección con torre y apartamento para coordinar al motorizado.',
      time: new Date().toLocaleTimeString('es-CO', { hour: '2-digit', minute: '2-digit', hour12: false }),
      type: 'text',
    };
    onSendMessage(activeConv.id, locMsg);
    triggerToast('Solicitud de ubicación GPS enviada.');
  };

  const nextKitchenStatus = () => {
    const current = activeConv.order.kitchenStatus;
    if (current === 'en_preparacion') {
      onUpdateKitchenStatus(activeConv.id, 'comanda_lista');
      triggerToast('Estado actualizado: Comanda lista para empaque');
    } else if (current === 'comanda_lista') {
      onUpdateKitchenStatus(activeConv.id, 'en_camino');
      triggerToast('Estado actualizado: Motorizado en ruta de entrega');
    } else if (current === 'en_camino') {
      onUpdateKitchenStatus(activeConv.id, 'entregado');
      triggerToast('Estado actualizado: Orden entregada con éxito');
    } else {
      onUpdateKitchenStatus(activeConv.id, 'en_preparacion');
      triggerToast('Estado reiniciado a: En Preparación');
    }
  };

  return (
    <div className="flex flex-col w-full h-[calc(100vh-4rem)] overflow-hidden">
      {/* Toast Notification */}
      {notificationToast && (
        <div className="fixed top-20 right-8 z-50 px-4 py-2.5 rounded-xl bg-surface-container-highest border border-primary/40 text-primary shadow-[0_10px_30px_rgba(0,0,0,0.8)] font-label-md text-label-md flex items-center gap-2 animate-in fade-in slide-in-from-top-2">
          <span className="material-symbols-outlined text-[18px] text-[#4ade80]">check_circle</span>
          <span>{notificationToast}</span>
        </div>
      )}

      {/* Top Command Bar / Secondary Context Header */}
      <div className="flex-none px-space-lg py-2.5 bg-surface-container-lowest flex items-center justify-between shadow-[0_1px_0_0_rgba(255,255,255,0.06)]">
        <div className="flex items-center gap-space-md">
          <div className="flex items-center gap-space-xs">
            <span className="font-headline-sm text-headline-sm text-primary tracking-tight">Centro de Mensajería Omnicanal</span>
            <span className="px-2 py-0.5 rounded-full bg-surface-container-high text-on-surface-variant font-label-sm text-label-sm uppercase tracking-wider">
              Sync v2.4
            </span>
          </div>
          <div className="h-4 w-px bg-surface-container-highest"></div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-primary animate-ping"></span>
            <span className="font-body-sm text-body-sm text-secondary">Escuchando Webhooks de WhatsApp Cloud API & Graph IG</span>
          </div>
        </div>
        <div className="flex items-center gap-space-sm">
          <div className="flex items-center bg-surface-container-low px-space-sm py-1 rounded-lg">
            <span className="font-label-sm text-label-sm text-outline uppercase mr-2">Tasa de Resolución Bot</span>
            <span className="font-label-md text-label-md text-primary font-bold">89.4%</span>
          </div>
          <div className="flex items-center bg-surface-container-low px-space-sm py-1 rounded-lg">
            <span className="font-label-sm text-label-sm text-outline uppercase mr-2">Tiempo Validación Pago</span>
            <span className="font-label-md text-label-md text-primary font-bold">0.82s</span>
          </div>
        </div>
      </div>

      {/* Three-Pane Inbox Layout */}
      <div className="flex-1 grid grid-cols-12 min-h-0 bg-surface">
        {/* PANEL 1: LISTA DE CONVERSACIONES (3 Cols) */}
        <section className="col-span-3 flex flex-col h-full bg-surface-container-lowest/70 backdrop-blur-xl shadow-[inset_-1px_0_0_0_rgba(255,255,255,0.06)] min-w-0">
          {/* Search & Filters Container */}
          <div className="p-space-md flex-none flex flex-col gap-space-sm shadow-[0_1px_0_0_rgba(255,255,255,0.04)]">
            {/* Search Input */}
            <div className="relative w-full">
              <span className="material-symbols-outlined absolute left-3 top-2.5 text-outline text-[18px]">search</span>
              <input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 bg-surface-container-low rounded-xl text-on-surface placeholder:text-outline font-body-sm text-body-sm focus:outline-none focus:bg-surface-container-high transition-colors"
                placeholder="Buscar por cliente, tel o #ref..."
                type="text"
              />
            </div>
            {/* Channel Filter Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar text-nowrap">
              <button
                onClick={() => setFilter('todos')}
                className={`px-2.5 py-1 rounded-full font-label-sm text-label-sm font-semibold transition-all ${
                  filter === 'todos'
                    ? 'bg-primary text-on-primary shadow-[0_0_12px_rgba(255,255,255,0.2)]'
                    : 'bg-surface-container-low text-secondary hover:text-primary hover:bg-surface-container'
                }`}
              >
                Todos ({conversations.length})
              </button>
              <button
                onClick={() => setFilter('whatsapp')}
                className={`px-2.5 py-1 rounded-full font-label-sm text-label-sm transition-colors ${
                  filter === 'whatsapp'
                    ? 'bg-primary text-on-primary font-bold shadow-[0_0_12px_rgba(255,255,255,0.2)]'
                    : 'bg-surface-container-low text-secondary hover:text-primary hover:bg-surface-container'
                }`}
              >
                WhatsApp (14)
              </button>
              <button
                onClick={() => setFilter('instagram')}
                className={`px-2.5 py-1 rounded-full font-label-sm text-label-sm transition-colors ${
                  filter === 'instagram'
                    ? 'bg-primary text-on-primary font-bold shadow-[0_0_12px_rgba(255,255,255,0.2)]'
                    : 'bg-surface-container-low text-secondary hover:text-primary hover:bg-surface-container'
                }`}
              >
                Instagram (4)
              </button>
              <button
                onClick={() => setFilter('humano')}
                className={`px-2.5 py-1 rounded-full font-label-sm text-label-sm transition-colors ${
                  filter === 'humano'
                    ? 'bg-primary text-on-primary font-bold shadow-[0_0_12px_rgba(255,255,255,0.2)]'
                    : 'bg-surface-container-low text-[#ffdad6] hover:bg-surface-container'
                }`}
              >
                Humano (2)
              </button>
              <button
                onClick={() => setFilter('pendientes')}
                className={`px-2.5 py-1 rounded-full font-label-sm text-label-sm transition-colors ${
                  filter === 'pendientes'
                    ? 'bg-primary text-on-primary font-bold shadow-[0_0_12px_rgba(255,255,255,0.2)]'
                    : 'bg-surface-container-low text-secondary hover:text-primary hover:bg-surface-container'
                }`}
              >
                Pendientes (3)
              </button>
            </div>
          </div>

          {/* Thread List Scrollable */}
          <div className="flex-1 overflow-y-auto divide-y-0 flex flex-col p-2 space-y-1">
            {filteredConversations.map((conv) => {
              const isSelected = conv.id === activeConv.id;
              return (
                <div
                  key={conv.id}
                  onClick={() => onSelectConversation(conv.id)}
                  className={`relative p-3 rounded-xl cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-surface-container-high shadow-[inset_0_1px_0_0_rgba(255,255,255,0.18),0_4px_16px_rgba(0,0,0,0.4)]'
                      : 'bg-surface-container-lowest/40 hover:bg-surface-container-low'
                  }`}
                >
                  {isSelected && (
                    <div className="absolute left-0 top-3 bottom-3 w-1 bg-primary rounded-r-full shadow-[0_0_8px_rgba(255,255,255,0.8)]"></div>
                  )}
                  <div className={`flex items-start gap-3 ${isSelected ? 'pl-1.5' : ''}`}>
                    <div className="relative flex-none">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center font-headline-sm text-headline-sm ${
                          isSelected
                            ? 'bg-surface-container-highest text-primary'
                            : 'bg-surface-container-high text-secondary'
                        }`}
                      >
                        {conv.initials}
                      </div>
                      {/* Channel Micro-Badge */}
                      <span
                        className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-surface-container-lowest flex items-center justify-center text-[10px] text-primary"
                        title={conv.channel === 'whatsapp' ? 'WhatsApp' : 'Instagram'}
                      >
                        <span className="material-symbols-outlined text-[12px]">
                          {conv.channel === 'whatsapp' ? 'chat' : 'photo_camera'}
                        </span>
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-0.5">
                        <span
                          className={`font-label-lg text-label-lg truncate ${
                            isSelected ? 'text-primary font-bold' : 'text-on-surface font-semibold'
                          }`}
                        >
                          {conv.clientName}
                        </span>
                        <span className="font-label-sm text-label-sm text-outline">{conv.timeAgo}</span>
                      </div>
                      <p className="font-body-sm text-body-sm text-on-surface-variant truncate mb-2">
                        {conv.lastMessage}
                      </p>
                      <div className="flex items-center justify-between">
                        {conv.status === 'pago_validado' && (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-surface-container-lowest text-primary font-label-sm text-label-sm">
                            <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                            Pago Validado
                          </span>
                        )}
                        {conv.status === 'asesor_humano' && (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-secondary-container/60 text-secondary font-label-sm text-label-sm">
                            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
                            Asesor Humano
                          </span>
                        )}
                        {conv.status === 'bot_auto' && (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-surface-container text-secondary font-label-sm text-label-sm">
                            <span className="w-1.5 h-1.5 rounded-full bg-outline"></span>
                            Bot Auto
                          </span>
                        )}
                        {conv.status === 'pendiente_pago' && (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-surface-container text-on-surface-variant font-label-sm text-label-sm">
                            <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
                            Pendiente Pago
                          </span>
                        )}
                        <span className="material-symbols-outlined text-outline text-[16px]">
                          {conv.status === 'pago_validado'
                            ? 'receipt_long'
                            : conv.status === 'asesor_humano'
                            ? 'person'
                            : conv.status === 'pendiente_pago'
                            ? 'hourglass_empty'
                            : 'smart_toy'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* PANEL 2: CONVERSACIÓN ACTIVA (6 Cols) */}
        <section className="col-span-6 flex flex-col h-full bg-surface-container-low/40 relative min-w-0">
          {/* Chat Header */}
          <header className="flex-none px-space-lg py-3 bg-surface-container-lowest/90 backdrop-blur-xl shadow-[0_1px_0_0_rgba(255,255,255,0.06)] flex items-center justify-between z-10">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-11 h-11 rounded-full bg-surface-container-highest flex items-center justify-center text-primary font-headline-sm text-headline-sm shadow-[inset_0_1px_0_0_rgba(255,255,255,0.2)]">
                  {activeConv.initials}
                </div>
                <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-primary ring-2 ring-surface-container-lowest"></span>
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span className="font-headline-sm text-headline-sm text-primary tracking-tight">
                    {activeConv.clientName}
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-surface-container-high text-on-surface font-label-sm text-label-sm">
                    {activeConv.customerTag}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-outline">
                  <span className="font-label-sm text-label-sm">{activeConv.phone}</span>
                  <span>•</span>
                  <span className="font-label-sm text-label-sm flex items-center gap-1">
                    <span className="material-symbols-outlined text-[14px]">location_on</span>
                    {activeConv.location}
                  </span>
                </div>
              </div>
            </div>

            {/* Bot Toggle & Controls */}
            <div className="flex items-center gap-3">
              <div className="flex items-center bg-surface-container-low px-3 py-1.5 rounded-xl gap-2.5 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08)]">
                <div className="flex flex-col text-right">
                  <span className="font-label-sm text-label-sm text-primary font-bold">
                    {activeConv.botActive ? 'Bot Activo' : 'Pausado (Humano)'}
                  </span>
                  <span className="font-label-sm text-label-sm text-outline">
                    {activeConv.botActive ? 'Flujo Dinámico Nequi' : 'Intervención Manual'}
                  </span>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={activeConv.botActive}
                    onChange={(e) => onToggleBot(activeConv.id, e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-10 h-5 bg-surface-container-highest peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-primary after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-primary/20 shadow-[inset_0_1px_2px_rgba(0,0,0,0.6)]"></div>
                </label>
              </div>
              <button
                onClick={() => triggerToast(`Historial completo sincronizado de ${activeConv.clientName}`)}
                className="p-2 rounded-xl bg-surface-container-low hover:bg-surface-container text-on-surface-variant transition-colors"
                title="Ver Historial Completo"
              >
                <span className="material-symbols-outlined text-[20px]">history</span>
              </button>
            </div>
          </header>

          {/* Message Timeline Stream */}
          <div className="flex-1 overflow-y-auto p-space-lg space-y-space-md">
            {/* Timestamp Divider */}
            <div className="flex items-center justify-center my-2">
              <span className="px-3 py-1 rounded-full bg-surface-container-lowest text-outline font-label-sm text-label-sm uppercase tracking-wider">
                Hoy • 14:00 - Orden en Proceso
              </span>
            </div>

            {/* Render all messages */}
            {activeConv.messages.map((msg) => {
              if (msg.sender === 'client') {
                return (
                  <div key={msg.id} className="flex items-start gap-2.5 max-w-[80%]">
                    <div className="w-7 h-7 rounded-full bg-surface-container-high flex-none flex items-center justify-center text-outline text-[12px] font-bold mt-1">
                      {msg.senderInitials || activeConv.initials}
                    </div>
                    <div className="flex flex-col gap-1">
                      {msg.type === 'receipt' ? (
                        <div className="p-2.5 rounded-2xl rounded-tl-sm bg-surface-container-high text-on-surface shadow-[0_2px_8px_rgba(0,0,0,0.3)]">
                          {/* Comprobante Preview Card */}
                          <div className="relative rounded-xl overflow-hidden bg-surface-container-lowest p-3 flex flex-col gap-2 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1)]">
                            <div className="flex items-center justify-between">
                              <span className="font-label-sm text-label-sm font-bold text-primary uppercase">
                                Comprobante Nequi
                              </span>
                              <span className="material-symbols-outlined text-primary text-[16px]">verified</span>
                            </div>
                            <div className="w-full h-32 rounded-lg bg-surface-container-high flex flex-col items-center justify-center relative overflow-hidden">
                              <div className="absolute inset-0 bg-gradient-to-t from-surface-container-lowest to-transparent opacity-80"></div>
                              <img
                                className="w-full h-full object-cover cursor-pointer"
                                src={msg.data?.receiptUrl}
                                alt="Comprobante bancario"
                                onClick={() => setShowReceiptZoom(true)}
                              />
                              <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between text-primary">
                                <span className="font-label-sm text-label-sm font-bold">
                                  {msg.data?.ref || activeConv.order.receiptRef}
                                </span>
                                <span className="font-label-sm text-label-sm">
                                  {msg.data?.amount || `$${activeConv.order.total.toLocaleString('es-CO')} COP`}
                                </span>
                              </div>
                            </div>
                            <div className="flex items-center justify-between text-outline text-[12px]">
                              <span>Captura WhatsApp adjunta</span>
                              <button
                                onClick={() => setShowReceiptZoom(true)}
                                className="hover:text-primary transition-colors flex items-center gap-1"
                              >
                                <span className="material-symbols-outlined text-[16px] text-primary">zoom_in</span>
                              </button>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="p-3.5 rounded-2xl rounded-tl-sm bg-surface-container-high text-on-surface shadow-[0_2px_8px_rgba(0,0,0,0.3)]">
                          <p className="font-body-md text-body-md">{msg.text}</p>
                        </div>
                      )}
                      <span className="font-label-sm text-label-sm text-outline pl-1">{msg.time}</span>
                    </div>
                  </div>
                );
              }

              // Bot or Human sender
              return (
                <div key={msg.id} className="flex items-start gap-2.5 max-w-[85%] ml-auto flex-row-reverse">
                  <div className="w-7 h-7 rounded-full bg-primary flex-none flex items-center justify-center text-on-primary font-bold shadow-[0_0_10px_rgba(255,255,255,0.4)] mt-1">
                    <span className="material-symbols-outlined text-[16px]">
                      {msg.sender === 'human'
                        ? 'person'
                        : msg.type === 'payment_card'
                        ? 'bolt'
                        : msg.type === 'payment_verified'
                        ? 'verified'
                        : 'smart_toy'}
                    </span>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    {msg.type === 'order_calc' ? (
                      <div className="p-3.5 rounded-2xl rounded-tr-sm bg-surface-container-highest text-primary shadow-[inset_0_1px_0_0_rgba(255,255,255,0.15),0_4px_20px_rgba(0,0,0,0.4)]">
                        <p className="font-body-md text-body-md">
                          ¡Hola {activeConv.clientName.split(' ')[0]}! Claro que sí 🍔 Tus{' '}
                          <span className="font-bold text-primary">{msg.data?.itemsText || 'Combos Artesanales'}</span>{' '}
                          están listos para despacho a {activeConv.location.split(',')[0]}.
                        </p>
                        <div className="mt-2 pt-2 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08)] flex justify-between items-center text-on-surface-variant font-body-sm text-body-sm">
                          <span>Total Calculado:</span>
                          <span className="font-headline-sm text-headline-sm text-primary font-bold">
                            {msg.data?.total || `$${activeConv.order.total.toLocaleString('es-CO')} COP`}
                          </span>
                        </div>
                      </div>
                    ) : msg.type === 'payment_card' ? (
                      <div className="p-4 rounded-2xl rounded-tr-sm bg-surface-container-lowest shadow-[0_4px_24px_rgba(0,0,0,0.6),inset_0_1px_0_0_rgba(255,255,255,0.2)] w-full max-w-sm">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-1.5">
                            <span className="material-symbols-outlined text-primary text-[18px]">account_balance_wallet</span>
                            <span className="font-label-md text-label-md font-bold text-primary uppercase tracking-wider">
                              Pasarela Instantánea
                            </span>
                          </div>
                          <span className="px-2 py-0.5 rounded-full bg-surface-container text-secondary font-label-sm text-label-sm">
                            Llave Activa
                          </span>
                        </div>
                        <p className="font-body-sm text-body-sm text-on-surface-variant mb-3">
                          Paga al instante escaneando la llave Nequi{' '}
                          <strong className="text-primary font-bold">#300-881-2290</strong> o haz clic para PSE Directo.
                        </p>
                        <div className="grid grid-cols-2 gap-2">
                          <button
                            onClick={() => setShowNequiModal(true)}
                            className="py-2 px-3 rounded-lg bg-surface-container-high hover:bg-surface-container-highest text-primary font-label-md text-label-md flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                          >
                            <span className="material-symbols-outlined text-[16px]">qr_code_2</span> Ver QR Nequi
                          </button>
                          <button
                            onClick={() => setShowPSEModal(true)}
                            className="py-2 px-3 rounded-lg bg-primary text-on-primary font-label-md text-label-md flex items-center justify-center gap-1.5 font-bold shadow-[0_0_12px_rgba(255,255,255,0.3)] hover:bg-[#e2e2e2] transition-colors cursor-pointer"
                          >
                            <span className="material-symbols-outlined text-[16px]">link</span> Pagar PSE
                          </button>
                        </div>
                      </div>
                    ) : msg.type === 'payment_verified' ? (
                      <div className="p-3.5 rounded-2xl rounded-tr-sm bg-surface-container-highest text-primary shadow-[inset_0_1px_0_0_rgba(255,255,255,0.25),0_6px_24px_rgba(0,0,0,0.5)]">
                        <div className="flex items-center gap-1.5 text-primary mb-1">
                          <span className="material-symbols-outlined text-[18px]">check_circle</span>
                          <span className="font-label-md text-label-md font-bold uppercase tracking-wider">
                            ¡Pago Verificado con Éxito!
                          </span>
                        </div>
                        <p className="font-body-md text-body-md text-on-surface">
                          Tu orden <span className="text-primary font-bold">{msg.data?.orderId || activeConv.order.orderId}</span>{' '}
                          ha sido enviada a cocina y registrada en tu Google Sheets en tiempo récord ({msg.data?.latency || '0.7s'}).
                        </p>
                        <div className="mt-2.5 flex items-center gap-2 bg-surface-container-low px-2.5 py-1.5 rounded-lg text-secondary font-label-sm text-label-sm">
                          <span className="material-symbols-outlined text-[16px] text-primary">moped</span>
                          <span>
                            Tiempo estimado de entrega:{' '}
                            <strong className="text-primary">{msg.data?.etaMinutes || '35 minutos'}</strong>
                          </span>
                        </div>
                      </div>
                    ) : (
                      <div className="p-3.5 rounded-2xl rounded-tr-sm bg-surface-container-highest text-primary shadow-[inset_0_1px_0_0_rgba(255,255,255,0.15),0_4px_20px_rgba(0,0,0,0.4)]">
                        <p className="font-body-md text-body-md text-on-surface">{msg.text}</p>
                      </div>
                    )}
                    <span className="font-label-sm text-label-sm text-outline pr-1">
                      {msg.time} • {msg.sender === 'human' ? 'Asesor Humano' : 'Flow Bot Webhook'}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Quick Action Composer Bar */}
          <footer className="flex-none p-space-md bg-surface-container-lowest/95 backdrop-blur-xl shadow-[0_-1px_0_0_rgba(255,255,255,0.06)] flex flex-col gap-2">
            {/* Quick Action Shortcut Buttons */}
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-0.5">
              <button
                onClick={() => setShowTemplatesModal(true)}
                className="px-2.5 py-1 rounded-lg bg-surface-container-low hover:bg-surface-container-high text-secondary hover:text-primary font-label-sm text-label-sm flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <span className="material-symbols-outlined text-[14px]">bolt</span> Plantillas Rápidas
              </button>
              <button
                onClick={handleSendPaymentLink}
                className="px-2.5 py-1 rounded-lg bg-surface-container-low hover:bg-surface-container-high text-secondary hover:text-primary font-label-sm text-label-sm flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <span className="material-symbols-outlined text-[14px]">attach_money</span> Link Cobro Nequi / PSE
              </button>
              <button
                onClick={handleSendMenu}
                className="px-2.5 py-1 rounded-lg bg-surface-container-low hover:bg-surface-container-high text-secondary hover:text-primary font-label-sm text-label-sm flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <span className="material-symbols-outlined text-[14px]">menu_book</span> Enviar Menú Digital
              </button>
              <button
                onClick={handleSendLocationRequest}
                className="px-2.5 py-1 rounded-lg bg-surface-container-low hover:bg-surface-container-high text-secondary hover:text-primary font-label-sm text-label-sm flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <span className="material-symbols-outlined text-[14px]">pin_drop</span> Solicitar Ubicación
              </button>
            </div>

            {/* Chat Input & Actions */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowReceiptZoom(true)}
                className="p-2.5 rounded-xl bg-surface-container-low text-secondary hover:text-primary hover:bg-surface-container-high transition-colors"
                title="Adjuntar Archivo o Comprobante"
              >
                <span className="material-symbols-outlined text-[20px]">attach_file</span>
              </button>
              <div className="flex-1 relative">
                <input
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleSendManual();
                  }}
                  className="w-full px-4 py-2.5 bg-surface-container-low rounded-xl text-on-surface placeholder:text-outline font-body-sm text-body-sm focus:outline-none focus:bg-surface-container-high transition-colors"
                  placeholder="Escribe una respuesta manual o comanda / para comandos inteligentes..."
                  type="text"
                />
              </div>
              <button
                onClick={handleSendManual}
                className="px-4 py-2.5 rounded-xl bg-primary text-on-primary font-label-md text-label-md font-bold flex items-center gap-1.5 shadow-[0_0_16px_rgba(255,255,255,0.25)] hover:bg-[#e2e2e2] transition-all flex-none cursor-pointer"
              >
                <span>Responder</span>
                <span className="material-symbols-outlined text-[18px]">send</span>
              </button>
            </div>
          </footer>
        </section>

        {/* PANEL 3: CONTEXTO DEL NEGOCIO & AUTOMATIZACIÓN EN VIVO (3 Cols) */}
        <aside className="col-span-3 flex flex-col h-full bg-surface-container-lowest/80 backdrop-blur-xl shadow-[inset_1px_0_0_0_rgba(255,255,255,0.06)] min-w-0 overflow-y-auto">
          {/* Panel Header */}
          <div className="p-space-md shadow-[0_1px_0_0_rgba(255,255,255,0.04)] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-[20px]">analytics</span>
              <span className="font-headline-sm text-headline-sm text-primary tracking-tight">Telemetría de Orden</span>
            </div>
            <span className="px-2 py-0.5 rounded-full bg-surface-container text-on-surface-variant font-label-sm text-label-sm">
              {activeConv.order.orderId}
            </span>
          </div>

          <div className="p-space-md flex flex-col gap-space-md">
            {/* Order Summary Card */}
            <div className="rounded-2xl bg-surface-container-low p-4 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1)] flex flex-col gap-3">
              <div className="flex items-center justify-between pb-2 shadow-[0_1px_0_0_rgba(255,255,255,0.06)]">
                <span className="font-label-md text-label-md text-primary font-bold uppercase tracking-wider">
                  Desglose del Pedido
                </span>
                <span className="font-label-sm text-label-sm text-primary font-semibold">
                  {activeConv.order.items.length} Items
                </span>
              </div>
              <div className="space-y-2.5">
                {activeConv.order.items.map((item, idx) => (
                  <div key={idx} className="flex items-start justify-between">
                    <div className="flex flex-col">
                      <span className="font-label-md text-label-md text-on-surface font-semibold">{item.name}</span>
                      <span className="font-body-sm text-body-sm text-outline">{item.description}</span>
                    </div>
                    <span className="font-label-md text-label-md text-primary font-medium">
                      ${item.price.toLocaleString('es-CO')}
                    </span>
                  </div>
                ))}
                <div className="flex items-start justify-between pt-1 shadow-[0_1px_0_0_rgba(255,255,255,0.04)]">
                  <div className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-[14px] text-outline">moped</span>
                    <span className="font-body-sm text-body-sm text-outline">{activeConv.order.deliveryZone}</span>
                  </div>
                  <span className="font-label-md text-label-md text-primary font-medium">
                    ${activeConv.order.deliveryFee.toLocaleString('es-CO')}
                  </span>
                </div>
              </div>
              <div className="pt-2 shadow-[0_1px_0_0_rgba(255,255,255,0.1)] flex items-center justify-between">
                <span className="font-label-md text-label-md text-outline uppercase font-bold">Total Liquidado</span>
                <span className="font-headline-md text-headline-md text-primary font-bold">
                  ${activeConv.order.total.toLocaleString('es-CO')} COP
                </span>
              </div>
            </div>

            {/* Real-Time Audit & Webhook Card */}
            <div className="rounded-2xl bg-surface-container-low p-4 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1)] flex flex-col gap-3">
              <div className="flex items-center justify-between pb-2 shadow-[0_1px_0_0_rgba(255,255,255,0.06)]">
                <span className="font-label-md text-label-md text-primary font-bold uppercase tracking-wider">
                  Auditoría & Webhooks
                </span>
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
              </div>
              <div className="space-y-3">
                {/* Pasarela */}
                <div className="flex items-center justify-between">
                  <span className="font-body-sm text-body-sm text-outline">Pasarela Integrada</span>
                  <span className="font-label-md text-label-md text-primary font-semibold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary"></span> {activeConv.order.gateway}
                  </span>
                </div>
                {/* Referencia & Latencia */}
                <div className="flex items-center justify-between">
                  <span className="font-body-sm text-body-sm text-outline">Comprobante</span>
                  <div className="flex flex-col text-right">
                    <span className="font-label-sm text-label-sm text-primary font-mono font-bold">
                      {activeConv.order.receiptRef}
                    </span>
                    <span className="font-label-sm text-label-sm text-outline">
                      Cotejado en {activeConv.order.reconcileLatency}
                    </span>
                  </div>
                </div>
                {/* Sheets Sync */}
                <div className="flex items-center justify-between">
                  <span className="font-body-sm text-body-sm text-outline">Google Sheets Sync</span>
                  <div className="flex flex-col text-right">
                    <span className="font-label-sm text-label-sm text-primary font-semibold">
                      {activeConv.order.sheetsRow}
                    </span>
                    <span className="font-label-sm text-label-sm text-outline">Hoja {activeConv.order.sheetsTab}</span>
                  </div>
                </div>
                {/* Kitchen Dispatch Status */}
                <div
                  onClick={nextKitchenStatus}
                  className="p-2.5 rounded-xl bg-surface-container flex items-center justify-between cursor-pointer hover:bg-surface-container-high transition-colors"
                  title="Haz clic para avanzar estado en KDS"
                >
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary text-[18px]">restaurant</span>
                    <span className="font-label-sm text-label-sm text-on-surface">Comanda en Cocina</span>
                  </div>
                  <span className="font-label-sm text-label-sm text-primary font-bold uppercase flex items-center gap-1">
                    {activeConv.order.kitchenStatus === 'en_preparacion'
                      ? 'En Preparación'
                      : activeConv.order.kitchenStatus === 'comanda_lista'
                      ? 'Comanda Lista'
                      : activeConv.order.kitchenStatus === 'en_camino'
                      ? 'En Ruta'
                      : 'Entregado'}
                    <span className="material-symbols-outlined text-[14px] text-outline">autorenew</span>
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Actions Panel */}
            <div className="flex flex-col gap-2 pt-1">
              <button
                onClick={nextKitchenStatus}
                className="w-full py-2.5 px-3 rounded-xl bg-surface-container-high hover:bg-surface-bright text-primary font-label-md text-label-md flex items-center justify-center gap-2 transition-all shadow-[0_2px_8px_rgba(0,0,0,0.3)] cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px]">electric_moped</span>
                <span>Notificar a Motorizado / Cocina</span>
              </button>
              <button
                onClick={() => setShowDIANModal(true)}
                className="w-full py-2.5 px-3 rounded-xl bg-surface-container-low hover:bg-surface-container-high text-secondary hover:text-primary font-label-md text-label-md flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px]">receipt</span>
                <span>Reenviar Factura Electrónica (DIAN)</span>
              </button>
              <button
                onClick={() => setShowSheetsModal(true)}
                className="w-full py-2.5 px-3 rounded-xl bg-surface-container-low hover:bg-surface-container-high text-secondary hover:text-primary font-label-md text-label-md flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px]">table_chart</span>
                <span>Ver Registro en Google Sheets</span>
              </button>
            </div>

            {/* Customer Life-Time Metric Card */}
            <div className="p-3 rounded-xl bg-surface-container-low/60 flex items-center justify-between">
              <div className="flex flex-col">
                <span className="font-label-sm text-label-sm text-outline uppercase">LTV del Comensal</span>
                <span className="font-headline-sm text-headline-sm text-primary font-bold">
                  ${activeConv.order.ltv.toLocaleString('es-CO')} COP
                </span>
              </div>
              <div className="h-8 w-8 rounded-full bg-surface-container-high flex items-center justify-center text-primary">
                <span className="material-symbols-outlined text-[18px]">loyalty</span>
              </div>
            </div>
          </div>
        </aside>
      </div>

      {/* Render All Connected Modals */}
      <NequiQRModal
        isOpen={showNequiModal}
        onClose={() => setShowNequiModal(false)}
        onSimulatePayment={handleSimulatePaymentDone}
        amount={`$${activeConv.order.total.toLocaleString('es-CO')} COP`}
        orderId={activeConv.order.orderId}
      />

      <PSEModal
        isOpen={showPSEModal}
        onClose={() => setShowPSEModal(false)}
        onAuthorize={handleSimulatePaymentDone}
        amount={`$${activeConv.order.total.toLocaleString('es-CO')} COP`}
        orderId={activeConv.order.orderId}
      />

      <ReceiptZoomModal
        isOpen={showReceiptZoom}
        onClose={() => setShowReceiptZoom(false)}
        refCode={activeConv.order.receiptRef}
        amount={`$${activeConv.order.total.toLocaleString('es-CO')} COP`}
        orderId={activeConv.order.orderId}
      />

      <GoogleSheetsModal
        isOpen={showSheetsModal}
        onClose={() => setShowSheetsModal(false)}
        activeRow={parseInt(activeConv.order.sheetsRow.replace(/\D/g, '') || '1428', 10)}
      />

      <DIANInvoiceModal
        isOpen={showDIANModal}
        onClose={() => setShowDIANModal(false)}
        order={activeConv.order}
        clientName={activeConv.clientName}
      />

      <QuickTemplatesModal
        isOpen={showTemplatesModal}
        onClose={() => setShowTemplatesModal(false)}
        onSelectTemplate={(text) => setInputMessage(text)}
      />
    </div>
  );
};

import React, { useState } from 'react';
import { NavView, Conversation, ChatMessage } from './types';
import { INITIAL_CONVERSATIONS } from './mockData';
import { BandejaDeChatsView } from './views/BandejaDeChatsView';
import { MetricasKPIsView } from './views/MetricasKPIsView';
import { ConciliacionPagosView } from './views/ConciliacionPagosView';
import { AutomatizacionesBotsView } from './views/AutomatizacionesBotsView';
import { IntegracionesView } from './views/IntegracionesView';
import { ConfiguracionView } from './views/ConfiguracionView';
import { GoogleSheetsModal } from './components/GoogleSheetsModal';

export default function App() {
  const [currentView, setCurrentView] = useState<NavView>('bandeja-de-chats');
  const [conversations, setConversations] = useState<Conversation[]>(INITIAL_CONVERSATIONS);
  const [selectedConvId, setSelectedConvId] = useState<string>('camilo-restrepo');
  const [activeBranch, setActiveBranch] = useState('Hamburguesería La Candelaria - Sede Chapinero');
  const [showBranchMenu, setShowBranchMenu] = useState(false);
  const [showGlobalSheets, setShowGlobalSheets] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [notificationToast, setNotificationToast] = useState<string | null>(null);

  const branches = [
    'Hamburguesería La Candelaria - Sede Chapinero',
    'Hamburguesería La Candelaria - Sede Laureles',
    'Hamburguesería La Candelaria - Sede El Poblado',
    'Hamburguesería La Candelaria - Sede Usaquén',
  ];

  const triggerToast = (msg: string) => {
    setNotificationToast(msg);
    setTimeout(() => setNotificationToast(null), 3000);
  };

  const handleToggleBot = (convId: string, active: boolean) => {
    setConversations((prev) =>
      prev.map((c) => (c.id === convId ? { ...c, botActive: active } : c))
    );
    triggerToast(active ? 'Bot Nequi reactivado para este chat.' : 'Bot pausado. Modo Asesor Humano activado.');
  };

  const handleSendMessage = (convId: string, message: ChatMessage) => {
    setConversations((prev) =>
      prev.map((c) => {
        if (c.id !== convId) return c;
        return {
          ...c,
          messages: [...c.messages, message],
          lastMessage: message.text || (message.type === 'payment_card' ? 'Link de cobro enviado' : 'Comprobante verificado'),
          timeAgo: 'Ahora',
          status: message.type === 'payment_verified' ? 'pago_validado' : c.status,
        };
      })
    );
  };

  const handleUpdateKitchenStatus = (
    convId: string,
    status: 'en_preparacion' | 'comanda_lista' | 'en_camino' | 'entregado'
  ) => {
    setConversations((prev) =>
      prev.map((c) => {
        if (c.id !== convId) return c;
        return {
          ...c,
          order: {
            ...c.order,
            kitchenStatus: status,
          },
        };
      })
    );
  };

  return (
    <div className="bg-background font-body-md text-body-md text-on-surface antialiased min-h-screen">
      {/* Toast */}
      {notificationToast && (
        <div className="fixed top-20 right-8 z-50 px-4 py-2.5 rounded-xl bg-surface-container-highest border border-primary/40 text-primary shadow-[0_10px_30px_rgba(0,0,0,0.8)] font-label-md text-label-md flex items-center gap-2 animate-in fade-in">
          <span className="material-symbols-outlined text-[18px] text-[#4ade80]">notifications_active</span>
          <span>{notificationToast}</span>
        </div>
      )}

      {/* FIXED SIDEBAR */}
      <aside className="fixed left-0 top-0 h-full w-72 bg-surface-container-lowest/80 backdrop-blur-2xl border-r border-outline-variant/30 z-50 flex flex-col justify-between">
        <div className="flex flex-col">
          {/* Logo Header */}
          <div className="h-16 px-space-lg flex items-center justify-between border-b border-outline-variant/20">
            <div className="flex items-center gap-space-sm cursor-pointer" onClick={() => setCurrentView('bandeja-de-chats')}>
              <div className="w-8 h-8 rounded-lg bg-surface-container-highest border border-outline-variant/50 flex items-center justify-center shadow-[inset_0_1px_0_0_rgba(255,255,255,0.25)]">
                <span className="material-symbols-outlined text-primary text-[18px]">terminal</span>
              </div>
              <span className="font-headline-sm text-headline-sm tracking-tight text-primary">FLOW</span>
            </div>
            <span className="font-label-sm text-label-sm px-space-xs py-0.5 rounded-full bg-surface-container border border-outline-variant text-on-surface-variant uppercase">
              PRO
            </span>
          </div>

          {/* Navigation Links */}
          <div className="px-space-md py-space-md">
            <div className="px-space-sm pb-space-xs font-label-sm text-label-sm uppercase tracking-wider text-outline">
              Consola Central
            </div>
            <nav className="flex flex-col gap-1">
              {/* Métricas & KPIs */}
              <button
                onClick={() => setCurrentView('metricas-kpis')}
                className={`flex items-center gap-space-sm px-space-md py-2.5 rounded-xl transition-all duration-150 text-left w-full cursor-pointer ${
                  currentView === 'metricas-kpis'
                    ? 'bg-primary text-on-primary font-bold shadow-[0_0_20px_rgba(255,255,255,0.25)]'
                    : 'text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface'
                }`}
              >
                <span className="material-symbols-outlined text-[20px]">query_stats</span>
                <span className="font-label-lg text-label-lg">Métricas & KPIs</span>
              </button>

              {/* Bandeja de Chats */}
              <button
                onClick={() => setCurrentView('bandeja-de-chats')}
                className={`flex items-center gap-space-sm px-space-md py-2.5 rounded-xl transition-all duration-150 text-left w-full cursor-pointer ${
                  currentView === 'bandeja-de-chats'
                    ? 'bg-primary text-on-primary font-bold shadow-[0_0_20px_rgba(255,255,255,0.25)]'
                    : 'text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface'
                }`}
              >
                <span className="material-symbols-outlined text-[20px]">forum</span>
                <span className="font-label-lg text-label-lg">Bandeja de Chats (WhatsApp / IG)</span>
              </button>

              {/* Conciliación de Pagos */}
              <button
                onClick={() => setCurrentView('conciliacion-de-pagos')}
                className={`flex items-center gap-space-sm px-space-md py-2.5 rounded-xl transition-all duration-150 text-left w-full cursor-pointer ${
                  currentView === 'conciliacion-de-pagos'
                    ? 'bg-primary text-on-primary font-bold shadow-[0_0_20px_rgba(255,255,255,0.25)]'
                    : 'text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface'
                }`}
              >
                <span className="material-symbols-outlined text-[20px]">account_balance_wallet</span>
                <span className="font-label-lg text-label-lg">Conciliación de Pagos</span>
              </button>

              {/* Automatizaciones & Bots */}
              <button
                onClick={() => setCurrentView('automatizaciones-bots')}
                className={`flex items-center gap-space-sm px-space-md py-2.5 rounded-xl transition-all duration-150 text-left w-full cursor-pointer ${
                  currentView === 'automatizaciones-bots'
                    ? 'bg-primary text-on-primary font-bold shadow-[0_0_20px_rgba(255,255,255,0.25)]'
                    : 'text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface'
                }`}
              >
                <span className="material-symbols-outlined text-[20px]">smart_toy</span>
                <span className="font-label-lg text-label-lg">Automatizaciones & Bots</span>
              </button>

              {/* Integraciones */}
              <button
                onClick={() => setCurrentView('integraciones')}
                className={`flex items-center gap-space-sm px-space-md py-2.5 rounded-xl transition-all duration-150 text-left w-full cursor-pointer ${
                  currentView === 'integraciones'
                    ? 'bg-primary text-on-primary font-bold shadow-[0_0_20px_rgba(255,255,255,0.25)]'
                    : 'text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface'
                }`}
              >
                <span className="material-symbols-outlined text-[20px]">hub</span>
                <span className="font-label-lg text-label-lg">Integraciones (Nequi, Sheets)</span>
              </button>

              {/* Configuración */}
              <button
                onClick={() => setCurrentView('configuracion')}
                className={`flex items-center gap-space-sm px-space-md py-2.5 rounded-xl transition-all duration-150 text-left w-full cursor-pointer ${
                  currentView === 'configuracion'
                    ? 'bg-primary text-on-primary font-bold shadow-[0_0_20px_rgba(255,255,255,0.25)]'
                    : 'text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface'
                }`}
              >
                <span className="material-symbols-outlined text-[20px]">settings</span>
                <span className="font-label-lg text-label-lg">Configuración</span>
              </button>
            </nav>
          </div>
        </div>

        {/* Bottom Webhook Live Card */}
        <div className="p-space-md border-t border-outline-variant/20 bg-surface-container-lowest/50">
          <div className="flex items-center justify-between p-space-sm rounded-lg bg-surface-container-low border border-outline-variant/30">
            <div className="flex items-center gap-space-xs">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
              <span className="font-label-sm text-label-sm text-on-surface-variant">Sincronización Webhook</span>
            </div>
            <span className="font-label-sm text-label-sm text-primary font-bold">EN VIVO</span>
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <div className="pl-72">
        {/* TOP HEADER */}
        <header className="fixed top-0 left-72 right-0 h-16 bg-surface-container-lowest/70 backdrop-blur-2xl border-b border-outline-variant/30 z-40 flex items-center justify-between px-space-lg">
          <div className="flex items-center gap-space-lg">
            {/* Meta API / Nequi Gateway Status Badge */}
            <div className="flex items-center gap-space-xs px-space-sm py-1 rounded-full bg-surface-container-low border border-outline-variant/40">
              <span className="w-2 h-2 rounded-full bg-primary"></span>
              <span className="font-label-sm text-label-sm text-on-surface-variant">Meta API / Nequi Gateway</span>
              <span className="font-label-sm text-label-sm text-primary font-bold">99.98%</span>
            </div>

            {/* Sede Selector Dropdown */}
            <div className="relative">
              <div
                onClick={() => setShowBranchMenu(!showBranchMenu)}
                className="hidden lg:flex items-center gap-space-xs px-space-md py-1.5 rounded-xl bg-surface-container-low border border-outline-variant/30 hover:border-outline-variant/60 cursor-pointer transition-colors"
              >
                <span className="material-symbols-outlined text-[18px] text-outline">storefront</span>
                <span className="font-label-md text-label-md text-on-surface">{activeBranch}</span>
                <span className="material-symbols-outlined text-[16px] text-outline">expand_more</span>
              </div>

              {showBranchMenu && (
                <div className="absolute top-12 left-0 w-80 bg-surface-container-lowest border border-outline-variant/40 rounded-xl p-1.5 shadow-[0_12px_32px_rgba(0,0,0,0.8)] z-50 animate-in fade-in">
                  <div className="px-3 py-1.5 font-label-sm text-label-sm text-outline uppercase">
                    Seleccionar Sede Operativa
                  </div>
                  {branches.map((b, i) => (
                    <div
                      key={i}
                      onClick={() => {
                        setActiveBranch(b);
                        setShowBranchMenu(false);
                        triggerToast(`Conectado a ${b}`);
                      }}
                      className={`px-3 py-2 rounded-lg font-label-md text-label-md cursor-pointer transition-colors flex items-center justify-between ${
                        activeBranch === b
                          ? 'bg-surface-container-high text-primary font-bold'
                          : 'text-on-surface hover:bg-surface-container-low'
                      }`}
                    >
                      <span className="truncate">{b}</span>
                      {activeBranch === b && (
                        <span className="material-symbols-outlined text-[16px] text-primary">check</span>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right Header: Notification & Admin profile */}
          <div className="flex items-center gap-space-md">
            <div className="relative">
              <button
                onClick={() => setNotificationsOpen(!notificationsOpen)}
                className="relative p-2 rounded-xl bg-surface-container-low border border-outline-variant/30 hover:bg-surface-container-high transition-colors cursor-pointer"
                type="button"
                title="Notificaciones de Comandas y Pagos"
              >
                <span className="material-symbols-outlined text-on-surface text-[20px]">notifications</span>
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-primary ring-2 ring-surface-container-lowest"></span>
              </button>

              {notificationsOpen && (
                <div className="absolute right-0 top-12 w-80 bg-surface-container-lowest border border-outline-variant/40 rounded-xl p-3 shadow-[0_12px_32px_rgba(0,0,0,0.8)] z-50 animate-in fade-in flex flex-col gap-2">
                  <div className="flex items-center justify-between pb-2 border-b border-outline-variant/20">
                    <span className="font-label-md text-label-md font-bold text-primary">Notificaciones Recientes</span>
                    <span className="font-label-sm text-label-sm text-outline">3 nuevas</span>
                  </div>
                  <div className="space-y-2 font-body-sm text-body-sm">
                    <div className="p-2 rounded-lg bg-surface-container-low">
                      <span className="font-bold text-primary block">Pago Validado #6592</span>
                      <span className="text-secondary text-xs">Camilo Restrepo envió comprobante Nequi $56.000</span>
                    </div>
                    <div className="p-2 rounded-lg bg-surface-container-low">
                      <span className="font-bold text-primary block">KDS Cocina Chapinero</span>
                      <span className="text-secondary text-xs">Comanda #6590 marcada como lista para entrega</span>
                    </div>
                    <div className="p-2 rounded-lg bg-surface-container-low">
                      <span className="font-bold text-primary block">Google Sheets Sync</span>
                      <span className="text-secondary text-xs">Fila #1.428 agregada exitosamente</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="flex items-center gap-space-sm pl-space-xs border-l border-outline-variant/30">
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                <span className="material-symbols-outlined text-on-primary text-[18px]">person</span>
              </div>
              <div className="hidden sm:flex flex-col text-left">
                <span className="font-label-md text-label-md text-primary leading-none">Admin Sede</span>
                <span className="font-label-sm text-label-sm text-outline leading-tight">Chapinero Master</span>
              </div>
            </div>
          </div>
        </header>

        {/* MAIN VIEW CONTENT */}
        <main className="relative w-full pt-16 bg-background min-h-screen">
          {currentView === 'bandeja-de-chats' && (
            <BandejaDeChatsView
              conversations={conversations}
              selectedId={selectedConvId}
              onSelectConversation={(id) => setSelectedConvId(id)}
              onToggleBot={handleToggleBot}
              onSendMessage={handleSendMessage}
              onUpdateKitchenStatus={handleUpdateKitchenStatus}
            />
          )}

          {currentView === 'metricas-kpis' && <MetricasKPIsView />}

          {currentView === 'conciliacion-de-pagos' && (
            <ConciliacionPagosView onOpenGoogleSheets={() => setShowGlobalSheets(true)} />
          )}

          {currentView === 'automatizaciones-bots' && <AutomatizacionesBotsView />}

          {currentView === 'integraciones' && <IntegracionesView />}

          {currentView === 'configuracion' && <ConfiguracionView />}
        </main>
      </div>

      {/* Global Google Sheets Modal */}
      <GoogleSheetsModal
        isOpen={showGlobalSheets}
        onClose={() => setShowGlobalSheets(false)}
        activeRow={1428}
      />
    </div>
  );
}

import React, { useState } from 'react';

export const IntegracionesView: React.FC = () => {
  const [selectedWebhookType, setSelectedWebhookType] = useState('nequi_receipt');
  const [webhookLogs, setWebhookLogs] = useState<
    { id: string; event: string; status: number; latency: string; timestamp: string }[]
  >([
    {
      id: 'wh-810',
      event: 'whatsapp_incoming_receipt_media',
      status: 200,
      latency: '718ms',
      timestamp: '14:03:08',
    },
    {
      id: 'wh-809',
      event: 'nequi_b2b_reverse_lookup',
      status: 200,
      latency: '240ms',
      timestamp: '14:03:09',
    },
    {
      id: 'wh-808',
      event: 'google_sheets_append_row',
      status: 200,
      latency: '310ms',
      timestamp: '14:03:10',
    },
    {
      id: 'wh-807',
      event: 'kds_kitchen_ticket_print',
      status: 200,
      latency: '115ms',
      timestamp: '14:03:11',
    },
  ]);
  const [simulating, setSimulating] = useState(false);

  const simulateIncomingWebhook = () => {
    setSimulating(true);
    setTimeout(() => {
      setSimulating(false);
      const newLog = {
        id: `wh-${Date.now().toString().slice(-4)}`,
        event:
          selectedWebhookType === 'nequi_receipt'
            ? 'whatsapp_incoming_receipt_media'
            : selectedWebhookType === 'menu_request'
            ? 'instagram_direct_menu_query'
            : 'nequi_payment_instant_ping',
        status: 200,
        latency: `${Math.floor(Math.random() * 200 + 400)}ms`,
        timestamp: new Date().toLocaleTimeString('es-CO', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false }),
      };
      setWebhookLogs((prev) => [newLog, ...prev]);
    }, 800);
  };

  return (
    <div className="flex flex-col w-full h-[calc(100vh-4rem)] overflow-y-auto p-space-lg bg-surface">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-6 gap-4 border-b border-outline-variant/30">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="font-headline-lg text-headline-lg text-primary tracking-tight">Integraciones & Webhooks</h2>
            <span className="px-2.5 py-0.5 rounded-full bg-surface-container-high border border-outline-variant/40 text-[#4ade80] font-label-sm text-label-sm font-semibold flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#4ade80]"></span>
              5 Canales Conectados
            </span>
          </div>
          <p className="font-body-sm text-body-sm text-secondary mt-1">
            Gestión de credenciales API, endpoints de webhooks y sincronizaciones en tiempo real con Meta, Nequi y Google.
          </p>
        </div>
      </div>

      {/* Integration Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
        {/* Meta WhatsApp */}
        <div className="p-5 rounded-2xl bg-surface-container-low border border-outline-variant/30 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08)] flex flex-col justify-between gap-4">
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-surface-container-highest border border-outline-variant/40 flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined text-[20px]">chat</span>
                </div>
                <div>
                  <h4 className="font-headline-sm text-[16px] text-primary font-bold">Meta WhatsApp Cloud API</h4>
                  <span className="font-label-sm text-label-sm text-outline">Graph v20.0 • Verified Business</span>
                </div>
              </div>
              <span className="w-2 h-2 rounded-full bg-[#4ade80]"></span>
            </div>
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              Escuchando mensajes entrantes, estados de entrega y recepción de archivos adjuntos (comprobantes jpg/png).
            </p>
          </div>

          <div className="pt-3 border-t border-outline-variant/20 space-y-1.5 font-label-sm text-label-sm">
            <div className="flex justify-between text-outline">
              <span>Phone Number ID:</span>
              <span className="font-mono text-primary">10928301928301</span>
            </div>
            <div className="flex justify-between text-outline">
              <span>Uptime SLA:</span>
              <span className="text-[#4ade80] font-bold">99.98%</span>
            </div>
          </div>
        </div>

        {/* Nequi Colombia */}
        <div className="p-5 rounded-2xl bg-surface-container-low border border-outline-variant/30 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08)] flex flex-col justify-between gap-4">
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-[#20002c] border border-[#a21caf]/40 flex items-center justify-center text-[#e879f9]">
                  <span className="material-symbols-outlined text-[20px]">account_balance_wallet</span>
                </div>
                <div>
                  <h4 className="font-headline-sm text-[16px] text-primary font-bold">Nequi Colombia (Conecta API)</h4>
                  <span className="font-label-sm text-label-sm text-outline">B2B Gateway • mTLS Validado</span>
                </div>
              </div>
              <span className="w-2 h-2 rounded-full bg-[#4ade80]"></span>
            </div>
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              Recepción de notificaciones instantáneas de pago y verificación inversa de números de comprobante #NEQ.
            </p>
          </div>

          <div className="pt-3 border-t border-outline-variant/20 space-y-1.5 font-label-sm text-label-sm">
            <div className="flex justify-between text-outline">
              <span>Llave Comercial:</span>
              <span className="font-mono text-primary font-bold">#300-881-2290</span>
            </div>
            <div className="flex justify-between text-outline">
              <span>Latencia Promedio:</span>
              <span className="font-mono text-primary">0.72s</span>
            </div>
          </div>
        </div>

        {/* Google Sheets */}
        <div className="p-5 rounded-2xl bg-surface-container-low border border-outline-variant/30 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08)] flex flex-col justify-between gap-4">
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-[#0f5132]/30 border border-[#22c55e]/40 flex items-center justify-center text-[#4ade80]">
                  <span className="material-symbols-outlined text-[20px]">table_chart</span>
                </div>
                <div>
                  <h4 className="font-headline-sm text-[16px] text-primary font-bold">Google Sheets Sync API</h4>
                  <span className="font-label-sm text-label-sm text-outline">Spreadsheet v4 • En Vivo</span>
                </div>
              </div>
              <span className="w-2 h-2 rounded-full bg-[#4ade80]"></span>
            </div>
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              Inserta en tiempo real cada comanda cerrada en la hoja 'Octubre_Ventas' con cliente, desglose y LTV.
            </p>
          </div>

          <div className="pt-3 border-t border-outline-variant/20 space-y-1.5 font-label-sm text-label-sm">
            <div className="flex justify-between text-outline">
              <span>Hoja Vinculada:</span>
              <span className="font-mono text-primary">Octubre_Ventas</span>
            </div>
            <div className="flex justify-between text-outline">
              <span>Última Fila Registrada:</span>
              <span className="font-mono text-primary font-bold">#1.428</span>
            </div>
          </div>
        </div>

        {/* DIAN FacturaTech */}
        <div className="p-5 rounded-2xl bg-surface-container-low border border-outline-variant/30 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08)] flex flex-col justify-between gap-4">
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-surface-container-highest border border-outline-variant/40 flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined text-[20px]">receipt</span>
                </div>
                <div>
                  <h4 className="font-headline-sm text-[16px] text-primary font-bold">DIAN Facturación Electrónica</h4>
                  <span className="font-label-sm text-label-sm text-outline">FacturaTech Webhook V2</span>
                </div>
              </div>
              <span className="w-2 h-2 rounded-full bg-[#4ade80]"></span>
            </div>
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              Genera automáticamente el archivo XML y CUFE para cada pedido confirmado, enviando copia digital por email.
            </p>
          </div>

          <div className="pt-3 border-t border-outline-variant/20 space-y-1.5 font-label-sm text-label-sm">
            <div className="flex justify-between text-outline">
              <span>Prefijo Autorizado:</span>
              <span className="font-mono text-primary">FE-6592</span>
            </div>
            <div className="flex justify-between text-outline">
              <span>Estado DIAN:</span>
              <span className="text-[#4ade80] font-bold">Ambiente Producción</span>
            </div>
          </div>
        </div>

        {/* KDS Kitchen Printer */}
        <div className="p-5 rounded-2xl bg-surface-container-low border border-outline-variant/30 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08)] flex flex-col justify-between gap-4">
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-surface-container-highest border border-outline-variant/40 flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined text-[20px]">print</span>
                </div>
                <div>
                  <h4 className="font-headline-sm text-[16px] text-primary font-bold">KDS & Impresora Térmica</h4>
                  <span className="font-label-sm text-label-sm text-outline">ESC/POS Socket 9100 • LAN</span>
                </div>
              </div>
              <span className="w-2 h-2 rounded-full bg-[#4ade80]"></span>
            </div>
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              Impresión automática de comandas en cocina y notificación al despachador con los tiempos de cocción.
            </p>
          </div>

          <div className="pt-3 border-t border-outline-variant/20 space-y-1.5 font-label-sm text-label-sm">
            <div className="flex justify-between text-outline">
              <span>IP Cocina:</span>
              <span className="font-mono text-primary">192.168.1.150:9100</span>
            </div>
            <div className="flex justify-between text-outline">
              <span>Tiempo de Impresión:</span>
              <span className="font-mono text-primary">&lt; 150ms</span>
            </div>
          </div>
        </div>
      </div>

      {/* Webhook Sandbox Tester & Live Event Log */}
      <div className="mt-8 p-5 rounded-2xl bg-surface-container-low border border-outline-variant/30 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1)]">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-outline-variant/20">
          <div>
            <h3 className="font-headline-sm text-headline-sm text-primary">Consola de Webhooks en Vivo</h3>
            <p className="font-label-sm text-label-sm text-outline">
              Simulador interactivo para testear eventos entrantes de Meta Graph y Nequi Gateway
            </p>
          </div>

          <div className="flex items-center gap-2">
            <select
              value={selectedWebhookType}
              onChange={(e) => setSelectedWebhookType(e.target.value)}
              className="px-3 py-2 rounded-xl bg-surface-container border border-outline-variant/40 text-on-surface font-body-sm text-body-sm focus:outline-none"
            >
              <option value="nequi_receipt">Comprobante Nequi Inbound (WhatsApp)</option>
              <option value="menu_request">Consulta de Menú (Instagram Direct)</option>
              <option value="gateway_ping">Notificación Instantánea PSE ACH</option>
            </select>
            <button
              onClick={simulateIncomingWebhook}
              disabled={simulating}
              className="px-4 py-2 rounded-xl bg-primary text-on-primary font-label-md text-label-md font-bold shadow-[0_0_16px_rgba(255,255,255,0.25)] hover:bg-[#e2e2e2] transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px]">send</span>
              <span>{simulating ? 'Enviando...' : 'Simular Webhook'}</span>
            </button>
          </div>
        </div>

        {/* Live log rows */}
        <div className="mt-4 space-y-2">
          {webhookLogs.map((log) => (
            <div
              key={log.id}
              className="p-3 rounded-xl bg-surface-container-lowest border border-outline-variant/20 flex items-center justify-between font-mono text-[13px] hover:border-outline-variant/50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <span className="px-2 py-0.5 rounded bg-surface-container text-[#4ade80] font-bold text-[11px]">
                  HTTP {log.status}
                </span>
                <span className="text-primary font-bold">{log.event}</span>
                <span className="text-outline">{log.id}</span>
              </div>
              <div className="flex items-center gap-4 text-outline text-[12px]">
                <span className="text-primary font-bold">Latencia: {log.latency}</span>
                <span>{log.timestamp}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

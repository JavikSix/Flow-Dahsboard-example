import React, { useState } from 'react';

export const MetricasKPIsView: React.FC = () => {
  const [timeframe, setTimeframe] = useState<'hoy' | 'semana' | 'mes'>('hoy');

  return (
    <div className="flex flex-col w-full h-[calc(100vh-4rem)] overflow-y-auto p-space-lg bg-surface">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-6 gap-4 border-b border-outline-variant/30">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="font-headline-lg text-headline-lg text-primary tracking-tight">Métricas & KPIs Ejecutivos</h2>
            <span className="px-2.5 py-0.5 rounded-full bg-surface-container-high border border-outline-variant/40 text-[#4ade80] font-label-sm text-label-sm font-semibold flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#4ade80] animate-pulse"></span>
              Live Telemetry
            </span>
          </div>
          <p className="font-body-sm text-body-sm text-secondary mt-1">
            Supervisión en tiempo real de transacciones omnicanal, tasa de bots, latencia bancaria y conversión.
          </p>
        </div>

        {/* Timeframe selector */}
        <div className="flex items-center p-1 rounded-xl bg-surface-container-low border border-outline-variant/30">
          <button
            onClick={() => setTimeframe('hoy')}
            className={`px-3 py-1.5 rounded-lg font-label-sm text-label-sm font-semibold transition-all ${
              timeframe === 'hoy'
                ? 'bg-primary text-on-primary shadow-[0_0_12px_rgba(255,255,255,0.2)]'
                : 'text-secondary hover:text-primary'
            }`}
          >
            Hoy (22 Oct)
          </button>
          <button
            onClick={() => setTimeframe('semana')}
            className={`px-3 py-1.5 rounded-lg font-label-sm text-label-sm font-semibold transition-all ${
              timeframe === 'semana'
                ? 'bg-primary text-on-primary shadow-[0_0_12px_rgba(255,255,255,0.2)]'
                : 'text-secondary hover:text-primary'
            }`}
          >
            Últimos 7 Días
          </button>
          <button
            onClick={() => setTimeframe('mes')}
            className={`px-3 py-1.5 rounded-lg font-label-sm text-label-sm font-semibold transition-all ${
              timeframe === 'mes'
                ? 'bg-primary text-on-primary shadow-[0_0_12px_rgba(255,255,255,0.2)]'
                : 'text-secondary hover:text-primary'
            }`}
          >
            Octubre 2026
          </button>
        </div>
      </div>

      {/* 4 Stat Headline Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
        {/* Card 1 */}
        <div className="p-5 rounded-2xl bg-surface-container-low border border-outline-variant/30 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1)] flex flex-col justify-between">
          <div className="flex items-center justify-between text-outline mb-2">
            <span className="font-label-sm text-label-sm uppercase tracking-wider">Facturación Bruta (GMV)</span>
            <span className="material-symbols-outlined text-[20px] text-primary">payments</span>
          </div>
          <div>
            <div className="font-headline-lg text-[32px] text-primary font-bold tracking-tight">$4.850.000</div>
            <div className="flex items-center gap-1.5 mt-1 font-label-sm text-label-sm text-[#4ade80]">
              <span className="material-symbols-outlined text-[14px]">trending_up</span>
              <span>+18.4% vs. ayer mismo corte</span>
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-outline-variant/20 flex justify-between font-label-sm text-label-sm text-outline">
            <span>Ticket Promedio:</span>
            <span className="text-primary font-bold font-mono">$54.200 COP</span>
          </div>
        </div>

        {/* Card 2 */}
        <div className="p-5 rounded-2xl bg-surface-container-low border border-outline-variant/30 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1)] flex flex-col justify-between">
          <div className="flex items-center justify-between text-outline mb-2">
            <span className="font-label-sm text-label-sm uppercase tracking-wider">Resolución Automática Bot</span>
            <span className="material-symbols-outlined text-[20px] text-primary">smart_toy</span>
          </div>
          <div>
            <div className="font-headline-lg text-[32px] text-primary font-bold tracking-tight">89.4%</div>
            <div className="flex items-center gap-1.5 mt-1 font-label-sm text-label-sm text-[#4ade80]">
              <span className="material-symbols-outlined text-[14px]">verified</span>
              <span>106 de 118 pedidos sin humano</span>
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-outline-variant/20 flex justify-between font-label-sm text-label-sm text-outline">
            <span>Escalado a Humano:</span>
            <span className="text-[#ffdad6] font-bold">10.6% (12 pedidos)</span>
          </div>
        </div>

        {/* Card 3 */}
        <div className="p-5 rounded-2xl bg-surface-container-low border border-outline-variant/30 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1)] flex flex-col justify-between">
          <div className="flex items-center justify-between text-outline mb-2">
            <span className="font-label-sm text-label-sm uppercase tracking-wider">Tiempo Cotejo Nequi / PSE</span>
            <span className="material-symbols-outlined text-[20px] text-primary">speed</span>
          </div>
          <div>
            <div className="font-headline-lg text-[32px] text-primary font-bold tracking-tight">0.82s</div>
            <div className="flex items-center gap-1.5 mt-1 font-label-sm text-label-sm text-[#4ade80]">
              <span className="material-symbols-outlined text-[14px]">bolt</span>
              <span>-0.14s vs semana anterior</span>
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-outline-variant/20 flex justify-between font-label-sm text-label-sm text-outline">
            <span>Precisión OCR & API:</span>
            <span className="text-primary font-bold font-mono">99.8%</span>
          </div>
        </div>

        {/* Card 4 */}
        <div className="p-5 rounded-2xl bg-surface-container-low border border-outline-variant/30 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1)] flex flex-col justify-between">
          <div className="flex items-center justify-between text-outline mb-2">
            <span className="font-label-sm text-label-sm uppercase tracking-wider">Disponibilidad Webhook Gateway</span>
            <span className="material-symbols-outlined text-[20px] text-primary">cloud_done</span>
          </div>
          <div>
            <div className="font-headline-lg text-[32px] text-primary font-bold tracking-tight">99.98%</div>
            <div className="flex items-center gap-1.5 mt-1 font-label-sm text-label-sm text-[#4ade80]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#4ade80]"></span>
              <span>0 caídas en 30 días</span>
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-outline-variant/20 flex justify-between font-label-sm text-label-sm text-outline">
            <span>Peticiones Servidas:</span>
            <span className="text-primary font-bold font-mono">14.920 reqs</span>
          </div>
        </div>
      </div>

      {/* Two Column Deep Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-6">
        {/* Hourly Volume Distribution (7 Cols) */}
        <div className="lg:col-span-7 p-5 rounded-2xl bg-surface-container-low border border-outline-variant/30 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1)] flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-headline-sm text-headline-sm text-primary">Flujo de Pedidos por Hora (Hoy)</h3>
              <p className="font-label-sm text-label-sm text-outline">Picos de demanda almuerzo y cena con comanda directa a cocina</p>
            </div>
            <span className="font-label-sm text-label-sm text-primary font-bold">118 Pedidos Hoy</span>
          </div>

          {/* Bar Chart Simulation */}
          <div className="flex-1 flex items-end gap-2.5 h-48 pt-6 pb-2 border-b border-outline-variant/30">
            {[
              { hour: '11am', val: 8, height: '28%' },
              { hour: '12pm', val: 24, height: '78%' },
              { hour: '1pm', val: 32, height: '98%', peak: true },
              { hour: '2pm', val: 19, height: '62%' },
              { hour: '3pm', val: 7, height: '24%' },
              { hour: '4pm', val: 5, height: '18%' },
              { hour: '5pm', val: 9, height: '32%' },
              { hour: '6pm', val: 21, height: '70%' },
              { hour: '7pm', val: 28, height: '90%' },
              { hour: '8pm', val: 18, height: '58%' },
            ].map((col, idx) => (
              <div key={idx} className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end group">
                <span className="font-mono text-[10px] text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                  {col.val}
                </span>
                <div
                  style={{ height: col.height }}
                  className={`w-full rounded-t-lg transition-all ${
                    col.peak
                      ? 'bg-primary shadow-[0_0_16px_rgba(255,255,255,0.4)]'
                      : 'bg-surface-container-highest group-hover:bg-primary-fixed-dim'
                  }`}
                ></div>
                <span className="font-label-sm text-[10px] text-outline">{col.hour}</span>
              </div>
            ))}
          </div>
          <div className="flex items-center justify-between pt-3 text-outline font-label-sm text-label-sm">
            <span>Hora pico registrada: 13:00 - 14:00 (32 combos entregados)</span>
            <span className="text-primary">Capacidad KDS Chapinero: 100%</span>
          </div>
        </div>

        {/* Channel & Gateway Mix (5 Cols) */}
        <div className="lg:col-span-5 p-5 rounded-2xl bg-surface-container-low border border-outline-variant/30 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1)] flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-headline-sm text-headline-sm text-primary">Canal & Pasarela Mix</h3>
                <p className="font-label-sm text-label-sm text-outline">Distribución de ingresos según origen</p>
              </div>
              <span className="material-symbols-outlined text-outline text-[20px]">donut_large</span>
            </div>

            {/* Channels breakdown */}
            <div className="space-y-3">
              <div>
                <div className="flex justify-between font-label-sm text-label-sm mb-1">
                  <span className="text-on-surface flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[14px] text-primary">chat</span>
                    WhatsApp Cloud API (78%)
                  </span>
                  <span className="text-primary font-bold">$3.783.000 COP</span>
                </div>
                <div className="w-full h-2 rounded-full bg-surface-container-lowest overflow-hidden">
                  <div className="w-[78%] h-full bg-primary rounded-full"></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between font-label-sm text-label-sm mb-1">
                  <span className="text-on-surface flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[14px] text-secondary">photo_camera</span>
                    Instagram Graph Direct (22%)
                  </span>
                  <span className="text-primary font-bold">$1.067.000 COP</span>
                </div>
                <div className="w-full h-2 rounded-full bg-surface-container-lowest overflow-hidden">
                  <div className="w-[22%] h-full bg-secondary rounded-full"></div>
                </div>
              </div>
            </div>

            {/* Gateway distribution */}
            <div className="mt-6 pt-4 border-t border-outline-variant/20">
              <span className="font-label-sm text-label-sm text-outline uppercase block mb-2">Medios de Pago Conciliados</span>
              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="p-2.5 rounded-xl bg-surface-container-lowest border border-outline-variant/30">
                  <span className="font-label-sm text-label-sm text-outline block">Nequi API</span>
                  <span className="font-headline-sm text-[16px] text-primary font-bold">68%</span>
                </div>
                <div className="p-2.5 rounded-xl bg-surface-container-lowest border border-outline-variant/30">
                  <span className="font-label-sm text-label-sm text-outline block">PSE ACH</span>
                  <span className="font-headline-sm text-[16px] text-primary font-bold">20%</span>
                </div>
                <div className="p-2.5 rounded-xl bg-surface-container-lowest border border-outline-variant/30">
                  <span className="font-label-sm text-label-sm text-outline block">Bancolombia</span>
                  <span className="font-headline-sm text-[16px] text-primary font-bold">12%</span>
                </div>
              </div>
            </div>
          </div>

          <div className="p-3 mt-4 rounded-xl bg-surface-container-lowest border border-outline-variant/30 flex items-center gap-2">
            <span className="material-symbols-outlined text-[#4ade80] text-[18px]">verified</span>
            <span className="font-label-sm text-label-sm text-secondary">
              99.4% de los pagos liquidados al instante sin reclamos bancarios.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

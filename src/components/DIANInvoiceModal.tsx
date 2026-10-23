import React, { useState } from 'react';
import { OrderTelemetry } from '../types';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  order: OrderTelemetry;
  clientName: string;
}

export const DIANInvoiceModal: React.FC<Props> = ({
  isOpen,
  onClose,
  order,
  clientName,
}) => {
  const [sentEmail, setSentEmail] = useState(false);

  if (!isOpen) return null;

  const handleResend = () => {
    setSentEmail(true);
    setTimeout(() => setSentEmail(false), 2500);
  };

  const impoconsumo = Math.round(order.total * 0.08);
  const subtotalNeto = order.total - impoconsumo;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-lg animate-in fade-in">
      <div className="relative w-full max-w-xl bg-surface-container-lowest border border-outline-variant/40 rounded-2xl p-6 shadow-[0_24px_64px_rgba(0,0,0,0.9),inset_0_1px_0_0_rgba(255,255,255,0.18)] flex flex-col gap-4">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-outline-variant/30">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-surface-container-high border border-outline-variant/40 flex items-center justify-center text-primary font-bold">
              <span className="material-symbols-outlined text-[20px]">receipt</span>
            </div>
            <div>
              <h3 className="font-headline-sm text-headline-sm text-primary">Factura Electrónica de Venta (DIAN)</h3>
              <p className="font-label-sm text-label-sm text-outline">Resolución DIAN No. 1876402919293 de 2026</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-surface-container-low hover:bg-surface-container text-outline hover:text-primary transition-colors"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        {/* Invoice Body Card */}
        <div className="p-4 rounded-xl bg-surface-container-low border border-outline-variant/30 flex flex-col gap-3 font-body-sm text-body-sm">
          <div className="flex items-start justify-between pb-2 border-b border-outline-variant/20">
            <div>
              <div className="font-headline-sm text-[16px] text-primary font-bold">HAMBURGUESERÍA LA CANDELARIA S.A.S.</div>
              <div className="font-label-sm text-label-sm text-outline">NIT: 901.442.819-3 • Régimen Común</div>
              <div className="font-label-sm text-label-sm text-outline">Sede Chapinero: Calle 58 # 7-14, Bogotá D.C.</div>
            </div>
            <div className="text-right">
              <div className="font-label-sm text-label-sm text-outline uppercase">Factura No.</div>
              <div className="font-headline-sm text-headline-sm text-primary font-bold font-mono">FE-6592</div>
              <div className="font-label-sm text-label-sm text-[#4ade80] flex items-center justify-end gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#4ade80]"></span> VALIDADA DIAN
              </div>
            </div>
          </div>

          {/* Adquiriente */}
          <div className="grid grid-cols-2 gap-2 pb-2 border-b border-outline-variant/20">
            <div>
              <span className="font-label-sm text-label-sm text-outline uppercase">Adquiriente / Cliente</span>
              <div className="font-label-md text-label-md text-primary font-semibold">{clientName}</div>
            </div>
            <div className="text-right">
              <span className="font-label-sm text-label-sm text-outline uppercase">Medio de Pago</span>
              <div className="font-label-md text-label-md text-primary">{order.gateway} ({order.receiptRef})</div>
            </div>
          </div>

          {/* Items breakdown */}
          <div className="space-y-1.5 py-1 border-b border-outline-variant/20">
            {order.items.map((item, idx) => (
              <div key={idx} className="flex justify-between items-center">
                <span className="text-on-surface">{item.name}</span>
                <span className="font-mono text-primary font-medium">${item.price.toLocaleString('es-CO')}</span>
              </div>
            ))}
            <div className="flex justify-between items-center text-outline">
              <span>{order.deliveryZone}</span>
              <span className="font-mono text-primary">${order.deliveryFee.toLocaleString('es-CO')}</span>
            </div>
          </div>

          {/* Totals & Impoconsumo */}
          <div className="space-y-1 pt-1">
            <div className="flex justify-between text-outline">
              <span>Subtotal Gravable:</span>
              <span className="font-mono">${subtotalNeto.toLocaleString('es-CO')} COP</span>
            </div>
            <div className="flex justify-between text-outline">
              <span>Impuesto Nacional al Consumo (8%):</span>
              <span className="font-mono">${impoconsumo.toLocaleString('es-CO')} COP</span>
            </div>
            <div className="flex justify-between items-center pt-2 border-t border-outline-variant/30 text-primary">
              <span className="font-label-lg text-label-lg font-bold uppercase">Total Liquidado:</span>
              <span className="font-headline-sm text-headline-sm font-bold text-primary">
                ${order.total.toLocaleString('es-CO')} COP
              </span>
            </div>
          </div>

          {/* CUFE Hash */}
          <div className="p-2 rounded bg-surface-container-lowest border border-outline-variant/20">
            <span className="block font-label-sm text-[9px] text-outline uppercase font-mono">CUFE (Código Único Factura Electrónica)</span>
            <span className="block font-mono text-[10px] text-secondary break-all">
              fe8923a104f9810a0e98f01b0928cd912048aaef910283019fba8491029e018a
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 pt-1">
          <button
            onClick={handleResend}
            className="flex-1 py-2.5 rounded-xl bg-surface-container-high hover:bg-surface-bright text-primary font-label-md text-label-md font-semibold flex items-center justify-center gap-2 transition-all border border-outline-variant/30"
          >
            <span className="material-symbols-outlined text-[18px]">
              {sentEmail ? 'mark_email_read' : 'send'}
            </span>
            <span>{sentEmail ? '¡Enviada por Correo y WhatsApp!' : 'Reenviar Factura al Cliente'}</span>
          </button>
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-surface-container-low hover:bg-surface-container text-on-surface font-label-md text-label-md transition-colors"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};

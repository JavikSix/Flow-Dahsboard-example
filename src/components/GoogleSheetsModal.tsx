import React from 'react';
import { MOCK_SHEETS_ROWS } from '../mockData';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  activeRow?: number;
}

export const GoogleSheetsModal: React.FC<Props> = ({
  isOpen,
  onClose,
  activeRow = 1428,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-lg animate-in fade-in">
      <div className="relative w-full max-w-5xl bg-surface-container-lowest border border-outline-variant/40 rounded-2xl p-6 shadow-[0_24px_64px_rgba(0,0,0,0.9),inset_0_1px_0_0_rgba(255,255,255,0.18)] flex flex-col gap-4 max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-outline-variant/30">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#0f5132]/30 border border-[#22c55e]/40 flex items-center justify-center text-primary font-bold">
              <span className="material-symbols-outlined text-[20px] text-[#4ade80]">table_chart</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-headline-sm text-headline-sm text-primary">Google Sheets Sync Engine</h3>
                <span className="px-2 py-0.5 rounded-full bg-[#14532d]/40 text-[#4ade80] border border-[#22c55e]/30 font-label-sm text-label-sm">
                  Hoja 'Octubre_Ventas' • En Vivo
                </span>
              </div>
              <p className="font-label-sm text-label-sm text-outline">
                Sincronización bidireccional automática activada cada vez que un bot valida una orden
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-surface-container-low hover:bg-surface-container text-outline hover:text-primary transition-colors"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        {/* Table Toolbar */}
        <div className="flex items-center justify-between p-2.5 rounded-xl bg-surface-container-low border border-outline-variant/30 text-on-surface-variant font-label-sm text-label-sm">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 text-primary">
              <span className="w-2 h-2 rounded-full bg-[#4ade80] animate-pulse"></span>
              ID Hoja: 1xK9_Ventas_Candelaria_Prod
            </span>
            <span>•</span>
            <span>Última escritura: Hace 42 segundos</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-outline">Celdas en vivo: 18 columnas activas</span>
          </div>
        </div>

        {/* Spreadsheet Table View */}
        <div className="overflow-x-auto rounded-xl border border-outline-variant/30 bg-surface-container-lowest">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-container-low border-b border-outline-variant/30 text-outline font-label-sm text-label-sm uppercase tracking-wider">
                <th className="py-2.5 px-3">Fila</th>
                <th className="py-2.5 px-3">Timestamp</th>
                <th className="py-2.5 px-3">Orden</th>
                <th className="py-2.5 px-3">Cliente</th>
                <th className="py-2.5 px-3">Canal</th>
                <th className="py-2.5 px-3">Items Desglosados</th>
                <th className="py-2.5 px-3">Zona</th>
                <th className="py-2.5 px-3">Total Liquidado</th>
                <th className="py-2.5 px-3">Método / Ref</th>
                <th className="py-2.5 px-3">Estado KDS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/20 font-body-sm text-body-sm">
              {MOCK_SHEETS_ROWS.map((row) => {
                const isSelected = row.row === activeRow;
                return (
                  <tr
                    key={row.row}
                    className={`transition-colors ${
                      isSelected
                        ? 'bg-surface-container-high border-l-4 border-l-primary shadow-[inset_0_1px_0_0_rgba(255,255,255,0.15)]'
                        : 'hover:bg-surface-container-low/60'
                    }`}
                  >
                    <td className="py-3 px-3 font-mono font-bold text-primary">#{row.row}</td>
                    <td className="py-3 px-3 text-outline whitespace-nowrap">{row.timestamp}</td>
                    <td className="py-3 px-3 font-bold text-primary whitespace-nowrap">{row.orderId}</td>
                    <td className="py-3 px-3 text-on-surface whitespace-nowrap font-medium">{row.client}</td>
                    <td className="py-3 px-3 text-secondary whitespace-nowrap">{row.channel}</td>
                    <td className="py-3 px-3 text-on-surface-variant max-w-xs truncate" title={row.items}>
                      {row.items}
                    </td>
                    <td className="py-3 px-3 text-secondary whitespace-nowrap">{row.zone}</td>
                    <td className="py-3 px-3 font-headline-sm text-[15px] font-bold text-primary whitespace-nowrap">
                      {row.total}
                    </td>
                    <td className="py-3 px-3 font-mono text-outline whitespace-nowrap">
                      <span className="text-primary font-bold">{row.bankRef}</span> ({row.paymentMethod})
                    </td>
                    <td className="py-3 px-3 whitespace-nowrap">
                      <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-surface-container text-primary font-label-sm text-label-sm">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#4ade80]"></span>
                        {row.status}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-2 border-t border-outline-variant/20">
          <span className="font-label-sm text-label-sm text-outline">
            Sincronizado vía Google Drive & Sheets Integration v4 • Webhook activo
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-surface-container-high hover:bg-surface-bright text-primary font-label-md text-label-md transition-colors"
            >
              Cerrar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

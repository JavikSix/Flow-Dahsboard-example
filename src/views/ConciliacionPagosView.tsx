import React, { useState } from 'react';
import { MOCK_TRANSACTIONS } from '../mockData';
import { TransactionRecord } from '../types';
import { ReceiptZoomModal } from '../components/ReceiptZoomModal';

interface Props {
  onOpenGoogleSheets: () => void;
}

export const ConciliacionPagosView: React.FC<Props> = ({ onOpenGoogleSheets }) => {
  const [transactions, setTransactions] = useState<TransactionRecord[]>(MOCK_TRANSACTIONS);
  const [selectedMethod, setSelectedMethod] = useState<string>('todos');
  const [searchQuery, setSearchQuery] = useState('');
  const [showReceiptModal, setShowReceiptModal] = useState(false);
  const [activeReceiptData, setActiveReceiptData] = useState<{ ref: string; amount: string; orderId: string }>({
    ref: 'NEQ-99182312',
    amount: '$56.000 COP',
    orderId: '#6592',
  });
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const filtered = transactions.filter((tx) => {
    const matchesSearch =
      tx.client.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tx.reference.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tx.orderId.toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchesSearch) return false;

    if (selectedMethod === 'nequi') return tx.method === 'Nequi';
    if (selectedMethod === 'pse') return tx.method === 'PSE';
    if (selectedMethod === 'bancolombia') return tx.method === 'Bancolombia QR';
    if (selectedMethod === 'daviplata') return tx.method === 'Daviplata';
    if (selectedMethod === 'pendiente') return tx.status === 'pendiente';
    return true;
  });

  const handleManualReconcile = (txId: string) => {
    setTransactions((prev) =>
      prev.map((t) =>
        t.id === txId
          ? { ...t, status: 'validado_auto', latency: '0.9s', reference: 'BANCO-33019-OK' }
          : t
      )
    );
    showToast(`Transacción ${txId} cotejada exitosamente con extracto bancario.`);
  };

  return (
    <div className="flex flex-col w-full h-[calc(100vh-4rem)] overflow-y-auto p-space-lg bg-surface">
      {/* Toast */}
      {toastMessage && (
        <div className="fixed top-20 right-8 z-50 px-4 py-2.5 rounded-xl bg-surface-container-highest border border-primary/40 text-primary shadow-[0_10px_30px_rgba(0,0,0,0.8)] font-label-md text-label-md flex items-center gap-2 animate-in fade-in">
          <span className="material-symbols-outlined text-[18px] text-[#4ade80]">check_circle</span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-6 gap-4 border-b border-outline-variant/30">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="font-headline-lg text-headline-lg text-primary tracking-tight">Conciliación de Pagos en Tiempo Real</h2>
            <span className="px-2.5 py-0.5 rounded-full bg-surface-container-high border border-outline-variant/40 text-primary font-label-sm text-label-sm uppercase">
              Pasarela Nequi / PSE / QR
            </span>
          </div>
          <p className="font-body-sm text-body-sm text-secondary mt-1">
            Motor de cotejo automatizado entre capturas de comprobantes WhatsApp/IG y extractos de API bancaria en milisegundos.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onOpenGoogleSheets}
            className="px-4 py-2 rounded-xl bg-surface-container-low hover:bg-surface-container-high border border-outline-variant/40 text-primary font-label-md text-label-md flex items-center gap-2 transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px] text-[#4ade80]">table_chart</span>
            <span>Ver en Google Sheets</span>
          </button>
          <button
            onClick={() => showToast('Descargando extracto de conciliación fiscal en formato CSV/XLSX...')}
            className="px-4 py-2 rounded-xl bg-primary text-on-primary font-label-md text-label-md font-bold shadow-[0_0_16px_rgba(255,255,255,0.25)] hover:bg-[#e2e2e2] flex items-center gap-2 transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">download</span>
            <span>Exportar Libro</span>
          </button>
        </div>
      </div>

      {/* KPI Summary Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mt-6">
        <div className="p-4 rounded-xl bg-surface-container-low border border-outline-variant/30 flex items-center justify-between">
          <div>
            <span className="font-label-sm text-label-sm text-outline uppercase">Total Conciliado Hoy</span>
            <div className="font-headline-sm text-headline-sm text-primary font-bold mt-0.5">$4.850.000 COP</div>
          </div>
          <span className="material-symbols-outlined text-primary text-[22px]">account_balance_wallet</span>
        </div>
        <div className="p-4 rounded-xl bg-surface-container-low border border-outline-variant/30 flex items-center justify-between">
          <div>
            <span className="font-label-sm text-label-sm text-outline uppercase">Tiempo Promedio Cotejo</span>
            <div className="font-headline-sm text-headline-sm text-primary font-bold mt-0.5">0.78 segundos</div>
          </div>
          <span className="material-symbols-outlined text-[#4ade80] text-[22px]">bolt</span>
        </div>
        <div className="p-4 rounded-xl bg-surface-container-low border border-outline-variant/30 flex items-center justify-between">
          <div>
            <span className="font-label-sm text-label-sm text-outline uppercase">Tasa de Aprobación Inmediata</span>
            <div className="font-headline-sm text-headline-sm text-primary font-bold mt-0.5">99.4%</div>
          </div>
          <span className="material-symbols-outlined text-primary text-[22px]">verified</span>
        </div>
        <div className="p-4 rounded-xl bg-surface-container-low border border-outline-variant/30 flex items-center justify-between">
          <div>
            <span className="font-label-sm text-label-sm text-outline uppercase">Discrepancias / Fraude</span>
            <div className="font-headline-sm text-headline-sm text-[#4ade80] font-bold mt-0.5">0 detectadas</div>
          </div>
          <span className="material-symbols-outlined text-[#4ade80] text-[22px]">security</span>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mt-6 p-3 rounded-2xl bg-surface-container-low border border-outline-variant/30">
        <div className="relative w-full sm:w-80">
          <span className="material-symbols-outlined absolute left-3 top-2.5 text-outline text-[18px]">search</span>
          <input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar por cliente, #referencia o pedido..."
            className="w-full pl-9 pr-3 py-2 bg-surface-container-lowest rounded-xl text-on-surface placeholder:text-outline font-body-sm text-body-sm focus:outline-none border border-outline-variant/30"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto">
          {[
            { id: 'todos', label: 'Todos' },
            { id: 'nequi', label: 'Nequi' },
            { id: 'pse', label: 'PSE Directo' },
            { id: 'bancolombia', label: 'Bancolombia QR' },
            { id: 'daviplata', label: 'Daviplata' },
            { id: 'pendiente', label: 'Pendientes' },
          ].map((m) => (
            <button
              key={m.id}
              onClick={() => setSelectedMethod(m.id)}
              className={`px-3 py-1.5 rounded-lg font-label-sm text-label-sm font-semibold transition-all cursor-pointer ${
                selectedMethod === m.id
                  ? 'bg-primary text-on-primary shadow-[0_0_12px_rgba(255,255,255,0.2)]'
                  : 'bg-surface-container-lowest text-secondary hover:text-primary hover:bg-surface-container-high'
              }`}
            >
              {m.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Reconciliation Table */}
      <div className="mt-4 rounded-2xl bg-surface-container-low border border-outline-variant/30 overflow-hidden shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08)]">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-container border-b border-outline-variant/30 text-outline font-label-sm text-label-sm uppercase tracking-wider">
                <th className="py-3 px-4">ID / Orden</th>
                <th className="py-3 px-4">Cliente</th>
                <th className="py-3 px-4">Canal</th>
                <th className="py-3 px-4">Monto Liquidado</th>
                <th className="py-3 px-4">Método Bancario</th>
                <th className="py-3 px-4">Referencia Extraída</th>
                <th className="py-3 px-4">Latencia Cotejo</th>
                <th className="py-3 px-4">Estado Conciliación</th>
                <th className="py-3 px-4 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/20 font-body-sm text-body-sm">
              {filtered.map((tx) => (
                <tr key={tx.id} className="hover:bg-surface-container-high/50 transition-colors">
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    <span className="font-mono text-outline text-[12px] block">{tx.id}</span>
                    <span className="font-bold text-primary">{tx.orderId}</span>
                  </td>
                  <td className="py-3.5 px-4 whitespace-nowrap font-medium text-on-surface">{tx.client}</td>
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    <span className="inline-flex items-center gap-1 text-secondary font-label-sm text-label-sm">
                      <span className="material-symbols-outlined text-[14px]">
                        {tx.channel === 'whatsapp' ? 'chat' : 'photo_camera'}
                      </span>
                      {tx.channel === 'whatsapp' ? 'WhatsApp' : 'Instagram'}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 whitespace-nowrap font-headline-sm text-[16px] font-bold text-primary">
                    ${tx.amount.toLocaleString('es-CO')} COP
                  </td>
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    <span className="px-2 py-0.5 rounded-full bg-surface-container-lowest border border-outline-variant/30 text-primary font-label-sm text-label-sm">
                      {tx.method}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 whitespace-nowrap font-mono font-bold text-primary">{tx.reference}</td>
                  <td className="py-3.5 px-4 whitespace-nowrap font-mono text-outline">{tx.latency}</td>
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    {tx.status === 'validado_auto' ? (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#14532d]/40 border border-[#22c55e]/30 text-[#4ade80] font-label-sm text-label-sm font-semibold">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#4ade80]"></span>
                        Validado Automático
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#713f12]/40 border border-[#eab308]/30 text-[#fde047] font-label-sm text-label-sm font-semibold">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#fde047] animate-pulse"></span>
                        Pendiente Validación
                      </span>
                    )}
                  </td>
                  <td className="py-3.5 px-4 whitespace-nowrap text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={() => {
                          setActiveReceiptData({
                            ref: tx.reference,
                            amount: `$${tx.amount.toLocaleString('es-CO')} COP`,
                            orderId: tx.orderId,
                          });
                          setShowReceiptModal(true);
                        }}
                        className="p-1.5 rounded-lg bg-surface-container hover:bg-surface-bright text-outline hover:text-primary transition-colors cursor-pointer"
                        title="Ver Comprobante Forense OCR"
                      >
                        <span className="material-symbols-outlined text-[18px]">visibility</span>
                      </button>
                      {tx.status === 'pendiente' && (
                        <button
                          onClick={() => handleManualReconcile(tx.id)}
                          className="px-2.5 py-1 rounded-lg bg-primary text-on-primary font-label-sm text-label-sm font-bold shadow-[0_0_10px_rgba(255,255,255,0.3)] hover:bg-[#e2e2e2] transition-colors cursor-pointer"
                        >
                          Cotejar Ahora
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <ReceiptZoomModal
        isOpen={showReceiptModal}
        onClose={() => setShowReceiptModal(false)}
        refCode={activeReceiptData.ref}
        amount={activeReceiptData.amount}
        orderId={activeReceiptData.orderId}
      />
    </div>
  );
};

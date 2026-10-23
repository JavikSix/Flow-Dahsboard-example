import React from 'react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  imageUrl?: string;
  refCode?: string;
  amount?: string;
  orderId?: string;
}

export const ReceiptZoomModal: React.FC<Props> = ({
  isOpen,
  onClose,
  imageUrl = 'https://lh3.googleusercontent.com/aida-public/AB6AXuAWKl8hr7QwNO3J48od9TA2iHMimUymCePqmXbwE9-QwMMzCju8SiKsynaH9jjhYsTbx0PKZp9G2smXS2GoOhlsxdNXAgHOUHJhvCTdBedLHFSPdM_ZGVVzr5tCEbv3F4roGHlopKSjYxeK1bVNCu4Pgyuo-8l2nnSEqXytrdmnyFZnkEpG_N4CJ3C4iV5Vw5n64HzA0xmb0hVrGAI2PjRWeNGTxR9SZfYRh7v9DHEiol18-y_Ns5wO',
  refCode = '#NEQ-99182312',
  amount = '$56.000 COP',
  orderId = '#6592',
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-lg animate-in fade-in">
      <div className="relative w-full max-w-2xl bg-surface-container-lowest border border-outline-variant/40 rounded-2xl p-6 shadow-[0_24px_64px_rgba(0,0,0,0.9),inset_0_1px_0_0_rgba(255,255,255,0.18)] flex flex-col gap-4">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-outline-variant/30">
          <div className="flex items-center gap-2.5">
            <span className="material-symbols-outlined text-primary text-[22px]">verified</span>
            <div>
              <h3 className="font-headline-sm text-headline-sm text-primary">Auditoría Forense de Comprobante OCR</h3>
              <p className="font-label-sm text-label-sm text-outline">Captura Inbound WhatsApp • Cotejado con API Nequi en 0.7s</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-surface-container-low hover:bg-surface-container text-outline hover:text-primary transition-colors"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Image preview frame */}
          <div className="relative rounded-xl overflow-hidden bg-surface-container-low border border-outline-variant/40 flex items-center justify-center min-h-[280px]">
            <img
              src={imageUrl}
              alt="Comprobante Nequi Ampliado"
              className="w-full h-full max-h-[360px] object-contain"
            />
            <div className="absolute top-2 left-2 px-2.5 py-1 rounded-full bg-surface-container-lowest/90 border border-outline-variant/40 text-primary font-label-sm text-label-sm flex items-center gap-1.5 backdrop-blur-md">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
              <span>OCR Confianza: 99.8%</span>
            </div>
          </div>

          {/* OCR Extracted Metadata */}
          <div className="flex flex-col justify-between gap-3 bg-surface-container-low p-4 rounded-xl border border-outline-variant/30">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="font-label-sm text-label-sm uppercase text-outline font-bold">Datos Cotejados</span>
                <span className="px-2 py-0.5 rounded-full bg-surface-container-highest text-primary font-label-sm text-label-sm font-semibold">
                  MATCH PERFECTO
                </span>
              </div>

              <div className="space-y-2.5">
                <div className="flex items-center justify-between pb-1.5 border-b border-outline-variant/20">
                  <span className="font-body-sm text-body-sm text-outline">Código de Referencia</span>
                  <span className="font-label-md text-label-md text-primary font-mono font-bold">{refCode}</span>
                </div>
                <div className="flex items-center justify-between pb-1.5 border-b border-outline-variant/20">
                  <span className="font-body-sm text-body-sm text-outline">Monto Extraído</span>
                  <span className="font-headline-sm text-headline-sm text-primary font-bold">{amount}</span>
                </div>
                <div className="flex items-center justify-between pb-1.5 border-b border-outline-variant/20">
                  <span className="font-body-sm text-body-sm text-outline">Destino Identificado</span>
                  <span className="font-label-md text-label-md text-primary font-mono">#300-881-2290</span>
                </div>
                <div className="flex items-center justify-between pb-1.5 border-b border-outline-variant/20">
                  <span className="font-body-sm text-body-sm text-outline">Titular Cuenta</span>
                  <span className="font-label-md text-label-md text-secondary">Hamburguesería La Candelaria SAS</span>
                </div>
                <div className="flex items-center justify-between pb-1.5 border-b border-outline-variant/20">
                  <span className="font-body-sm text-body-sm text-outline">Orden Asociada</span>
                  <span className="font-label-md text-label-md text-primary font-bold">{orderId}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-body-sm text-body-sm text-outline">Latencia Cotejo API</span>
                  <span className="font-label-sm text-label-sm text-primary font-mono">0.718 segundos</span>
                </div>
              </div>
            </div>

            <div className="p-2.5 rounded-lg bg-surface-container-lowest border border-outline-variant/30 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-[18px]">verified_user</span>
              <span className="font-label-sm text-label-sm text-secondary">
                Firma criptográfica de Nequi Colombia válida. No presenta alteraciones digitales.
              </span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-2 pt-2 border-t border-outline-variant/20">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-surface-container-high hover:bg-surface-bright text-primary font-label-md text-label-md transition-colors"
          >
            Cerrar Visor
          </button>
        </div>
      </div>
    </div>
  );
};

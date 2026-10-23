import React, { useState } from 'react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSimulatePayment: () => void;
  amount?: string;
  orderId?: string;
}

export const NequiQRModal: React.FC<Props> = ({
  isOpen,
  onClose,
  onSimulatePayment,
  amount = '$56.000 COP',
  orderId = '#6592',
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const nequiKey = '3008812290';

  const copyToClipboard = () => {
    navigator.clipboard?.writeText(nequiKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in">
      <div className="relative w-full max-w-md bg-surface-container-lowest border border-outline-variant/40 rounded-2xl p-6 shadow-[0_20px_50px_rgba(0,0,0,0.8),inset_0_1px_0_0_rgba(255,255,255,0.15)] flex flex-col gap-4">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-outline-variant/30">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#20002c] border border-[#a21caf]/40 flex items-center justify-center text-primary font-bold">
              <span className="material-symbols-outlined text-[20px] text-[#e879f9]">qr_code_2</span>
            </div>
            <div>
              <h3 className="font-headline-sm text-headline-sm text-primary">Código QR Nequi</h3>
              <p className="font-label-sm text-label-sm text-outline">Pasarela Instantánea Directa</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-surface-container-low hover:bg-surface-container text-outline hover:text-primary transition-colors"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        {/* QR Display Frame */}
        <div className="p-5 rounded-2xl bg-[#170524] border border-[#a21caf]/30 flex flex-col items-center justify-center gap-3 relative overflow-hidden">
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#c026d3]/15 rounded-full blur-2xl"></div>
          <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-[#701a75]/20 rounded-full blur-2xl"></div>

          {/* SVG QR Code Simulation */}
          <div className="w-52 h-52 bg-white p-3 rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.6)] flex flex-col items-center justify-center relative">
            <svg viewBox="0 0 100 100" className="w-full h-full text-black fill-current">
              {/* Corner position markers */}
              <rect x="5" y="5" width="28" height="28" fill="#131315" rx="3" />
              <rect x="9" y="9" width="20" height="20" fill="white" rx="2" />
              <rect x="13" y="13" width="12" height="12" fill="#20002c" rx="1.5" />

              <rect x="67" y="5" width="28" height="28" fill="#131315" rx="3" />
              <rect x="71" y="9" width="20" height="20" fill="white" rx="2" />
              <rect x="75" y="13" width="12" height="12" fill="#20002c" rx="1.5" />

              <rect x="5" y="67" width="28" height="28" fill="#131315" rx="3" />
              <rect x="9" y="71" width="20" height="20" fill="white" rx="2" />
              <rect x="13" y="75" width="12" height="12" fill="#20002c" rx="1.5" />

              {/* Data modules pattern */}
              <rect x="38" y="10" width="8" height="4" fill="#20002c" />
              <rect x="50" y="10" width="10" height="4" fill="#20002c" />
              <rect x="42" y="20" width="16" height="5" fill="#20002c" />
              <rect x="38" y="30" width="24" height="4" fill="#20002c" />
              <rect x="10" y="40" width="80" height="4" fill="#20002c" />
              <rect x="15" y="48" width="12" height="8" fill="#20002c" />
              <rect x="34" y="48" width="8" height="14" fill="#20002c" />
              <rect x="48" y="48" width="16" height="6" fill="#20002c" />
              <rect x="70" y="48" width="18" height="8" fill="#20002c" />
              <rect x="48" y="58" width="8" height="18" fill="#20002c" />
              <rect x="62" y="60" width="26" height="6" fill="#20002c" />
              <rect x="38" y="68" width="6" height="14" fill="#20002c" />
              <rect x="72" y="72" width="16" height="8" fill="#20002c" />
              <rect x="62" y="84" width="26" height="6" fill="#20002c" />
              <rect x="38" y="86" width="18" height="6" fill="#20002c" />

              {/* Center Nequi logo badge */}
              <circle cx="50" cy="50" r="11" fill="white" />
              <circle cx="50" cy="50" r="9" fill="#20002c" />
              <text x="50" y="54" fill="white" fontSize="9" fontWeight="bold" textAnchor="middle">N</text>
            </svg>
          </div>

          <div className="text-center z-10">
            <span className="font-label-md text-label-md text-secondary">Monto Exacto:</span>
            <div className="font-headline-md text-headline-md text-primary font-bold">{amount}</div>
            <span className="font-label-sm text-label-sm text-[#e879f9]">Orden {orderId} • Hamburguesería La Candelaria SAS</span>
          </div>
        </div>

        {/* Llave copy row */}
        <div className="flex items-center justify-between p-3 rounded-xl bg-surface-container-low border border-outline-variant/30">
          <div className="flex flex-col">
            <span className="font-label-sm text-label-sm text-outline uppercase tracking-wider">Número de Llave Nequi</span>
            <span className="font-headline-sm text-headline-sm text-primary font-mono font-bold">#300-881-2290</span>
          </div>
          <button
            onClick={copyToClipboard}
            className="px-3 py-1.5 rounded-lg bg-surface-container-high hover:bg-surface-bright text-primary font-label-sm text-label-sm flex items-center gap-1.5 transition-colors border border-outline-variant/30"
          >
            <span className="material-symbols-outlined text-[16px]">{copied ? 'done' : 'content_copy'}</span>
            <span>{copied ? '¡Copiado!' : 'Copiar Llave'}</span>
          </button>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 pt-1">
          <button
            onClick={onClose}
            className="flex-1 py-2.5 rounded-xl bg-surface-container-low hover:bg-surface-container text-on-surface-variant font-label-md text-label-md transition-colors"
          >
            Cerrar
          </button>
          <button
            onClick={() => {
              onSimulatePayment();
              onClose();
            }}
            className="flex-1 py-2.5 rounded-xl bg-primary text-on-primary font-label-md text-label-md font-bold shadow-[0_0_16px_rgba(255,255,255,0.25)] hover:bg-[#e2e2e2] transition-colors flex items-center justify-center gap-1.5"
          >
            <span className="material-symbols-outlined text-[18px]">verified</span>
            <span>Simular Pago Hecho</span>
          </button>
        </div>
      </div>
    </div>
  );
};

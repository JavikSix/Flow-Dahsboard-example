import React, { useState } from 'react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onAuthorize: () => void;
  amount?: string;
  orderId?: string;
}

export const PSEModal: React.FC<Props> = ({
  isOpen,
  onClose,
  onAuthorize,
  amount = '$56.000 COP',
  orderId = '#6592',
}) => {
  const [bank, setBank] = useState('Bancolombia');
  const [email, setEmail] = useState('camilo.restrepo@example.com');
  const [processing, setProcessing] = useState(false);

  if (!isOpen) return null;

  const handlePay = () => {
    setProcessing(true);
    setTimeout(() => {
      setProcessing(false);
      onAuthorize();
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in">
      <div className="relative w-full max-w-md bg-surface-container-lowest border border-outline-variant/40 rounded-2xl p-6 shadow-[0_20px_50px_rgba(0,0,0,0.8),inset_0_1px_0_0_rgba(255,255,255,0.15)] flex flex-col gap-4">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-outline-variant/30">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-primary text-on-primary flex items-center justify-center font-bold">
              <span className="material-symbols-outlined text-[20px]">link</span>
            </div>
            <div>
              <h3 className="font-headline-sm text-headline-sm text-primary">Pasarela PSE Colombia</h3>
              <p className="font-label-sm text-label-sm text-outline">Pago Seguro en Línea Interbancario</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-surface-container-low hover:bg-surface-container text-outline hover:text-primary transition-colors"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        {/* Payment Summary */}
        <div className="p-3.5 rounded-xl bg-surface-container-low border border-outline-variant/30 flex items-center justify-between">
          <div>
            <span className="font-label-sm text-label-sm text-outline">Orden a Liquidar</span>
            <div className="font-label-lg text-label-lg text-primary font-bold">{orderId} • La Candelaria</div>
          </div>
          <div className="text-right">
            <span className="font-label-sm text-label-sm text-outline">Monto Total</span>
            <div className="font-headline-sm text-headline-sm text-primary font-bold">{amount}</div>
          </div>
        </div>

        {/* Bank Selection */}
        <div className="space-y-3">
          <div>
            <label className="block font-label-sm text-label-sm text-outline uppercase mb-1">
              Selecciona tu Entidad Financiera
            </label>
            <select
              value={bank}
              onChange={(e) => setBank(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl bg-surface-container-low border border-outline-variant/40 text-on-surface font-body-sm text-body-sm focus:outline-none focus:border-primary"
            >
              <option value="Bancolombia">Bancolombia (Personas / Ahorros)</option>
              <option value="Nequi">Nequi By Bancolombia</option>
              <option value="Davivienda">Davivienda / Daviplata</option>
              <option value="Nu Colombia">Nu Bank Colombia (Cuenta de Ahorros)</option>
              <option value="Lulo Bank">Lulo Bank</option>
              <option value="Banco de Bogotá">Banco de Bogotá</option>
              <option value="BBVA Colombia">BBVA Colombia</option>
              <option value="Scotiabank Colpatria">Scotiabank Colpatria</option>
            </select>
          </div>

          <div>
            <label className="block font-label-sm text-label-sm text-outline uppercase mb-1">
              Correo Electrónico Registrado en PSE
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl bg-surface-container-low border border-outline-variant/40 text-on-surface font-body-sm text-body-sm focus:outline-none focus:border-primary"
            />
          </div>
        </div>

        {/* Trust Badges */}
        <div className="flex items-center justify-between px-2 py-1 text-outline font-label-sm text-label-sm">
          <span className="flex items-center gap-1">
            <span className="material-symbols-outlined text-[14px] text-primary">lock</span> Cifrado 256-bit SSL
          </span>
          <span>ACH Colombia • Red AVAL</span>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 pt-1">
          <button
            onClick={onClose}
            disabled={processing}
            className="flex-1 py-2.5 rounded-xl bg-surface-container-low hover:bg-surface-container text-on-surface-variant font-label-md text-label-md transition-colors"
          >
            Cancelar
          </button>
          <button
            onClick={handlePay}
            disabled={processing}
            className="flex-1 py-2.5 rounded-xl bg-primary text-on-primary font-label-md text-label-md font-bold shadow-[0_0_16px_rgba(255,255,255,0.25)] hover:bg-[#e2e2e2] transition-colors flex items-center justify-center gap-1.5"
          >
            {processing ? (
              <>
                <span className="w-4 h-4 rounded-full border-2 border-on-primary border-t-transparent animate-spin"></span>
                <span>Procesando ACH...</span>
              </>
            ) : (
              <>
                <span>Autorizar Débito PSE</span>
                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

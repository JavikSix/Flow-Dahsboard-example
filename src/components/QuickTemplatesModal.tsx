import React from 'react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSelectTemplate: (templateText: string) => void;
}

export const QuickTemplatesModal: React.FC<Props> = ({
  isOpen,
  onClose,
  onSelectTemplate,
}) => {
  if (!isOpen) return null;

  const templates = [
    {
      title: 'Menú Digital Interactivo',
      icon: 'menu_book',
      text: '¡Hola! 🍔 Conoce nuestra carta completa de burgers artesanales, papas rústicas y bebidas aquí: https://candelaria.menu/sede-chapinero',
    },
    {
      title: 'Datos de Transferencia Nequi & PSE',
      icon: 'attach_money',
      text: 'Para procesar tu comanda al instante, transfiere a nuestra llave Nequi #300-881-2290 o PSE directo. Nuestro bot validará tu comprobante en menos de 1 segundo.',
    },
    {
      title: 'Tiempo de Entrega & Despacho',
      icon: 'moped',
      text: 'Tu pedido ya está en preparación en cocina. El tiempo estimado de entrega con nuestro domiciliario es de 30 a 40 minutos.',
    },
    {
      title: 'Solicitud de Ubicación GPS',
      icon: 'pin_drop',
      text: 'Por favor compártenos tu ubicación en tiempo real de WhatsApp o dirección con apartamento/torre para que el motorizado llegue sin contratiempos.',
    },
    {
      title: 'Confirmación de Pago y Factura DIAN',
      icon: 'receipt_long',
      text: '¡Pago verificado exitosamente! Tu comanda ha sido enviada al KDS de cocina y tu factura electrónica DIAN ha sido generada.',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in">
      <div className="relative w-full max-w-lg bg-surface-container-lowest border border-outline-variant/40 rounded-2xl p-6 shadow-[0_20px_50px_rgba(0,0,0,0.8),inset_0_1px_0_0_rgba(255,255,255,0.15)] flex flex-col gap-4">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-outline-variant/30">
          <div className="flex items-center gap-2.5">
            <span className="material-symbols-outlined text-primary text-[20px]">bolt</span>
            <div>
              <h3 className="font-headline-sm text-headline-sm text-primary">Plantillas Rápidas</h3>
              <p className="font-label-sm text-label-sm text-outline">Respuestas preconfiguradas para comanda y soporte</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-surface-container-low hover:bg-surface-container text-outline hover:text-primary transition-colors"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        {/* Template List */}
        <div className="flex flex-col gap-2 max-h-[60vh] overflow-y-auto">
          {templates.map((tpl, i) => (
            <div
              key={i}
              onClick={() => {
                onSelectTemplate(tpl.text);
                onClose();
              }}
              className="p-3 rounded-xl bg-surface-container-low hover:bg-surface-container-high border border-outline-variant/30 hover:border-outline-variant/60 cursor-pointer transition-all flex flex-col gap-1 text-left group"
            >
              <div className="flex items-center justify-between">
                <span className="font-label-md text-label-md text-primary font-semibold flex items-center gap-2 group-hover:text-primary">
                  <span className="material-symbols-outlined text-[16px] text-outline group-hover:text-primary">
                    {tpl.icon}
                  </span>
                  {tpl.title}
                </span>
                <span className="material-symbols-outlined text-[16px] text-outline opacity-0 group-hover:opacity-100 transition-opacity">
                  arrow_forward
                </span>
              </div>
              <p className="font-body-sm text-body-sm text-on-surface-variant line-clamp-2">
                {tpl.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

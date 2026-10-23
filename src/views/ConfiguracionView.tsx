import React, { useState } from 'react';

export const ConfiguracionView: React.FC = () => {
  const [storeName, setStoreName] = useState('Hamburguesería La Candelaria');
  const [activeSede, setActiveSede] = useState('Sede Chapinero');
  const [nequiKey, setNequiKey] = useState('3008812290');
  const [deliveryLaureles, setDeliveryLaureles] = useState('6000');
  const [deliveryChapinero, setDeliveryChapinero] = useState('5000');
  const [deliveryPoblado, setDeliveryPoblado] = useState('7000');
  const [savedToast, setSavedToast] = useState(false);

  const handleSave = () => {
    setSavedToast(true);
    setTimeout(() => setSavedToast(false), 3000);
  };

  return (
    <div className="flex flex-col w-full h-[calc(100vh-4rem)] overflow-y-auto p-space-lg bg-surface">
      {/* Toast */}
      {savedToast && (
        <div className="fixed top-20 right-8 z-50 px-4 py-2.5 rounded-xl bg-surface-container-highest border border-[#4ade80]/40 text-primary shadow-[0_10px_30px_rgba(0,0,0,0.8)] font-label-md text-label-md flex items-center gap-2 animate-in fade-in">
          <span className="material-symbols-outlined text-[18px] text-[#4ade80]">check_circle</span>
          <span>Configuración guardada y sincronizada en los bots de WhatsApp e Instagram.</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-6 gap-4 border-b border-outline-variant/30">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="font-headline-lg text-headline-lg text-primary tracking-tight">Configuración del Negocio</h2>
            <span className="px-2.5 py-0.5 rounded-full bg-surface-container-high border border-outline-variant/40 text-primary font-label-sm text-label-sm uppercase">
              Sede Master
            </span>
          </div>
          <p className="font-body-sm text-body-sm text-secondary mt-1">
            Parámetros operativos de la hamburguesería, pasarelas bancarias y tarifas de despacho por zona.
          </p>
        </div>

        <button
          onClick={handleSave}
          className="px-5 py-2.5 rounded-xl bg-primary text-on-primary font-label-md text-label-md font-bold shadow-[0_0_16px_rgba(255,255,255,0.25)] hover:bg-[#e2e2e2] flex items-center gap-2 transition-all cursor-pointer"
        >
          <span className="material-symbols-outlined text-[18px]">save</span>
          <span>Guardar Cambios</span>
        </button>
      </div>

      {/* Main Settings Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        {/* Branch & Company Profile */}
        <div className="p-5 rounded-2xl bg-surface-container-low border border-outline-variant/30 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1)] flex flex-col gap-4">
          <div className="flex items-center gap-2 pb-2 border-b border-outline-variant/20">
            <span className="material-symbols-outlined text-primary text-[20px]">storefront</span>
            <h3 className="font-headline-sm text-headline-sm text-primary">Perfil del Restaurante</h3>
          </div>

          <div className="space-y-3 font-body-sm text-body-sm">
            <div>
              <label className="block font-label-sm text-label-sm text-outline uppercase mb-1">Nombre Comercial</label>
              <input
                value={storeName}
                onChange={(e) => setStoreName(e.target.value)}
                className="w-full px-3 py-2 bg-surface-container rounded-xl text-primary border border-outline-variant/40 focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-label-sm text-label-sm text-outline uppercase mb-1">Sede Operativa Activa</label>
              <select
                value={activeSede}
                onChange={(e) => setActiveSede(e.target.value)}
                className="w-full px-3 py-2 bg-surface-container rounded-xl text-primary border border-outline-variant/40 focus:outline-none"
              >
                <option value="Sede Chapinero">Sede Chapinero (Calle 58 # 7-14, Bogotá)</option>
                <option value="Sede Laureles">Sede Laureles (Circular 4ta # 73-12, Medellín)</option>
                <option value="Sede Poblado">Sede El Poblado (Cra 37 # 8A-40, Medellín)</option>
                <option value="Sede Usaquén">Sede Usaquén (Cra 6 # 118-20, Bogotá)</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-label-sm text-label-sm text-outline uppercase mb-1">NIT Empresa (DIAN)</label>
                <input
                  defaultValue="901.442.819-3"
                  className="w-full px-3 py-2 bg-surface-container rounded-xl text-primary border border-outline-variant/40 focus:outline-none font-mono"
                />
              </div>
              <div>
                <label className="block font-label-sm text-label-sm text-outline uppercase mb-1">Régimen Fiscal</label>
                <input
                  defaultValue="Responsable de IVA / Impoconsumo 8%"
                  className="w-full px-3 py-2 bg-surface-container rounded-xl text-primary border border-outline-variant/40 focus:outline-none"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Payment Keys & Gateways */}
        <div className="p-5 rounded-2xl bg-surface-container-low border border-outline-variant/30 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1)] flex flex-col gap-4">
          <div className="flex items-center gap-2 pb-2 border-b border-outline-variant/20">
            <span className="material-symbols-outlined text-primary text-[20px]">account_balance_wallet</span>
            <h3 className="font-headline-sm text-headline-sm text-primary">Llaves de Pago Nequi & Bancos</h3>
          </div>

          <div className="space-y-3 font-body-sm text-body-sm">
            <div>
              <label className="block font-label-sm text-label-sm text-outline uppercase mb-1">
                Número de Llave Comercial Nequi
              </label>
              <input
                value={nequiKey}
                onChange={(e) => setNequiKey(e.target.value)}
                placeholder="3008812290"
                className="w-full px-3 py-2 bg-surface-container rounded-xl text-primary border border-outline-variant/40 focus:outline-none font-mono font-bold"
              />
              <span className="text-[11px] text-outline mt-1 block">
                Esta es la llave mostrada en el chat interactivo cuando el comensal solicita pago Nequi.
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-label-sm text-label-sm text-outline uppercase mb-1">
                  Cuenta Corriente Bancolombia
                </label>
                <input
                  defaultValue="882-019283-11"
                  className="w-full px-3 py-2 bg-surface-container rounded-xl text-primary border border-outline-variant/40 focus:outline-none font-mono"
                />
              </div>
              <div>
                <label className="block font-label-sm text-label-sm text-outline uppercase mb-1">
                  Tolerancia Cotejo (Segundos)
                </label>
                <input
                  defaultValue="2.0s máximo"
                  className="w-full px-3 py-2 bg-surface-container rounded-xl text-primary border border-outline-variant/40 focus:outline-none font-mono"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Delivery Zones & Fees */}
        <div className="p-5 rounded-2xl bg-surface-container-low border border-outline-variant/30 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1)] flex flex-col gap-4">
          <div className="flex items-center gap-2 pb-2 border-b border-outline-variant/20">
            <span className="material-symbols-outlined text-primary text-[20px]">moped</span>
            <h3 className="font-headline-sm text-headline-sm text-primary">Tarifas de Domicilio por Zona</h3>
          </div>

          <div className="space-y-3 font-body-sm text-body-sm">
            <div className="flex items-center justify-between p-2.5 rounded-xl bg-surface-container border border-outline-variant/30">
              <span className="text-on-surface font-medium">Zona Chapinero / Rosales</span>
              <div className="flex items-center gap-1 font-mono">
                <span className="text-outline">$</span>
                <input
                  value={deliveryChapinero}
                  onChange={(e) => setDeliveryChapinero(e.target.value)}
                  className="w-20 px-2 py-1 bg-surface-container-highest rounded-lg text-primary text-right focus:outline-none"
                />
                <span className="text-outline text-xs">COP</span>
              </div>
            </div>

            <div className="flex items-center justify-between p-2.5 rounded-xl bg-surface-container border border-outline-variant/30">
              <span className="text-on-surface font-medium">Zona Laureles / Conquistadores</span>
              <div className="flex items-center gap-1 font-mono">
                <span className="text-outline">$</span>
                <input
                  value={deliveryLaureles}
                  onChange={(e) => setDeliveryLaureles(e.target.value)}
                  className="w-20 px-2 py-1 bg-surface-container-highest rounded-lg text-primary text-right focus:outline-none"
                />
                <span className="text-outline text-xs">COP</span>
              </div>
            </div>

            <div className="flex items-center justify-between p-2.5 rounded-xl bg-surface-container border border-outline-variant/30">
              <span className="text-on-surface font-medium">Zona El Poblado / Manila</span>
              <div className="flex items-center gap-1 font-mono">
                <span className="text-outline">$</span>
                <input
                  value={deliveryPoblado}
                  onChange={(e) => setDeliveryPoblado(e.target.value)}
                  className="w-20 px-2 py-1 bg-surface-container-highest rounded-lg text-primary text-right focus:outline-none"
                />
                <span className="text-outline text-xs">COP</span>
              </div>
            </div>
          </div>
        </div>

        {/* Operating Hours & Bot Behavior */}
        <div className="p-5 rounded-2xl bg-surface-container-low border border-outline-variant/30 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1)] flex flex-col gap-4">
          <div className="flex items-center gap-2 pb-2 border-b border-outline-variant/20">
            <span className="material-symbols-outlined text-primary text-[20px]">schedule</span>
            <h3 className="font-headline-sm text-headline-sm text-primary">Horario de Atención de Bots</h3>
          </div>

          <div className="space-y-3 font-body-sm text-body-sm">
            <div className="flex items-center justify-between">
              <span className="text-outline">Horario de Despacho Cocina</span>
              <span className="text-primary font-bold">11:30 AM - 11:00 PM</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-outline">Respuesta Fuera de Horario</span>
              <span className="text-secondary">Mensaje automático con toma de pedido programado</span>
            </div>
            <div className="p-3 rounded-xl bg-surface-container-lowest border border-outline-variant/30 text-outline text-xs">
              Los bots continúan respondiendo consultas de menú y aceptando pedidos anticipados 24/7 sin interrumpir la cola de cocina.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

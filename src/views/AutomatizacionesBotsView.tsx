import React, { useState } from 'react';
import { MOCK_AUTOMATION_RULES } from '../mockData';
import { BotAutomationRule } from '../types';

export const AutomatizacionesBotsView: React.FC = () => {
  const [rules, setRules] = useState<BotAutomationRule[]>(MOCK_AUTOMATION_RULES);
  const [testRunning, setTestRunning] = useState(false);
  const [testResult, setTestResult] = useState<string | null>(null);

  const toggleRule = (id: string) => {
    setRules((prev) =>
      prev.map((r) => (r.id === id ? { ...r, enabled: !r.enabled } : r))
    );
  };

  const runTestPipeline = () => {
    setTestRunning(true);
    setTestResult(null);
    setTimeout(() => {
      setTestRunning(false);
      setTestResult(
        'Pipeline ejecutado con éxito en 0.718s. 1) OCR capturó $56.000 COP, 2) API Nequi validó token, 3) KDS recibió comanda #6592, 4) Google Sheets Fila #1.428 agregada.'
      );
    }, 1200);
  };

  return (
    <div className="flex flex-col w-full h-[calc(100vh-4rem)] overflow-y-auto p-space-lg bg-surface">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-6 gap-4 border-b border-outline-variant/30">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="font-headline-lg text-headline-lg text-primary tracking-tight">Automatizaciones & Bots</h2>
            <span className="px-2.5 py-0.5 rounded-full bg-surface-container-high border border-outline-variant/40 text-primary font-label-sm text-label-sm uppercase">
              Motor v2.4 Activo
            </span>
          </div>
          <p className="font-body-sm text-body-sm text-secondary mt-1">
            Reglas de decisión determinísticas y agentes LLM para procesamiento sin fricción de pedidos, pagos y cocina.
          </p>
        </div>

        <button
          onClick={runTestPipeline}
          disabled={testRunning}
          className="px-4 py-2 rounded-xl bg-primary text-on-primary font-label-md text-label-md font-bold shadow-[0_0_16px_rgba(255,255,255,0.25)] hover:bg-[#e2e2e2] flex items-center gap-2 transition-all cursor-pointer"
        >
          {testRunning ? (
            <>
              <span className="w-4 h-4 rounded-full border-2 border-on-primary border-t-transparent animate-spin"></span>
              <span>Ejecutando Test Webhook...</span>
            </>
          ) : (
            <>
              <span className="material-symbols-outlined text-[18px]">play_arrow</span>
              <span>Probar Pipeline Completo</span>
            </>
          )}
        </button>
      </div>

      {/* Test Result Banner */}
      {testResult && (
        <div className="mt-4 p-4 rounded-2xl bg-surface-container-high border border-[#4ade80]/40 text-[#4ade80] shadow-[0_4px_20px_rgba(0,0,0,0.4)] font-body-sm text-body-sm flex items-start gap-3 animate-in fade-in">
          <span className="material-symbols-outlined text-[20px] text-[#4ade80] flex-none">task_alt</span>
          <div className="flex-1">
            <span className="font-bold text-primary block mb-0.5">Test de Integración Exitoso:</span>
            <span className="text-on-surface">{testResult}</span>
          </div>
        </div>
      )}

      {/* Automation Architecture Flow Diagram */}
      <div className="mt-6 p-5 rounded-2xl bg-surface-container-low border border-outline-variant/30 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1)]">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-headline-sm text-headline-sm text-primary">Flujo de Automatización en Cascada</h3>
          <span className="font-label-sm text-label-sm text-outline">Latencia Global Target: &lt; 1.0s</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-3 relative">
          {[
            { step: '01', title: 'Mensaje Inbound', desc: 'WhatsApp Cloud / IG Graph', icon: 'chat' },
            { step: '02', title: 'OCR & API Nequi', desc: 'Cotejo Hash & Monto en 0.7s', icon: 'bolt' },
            { step: '03', title: 'KDS Cocina', desc: 'Comanda a Impresora Térmica', icon: 'restaurant' },
            { step: '04', title: 'Google Sheets', desc: 'Inserta fila en Octubre_Ventas', icon: 'table_chart' },
            { step: '05', title: 'Factura DIAN', desc: 'Genera CUFE & Notifica Comensal', icon: 'receipt' },
          ].map((node, i) => (
            <div
              key={i}
              className="p-3.5 rounded-xl bg-surface-container-lowest border border-outline-variant/30 flex flex-col justify-between gap-2 shadow-[0_2px_8px_rgba(0,0,0,0.3)] relative group hover:border-primary/40 transition-colors"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-outline text-[11px] font-bold">Paso {node.step}</span>
                <span className="material-symbols-outlined text-primary text-[18px]">{node.icon}</span>
              </div>
              <div>
                <div className="font-label-md text-label-md text-primary font-bold">{node.title}</div>
                <div className="font-body-sm text-[12px] text-outline mt-0.5">{node.desc}</div>
              </div>
              <div className="w-full h-1 rounded-full bg-primary/20 overflow-hidden">
                <div className="w-full h-full bg-primary rounded-full animate-pulse"></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Rules list */}
      <div className="mt-6 space-y-4">
        <h3 className="font-headline-sm text-headline-sm text-primary">Reglas Activas y Parámetros</h3>

        <div className="grid grid-cols-1 gap-4">
          {rules.map((rule) => (
            <div
              key={rule.id}
              className="p-5 rounded-2xl bg-surface-container-low border border-outline-variant/30 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08)] flex flex-col md:flex-row items-start md:items-center justify-between gap-4 transition-all hover:bg-surface-container"
            >
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-surface-container-highest border border-outline-variant/40 flex items-center justify-center text-primary flex-none">
                  <span className="material-symbols-outlined text-[20px]">
                    {rule.category === 'pagos'
                      ? 'account_balance_wallet'
                      : rule.category === 'cocina'
                      ? 'restaurant'
                      : rule.category === 'sheets'
                      ? 'table_chart'
                      : rule.category === 'handoff'
                      ? 'support_agent'
                      : 'receipt_long'}
                  </span>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center gap-2.5">
                    <h4 className="font-headline-sm text-[17px] text-primary font-bold">{rule.name}</h4>
                    <span className="px-2 py-0.5 rounded-full bg-surface-container-lowest text-outline font-label-sm text-label-sm uppercase">
                      {rule.category}
                    </span>
                  </div>
                  <p className="font-body-sm text-body-sm text-secondary max-w-2xl">{rule.description}</p>
                  <div className="flex flex-wrap items-center gap-4 pt-1 font-label-sm text-label-sm text-outline">
                    <span className="flex items-center gap-1">
                      <span className="material-symbols-outlined text-[14px]">tune</span> Disparador: {rule.triggers}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1 text-primary">
                      <span className="material-symbols-outlined text-[14px]">timer</span> Latencia: {rule.latencyTarget}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1 text-[#4ade80]">
                      <span className="material-symbols-outlined text-[14px]">verified</span> Efectividad: {rule.successRate}
                    </span>
                  </div>
                </div>
              </div>

              {/* Toggle switch */}
              <div className="flex items-center gap-3 self-end md:self-center">
                <span className="font-label-sm text-label-sm text-outline">
                  {rule.enabled ? 'Habilitado' : 'Desactivado'}
                </span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={rule.enabled}
                    onChange={() => toggleRule(rule.id)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-surface-container-highest peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-primary after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary/25 shadow-[inset_0_1px_2px_rgba(0,0,0,0.6)]"></div>
                </label>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

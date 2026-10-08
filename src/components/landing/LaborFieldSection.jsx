import React from 'react';
import { Building, Store, Cpu, Truck, CheckCircle2, TrendingUp } from 'lucide-react';

export default function LaborFieldSection() {
  const fields = [
    {
      icon: Store,
      title: 'Emprende tu Propio Laboratorio',
      highlight: 'Máxima Rentabilidad',
      desc: 'El 70% de nuestros egresados aspira o concreta la apertura de su taller protésico independiente, atendiendo a múltiples clínicas y dentistas particulares.',
      tag: 'Independencia total'
    },
    {
      icon: Building,
      title: 'Clínicas y Policlínicos Dentales',
      highlight: 'Empleabilidad Estable',
      desc: 'Labora como especialista técnico de cabecera en centros odontológicos, clínicas privadas y hospitales para confección y adaptación inmediata.',
      tag: 'Planilla y beneficios'
    },
    {
      icon: Cpu,
      title: 'Centros Digitales CAD/CAM',
      highlight: 'Alta Tecnología 3D',
      desc: 'Diseñador protésico en laboratorios de última generación que emplean exocad, impresoras 3D resinosas y fresadoras de zirconio.',
      tag: 'Especialista tecnológico'
    },
    {
      icon: Truck,
      title: 'Empresas de Biomateriales y Casas Dentales',
      highlight: 'Asesoría y Representación',
      desc: 'Capacitador técnico y consultor en distribución de porcelanas, cerámicas, aleaciones metálicas e instrumental protésico internacional.',
      tag: 'Área comercial técnica'
    }
  ];

  return (
    <section className="py-16 sm:py-20 bg-[#0a1226] border-y border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-500/10 text-amber-400 border border-amber-500/30 mb-3 uppercase tracking-wider">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>Futuro Profesional Asegurado</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-bold text-white mb-4">
            ¿Dónde Podrás Trabajar al <span className="gold-gradient-text">Graduarte</span>?
          </h2>
          <p className="text-sm sm:text-base text-slate-300">
            La prótesis dental es una de las profesiones con menor saturación laboral y mayor margen de ganancia independiente en el sector salud.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {fields.map((f, idx) => {
            const Icon = f.icon;
            return (
              <div
                key={idx}
                className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between hover:border-amber-400/40 transition-all hover:-translate-y-1"
              >
                <div>
                  <div className="p-3 w-fit rounded-xl bg-amber-500/10 text-amber-400 mb-4">
                    <Icon className="w-6 h-6" />
                  </div>

                  <span className="text-[10px] uppercase tracking-wider font-bold text-emerald-400 block mb-1">
                    {f.highlight}
                  </span>

                  <h3 className="text-lg font-bold text-white mb-2.5">
                    {f.title}
                  </h3>

                  <p className="text-xs text-slate-300 leading-relaxed mb-4">
                    {f.desc}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
                  <span className="text-slate-400">{f.tag}</span>
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

import React from 'react';
import { Camera, Star, Users, MapPin, Quote, Sparkles } from 'lucide-react';

export default function SocialProofGallerySection() {
  const testimonials = [
    {
      name: 'Christian Farro R.',
      role: 'Egresado • Propietario de Laboratorio Farro Dent (Chiclayo)',
      comment: 'Gracias a las certificaciones modulares del Instituto Emanuel, empecé a confeccionar prótesis removibles para 3 consultorios desde el 2do año. Hoy tengo mi propio laboratorio y clientes fijos en Chiclayo y Lambayeque.',
      rating: 5
    },
    {
      name: 'María del Pilar S.',
      role: 'Estudiante Ciclo IV • Modalidad Semipresencial',
      comment: 'La flexibilidad para los que trabajamos es excelente. Reviso la teoría en la plataforma virtual y los fines de semana voy a los talleres prácticos. Los profesores tienen muchísima paciencia y experiencia real.',
      rating: 5
    },
    {
      name: 'Javier Huamán T.',
      role: 'Técnico Especialista en Prótesis Fija',
      comment: 'El título a Nombre de la Nación (Código Modular 1739887) me abrió las puertas de inmediato en una de las clínicas más reconocidas del norte. Recomiendo Emanuel 100%.',
      rating: 5
    }
  ];

  const galleryItems = [
    {
      title: 'Taller de Prótesis Removible y Acrilizado',
      desc: 'Mesas de trabajo individuales con instrumental y micromotores de alta revolución.',
      tag: 'Sede Chiclayo'
    },
    {
      title: 'Laboratorio de Cerámica Dental y Metalurgia',
      desc: 'Hornos de cocción y colado para elaboración de coronas de alta precisión estética.',
      tag: 'Equipamiento Profesional'
    },
    {
      title: 'Ceremonia de Entrega de Certificaciones Modulares',
      desc: 'Reconocimiento oficial a los estudiantes tras completar satisfactoriamente cada ciclo.',
      tag: 'Comunidad Emanuel'
    }
  ];

  return (
    <section className="py-16 sm:py-24 bg-[#080d1a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-500/10 text-amber-400 border border-amber-500/30 mb-3 uppercase tracking-wider">
            <Users className="w-3.5 h-3.5" />
            <span>Experiencia y Resultados Comprobados</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-bold text-white mb-4">
            Nuestros Talleres y la Voz de <span className="gold-gradient-text">Nuestra Comunidad</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-300">
            Formación práctica real con acompañamiento cercano. Conoce cómo se forman los futuros profesionales técnicos en Chiclayo.
          </p>
        </div>

        {/* Practical Experience Visual Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {galleryItems.map((item, idx) => (
            <div
              key={idx}
              className="bg-slate-900/90 border border-slate-800 rounded-2xl overflow-hidden hover:border-amber-500/40 transition-all group"
            >
              {/* Visual simulated header block */}
              <div className="h-44 bg-gradient-to-br from-blue-950 via-slate-900 to-[#080d1a] relative flex items-center justify-center p-6 border-b border-slate-800">
                <div className="text-center space-y-2">
                  <div className="inline-flex p-3 rounded-2xl bg-amber-500/10 text-amber-400 group-hover:scale-110 transition-transform">
                    <Camera className="w-8 h-8" />
                  </div>
                  <span className="block text-[11px] font-bold uppercase tracking-wider text-amber-400">
                    {item.tag}
                  </span>
                </div>
                <div className="absolute top-3 right-3 flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-950/80 border border-slate-700 text-[10px] text-slate-300">
                  <MapPin className="w-3 h-3 text-red-400" />
                  <span>Chiclayo</span>
                </div>
              </div>

              <div className="p-5">
                <h3 className="text-base font-bold text-white mb-2 group-hover:text-amber-300 transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, idx) => (
            <div
              key={idx}
              className="bg-slate-900/70 border border-slate-800/80 rounded-2xl p-6 relative flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <Quote className="w-6 h-6 text-slate-700" />
                </div>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed italic mb-6">
                  &ldquo;{t.comment}&rdquo;
                </p>
              </div>

              <div className="pt-4 border-t border-slate-800">
                <p className="text-sm font-bold text-white">{t.name}</p>
                <p className="text-xs text-amber-400">{t.role}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

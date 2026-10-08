import React from 'react';
import { useRouter } from '../../context/RouterContext';
import { Shield, Phone, Mail, MapPin, Award, Lock } from 'lucide-react';

export default function Footer() {
  const { navigate } = useRouter();

  return (
    <footer id="contacto" className="bg-[#050811] text-slate-400 border-t border-slate-800 py-10 md:py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 pb-8 md:pb-10 border-b border-slate-800/60">
          
          {/* Institution Info */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <img
                src="/logo_3d.png"
                alt="Instituto Emanuel Chiclayo"
                className="h-16 w-auto object-contain"
              />
              <div>
                <span className="font-cinzel text-lg font-bold text-white block">
                  INSTITUTO EMANUEL
                </span>
                <span className="text-xs text-amber-400 font-semibold tracking-wider uppercase block">
                  Educación Superior Tecnológica
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-sm">
              Institución líder en la formación de profesionales técnicos en el rubro odontológico y protésico. Titulación a Nombre de la Nación con Código Modular MINEDU N° 1739887.
            </p>

            <div className="flex items-center gap-2 text-xs text-slate-300">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
              <span>Chiclayo • Lambayeque, Perú</span>
            </div>
          </div>

          {/* Academic Programs */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Oferta Formativa Oficial
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#carrera" className="hover:text-amber-400 transition-colors">
                  Carrera Profesional en Prótesis Dental (3 Años)
                </a>
              </li>
              <li>
                <a href="#certificaciones" className="hover:text-amber-400 transition-colors">
                  Certificaciones Modulares Oficiales
                </a>
              </li>
              <li>
                <a href="#cursos" className="hover:text-amber-400 transition-colors">
                  Especialización en Zirconio Dental y CAD/CAM
                </a>
              </li>
              <li>
                <a href="#cursos" className="hover:text-amber-400 transition-colors">
                  Auxiliar de Clínica y Laboratorio Protésico
                </a>
              </li>
              <li>
                <a href="#modalidades" className="hover:text-amber-400 transition-colors">
                  Modalidad Semipresencial y 100% Virtual
                </a>
              </li>
            </ul>
          </div>

          {/* Contact & Administrative Link */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Atención y Admisiones
            </h4>
            <div className="space-y-2.5 text-xs">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>Calle Justicia 182, Urb. Túpac Amaru, Chiclayo</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-blue-400 shrink-0" />
                <a href="tel:074224455" className="hover:text-white transition-colors">
                  Teléfono fijo: (074) 224455
                </a>
              </div>
              <div className="flex items-start gap-2">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <span className="block text-[11px] text-slate-400">Líneas móviles de admisión:</span>
                  <div className="flex flex-col gap-0.5 mt-0.5 font-medium">
                    <a href="tel:+51937367915" className="hover:text-emerald-400 transition-colors">
                      937 367 915
                    </a>
                    <a href="tel:+51969890228" className="hover:text-emerald-400 transition-colors">
                      969 890 228
                    </a>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2 pt-1">
                <Award className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Código Modular MINEDU: <strong>1739887</strong></span>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={() => navigate('/admin')}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-800 text-[11px] font-medium transition-colors"
              >
                <Lock className="w-3 h-3 text-amber-400" />
                <span>Acceso Administrativo (/admin)</span>
              </button>
            </div>
          </div>

        </div>

        {/* Legal & Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-400">
          <p>© {new Date().getFullYear()} Instituto de Educación Superior Tecnológico Privado Emanuel. Todos los derechos reservados.</p>
          <div className="flex items-center gap-4">
            <span>Ley N° 29733 (Protección de Datos Personales)</span>
            <span>•</span>
            <span>Código Modular N° 1739887</span>
            <span>•</span>
            <span>Chiclayo, Perú</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

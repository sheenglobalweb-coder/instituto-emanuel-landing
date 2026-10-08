import React from 'react';
import { MessageCircle } from 'lucide-react';

export default function WhatsAppFloat() {
  const defaultNumber = '51974123456';
  const message = '¡Hola Instituto Emanuel! Deseo información sobre la carrera de Prótesis Dental y vacantes disponibles en Chiclayo.';
  const whatsappUrl = `https://wa.me/${defaultNumber}?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-transform flex items-center justify-center group"
      aria-label="Atención por WhatsApp"
      title="Chatear con Admisión por WhatsApp"
    >
      <MessageCircle className="w-7 h-7 fill-white" />
      <span className="sr-only">Atención por WhatsApp</span>
    </a>
  );
}

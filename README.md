# Instituto de Educación Superior Tecnológico Privado Emanuel — SPA Web & Admin Panel

Aplicación Web SPA de alta conversión y Panel Administrativo desarrollada con **React**, **Vite** y **Tailwind CSS** para el **Instituto Superior Privado Emanuel** (Chiclayo, Lambayeque — Código Modular MINEDU N° 1739887).

---

## 🚀 Arquitectura y Tecnologías

- **Frontend:** React 18 + Vite 5 + Tailwind CSS v3
- **Tipografías:** Cinzel (identidad institucional clásica) + Montserrat (legibilidad moderna)
- **Paleta de Color:** Azul Real Institucional (`#080d1a`, `#0f1c3f`) y Acentos Dorados (`#d4af37`, `#fae39a`)
- **Iconografía:** Lucide React
- **Base de Datos & Sincronización:** Supabase (`@supabase/supabase-js`) + almacenamiento reactivo local híbrido con caché
- **Reportes:** SheetJS (`xlsx`) para exportación directa a Microsoft Excel (.xlsx) y CSV con codificación UTF-8
- **Efectos:** Canvas Confetti en confirmación de postulación

---

## 🎯 Módulos de la Landing Page (11 Módulos de Captación)

Inspirada en los estándares de conversión de instituciones académicas líderes (Certus):

1. **Top Banner de Urgencia:** Convocatoria Admisión 2026, aviso de vacantes limitadas y facilidades de pronto pago.
2. **Navbar Institucional:** Logotipo 3D, navegación suave por anclas, contacto directo por WhatsApp y acceso directo al panel administrativo (`/admin`).
3. **Hero Section con Formulario Flotante Mobile-First:**
   - Propuesta de valor contundente: Carrera Técnica de Prótesis Dental en 3 Años con Título a Nombre de la Nación.
   - Formulario de alta conversión con validaciones estrictas: DNI peruano (8 dígitos), Celular (9 dígitos con formato +51), selector de modalidad y programa.
   - Captura automática e invisible de parámetros UTM (`utm_source`, `utm_medium`, `utm_campaign`, etc.) de Meta Ads, Google Ads o TikTok.
4. **Switch Interactivo de Modalidades:** Pestañas interactivas entre **Semipresencial en Chiclayo** (teoría virtual + talleres prácticos en sede) y **100% Virtual** (campus digital 24/7).
5. **Ficha de Carrera y Malla Curricular Interactiva:** Desglose módulo por módulo formativo según estándares MINEDU con botón de descarga del plan de estudios en PDF.
6. **Certificaciones Modulares Progresivas:** Permite al alumno trabajar desde el segundo ciclo (Auxiliar de Laboratorio, Especialista en Prótesis Fijas y Titulación Oficial).
7. **Catálogo de Formación Continua:** Cursos cortos y diplomados (Zirconio Dental CAD/CAM, Auxiliar de Clínica, Farmacología, Gestión y Finanzas).
8. **Campo Laboral y Empleabilidad:** Oportunidades en laboratorios propios independientes, clínicas privadas y centros 3D.
9. **Prueba Social, Talleres y Testimonios:** Respaldo fotográfico y opiniones de egresados y alumnos en Chiclayo.
10. **Facilidades Económicas:** Matrícula fraccionada, cuotas fijas congeladas y asesoría personalizada.
11. **Acordeón de Preguntas Frecuentes (FAQ):** Respuestas oficiales a dudas de titulación MINEDU, talleres y materiales.
12. **WhatsApp Flotante y Pantalla de Gracias (Thank You Modal):** Botón flotante pulsante y acelerador de conversión para iniciar chat con asesor de secretaría inmediatamente.

---

## 🛡️ Panel Administrativo Privado (`/admin`)

Diseñado específicamente para la gestión operativa del equipo de Admisiones y la Dirección:

### Niveles de Acceso y Roles

| Rol | Usuario | Contraseña | Permisos |
| :--- | :--- | :--- | :--- |
| **Super Admin** | `admin` | `admin2026` | Control total: edición de datos, eliminación de registros (spam/pruebas), gestión de usuarios y acceso a script SQL de Supabase. |
| **Admin Básico** | `secretaria` | `secretaria2026` | Secretaría de admisión: visualización en tiempo real, filtros, contacto a 1 clic por WhatsApp/llamada, actualización de estado a "Contactado" y exportación a Excel. *(Restringido: no puede borrar registros).* |

### Funcionalidades del Panel

- **KPIs y Métricas en Tiempo Real:** Total de postulantes, prospectos de hoy (lista de llamadas diarias), contactados, matriculados y tasa de conversión.
- **Buscador en Vivo:** Búsqueda instantánea por Nombres, Apellidos, DNI o Teléfono.
- **Filtros Temporales y Académicos:** Por fecha (*Hoy, Esta semana, Este mes, Histórico*), por modalidad, por especialidad y por estado.
- **Contacto Rápido a 1 Clic (WhatsApp):** Botón directo que abre el chat de WhatsApp con un mensaje institucional personalizado pre-redactado listo para enviar al postulante.
- **Exportación a Excel / CSV:** Descarga en formato nativo `.xlsx` de Microsoft Excel respetando los filtros activos.
- **Sincronización Cloud Supabase & Modal SQL:** Visualizador de estado y script SQL de 1 clic para configurar políticas RLS en la base de datos de Supabase.

---

## 🛠️ Comandos de Ejecución

### Modo Desarrollo
```bash
npm run dev
```

### Compilación para Producción
```bash
npm run build
```

### Previsualización Local del Build
```bash
npm run preview
```

---

## ☁️ Despliegue en Cloudflare Pages / Wrangler

El proyecto incluye el archivo `public/_redirects` configurado para compatibilidad con SPAs:
```bash
npx wrangler pages deploy dist --project-name=instituto-emanuel
```

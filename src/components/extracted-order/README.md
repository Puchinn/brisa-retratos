# Extracted Order Wizard

Carpeta que contiene la funcionalidad "Encargar una obra" (wizard paso a paso) extraída del proyecto.

Contenido:

- `order-wizard.tsx` — componente principal del wizard que exporta la interfaz `OrderData`.
- `order-button-complete.tsx` — botón/modal compacto (versión simplificada).
- `wizard-steps/` — carpetas con los componentes de cada paso (photos, style, size, extras, shipping, summary, payment, confirmation).
- `lib/submit-order.ts` — stub local que simula el envío del pedido (reemplazar por integración real).
- `index.tsx` — exporta `OrderWizard` y `OrderButtonComplete`.

Requisitos al mover a otro proyecto:

- Estos componentes usan varias primitives de UI del proyecto original, por ejemplo imports como `@/components/ui/button`, `@/components/ui/dialog`, etc. Debes mapear esos imports a los componentes equivalentes en tu nuevo proyecto o reemplazarlos.
- El archivo `wizard-steps/step-confirmation.tsx` importa `submitOrder` desde `../lib/submit-order` (stub local). Reemplázalo por tu llamada a API/servidor o adapta para usar Supabase/axios/fetch según tu backend.
- Asegúrate de copiar también las assets (imágenes) usadas por los pasos o actualiza las rutas.

Cómo integrar rápidamente:

1. Copia la carpeta `components/extracted-order` a tu nuevo proyecto.
2. Reemplaza los imports de UI (por ejemplo `@/components/ui/button`) por tus componentes (o crea un pequeño wrapper con las mismas APIs).
3. Reemplaza `lib/submit-order.ts` por la implementación real (o modifica `step-confirmation.tsx` para llamar a tu endpoint).
4. Importa `OrderWizard` desde `components/extracted-order` y úsalo en tu página: `import { OrderWizard } from 'components/extracted-order'`.

Notas:

- Mantuvimos las imports internas entre los archivos (rutas relativas) para que la carpeta sea autocontenida.
- Para compatibilidad TypeScript, verifica `tsconfig` paths o actualiza los imports si tu proyecto no usa `@/` alias.

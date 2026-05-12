# UI Contract: Simulation Flow Screens

## Scope
Contrato de interfaz para el flujo de simulacion de invernadero y su navegacion operativa.

## Screen: Iniciar Simulador
- Visibility rules:
  - Se muestra solo cuando el invernadero esta en estado AVAILABLE.
  - Se omite cuando el invernadero esta en estado PRODUCTION.
- Must render:
  - Nombre de invernadero
  - Ubicacion
  - Lista de sensores asociados
  - Lista de actuadores asociados
  - Combo de cosechas
  - Boton "Iniciar simulacion"
  - Boton "Retroceder"
- Combo rules:
  - Solo muestra cosechas INACTIVE del usuario autenticado.

## Screen: Actuadores
- Must render:
  - Botones de actuadores asociados al invernadero de la sesion.
- Visual states:
  - Actuador apagado: color gris.
  - Actuador activo: color verde.
- Interaction rules:
  - Cada boton alterna estado activo/inactivo.

## Screen: Eventos Climaticos
- Must render:
  - Lista de eventos climaticos disponibles.
  - Control para activar/desactivar por evento.
- Interaction rules:
  - Toggle individual por evento sin afectar los demas.

## Screen: Dashboard
- Must render:
  - Resumen de simulacion activa (invernadero/cosecha/estados).
- Consistency rules:
  - Debe reflejar cambios actuales de actuadores y eventos.

## Simulation Menu
- Allowed destinations only:
  - Actuadores
  - Eventos climaticos
  - Dashboard
- Must include:
  - Boton "Salir del invernadero" en la parte inferior del menu.
- Exit behavior:
  - Redirige a la pantalla de Inicio general.

## Accessibility and UX Rules
- Todos los botones y toggles deben ser navegables por teclado.
- Los estados visuales deben tener contraste suficiente.
- El flujo no debe perder contexto de simulacion al navegar entre pantallas operativas.

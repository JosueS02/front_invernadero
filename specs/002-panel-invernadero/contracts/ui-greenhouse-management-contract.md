# UI Contract: Greenhouse Management Screens

## Scope
Contrato de interfaz para pantallas post-login: Inicio, Invernadero y Cosecha.

## Shared Topbar Contract
- Must render in all three screens:
  - Icono de menu (tres lineas) en extremo izquierdo
  - Correo de usuario autenticado en extremo derecho
  - Barra horizontal persistente
- Interaction rules:
  - Icono de menu abre/cierra listado de navegacion
  - Debe permitir acceso a Inicio, Invernadero y Cosecha
  - Si hay cambios sin guardar, debe mostrar modal de confirmacion antes de navegar

## Implemented Routes
- /inicio
- /invernadero
- /cosecha
- /gestion (redirecciona a /inicio)

## Screen: Inicio
- Must render:
  - Topbar persistente
  - Contenido de bienvenida o resumen de acceso rapido
- Interaction rules:
  - Debe permitir transicion a Invernadero y Cosecha desde menu

## Screen: Invernadero
- Must render:
  - Topbar persistente
  - Campo Nombre (obligatorio)
  - Campo Ubicacion (obligatorio)
  - Checklist Sensores: Humedad, Temperatura, Luz, CO2
  - Checklist Actuadores: Riego, Luz, Ventilacion, Extractores de Aire, Malla
- Interaction rules:
  - Submit invalido bloqueado con mensajes de validacion
  - Requiere minimo 1 sensor y 1 actuador para permitir envio

## Screen: Cosecha
- Must render:
  - Topbar persistente
  - Campo Nombre de cosecha (obligatorio)
  - Rango min/max para Temperatura (Celsius)
  - Rango min/max para Humedad (porcentaje)
  - Rango min/max para Luz (lux)
- Interaction rules:
  - Cada metrica valida regla minimo < maximo
  - Submit invalido bloqueado con mensajes claros

## Accessibility and UX Rules
- Navegacion completa por teclado para menu y campos de formulario.
- Labels asociados a todos los inputs.
- Estados de error visibles y legibles.
- Comportamiento responsive sin perdida de controles.
- Confirmacion modal para evitar perdida accidental de datos al cambiar de pantalla.

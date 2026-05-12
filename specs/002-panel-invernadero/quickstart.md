# Quickstart: Panel de Gestion de Invernadero

## Objetivo
Implementar tres pantallas post-login (Inicio, Invernadero, Cosecha) con barra superior persistente, menu de navegacion y formularios validados.

## Estado implementado
- Rutas disponibles: /inicio, /invernadero, /cosecha y /gestion (redirect)
- Topbar persistente con menu izquierdo y correo de sesion a la derecha
- Modal de confirmacion al navegar con cambios sin guardar en Invernadero/Cosecha
- Validaciones de formulario:
   - Invernadero: nombre, ubicacion, minimo 1 sensor y minimo 1 actuador
   - Cosecha: nombre requerido y regla minimo < maximo en temperatura, humedad y luz

## Pasos de implementacion sugeridos
1. Crear layout base con topbar persistente (menu izquierda, correo derecha).
2. Implementar pantalla Inicio como punto de entrada del modulo.
3. Implementar pantalla Invernadero con nombre, ubicacion y checklist de sensores/actuadores.
4. Implementar pantalla Cosecha con nombre y rangos min/max de temperatura, humedad y luz.
5. Implementar reglas de validacion para campos requeridos y condicion minimo < maximo.
6. Conectar menu a rutas Inicio, Invernadero y Cosecha.
7. Validar responsive y navegacion por teclado en topbar, menu y formularios.
8. Agregar pruebas:
   - Unitarias: validacion de rangos y formatos numericos.
   - Integracion: render de topbar/menu y envio de formularios.
   - E2E: navegacion entre pantallas y bloqueos por errores.

## Criterios de verificacion rapida
- Topbar visible en las tres pantallas.
- Icono de menu en izquierda y correo en derecha.
- Menu navega en una accion a Inicio, Invernadero y Cosecha.
- Invernadero no permite envio sin nombre/ubicacion.
- Invernadero no permite envio sin sensor y actuador seleccionados.
- Cosecha no permite envio si minimo >= maximo en cualquier metrica.
- Navegacion con formulario editado muestra confirmacion para descartar cambios o permanecer.

## Comandos de validacion
1. Desde la carpeta frontend ejecutar: `npm install`
2. Ejecutar unitarias/integracion: `npm run test`
3. Ejecutar E2E: `npm run test:e2e`
4. Ejecutar build: `npm run build`

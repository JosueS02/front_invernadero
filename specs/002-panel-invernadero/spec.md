# Feature Specification: Panel de Gestion de Invernadero

**Feature Branch**: `002-panel-invernadero`  
**Created**: 2026-04-06  
**Status**: Draft  
**Input**: User description: "Crea tres pantallas pantallas, despues de haber iniciado la barra horizontal tendra en la parte derechea el correo del que ingreso, y en la parte de la izquierda las tres lineas de menu, ahora si las pantallas, primero sera un formulario de cosecha donde se pedira el nombre del la cosecha, su temperatura (Celsius), humedad (porcentaje) y Luz(lux) tanto minimo como maximo de cada uno. la otra pantalla es para crear un invernadero que tendra tanto ubicacion como nombre, ademas un pequeño checklist donde elegiria que sensores y que actuadres estaran disponible ahi. y por ultimo la ultima pantalla tendra la de un menu para el manejo de las pantallas. (Tendra la del invernadero, inicio, cosecha)"

## Clarifications

### Session 2026-04-06

- Q: Al crear invernadero, se debe exigir seleccion minima de sensores/actuadores? → A: Requerir minimo 1 sensor y 1 actuador.
- Q: Si el usuario cambia de pantalla con formulario incompleto o editado, que debe pasar? → A: Mostrar modal de confirmacion para descartar cambios o permanecer en la pantalla.

## User Scenarios & Testing *(mandatory)*

<!--
  IMPORTANT: User stories should be PRIORITIZED as user journeys ordered by importance.
  Each user story/journey must be INDEPENDENTLY TESTABLE - meaning if you implement just ONE of them,
  you should still have a viable MVP (Minimum Viable Product) that delivers value.
  
  Assign priorities (P1, P2, P3, etc.) to each story, where P1 is the most critical.
  Think of each story as a standalone slice of functionality that can be:
  - Developed independently
  - Tested independently
  - Deployed independently
  - Demonstrated to users independently
-->

### User Story 1 - Crear Invernadero con Configuracion Base (Priority: P1)

Como usuario autenticado, quiero crear un invernadero con nombre, ubicacion y seleccion de sensores/actuadores para definir la configuracion operativa inicial.

**Why this priority**: Es el paso fundacional; sin invernadero configurado no existe base para administrar cosechas ni monitoreo.

**Independent Test**: Se valida entrando a la pantalla de invernadero, completando nombre/ubicacion, seleccionando al menos un elemento de checklist y confirmando envio exitoso.

**Acceptance Scenarios**:

1. **Given** que el usuario esta autenticado, **When** abre la pantalla de crear invernadero, **Then** ve campos de nombre y ubicacion con un checklist de sensores y actuadores.
2. **Given** que el usuario completa los campos obligatorios y selecciona opciones del checklist, **When** confirma creacion, **Then** el sistema procesa el alta de invernadero.
3. **Given** que faltan campos obligatorios, **When** intenta confirmar, **Then** el sistema impide el envio y muestra validaciones.

---

### User Story 2 - Configurar Parametros de Cosecha (Priority: P2)

Como usuario autenticado, quiero registrar una cosecha con rangos minimos y maximos de temperatura, humedad y luz para establecer objetivos de control ambiental.

**Why this priority**: Permite el manejo operativo de la produccion una vez que el invernadero ya existe.

**Independent Test**: Se valida entrando a la pantalla de cosecha, cargando nombre y rangos para temperatura/humedad/luz, y verificando que el formulario se envía solo cuando los minimos y maximos son coherentes.

**Acceptance Scenarios**:

1. **Given** que el usuario accede a la pantalla de cosecha, **When** visualiza el formulario, **Then** encuentra nombre de cosecha y campos min/max para temperatura (Celsius), humedad (%) y luz (lux).
2. **Given** que el usuario completa valores validos, **When** guarda la cosecha, **Then** el sistema registra la configuracion.
3. **Given** que un minimo supera su maximo, **When** intenta guardar, **Then** el sistema bloquea el envio y muestra el error correspondiente.

---

### User Story 3 - Navegar por Menu Principal de Gestion (Priority: P3)

Como usuario autenticado, quiero una barra horizontal persistente con menu a la izquierda (icono de tres lineas), correo a la derecha y acceso a Inicio, Invernadero y Cosecha para navegar rapidamente.

**Why this priority**: Mejora la usabilidad general y conecta todos los flujos funcionales en una experiencia continua.

**Independent Test**: Se valida desde cualquier pantalla comprobando que la barra superior muestra icono/menu, correo del usuario y permite navegar entre Inicio, Invernadero y Cosecha.

**Acceptance Scenarios**:

1. **Given** que el usuario inicia sesion, **When** ingresa al modulo principal, **Then** visualiza barra horizontal con menu a la izquierda y correo a la derecha.
2. **Given** que el usuario abre el menu, **When** selecciona Inicio, Invernadero o Cosecha, **Then** el sistema navega a la pantalla correspondiente.
3. **Given** que el usuario cambia entre pantallas, **When** se renderiza cada vista, **Then** la barra superior se mantiene visible y consistente.
4. **Given** que el usuario tiene cambios sin guardar en Invernadero o Cosecha, **When** intenta navegar a otra pantalla, **Then** el sistema muestra confirmacion para descartar cambios o permanecer.

---

### Edge Cases

- El correo del usuario no esta disponible al cargar la barra.
- Menu de tres lineas no responde o no cierra correctamente en mobile.
- Usuario intenta crear invernadero sin seleccionar sensores/actuadores.
- Usuario selecciona solo sensores o solo actuadores e intenta guardar.
- Campos numericos con texto no numerico o valores negativos.
- Minimo igual o mayor que maximo en temperatura, humedad o luz.
- Cambios de pantalla con datos sin guardar y cierre accidental del formulario.

## Requirements *(mandatory)*

<!--
  ACTION REQUIRED: The content in this section represents placeholders.
  Fill them out with the right functional requirements.
-->

### Functional Requirements

- **FR-001**: El sistema DEBE mostrar tres pantallas posteriores al inicio de sesion: Inicio, Invernadero y Cosecha.
- **FR-002**: La barra horizontal superior DEBE permanecer visible en las tres pantallas.
- **FR-003**: La barra superior DEBE mostrar icono de menu (tres lineas) a la izquierda y correo del usuario autenticado a la derecha.
- **FR-004**: El menu DEBE permitir navegacion a Inicio, Invernadero y Cosecha.
- **FR-005**: La pantalla de Invernadero DEBE incluir campo de nombre y campo de ubicacion obligatorios.
- **FR-006**: La pantalla de Invernadero DEBE incluir checklist para sensores disponibles (Humedad, Temperatura, Luz, CO2).
- **FR-007**: La pantalla de Invernadero DEBE incluir checklist para actuadores disponibles (Riego, Luz, Ventilacion, Extractores de Aire, Malla).
- **FR-007A**: El sistema DEBE requerir al menos 1 sensor y 1 actuador seleccionados para permitir crear invernadero.
- **FR-008**: La pantalla de Cosecha DEBE incluir nombre de cosecha obligatorio.
- **FR-009**: La pantalla de Cosecha DEBE solicitar temperatura minima y maxima en Celsius.
- **FR-010**: La pantalla de Cosecha DEBE solicitar humedad minima y maxima en porcentaje.
- **FR-011**: La pantalla de Cosecha DEBE solicitar luz minima y maxima en lux.
- **FR-012**: El sistema DEBE validar que cada minimo sea menor que su maximo antes de enviar.
- **FR-013**: El sistema DEBE bloquear envio cuando existan campos vacios obligatorios o formatos invalidos.
- **FR-014**: El sistema DEBE conservar consistencia visual y responsiva entre las tres pantallas.
- **FR-015**: El sistema DEBE mostrar confirmacion antes de navegar si existen cambios sin guardar en formularios de Invernadero o Cosecha.

### Key Entities *(include if feature involves data)*

- **Sesion de Usuario**: Estado de autenticacion con correo visible en la barra superior.
- **Invernadero**: Configuracion principal con nombre, ubicacion, sensores habilitados y actuadores habilitados.
- **Cosecha**: Configuracion de cultivo con nombre y rangos min/max de temperatura, humedad y luz.
- **Elemento de Menu**: Entrada de navegacion que apunta a Inicio, Invernadero o Cosecha.

## Success Criteria *(mandatory)*

<!--
  ACTION REQUIRED: Define measurable success criteria.
  These must be technology-agnostic and measurable.
-->

### Measurable Outcomes

- **SC-001**: El 100% de sesiones autenticadas visualiza barra superior con menu izquierdo y correo derecho.
- **SC-002**: Al menos el 95% de usuarios completa alta de invernadero en un solo intento cuando ingresa datos validos.
- **SC-003**: Al menos el 95% de usuarios completa configuracion de cosecha con rangos validos en menos de 2 minutos.
- **SC-004**: El 100% de intentos con minimos/máximos invalidos es rechazado con mensaje claro de validacion.
- **SC-005**: El 100% de navegaciones desde menu llega a Inicio, Invernadero o Cosecha en una sola accion.

## Assumptions

- El usuario llega a estas pantallas ya autenticado desde el flujo de login existente.
- La pantalla Inicio actua como panel basico de acceso rapido sin logica avanzada en esta version.
- Los catalogos de sensores y actuadores estan fijos en esta fase y no requieren administracion dinamica.
- La persistencia de datos se resuelve con el mecanismo ya definido por el proyecto en iteraciones posteriores si aplica.

## Formato de IDs

- Usuarios: `USE-0001`
- Invernaderos: `INV-0001`
- Cultivos: `CRO-0001`
- Sensores: `SEN-0001`
- Plantaciones: `PLA-0001`

Regla general: prefijo por entidad + guion + numero secuencial de 4 digitos.

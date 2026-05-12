# Feature Specification: Simulacion de Invernadero

**Feature Branch**: `006-greenhouse-simulation-screens`  
**Created**: 2026-04-08  
**Status**: Draft  
**Input**: User description: "Crear 5 pantallas donde la primera pantalla dependera si el estado del invernadero es disponible, se mostrar el nombre del invernadero, su ubicacion los actuadores y sensores que estan asociados a ese y un combo box donde se eleigira la cosecha (no mostrara las cosechas que esten en un estado de Activo, solo los de Inactivo y se mostrara solo los que son asociados al usuario), y tendra un boton de iniciar simulacion y de retroceder para regresar a la pantalla de inicio, otra pantalla mostrara botones de los actuadores que se pusieron en el invernadero, gris ue no estan prendidos y verdes que si estan activos, una pantalla para mostrar una lista de eventos climaticos donde habra un boton para activarlos y desacticarlos, un dashboard y por ultimo un menu que solo accdeda esas tres pantallas el de los actuadores, listado de eventos y el dashboard"

## Clarifications

### Session 2026-04-08

- Q: Como se debe persistir el estado de actuadores/eventos durante la simulacion? → A: Opcion A - persistir cada toggle en backend al instante.
- Q: Como se obtiene la identidad de usuario para validar ownership? → A: Opcion B - derivar userId exclusivamente del contexto autenticado del backend.
- Q: Que estrategia de concurrencia se usa para cambios simultaneos de estado? → A: Opcion C - last-write-wins con updatedAt y sincronizacion inmediata en frontend.
- Q: Que comportamiento aplica cuando no hay invernaderos disponibles? → A: Opcion A - mostrar pantalla vacia con mensaje y boton para volver a inicio.
- Q: Como se maneja en UI un fallo del backend al alternar actuador/evento? → A: Opcion B - actualizacion optimista con rollback y mensaje de error.

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

### User Story 1 - Seleccionar Invernadero y Cosecha para Simulacion (Priority: P1)

Como usuario autenticado, quiero una pantalla inicial de simulacion que me muestre el invernadero disponible, sus sensores y actuadores, y una lista de cosechas inactivas asociadas a mi cuenta para poder iniciar una simulacion valida.

**Why this priority**: Es el punto de entrada del flujo y habilita que la simulacion se ejecute con datos correctos de invernadero y cosecha.

**Independent Test**: Puede validarse cargando la pantalla de simulacion inicial y verificando que filtra invernaderos por estado disponible y cosechas por estado inactivo del usuario.

**Acceptance Scenarios**:

1. **Given** que el usuario tiene uno o mas invernaderos en estado disponible, **When** abre la pantalla inicial de simulacion, **Then** el sistema muestra nombre, ubicacion, sensores y actuadores del invernadero seleccionado.
2. **Given** que el usuario tiene cosechas asociadas con estados activo e inactivo, **When** abre el combo de cosechas, **Then** solo aparecen cosechas inactivas asociadas a ese usuario.
3. **Given** que el usuario selecciona una cosecha valida, **When** pulsa iniciar simulacion, **Then** el sistema inicia el flujo de simulacion y habilita acceso a las pantallas operativas.
4. **Given** que el usuario esta en la pantalla inicial de simulacion, **When** pulsa retroceder, **Then** regresa a la pantalla de inicio general.
5. **Given** que el invernadero esta en estado produccion, **When** el usuario entra al flujo de simulacion, **Then** el sistema omite la pantalla inicial de simulador y redirige directamente a la pantalla de actuadores.

---

### User Story 2 - Controlar Actuadores durante la Simulacion (Priority: P2)

Como usuario en simulacion, quiero ver y cambiar el estado de los actuadores del invernadero para reflejar si estan activos o apagados.

**Why this priority**: Permite operar elementos clave del invernadero durante la simulacion y visualizar su estado de forma inmediata.

**Independent Test**: Puede probarse de forma aislada verificando que los actuadores se muestran y alternan entre apagado (gris) y activo (verde).

**Acceptance Scenarios**:

1. **Given** una simulacion iniciada con un invernadero valido, **When** el usuario entra a la pantalla de actuadores, **Then** ve solo los actuadores asociados a ese invernadero.
2. **Given** un actuador apagado, **When** el usuario lo activa, **Then** su estado visual cambia de gris a verde.
3. **Given** un actuador activo, **When** el usuario lo desactiva, **Then** su estado visual cambia de verde a gris.

---

### User Story 3 - Gestionar Eventos Climaticos (Priority: P3)

Como usuario en simulacion, quiero una lista de eventos climaticos con accion para activarlos o desactivarlos para simular condiciones externas del entorno.

**Why this priority**: Complementa la operacion de actuadores con factores climaticos que afectan la simulacion.

**Independent Test**: Puede validarse entrando a la pantalla de eventos climaticos, activando y desactivando eventos y verificando cambios de estado.

**Acceptance Scenarios**:

1. **Given** una simulacion activa, **When** el usuario abre la pantalla de eventos climaticos, **Then** el sistema muestra la lista de eventos disponibles.
2. **Given** un evento inactivo, **When** el usuario pulsa activar, **Then** el evento pasa a estado activo.
3. **Given** un evento activo, **When** el usuario pulsa desactivar, **Then** el evento pasa a estado inactivo.

---

### User Story 4 - Navegar por Menu de Simulacion y Dashboard (Priority: P4)

Como usuario en simulacion, quiero un menu que solo me lleve a actuadores, eventos climaticos y dashboard para mantener foco en las pantallas operativas de la simulacion.

**Why this priority**: Asegura una navegacion clara y acotada al contexto de simulacion.

**Independent Test**: Puede probarse comprobando que el menu muestra unicamente tres destinos y que cada opcion abre la pantalla correcta.

**Acceptance Scenarios**:

1. **Given** una simulacion iniciada, **When** el usuario abre el menu de simulacion, **Then** solo ve accesos a actuadores, eventos climaticos y dashboard.
2. **Given** que el usuario selecciona una opcion del menu, **When** navega, **Then** el sistema muestra la pantalla seleccionada y mantiene disponible el menu.
3. **Given** que el usuario abre dashboard, **When** revisa la pantalla, **Then** visualiza un resumen general de la simulacion activa.
4. **Given** que el usuario esta en el menu de simulacion, **When** pulsa el boton salir del invernadero al final del menu, **Then** el sistema redirige a la pantalla de inicio general.

---

### Edge Cases

<!--
  ACTION REQUIRED: The content in this section represents placeholders.
  Fill them out with the right edge cases.
-->

- No existen invernaderos en estado disponible para el usuario.
- Existen invernaderos disponibles pero no hay cosechas inactivas asociadas al usuario.
- El invernadero seleccionado cambia de estado a no disponible durante la simulacion.
- El invernadero ya se encuentra en estado produccion al entrar al flujo de simulacion y debe omitirse la pantalla inicial.
- El usuario intenta iniciar simulacion sin seleccionar cosecha valida.
- Un actuador o evento climatico falla al cambiar de estado y debe mostrarse un mensaje de fallo sin perder contexto.
- El usuario no tiene permisos sobre el invernadero o cosecha que intenta visualizar.

## Requirements *(mandatory)*

<!--
  ACTION REQUIRED: The content in this section represents placeholders.
  Fill them out with the right functional requirements.
-->

### Functional Requirements

- **FR-001**: El sistema MUST mostrar una pantalla inicial de simulacion solo cuando el invernadero seleccionado este en estado disponible.
- **FR-001a**: El sistema MUST omitir la pantalla inicial de simulador cuando el invernadero este en estado produccion y redirigir directamente a la pantalla de actuadores.
- **FR-002**: El sistema MUST mostrar en la pantalla inicial el nombre, ubicacion, sensores y actuadores del invernadero seleccionado.
- **FR-003**: El sistema MUST mostrar un combo de cosechas que incluya solo cosechas inactivas asociadas al usuario autenticado.
- **FR-004**: El sistema MUST impedir iniciar simulacion si no existe una cosecha valida seleccionada.
- **FR-005**: El sistema MUST incluir un boton de iniciar simulacion en la pantalla inicial.
- **FR-006**: El sistema MUST incluir un boton de retroceder que regrese a la pantalla de inicio general.
- **FR-007**: El sistema MUST mostrar una pantalla de actuadores con botones de todos los actuadores asociados al invernadero activo.
- **FR-008**: El sistema MUST representar visualmente actuadores apagados en gris y actuadores activos en verde.
- **FR-009**: El sistema MUST permitir activar y desactivar cada actuador individual.
- **FR-010**: El sistema MUST mostrar una pantalla de eventos climaticos con listado de eventos disponibles.
- **FR-011**: El sistema MUST permitir activar y desactivar cada evento climatico desde su pantalla.
- **FR-012**: El sistema MUST mostrar una pantalla de dashboard con informacion resumida de la simulacion activa.
- **FR-013**: El sistema MUST incluir un menu de simulacion con acceso exclusivo a actuadores, eventos climaticos y dashboard.
- **FR-013a**: El sistema MUST mostrar al final del menu de simulacion un boton salir del invernadero que redirija a la pantalla de inicio general.
- **FR-014**: El sistema MUST derivar la identidad de usuario exclusivamente del contexto autenticado del backend (token/sesion), bloquear acceso a datos que no pertenezcan a ese usuario e ignorar cualquier userId enviado por cliente para decisiones de autorizacion.
- **FR-015**: El sistema MUST mantener sincronizado el estado visible entre pantallas de actuadores, eventos climaticos y dashboard durante la simulacion aplicando estrategia last-write-wins, exponiendo `updatedAt` en las respuestas y refrescando estado en frontend tras cada toggle.
- **FR-016**: El sistema MUST definir o actualizar contrato API en OpenAPI 3 para cada endpoint modificado y mantener sincronizada la documentacion Swagger.
- **FR-017**: El sistema MUST persistir en PostgreSQL de forma inmediata cada cambio de estado (toggle) de actuadores y eventos climaticos durante la simulacion.
- **FR-018**: El sistema MUST mostrar un estado vacio cuando no existan invernaderos disponibles, incluyendo mensaje informativo y boton "Volver a inicio".
- **FR-019**: El sistema MUST aplicar actualizacion optimista en UI para toggles de actuadores y eventos climaticos, revertir al estado previo si la operacion backend falla y mostrar mensaje de error sin perder el contexto de simulacion.

### Key Entities *(include if feature involves data)*

- **Sesion de Simulacion**: Contexto activo de simulacion por usuario, vinculado a un invernadero disponible y a una cosecha inactiva seleccionada.
- **Invernadero Disponible**: Invernadero elegible para simulacion con nombre, ubicacion, estado, sensores y actuadores asociados.
- **Cosecha Inactiva**: Cosecha asociada al usuario que puede ser seleccionada para iniciar una simulacion.
- **Actuador de Simulacion**: Elemento controlable del invernadero con estado encendido o apagado y representacion visual dependiente de su estado.
- **Evento Climatico**: Evento ambiental con estado activo o inactivo que puede alterarse durante la simulacion.
- **Dashboard de Simulacion**: Vista de resumen con indicadores del estado actual de actuadores, eventos y contexto de la simulacion.

## Success Criteria *(mandatory)*

<!--
  ACTION REQUIRED: Define measurable success criteria.
  These must be technology-agnostic and measurable.
-->

### Measurable Outcomes

- **SC-001**: El 100% de las sesiones de simulacion iniciadas muestran un invernadero en estado disponible y una cosecha inactiva asociada al usuario.
- **SC-002**: Al menos el 95% de usuarios inicia simulacion en menos de 60 segundos desde que abre la pantalla inicial.
- **SC-003**: El 100% de cambios de estado en actuadores se refleja visualmente (gris o verde) en menos de 1 segundo.
- **SC-004**: El 100% de activaciones y desactivaciones de eventos climaticos actualiza su estado visible en la lista sin recargar la sesion.
- **SC-005**: El 100% de opciones del menu de simulacion apunta unicamente a actuadores, eventos climaticos y dashboard.

## Assumptions

- El usuario ya se encuentra autenticado y con sesion activa antes de entrar al flujo de simulacion.
- El estado de invernadero disponible y el estado de cosecha inactiva ya existen en el dominio funcional actual.
- El menu de simulacion es independiente del menu general de gestion y solo gobierna las tres pantallas operativas solicitadas.
- El dashboard de esta iteracion se limita a resumen de simulacion y no incluye analitica avanzada ni historicos extensos.
- Los cambios de estado durante simulacion se consideran por usuario y por sesion activa.

## Formato de IDs

- Usuarios: `USE-0001`
- Invernaderos: `INV-0001`
- Cultivos: `CRO-0001`
- Sensores: `SEN-0001`
- Plantaciones: `PLA-0001`

Regla general: prefijo por entidad + guion + numero secuencial de 4 digitos.

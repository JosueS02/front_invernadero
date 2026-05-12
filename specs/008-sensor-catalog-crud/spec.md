# Feature Specification: Catalogo de Sensores

**Feature Branch**: `008-sensor-catalog-crud`  
**Created**: 2026-04-14  
**Status**: Draft  
**Input**: User description: "crud de catalogo de sensor el cualtenga id, nombre y unidad (Pero con que ya tendran algunas ya creada de sensores como: humedad, temperatura, Luz y CO2 dle momento  no se crearan mas sensores solo  seran esos)"

## Clarifications

### Session 2026-04-14

- Q: Quien puede actualizar la unidad de sensores? -> A: Solo usuarios administradores.
- Q: Como se define la identidad de los 4 sensores base? -> A: IDs fijos predefinidos por sensor.
- Q: Como se resuelven ediciones concurrentes sobre la unidad de un sensor? -> A: Detectar conflicto por version/fecha y rechazar con error de conflicto.
- Q: Que hacer si faltan sensores base en el catalogo? -> A: Reinsertar automaticamente faltantes al arranque conservando IDs fijos.
- Q: Cuales son las unidades iniciales canonicas por sensor base? -> A: Humedad %, Temperatura °C, Luz lux, CO2 ppm.

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

### User Story 1 - Consultar Catalogo Base de Sensores (Priority: P1)

Como usuario autenticado quiero ver el catalogo de sensores para identificar los sensores disponibles en el sistema con su identificador, nombre y unidad.

**Why this priority**: Sin consulta del catalogo no hay base para operar ni validar configuraciones relacionadas a sensores.

**Independent Test**: Puede validarse abriendo la pantalla de catalogo y verificando que aparecen exactamente los sensores base con sus campos completos.

**Acceptance Scenarios**:

1. **Given** un usuario autenticado, **When** accede al catalogo de sensores, **Then** el sistema muestra una lista con `id`, `nombre` y `unidad` para cada sensor.
2. **Given** el catalogo inicial, **When** se visualiza la lista, **Then** se incluyen los sensores base: Humedad, Temperatura, Luz y CO2.

---

### User Story 2 - Actualizar Unidad de Sensor (Priority: P2)

Como usuario administrador quiero actualizar la unidad de un sensor del catalogo para mantener consistencia de representacion segun necesidad operativa.

**Why this priority**: Permite ajustar datos del catalogo sin alterar el conjunto fijo de sensores.

**Independent Test**: Puede validarse editando la unidad de un sensor existente y confirmando que el cambio se refleja en la siguiente consulta.

**Acceptance Scenarios**:

1. **Given** un usuario administrador y un sensor existente del catalogo, **When** actualiza su unidad con un valor valido, **Then** el sistema guarda el cambio y lo muestra en la lista.
2. **Given** una unidad vacia o invalida, **When** el usuario intenta guardar la actualizacion, **Then** el sistema rechaza la operacion con un mensaje claro.
3. **Given** un usuario autenticado sin rol administrador, **When** intenta actualizar la unidad de un sensor, **Then** el sistema rechaza la operacion por permisos insuficientes.

---

### User Story 3 - Proteger Catalogo Fijo (Priority: P3)

Como responsable funcional quiero que el catalogo permanezca limitado a los sensores base para evitar altas o bajas fuera del alcance actual.

**Why this priority**: Asegura control del alcance y evita inconsistencias al no permitir nuevos sensores en esta iteracion.

**Independent Test**: Puede validarse intentando crear o eliminar sensores y verificando que el sistema bloquea dichas acciones.

**Acceptance Scenarios**:

1. **Given** el catalogo fijo configurado, **When** se intenta crear un sensor nuevo, **Then** el sistema rechaza la accion e informa que el catalogo esta cerrado.
2. **Given** un sensor base existente, **When** se intenta eliminar, **Then** el sistema rechaza la accion y conserva el sensor.

---

### Edge Cases

<!--
  ACTION REQUIRED: The content in this section represents placeholders.
  Fill them out with the right edge cases.
-->

- Intento de alta de un sensor fuera del conjunto base (por ejemplo, pH).
- Intento de eliminar un sensor base del catalogo.
- Intento de actualizar unidad con texto vacio o solo espacios.
- Consulta del catalogo cuando uno de los sensores base no fue cargado correctamente.
- Intento de actualizar un sensor inexistente por `id`.
- Dos administradores editan la unidad del mismo sensor en paralelo con informacion desactualizada.
- Al iniciar el sistema, falta uno o mas sensores base por desincronizacion de datos.
- El catalogo inicia con unidades distintas a las canonicas definidas para los sensores base.

## Requirements *(mandatory)*

<!--
  ACTION REQUIRED: The content in this section represents placeholders.
  Fill them out with the right functional requirements.
-->

### Functional Requirements

- **FR-001**: El sistema MUST exponer un catalogo de sensores con campos `id`, `nombre` y `unidad`.
- **FR-002**: El sistema MUST inicializar y mantener los sensores base del catalogo: Humedad, Temperatura, Luz y CO2.
- **FR-003**: El sistema MUST permitir consultar el listado completo del catalogo de sensores.
- **FR-004**: El sistema MUST permitir actualizar la unidad de un sensor existente solo a usuarios con rol administrador.
- **FR-005**: El sistema MUST validar que la unidad no sea vacia ni contenga solo espacios al actualizar.
- **FR-006**: El sistema MUST rechazar cualquier intento de crear sensores nuevos fuera del catalogo base en esta iteracion.
- **FR-007**: El sistema MUST rechazar cualquier intento de eliminar sensores del catalogo base en esta iteracion.
- **FR-008**: El sistema MUST informar de forma explicita cuando se intente actualizar un sensor inexistente.
- **FR-009**: El sistema MUST rechazar actualizaciones de unidad solicitadas por usuarios sin rol administrador.
- **FR-010**: El sistema MUST mantener IDs fijos predefinidos para Humedad, Temperatura, Luz y CO2 en todos los entornos.
- **FR-011**: El sistema MUST detectar ediciones concurrentes de la unidad y rechazar la actualizacion cuando la version/fecha del cliente no coincida con la ultima version persistida.
- **FR-012**: El sistema MUST devolver error de conflicto con mensaje claro cuando se detecte concurrencia en actualizacion.
- **FR-013**: El sistema MUST verificar al arranque que existan los cuatro sensores base y reinsertar automaticamente los faltantes con sus IDs fijos predefinidos.
- **FR-014**: El sistema MUST inicializar las unidades canonicas de sensores base como: Humedad `%`, Temperatura `°C`, Luz `lux` y CO2 `ppm`.

### Key Entities *(include if feature involves data)*

- **SensorCatalogo**: Representa un sensor predefinido con `id`, `nombre` y `unidad`.
- **ConfiguracionCatalogo**: Regla de negocio que restringe el catalogo a un conjunto fijo de sensores permitidos en esta iteracion.

Reglas de identidad:
- Cada sensor base posee un `id` fijo y estable entre ambientes.
- Los IDs no son editables desde UI ni por operaciones de mantenimiento de catalogo.

## Success Criteria *(mandatory)*

<!--
  ACTION REQUIRED: Define measurable success criteria.
  These must be technology-agnostic and measurable.
-->

### Measurable Outcomes

- **SC-001**: El 100% de consultas al catalogo devuelve los 4 sensores base con `id`, `nombre` y `unidad`.
- **SC-002**: Al menos el 95% de actualizaciones validas de unidad se reflejan en el catalogo en menos de 2 segundos.
- **SC-003**: El 100% de intentos de crear o eliminar sensores en esta iteracion es rechazado con mensaje claro.
- **SC-004**: El 100% de intentos de actualizar sensores inexistentes retorna respuesta de error controlado.
- **SC-005**: El 100% de despliegues mantiene los mismos IDs para Humedad, Temperatura, Luz y CO2 sin regeneracion por entorno.
- **SC-006**: El 100% de conflictos de edicion concurrente se detecta y responde como conflicto controlado, sin sobrescritura silenciosa.
- **SC-007**: El 100% de arranques con catalogo incompleto recupera automaticamente los sensores base faltantes antes de atender operaciones.
- **SC-008**: El 100% de inicializaciones de catalogo crea o corrige unidades base con el set canonico `%`, `°C`, `lux`, `ppm` segun sensor.

## Assumptions

<!--
  ACTION REQUIRED: The content in this section represents placeholders.
  Fill them out with the right assumptions based on reasonable defaults
  chosen when the feature description did not specify certain details.
-->

- Se reutiliza el mecanismo de autenticacion existente para acceso al catalogo.
- El sistema de autorizacion vigente distingue rol administrador para operaciones de mantenimiento.
- Los IDs fijos de sensores base se gestionan como datos semilla controlados por el sistema.
- El cliente envia metadata de version o fecha de ultima actualizacion para control de concurrencia.
- El proceso de inicializacion de datos de catalogo se ejecuta en cada arranque de la aplicacion.
- Las unidades canonicas definidas son `%` para Humedad, `°C` para Temperatura, `lux` para Luz y `ppm` para CO2.
- El alcance de esta iteracion no incluye alta de nuevos sensores ni eliminacion de sensores base.
- Los nombres de sensores base (Humedad, Temperatura, Luz, CO2) se consideran parte del dominio fijo actual.

## Formato de IDs

- Usuarios: `USE-0001`
- Invernaderos: `INV-0001`
- Cultivos: `CRO-0001`
- Sensores: `SEN-0001`
- Plantaciones: `PLA-0001`

Regla general: prefijo por entidad + guion + numero secuencial de 4 digitos.

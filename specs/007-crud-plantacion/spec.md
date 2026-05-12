# Feature Specification: CRUD de Plantacion

**Feature Branch**: `007-crud-plantacion`  
**Created**: 2026-04-09  
**Status**: Draft  
**Input**: User description: "Un crud de plantacion donde tendra pk, foreign key de invernadero y cultivo, fecha plantado, fecha finalizado y estado (Activo o Inactivo)"

## Clarifications

### Session 2026-04-13

- Q: Cuando el estado sea `Inactivo`, la `fechaFinalizado` debe ser obligatoria o puede quedar vacia? -> A: Debe ser obligatoria.
- Q: La accion de eliminar plantacion debe borrar el registro o manejarse como baja logica? -> A: Baja logica (estado `Inactivo`).
- Q: Debe permitirse mas de una plantacion activa para la misma combinacion invernadero+cultivo? -> A: No, solo una activa por combinacion invernadero+cultivo.
- Q: `fechaPlantado` y `fechaFinalizado` deben guardarse solo como fecha o con fecha y hora? -> A: Fecha y hora local (`YYYY-MM-DDTHH:mm`).
- Q: Como debe comportarse el listado principal respecto a estados? -> A: Mostrar `Activas` por defecto y permitir filtro a `Todas` e `Inactivas`.

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

### User Story 1 - Registrar Plantacion (Priority: P1)

Como usuario autenticado quiero registrar una plantacion asociada a un invernadero y un cultivo para iniciar su seguimiento operativo.

**Why this priority**: Sin la creacion de plantaciones no existe flujo base de negocio para administrar el ciclo de produccion.

**Independent Test**: Puede probarse creando una plantacion desde formulario con invernadero, cultivo, fecha de plantado y estado, y verificando que aparece guardada con identificador unico.

**Acceptance Scenarios**:

1. **Given** un usuario con al menos un invernadero y un cultivo disponibles, **When** registra una plantacion valida, **Then** la plantacion se guarda y se muestra en la lista.
2. **Given** un intento de creacion con datos incompletos o invalidos, **When** el usuario envia el formulario, **Then** el sistema rechaza la operacion y muestra errores claros.

---

### User Story 2 - Consultar y Editar Plantaciones (Priority: P2)

Como usuario autenticado quiero ver y actualizar plantaciones para mantener su informacion al dia durante el ciclo del cultivo.

**Why this priority**: Permite control operativo continuo y evita desalineaciones entre lo plantado y lo reportado.

**Independent Test**: Puede probarse listando plantaciones existentes y editando una para confirmar que cambios de estado o fechas se reflejan correctamente.

**Acceptance Scenarios**:

1. **Given** plantaciones registradas, **When** el usuario consulta la pantalla de plantaciones, **Then** visualiza por defecto plantaciones `Activas` con invernadero, cultivo, fechas y estado, y puede filtrar a `Todas` o `Inactivas`.
2. **Given** una plantacion existente, **When** el usuario actualiza sus datos con valores validos, **Then** la informacion queda persistida y visible en la lista.

---

### User Story 3 - Eliminar Plantacion (Priority: P3)

Como usuario autenticado quiero dar de baja plantaciones que ya no deben mantenerse activas para conservar informacion historica relevante.

**Why this priority**: Reduce ruido operativo, pero es menos critico que crear y editar para habilitar el flujo minimo.

**Independent Test**: Puede probarse marcando una plantacion como inactiva desde la lista y verificando que el estado cambia a `Inactivo` sin perder el registro historico.

**Acceptance Scenarios**:

1. **Given** una plantacion existente, **When** el usuario confirma su eliminacion, **Then** el registro se marca como `Inactivo` y conserva trazabilidad historica.
2. **Given** una plantacion inexistente, **When** se intenta eliminar, **Then** el sistema responde con error controlado sin afectar otros registros.

---

### Edge Cases

- Intento de registrar plantacion con `fechaFinalizado` anterior a `fechaPlantado`.
- Registro con referencias a invernadero o cultivo que no pertenecen al usuario autenticado.
- Baja logica de plantacion ya marcada como `Inactivo` por otra accion concurrente.
- Cambio de estado a `Inactivo` sin fecha de finalizacion definida (debe rechazarse por validacion).
- Intento de crear o activar una plantacion cuando ya existe otra `Activa` para la misma combinacion invernadero+cultivo.
- Carga de fecha/hora invalida o incompleta en campos de `fechaPlantado` o `fechaFinalizado`.
- Listado cuando no existen plantaciones para el usuario.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: El sistema MUST permitir crear una plantacion con identificador unico, referencia a invernadero, referencia a cultivo, fecha de plantado, fecha de finalizacion (opcional al crear) y estado (`Activo` o `Inactivo`).
- **FR-002**: El sistema MUST validar que el invernadero y cultivo seleccionados existan y sean accesibles para el usuario que realiza la operacion.
- **FR-003**: El sistema MUST impedir guardar plantaciones con `fechaFinalizado` menor que `fechaPlantado`.
- **FR-004**: El sistema MUST permitir consultar el listado de plantaciones filtrado por usuario.
- **FR-005**: El sistema MUST permitir editar una plantacion existente, incluyendo estado y fechas, manteniendo reglas de validacion.
- **FR-006**: El sistema MUST permitir dar de baja una plantacion existente mediante accion explicita del usuario, implementando baja logica (sin borrado fisico).
- **FR-007**: El sistema MUST mostrar errores de validacion y negocio de forma comprensible para que el usuario pueda corregir datos.
- **FR-008**: El sistema MUST mantener documentado y actualizado el contrato de los endpoints de plantacion para consumidores internos del producto.
- **FR-009**: El sistema MUST persistir datos de plantacion de forma durable, incluyendo relaciones hacia invernadero y cultivo.
- **FR-010**: El sistema MUST exigir `fechaFinalizado` cuando el estado de la plantacion sea `Inactivo`.
- **FR-011**: El sistema MUST impedir mas de una plantacion `Activa` para la misma combinacion invernadero+cultivo por usuario.
- **FR-012**: El sistema MUST registrar `fechaPlantado` y `fechaFinalizado` con fecha y hora local en formato `YYYY-MM-DDTHH:mm`.
- **FR-013**: El sistema MUST mostrar por defecto solo plantaciones `Activas` en el listado y permitir filtro explicito a `Todas` e `Inactivas`.

### Key Entities *(include if feature involves data)*

- **Plantacion**: Representa un ciclo de cultivo dentro de un invernadero; incluye identificador, referencia a invernadero, referencia a cultivo, fecha de plantado, fecha de finalizacion y estado.
- **Invernadero**: Recurso donde se ejecuta la plantacion; una plantacion pertenece a un unico invernadero.
- **Cultivo**: Configuracion agronomica elegida para la plantacion; una plantacion referencia un unico cultivo.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Un usuario puede registrar una plantacion valida en menos de 2 minutos desde el formulario.
- **SC-002**: El 100% de plantaciones creadas se muestran en el listado del mismo usuario en menos de 2 segundos tras guardar.
- **SC-003**: Al menos el 95% de intentos con datos validos completan creacion o actualizacion sin errores de negocio.
- **SC-004**: El 100% de operaciones con datos invalidos relevantes (fechas incoherentes, referencias inexistentes) retornan errores claros sin afectar registros existentes.

## Assumptions


- Se reutiliza el mecanismo de autenticacion y sesion existente para asociar operaciones al usuario activo.
- `fechaFinalizado` puede quedar vacia solo mientras la plantacion este `Activa`; al pasar a `Inactivo` debe definirse obligatoriamente.
- La primera version contempla un solo estado operativo por plantacion (`Activo` o `Inactivo`) sin estados intermedios.
- El alcance inicial es CRUD y listado por usuario; reportes avanzados y metricas historicas quedan fuera de esta iteracion.
- La accion de eliminacion se implementa como baja logica para preservar historial operativo.
- La unicidad operativa se aplica sobre plantaciones `Activas` por combinacion invernadero+cultivo.
- Las fechas operativas de plantacion se capturan con precision de fecha y hora local (sin conversion obligatoria a UTC en esta iteracion).

## Formato de IDs

- Usuarios: `USE-0001`
- Invernaderos: `INV-0001`
- Cultivos: `CRO-0001`
- Sensores: `SEN-0001`
- Plantaciones: `PLA-0001`

Regla general: prefijo por entidad + guion + numero secuencial de 4 digitos.

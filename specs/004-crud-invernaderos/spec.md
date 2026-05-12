# Feature Specification: CRUD de Invernaderos

**Feature Branch**: `004-crud-invernaderos`  
**Created**: 2026-04-08  
**Status**: Draft  
**Input**: User description: "realiza un crud de imvernaderos con un nombre, ubicacion, estado y con una foreignkey de usuario"

## Clarifications

### Session 2026-04-08

- Q: Para el campo nombre del invernadero, ¿qué regla de unicidad quieres? → A: Unicidad por usuario: un mismo usuario no puede tener dos invernaderos con el mismo nombre.

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

### User Story 1 - Crear invernadero asociado a usuario (Priority: P1)

Como administrador, quiero crear un invernadero con nombre, ubicacion y estado asociado a un usuario para registrar correctamente la propiedad del recurso.

**Why this priority**: Sin alta de invernaderos no existe base operativa para consulta, actualizacion o eliminacion.

**Independent Test**: Puede probarse creando un invernadero valido con un usuario existente y verificando que queda registrado con su relacion de usuario.

**Acceptance Scenarios**:

1. **Given** un usuario existente y datos validos de invernadero, **When** el administrador crea el invernadero, **Then** el sistema registra el invernadero y su relacion con ese usuario.
2. **Given** un identificador de usuario inexistente, **When** el administrador intenta crear el invernadero, **Then** el sistema rechaza la operacion e informa que el usuario no existe.
3. **Given** un nombre o ubicacion vacios, **When** el administrador intenta crear el invernadero, **Then** el sistema rechaza la operacion con mensaje de validacion.

---

### User Story 2 - Consultar y actualizar invernaderos (Priority: P2)

Como administrador, quiero consultar y actualizar invernaderos para mantener su informacion actualizada y correcta por usuario.

**Why this priority**: Una vez creados invernaderos, el mantenimiento operativo requiere consulta y edicion continua.

**Independent Test**: Puede probarse listando invernaderos y actualizando nombre, ubicacion o estado en un registro existente.

**Acceptance Scenarios**:

1. **Given** invernaderos registrados, **When** el administrador consulta el listado, **Then** el sistema devuelve registros con nombre, ubicacion, estado y usuario asociado.
2. **Given** un invernadero existente, **When** el administrador actualiza sus datos con valores validos, **Then** el sistema guarda los cambios y confirma la actualizacion.
3. **Given** un estado fuera del catalogo permitido, **When** el administrador intenta actualizar, **Then** el sistema rechaza la actualizacion e informa el error.

---

### User Story 3 - Eliminar invernaderos (Priority: P3)

Como administrador, quiero eliminar invernaderos para retirar registros que ya no deben permanecer en operacion.

**Why this priority**: Completa el ciclo CRUD, pero depende de que exista gestion previa de altas y actualizaciones.

**Independent Test**: Puede probarse eliminando un invernadero existente y verificando que deja de aparecer en consultas posteriores.

**Acceptance Scenarios**:

1. **Given** un invernadero existente, **When** el administrador solicita eliminarlo, **Then** el sistema elimina el registro y confirma la operacion.
2. **Given** un invernadero inexistente, **When** el administrador solicita eliminarlo, **Then** el sistema informa que el recurso no existe sin afectar otros datos.

---

### Edge Cases

- Nombre con solo espacios en blanco.
- Nombre de invernadero duplicado para el mismo usuario.
- Ubicacion con longitud maxima permitida.
- Estado no permitido por catalogo de negocio.
- Asociacion a usuario inexistente.
- Cambio de usuario asociado durante actualizacion.
- Eliminacion repetida del mismo invernadero.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: El sistema MUST permitir crear invernaderos con los campos nombre, ubicacion y estado.
- **FR-002**: El sistema MUST exigir que cada invernadero este asociado a un usuario existente mediante una relacion de llave foranea.
- **FR-003**: El sistema MUST validar que nombre y ubicacion sean obligatorios.
- **FR-003a**: El sistema MUST impedir nombres de invernadero duplicados para un mismo usuario.
- **FR-004**: El sistema MUST aceptar estado solo dentro del catalogo permitido de negocio.
- **FR-005**: El sistema MUST permitir consultar invernaderos existentes con su usuario asociado.
- **FR-006**: El sistema MUST permitir actualizar nombre, ubicacion, estado y usuario asociado de un invernadero existente.
- **FR-007**: El sistema MUST permitir eliminar invernaderos existentes.
- **FR-008**: El sistema MUST informar explicitamente cuando un invernadero o usuario referenciado no exista.
- **FR-009**: El sistema MUST mantener consistencia referencial para evitar invernaderos sin usuario valido.
- **FR-010**: El sistema MUST definir o actualizar contrato API en OpenAPI 3 para cada endpoint modificado y mantener sincronizada la documentacion Swagger.
- **FR-011**: El sistema MUST persistir datos de invernaderos y su relacion con usuarios en PostgreSQL.

### Key Entities *(include if feature involves data)*

- **Usuario**: Representa el propietario o responsable del invernadero y se referencia por clave foranea desde Invernadero.
- **Invernadero**: Representa una unidad gestionable con identificador, nombre (unico por usuario), ubicacion, estado y referencia obligatoria a Usuario.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: El 100% de intentos de crear o actualizar invernaderos con usuario inexistente son rechazados.
- **SC-002**: El 100% de intentos de crear o actualizar con estado fuera de catalogo son rechazados.
- **SC-003**: Al menos el 95% de operaciones validas de alta de invernadero se completan en menos de 30 segundos desde el envio del formulario.
- **SC-004**: El 100% de eliminaciones exitosas dejan de mostrar el invernadero en la siguiente consulta.
- **SC-005**: Al menos el 90% de errores de validacion son corregidos por el administrador en un segundo intento o menos.

## Assumptions

- El catalogo de estado para esta version incluye: ACTIVO, INACTIVO y MANTENIMIENTO.
- Solo administradores autorizados gestionan el CRUD de invernaderos.
- El CRUD de usuarios existe y provee identificadores validos para asociacion.
- La unicidad de nombre de invernadero se aplica dentro del contexto de cada usuario, no de forma global.
- El alcance excluye historicos de cambios y auditoria avanzada de estado en esta iteracion.

## Formato de IDs

- Usuarios: `USE-0001`
- Invernaderos: `INV-0001`
- Cultivos: `CRO-0001`
- Sensores: `SEN-0001`
- Plantaciones: `PLA-0001`

Regla general: prefijo por entidad + guion + numero secuencial de 4 digitos.

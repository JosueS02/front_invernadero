# Feature Specification: CRUD de Cultivos

**Feature Branch**: `005-crud-cultivos`  
**Created**: 2026-04-08  
**Status**: Draft  
**Input**: User description: "crea un crud de cultivos donde tendra un nombre, temperatura, humedad y luz minima y temperatura, humedad y luz maxima ademas de igual manera una foreignkey de usuario"

## Clarifications

### Session 2026-04-08

- Q: Para el nombre del cultivo, ¿qué regla de unicidad quieres? → A: Unicidad por usuario: un mismo usuario no puede tener dos cultivos con el mismo nombre.

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

### User Story 1 - Crear cultivo con rangos y usuario asociado (Priority: P1)

Como administrador, quiero crear un cultivo con nombre y rangos minimos/maximos de temperatura, humedad y luz, asociado a un usuario, para configurar parametros de cultivo validos desde el inicio.

**Why this priority**: Sin alta de cultivos no existe informacion base para operar consultas, actualizaciones y eliminaciones.

**Independent Test**: Puede probarse creando un cultivo valido para un usuario existente y verificando que el registro queda guardado con todos sus rangos.

**Acceptance Scenarios**:

1. **Given** un usuario existente y datos validos de cultivo, **When** el administrador crea el cultivo, **Then** el sistema registra el cultivo con sus rangos minimos y maximos y su relacion de usuario.
2. **Given** un usuario inexistente, **When** el administrador intenta crear el cultivo, **Then** el sistema rechaza la operacion e informa que el usuario no existe.
3. **Given** un rango invalido donde minimo es mayor o igual al maximo en alguna metrica, **When** el administrador intenta crear el cultivo, **Then** el sistema rechaza la operacion con mensaje de validacion.

---

### User Story 2 - Consultar y actualizar cultivos (Priority: P2)

Como administrador, quiero consultar y actualizar cultivos para mantener ajustados sus parametros de temperatura, humedad y luz por usuario.

**Why this priority**: Tras crear cultivos, el mantenimiento diario requiere consultar y corregir rangos operativos.

**Independent Test**: Puede probarse listando cultivos y actualizando nombre o rangos en un cultivo existente con validaciones de consistencia.

**Acceptance Scenarios**:

1. **Given** cultivos registrados, **When** el administrador consulta el listado, **Then** el sistema devuelve nombre, rangos y usuario asociado de cada cultivo.
2. **Given** un cultivo existente, **When** el administrador actualiza datos con valores validos, **Then** el sistema guarda los cambios y confirma la actualizacion.
3. **Given** un cultivo existente, **When** el administrador actualiza algun rango con minimo mayor o igual al maximo, **Then** el sistema rechaza la actualizacion e informa el error.

---

### User Story 3 - Eliminar cultivos (Priority: P3)

Como administrador, quiero eliminar cultivos para retirar configuraciones que ya no se usan.

**Why this priority**: Completa el ciclo CRUD, pero depende de que existan operaciones previas de alta y mantenimiento.

**Independent Test**: Puede probarse eliminando un cultivo existente y validando que deja de aparecer en consultas.

**Acceptance Scenarios**:

1. **Given** un cultivo existente, **When** el administrador solicita eliminarlo, **Then** el sistema elimina el registro y confirma la operacion.
2. **Given** un cultivo inexistente, **When** el administrador solicita eliminarlo, **Then** el sistema informa que el recurso no existe sin afectar otros registros.

---

### Edge Cases

- Nombre de cultivo con solo espacios en blanco.
- Nombre de cultivo duplicado para el mismo usuario.
- Usuario asociado inexistente en alta o actualizacion.
- Temperatura minima igual a maxima.
- Humedad minima mayor a maxima.
- Luz minima mayor a maxima.
- Valores no numericos en cualquier campo de rango.
- Eliminacion repetida del mismo cultivo.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: El sistema MUST permitir crear cultivos con nombre, temperatura minima/maxima, humedad minima/maxima, luz minima/maxima y usuario asociado.
- **FR-002**: El sistema MUST exigir que cada cultivo este asociado a un usuario existente mediante una relacion de llave foranea.
- **FR-003**: El sistema MUST validar que el nombre de cultivo sea obligatorio.
- **FR-003a**: El sistema MUST impedir nombres de cultivo duplicados para un mismo usuario.
- **FR-004**: El sistema MUST validar que para temperatura, humedad y luz se cumpla minimo < maximo.
- **FR-005**: El sistema MUST validar que los campos de rangos sean numericos.
- **FR-006**: El sistema MUST permitir consultar cultivos existentes con sus rangos y usuario asociado.
- **FR-007**: El sistema MUST permitir actualizar nombre, rangos y usuario asociado de un cultivo existente.
- **FR-008**: El sistema MUST permitir eliminar cultivos existentes.
- **FR-009**: El sistema MUST informar explicitamente cuando un cultivo o usuario referenciado no exista.
- **FR-010**: El sistema MUST mantener consistencia referencial para evitar cultivos sin usuario valido.
- **FR-011**: El sistema MUST definir o actualizar contrato API en OpenAPI 3 para cada endpoint modificado y mantener sincronizada la documentacion Swagger.
- **FR-012**: El sistema MUST persistir datos de cultivos y su relacion con usuarios en PostgreSQL.

### Key Entities *(include if feature involves data)*

- **Usuario**: Representa el propietario o responsable del cultivo y se referencia por clave foranea desde Cultivo.
- **Cultivo**: Representa una configuracion de cultivo con identificador, nombre (unico por usuario), rangos min/max de temperatura, humedad y luz, y referencia obligatoria a Usuario.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: El 100% de intentos de crear o actualizar cultivos con usuario inexistente son rechazados.
- **SC-002**: El 100% de intentos con rangos invalidos (minimo mayor o igual a maximo) son rechazados.
- **SC-003**: Al menos el 95% de operaciones validas de alta de cultivo se completan en menos de 30 segundos desde el envio del formulario.
- **SC-004**: El 100% de eliminaciones exitosas dejan de mostrar el cultivo en la siguiente consulta.
- **SC-005**: Al menos el 90% de errores de validacion son corregidos por el administrador en un segundo intento o menos.

## Assumptions

- Solo administradores autorizados gestionan el CRUD de cultivos.
- El CRUD de usuarios existe y provee identificadores validos para asociacion.
- La unicidad del nombre de cultivo se aplica dentro del contexto de cada usuario, no de forma global.
- La unidad de temperatura se maneja en Celsius, humedad en porcentaje y luz en lux.
- El alcance excluye historicos de cambios y auditoria avanzada de rangos en esta iteracion.

## Formato de IDs

- Usuarios: `USE-0001`
- Invernaderos: `INV-0001`
- Cultivos: `CRO-0001`
- Sensores: `SEN-0001`
- Plantaciones: `PLA-0001`

Regla general: prefijo por entidad + guion + numero secuencial de 4 digitos.

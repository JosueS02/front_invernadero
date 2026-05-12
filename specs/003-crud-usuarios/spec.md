# Feature Specification: CRUD de Usuarios Basico

**Feature Branch**: `003-crud-usuarios`  
**Created**: 2026-04-08  
**Status**: Draft  
**Input**: User description: "crea un crud de usuarios que solo tengan un correo y una contraseña la contraseña tendra una longitud de minimo 8 caracteres con una mayuscula, minuscula, numero y caracter especial"

## Clarifications

### Session 2026-04-08

- Q: Para la regla de unicidad de correo, ¿qué comportamiento quieres? → A: Unicidad case-insensitive (se considera el mismo correo aunque cambien mayúsculas/minúsculas).

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

### User Story 1 - Crear usuario con contraseña segura (Priority: P1)

Como administrador, quiero crear un usuario con correo y contraseña para registrar nuevas cuentas de forma valida y segura desde el inicio.

**Why this priority**: Sin alta de usuarios, no existe base de datos util sobre la cual operar el resto del CRUD.

**Independent Test**: Puede probarse de forma independiente creando un usuario nuevo con datos validos y verificando que queda disponible para consulta.

**Acceptance Scenarios**:

1. **Given** que no existe un usuario con el correo ingresado, **When** el administrador crea un usuario con correo valido y contraseña que cumple la politica, **Then** el sistema registra el usuario y confirma la creacion.
2. **Given** que el correo ya esta registrado, **When** el administrador intenta crear otro usuario con ese mismo correo, **Then** el sistema rechaza la operacion e indica que el correo ya existe.
3. **Given** que la contraseña no cumple la politica (longitud o complejidad), **When** el administrador intenta crear el usuario, **Then** el sistema rechaza la operacion y muestra los criterios incumplidos.

---

### User Story 2 - Consultar y actualizar usuarios (Priority: P2)

Como administrador, quiero consultar usuarios existentes y actualizar sus datos para mantener la informacion vigente.

**Why this priority**: Una vez creados usuarios, la operacion diaria exige revisarlos y corregir datos sin recrear registros.

**Independent Test**: Puede probarse de forma independiente listando usuarios existentes y editando correo o contraseña de un usuario especifico.

**Acceptance Scenarios**:

1. **Given** que existen usuarios registrados, **When** el administrador solicita la consulta, **Then** el sistema devuelve la lista de usuarios con su identificador y correo.
2. **Given** un usuario existente, **When** el administrador actualiza el correo por uno no registrado y/o una contraseña que cumple la politica, **Then** el sistema guarda los cambios y confirma la actualizacion.
3. **Given** un usuario existente, **When** el administrador intenta actualizar con un correo duplicado o una contraseña invalida, **Then** el sistema rechaza la actualizacion e informa el motivo.

---

### User Story 3 - Eliminar usuarios (Priority: P3)

Como administrador, quiero eliminar usuarios para retirar cuentas que ya no deben permanecer activas en el sistema.

**Why this priority**: La baja de usuarios completa el ciclo CRUD, pero depende de contar primero con alta y mantenimiento.

**Independent Test**: Puede probarse de forma independiente eliminando un usuario existente y verificando que deja de aparecer en consultas posteriores.

**Acceptance Scenarios**:

1. **Given** un usuario existente, **When** el administrador solicita su eliminacion, **Then** el sistema elimina el registro y confirma la operacion.
2. **Given** un usuario ya eliminado o inexistente, **When** el administrador solicita eliminarlo, **Then** el sistema informa que el recurso no existe sin afectar otros registros.

---

### Edge Cases

- Correo con formato invalido (sin arroba, dominio incompleto, espacios no permitidos).
- Correo con diferencias solo de mayusculas/minusculas frente a uno ya existente.
- Contraseña con exactamente 8 caracteres que cumple complejidad minima.
- Contraseña de longitud valida pero sin alguno de los grupos obligatorios (mayuscula, minuscula, numero, especial).
- Actualizacion parcial donde solo cambia correo o solo cambia contraseña.
- Eliminacion repetida del mismo usuario.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: El sistema MUST permitir crear usuarios con exactamente dos campos de negocio: correo y contraseña.
- **FR-002**: El sistema MUST validar que el correo tenga formato valido antes de crear o actualizar.
- **FR-003**: El sistema MUST rechazar correos duplicados para garantizar unicidad de cuenta sin distinguir mayusculas/minusculas.
- **FR-004**: El sistema MUST validar que toda contraseña cumpla simultaneamente: minimo 8 caracteres, al menos una mayuscula, al menos una minuscula, al menos un numero y al menos un caracter especial.
- **FR-005**: El sistema MUST permitir consultar usuarios existentes.
- **FR-006**: El sistema MUST permitir actualizar correo y contraseña de un usuario existente, aplicando las mismas validaciones de alta.
- **FR-007**: El sistema MUST permitir eliminar un usuario existente.
- **FR-008**: El sistema MUST devolver mensajes de validacion claros cuando falle una operacion por reglas de correo o contraseña.
- **FR-009**: El sistema MUST informar explicitamente cuando se intente operar sobre un usuario inexistente.
- **FR-010**: El sistema MUST mantener consistencia de datos para que toda alta, edicion o baja se refleje en consultas posteriores.

### Key Entities *(include if feature involves data)*

- **Usuario**: Representa una cuenta administrable con identificador unico, correo unico (unicidad case-insensitive) y contraseña.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: El 100% de los intentos de crear o actualizar usuarios con contraseña que incumple politica son rechazados.
- **SC-002**: El 100% de los intentos de crear o actualizar usuarios con correo duplicado son rechazados.
- **SC-003**: Al menos el 95% de las altas validas se completan en menos de 30 segundos desde que el administrador envía el formulario.
- **SC-004**: El 100% de las operaciones de eliminacion exitosas dejan de mostrar al usuario en la siguiente consulta.
- **SC-005**: Al menos el 90% de errores de validacion son corregidos por el administrador en un segundo intento o menos, gracias a mensajes claros.

## Assumptions

- Solo usuarios administradores autorizados ejecutan operaciones de CRUD de usuarios.
- El alcance incluye gestion de usuarios por datos basicos (correo y contraseña) y excluye perfiles extendidos.
- La contraseña se gestiona como dato confidencial y nunca se muestra en texto plano en respuestas de consulta.
- Los flujos de autenticacion de quien administra el CRUD existen fuera de esta feature.

## Formato de IDs

- Usuarios: `USE-0001`
- Invernaderos: `INV-0001`
- Cultivos: `CRO-0001`
- Sensores: `SEN-0001`
- Plantaciones: `PLA-0001`

Regla general: prefijo por entidad + guion + numero secuencial de 4 digitos.

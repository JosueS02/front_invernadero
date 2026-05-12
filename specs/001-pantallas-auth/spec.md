# Feature Specification: Pantallas de Autenticacion

**Feature Branch**: `001-pantallas-auth`  
**Created**: 2026-04-06  
**Status**: Draft  
**Input**: User description: "Crea dos pantallas de un login y otro de crear usuario, los campos a llenar seran de correo y contraseña, en la parte de login tendra abajo del boton de iniciar sesion, un texto para redirigirlo a la segunda pantalla, en los tendran un header de un rectangulo de color 3D9F49 y el boton y el texto debajo del boton iran de este color 36D30B, ademas que lso formularios iran en cards"

## Clarifications

### Session 2026-04-06

- Q: El texto debajo del boton debe existir solo en Login o en ambas pantallas? → A: En ambas pantallas.
- Q: Que regla minima de contrasena debe aplicarse? → A: Minimo 8 caracteres, al menos un numero y un simbolo.
- Q: Que debe pasar tras envio exitoso? → A: Redirigir a pantalla de exito simple.

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

### User Story 1 - Iniciar sesion con correo y contrasena (Priority: P1)

Como usuario con cuenta existente, quiero iniciar sesion con mi correo y contrasena para acceder rapidamente al sistema.

**Why this priority**: Es el flujo principal de acceso para usuarios ya registrados y el que aporta valor inmediato.

**Independent Test**: Puede probarse de forma aislada abriendo la pantalla de login, llenando correo y contrasena y verificando que el envio del formulario sea posible cuando ambos campos son validos.

**Acceptance Scenarios**:

1. **Given** que el usuario abre la pantalla de login, **When** visualiza el formulario, **Then** ve los campos de correo y contrasena dentro de una card.
2. **Given** que el usuario completa correo y contrasena validos, **When** pulsa el boton de iniciar sesion, **Then** el sistema procesa el intento de autenticacion.
3. **Given** que falta correo o contrasena, **When** intenta enviar, **Then** el sistema bloquea el envio y muestra el error correspondiente.
4. **Given** que el envio de login es exitoso, **When** termina el procesamiento, **Then** el usuario es redirigido a una pantalla de exito simple.

---

### User Story 2 - Navegar desde login a crear usuario (Priority: P2)

Como usuario nuevo, quiero un texto de redireccion bajo el boton de iniciar sesion para ir facilmente a la pantalla de crear usuario.

**Why this priority**: Reduce friccion para nuevos usuarios y evita abandonos por no encontrar el registro.

**Independent Test**: Puede validarse sin depender de backend, comprobando que el texto bajo el boton existe, es visible y redirige correctamente a la segunda pantalla.

**Acceptance Scenarios**:

1. **Given** que el usuario esta en login, **When** pulsa el texto bajo el boton de iniciar sesion, **Then** es redirigido a la pantalla de crear usuario.

---

### User Story 3 - Crear usuario con interfaz consistente (Priority: P3)

Como usuario nuevo, quiero completar mi registro usando correo y contrasena en una interfaz visual consistente con login.

**Why this priority**: Completa el ciclo de autenticacion y mantiene coherencia visual entre pantallas.

**Independent Test**: Se valida abriendo la pantalla de crear usuario y verificando card, header, campos, boton y color del texto inferior conforme a los requisitos visuales.

**Acceptance Scenarios**:

1. **Given** que el usuario entra a crear usuario, **When** visualiza la pantalla, **Then** encuentra campos de correo y contrasena dentro de una card.
2. **Given** que el usuario completa los campos requeridos, **When** pulsa crear usuario, **Then** el sistema procesa la solicitud de registro.
3. **Given** que el usuario esta en crear usuario, **When** pulsa el texto inferior bajo el boton principal, **Then** es redirigido a la pantalla de login.
4. **Given** que el envio de crear usuario es exitoso, **When** termina el procesamiento, **Then** el usuario es redirigido a una pantalla de exito simple.

---

### Edge Cases

- Correo con formato invalido en login o crear usuario.
- Contrasena vacia o solo con espacios en ambos formularios.
- Contrasena con menos de 8 caracteres, sin numero o sin simbolo.
- Usuario intenta enviar multiples veces de forma rapida.
- Texto de redireccion no debe perderse en pantallas pequenas.
- Colores obligatorios deben mantenerse legibles con diferentes brillos de pantalla.

## Requirements *(mandatory)*

<!--
  ACTION REQUIRED: The content in this section represents placeholders.
  Fill them out with the right functional requirements.
-->

### Functional Requirements

- **FR-001**: El sistema DEBE mostrar dos pantallas separadas: Login y Crear Usuario.
- **FR-002**: La pantalla de Login DEBE incluir campos obligatorios de correo y contrasena.
- **FR-003**: La pantalla de Crear Usuario DEBE incluir campos obligatorios de correo y contrasena.
- **FR-004**: Ambos formularios DEBEN presentarse dentro de cards claramente delimitadas.
- **FR-005**: Ambas pantallas DEBEN incluir un header con forma de rectangulo en color `#3D9F49`.
- **FR-006**: El boton principal de cada formulario DEBE usar color `#36D30B`.
- **FR-007**: En Login, debajo del boton de iniciar sesion DEBE existir un texto de redireccion hacia Crear Usuario.
- **FR-008**: En Crear Usuario, debajo del boton principal DEBE existir un texto de redireccion hacia Login.
- **FR-009**: Todo texto de redireccion debajo de boton DEBE usar color `#36D30B`.
- **FR-010**: El texto de redireccion en Login DEBE llevar al usuario a Crear Usuario en una sola accion.
- **FR-011**: El texto de redireccion en Crear Usuario DEBE llevar al usuario a Login en una sola accion.
- **FR-012**: El sistema DEBE validar formato de correo y obligatoriedad de contrasena antes de enviar cualquier formulario.
- **FR-013**: La contrasena DEBE cumplir minimo 8 caracteres e incluir al menos un numero y un simbolo en Login y Crear Usuario.
- **FR-014**: Tras envio exitoso de Login o Crear Usuario, el sistema DEBE redirigir a una pantalla de exito simple.

### Key Entities *(include if feature involves data)*

- **Credenciales de acceso**: Datos ingresados por el usuario para autenticacion; incluye correo y contrasena.
- **Formulario de autenticacion**: Estructura de captura y validacion para Login o Crear Usuario, con estado de campos, errores y accion principal.
- **Navegacion entre pantallas**: Transicion iniciada por el texto de redireccion desde Login a Crear Usuario.

## Success Criteria *(mandatory)*

<!--
  ACTION REQUIRED: Define measurable success criteria.
  These must be technology-agnostic and measurable.
-->

### Measurable Outcomes

- **SC-001**: El 100% de usuarios puede identificar visualmente ambas pantallas (Login y Crear Usuario) sin ayuda adicional.
- **SC-002**: Al menos el 95% de intentos con correo y contrasena validos permite enviar el formulario en el primer intento.
- **SC-003**: El 100% de pruebas de UI confirma uso de color `#3D9F49` en header rectangular y `#36D30B` en boton principal y texto inferior.
- **SC-004**: Al menos el 90% de usuarios nuevos llega desde Login a Crear Usuario en una sola accion mediante el texto de redireccion.
- **SC-005**: El 100% de envios exitosos en Login y Crear Usuario redirige a la pantalla de exito simple en una sola transicion.

## Assumptions

- Los usuarios objetivo saben distinguir y usar formularios basicos de autenticacion.
- El alcance de esta feature cubre estructura visual, validacion de campos y navegacion entre pantallas, sin definir reglas de negocio avanzadas de contrasena.
- La accion de envio de login y registro se considera exitosa a nivel de interfaz cuando el formulario es valido y puede ser procesado.
- El idioma principal de la interfaz para esta version es espanol.

## Formato de IDs

- Usuarios: `USE-0001`
- Invernaderos: `INV-0001`
- Cultivos: `CRO-0001`
- Sensores: `SEN-0001`
- Plantaciones: `PLA-0001`

Regla general: prefijo por entidad + guion + numero secuencial de 4 digitos.

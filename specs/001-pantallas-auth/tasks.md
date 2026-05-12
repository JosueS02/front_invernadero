# Tasks: Pantallas de Autenticacion

**Input**: Design documents from /specs/001-pantallas-auth/
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/

**Tests**: Se incluyen tareas de pruebas porque el plan y la constitucion exigen cobertura unitaria, integracion y E2E.

**Organization**: Tareas agrupadas por historia de usuario para permitir implementacion y validacion independiente.

## Format: [ID] [P?] [Story] Description

- [P]: Puede ejecutarse en paralelo (archivos distintos, sin dependencias)
- [Story]: Historia asociada (US1, US2, US3)
- Cada tarea incluye ruta de archivo explicita

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Inicializar estructura base de feature de autenticacion y herramientas de prueba.

 - [x] T001 Crear estructura base del feature en src/features/auth/pages/, src/features/auth/components/, src/features/auth/model/ y src/features/auth/styles/
 - [x] T002 Crear archivo de rutas de autenticacion en src/app/routes/authRoutes.tsx
 - [x] T003 [P] Crear tokens de color y estilos base en src/features/auth/styles/auth.css
 - [x] T004 [P] Configurar archivos base de pruebas en tests/unit/auth/, tests/integration/auth/ y tests/e2e/auth/

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Implementar bloques compartidos obligatorios para todas las historias.

**CRITICAL**: Ninguna historia debe iniciar sin cerrar esta fase.

 - [x] T005 Crear tipos de dominio AuthCredentials y AuthFormState en src/features/auth/model/auth.types.ts
 - [x] T006 Crear utilidades de validacion de correo y contrasena (8+ chars, numero y simbolo) en src/features/auth/model/auth.validation.ts
 - [x] T007 [P] Implementar componente reutilizable de card en src/features/auth/components/AuthCard.tsx
 - [x] T008 [P] Implementar componente reutilizable de header rectangular en src/features/auth/components/AuthHeader.tsx
 - [x] T009 Implementar componente reusable AuthForm con labels accesibles y manejo de errores en src/features/auth/components/AuthForm.tsx
 - [x] T010 Implementar pantalla de exito simple para redireccion post-envio en src/features/auth/pages/AuthSuccessPage.tsx
 - [x] T011 Integrar rutas /login, /crear-usuario y /auth-exito en src/app/routes/authRoutes.tsx

**Checkpoint**: Base de autenticacion lista para construir historias en orden de prioridad.

---

## Phase 3: User Story 1 - Iniciar sesion con correo y contrasena (Priority: P1) MVP

**Goal**: Permitir inicio de sesion con formulario en card, colores requeridos y redireccion a pantalla de exito en envio valido.

**Independent Test**: Desde /login, usuario puede completar correo y contrasena valida, enviar, y ser redirigido a /auth-exito; con datos invalidos debe ver errores y bloqueo de envio.

### Tests for User Story 1

 - [x] T012 [P] [US1] Crear pruebas unitarias de validateEmail y validatePassword en tests/unit/auth/auth.validation.test.ts
 - [x] T013 [P] [US1] Crear prueba de integracion de render/errores en LoginPage en tests/integration/auth/login-page.test.tsx
 - [x] T014 [US1] Crear prueba E2E de login exitoso -> pantalla de exito en tests/e2e/auth/login-success.spec.ts

### Implementation for User Story 1

 - [x] T015 [US1] Implementar pagina de login con AuthCard, AuthHeader y AuthForm en src/features/auth/pages/LoginPage.tsx
 - [x] T016 [US1] Implementar accion de envio exitoso de login con redireccion a /auth-exito en src/features/auth/pages/LoginPage.tsx
 - [x] T017 [US1] Aplicar estilos visuales de boton y texto inferior con color #36D30B en src/features/auth/styles/auth.css

**Checkpoint**: US1 funcional y demostrable de forma independiente.

---

## Phase 4: User Story 2 - Navegar desde login a crear usuario (Priority: P2)

**Goal**: Permitir redireccion entre pantallas mediante texto inferior bajo el boton principal, manteniendo estilo y accesibilidad.

**Independent Test**: En /login, click en texto inferior navega a /crear-usuario en una accion; elemento es visible, navegable por teclado y en color #36D30B.

### Tests for User Story 2

 - [x] T018 [P] [US2] Crear prueba de integracion de redireccion por texto inferior en login en tests/integration/auth/login-navigation.test.tsx
 - [x] T019 [US2] Crear prueba E2E de flujo /login -> /crear-usuario por texto inferior en tests/e2e/auth/login-to-register.spec.ts

### Implementation for User Story 2

 - [x] T020 [US2] Agregar texto interactivo inferior en LoginPage con redireccion a /crear-usuario en src/features/auth/pages/LoginPage.tsx
 - [x] T021 [US2] Asegurar accesibilidad por teclado y foco del texto interactivo en src/features/auth/pages/LoginPage.tsx

**Checkpoint**: US2 funcional sin depender de implementacion de registro.

---

## Phase 5: User Story 3 - Crear usuario con interfaz consistente (Priority: P3)

**Goal**: Implementar pantalla de crear usuario con los mismos patrones visuales/validacion, texto inferior hacia login y redireccion a exito tras envio valido.

**Independent Test**: Desde /crear-usuario, formulario valida correo/contrasena, bloquea invalidos, permite envio valido, redirige a /auth-exito; texto inferior lleva a /login.

### Tests for User Story 3

 - [x] T022 [P] [US3] Crear prueba de integracion de render y validacion en RegisterPage en tests/integration/auth/register-page.test.tsx
 - [x] T023 [P] [US3] Crear prueba de integracion de redireccion por texto inferior en register en tests/integration/auth/register-navigation.test.tsx
 - [x] T024 [US3] Crear prueba E2E de registro exitoso -> pantalla de exito en tests/e2e/auth/register-success.spec.ts

### Implementation for User Story 3

 - [x] T025 [US3] Implementar pagina de crear usuario con AuthCard, AuthHeader y AuthForm en src/features/auth/pages/RegisterPage.tsx
 - [x] T026 [US3] Implementar envio exitoso de registro con redireccion a /auth-exito en src/features/auth/pages/RegisterPage.tsx
 - [x] T027 [US3] Agregar texto interactivo inferior en RegisterPage con redireccion a /login en src/features/auth/pages/RegisterPage.tsx

**Checkpoint**: US3 funcional y consistente con login.

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Cerrar consistencia documental, accesibilidad, responsive y validacion final.

 - [x] T028 [P] Actualizar contrato UI con texto inferior tambien en Crear Usuario en specs/001-pantallas-auth/contracts/ui-auth-contract.md
 - [x] T029 Ejecutar verificacion responsive y de contraste visual en src/features/auth/styles/auth.css
 - [x] T030 [P] Ejecutar y ajustar cobertura global de pruebas auth en tests/unit/auth/, tests/integration/auth/ y tests/e2e/auth/
 - [x] T031 Ejecutar validacion final del quickstart en specs/001-pantallas-auth/quickstart.md

---

## Dependencies & Execution Order

### Phase Dependencies

- Phase 1 (Setup): inicia inmediatamente.
- Phase 2 (Foundational): depende de Phase 1 y bloquea todas las historias.
- Phase 3 (US1): depende de Phase 2.
- Phase 4 (US2): depende de Phase 2 y reutiliza LoginPage de US1.
- Phase 5 (US3): depende de Phase 2; puede avanzar en paralelo con US2 tras base compartida.
- Phase 6 (Polish): depende de cierre de US1, US2 y US3.

### User Story Dependencies

- US1 (P1): base MVP.
- US2 (P2): requiere pantalla Login operativa (US1), pero su validacion es independiente.
- US3 (P3): independiente en flujo principal tras cimientos de Phase 2.

### Within Each User Story

- Pruebas primero (fallando inicialmente).
- Implementacion de pagina/comportamiento.
- Ajustes de estilo y accesibilidad.
- Validacion final de la historia.

### Parallel Opportunities

- T003 y T004 en paralelo.
- T007 y T008 en paralelo.
- En US1, T012 y T013 en paralelo.
- En US3, T022 y T023 en paralelo.
- T028 y T030 en paralelo.

---

## Parallel Example: User Story 1

```bash
Task: "T012 [US1] pruebas unitarias en tests/unit/auth/auth.validation.test.ts"
Task: "T013 [US1] prueba integracion en tests/integration/auth/login-page.test.tsx"
```

---

## Implementation Strategy

### MVP First (User Story 1)

1. Completar Phase 1 (Setup).
2. Completar Phase 2 (Foundational).
3. Completar Phase 3 (US1).
4. Validar US1 de forma aislada y demostrar MVP.

### Incremental Delivery

1. Entregar MVP con US1.
2. Agregar US2 para navegacion entre pantallas.
3. Agregar US3 para ciclo completo de alta.
4. Cerrar con Polish y validacion total.

### Parallel Team Strategy

1. Equipo cierra Setup + Foundational.
2. Luego:
   - Dev A: US1
   - Dev B: US2
   - Dev C: US3
3. Integracion final en Phase 6.

---

## Notes

- Todas las tareas usan formato estricto de checklist con ID secuencial.
- Las tareas [P] estan limitadas a archivos independientes.
- Cada historia mantiene criterio de prueba independiente.
- Alcance evitara dependencias de backend en esta iteracion.

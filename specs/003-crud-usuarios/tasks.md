# Tasks: CRUD de Usuarios Basico

**Input**: Design documents from `/specs/003-crud-usuarios/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/

**Tests**: Se incluyen tareas de pruebas porque la especificacion exige cobertura de calidad para validaciones y flujos CRUD.

**Organization**: Tareas agrupadas por historia de usuario para implementacion y validacion independiente.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Puede ejecutarse en paralelo (archivos distintos, sin dependencia directa)
- **[Story]**: Historia de usuario asociada (US1, US2, US3)
- Todas las tareas incluyen rutas de archivo exactas

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Inicializar estructura full-stack para el modulo CRUD de usuarios.

- [X] T001 Crear esqueleto backend Spring Boot en backend/pom.xml y backend/src/main/java/com/frontreact/users/UsersApplication.java
- [X] T002 Configurar propiedades iniciales de backend en backend/src/main/resources/application.yml
- [ ] T003 [P] Crear estructura de feature frontend en frontend/src/features/users/pages/UserCreatePage.tsx y frontend/src/features/users/services/usersApi.ts
- [ ] T004 [P] Crear carpetas base de pruebas para usuarios en frontend/tests/integration/users/.gitkeep y frontend/tests/e2e/users/.gitkeep

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Base tecnica obligatoria antes de implementar historias.

**⚠️ CRITICAL**: Ninguna historia puede empezar antes de completar esta fase.

- [X] T005 Crear migracion de tabla usuarios con unicidad de correo en backend/src/main/resources/db/migration/V1__create_users_table.sql
- [X] T006 [P] Definir entidad JPA de usuario en backend/src/main/java/com/frontreact/users/domain/UserEntity.java
- [X] T007 [P] Implementar repositorio de usuarios en backend/src/main/java/com/frontreact/users/domain/UserRepository.java
- [ ] T008 [P] Implementar normalizacion case-insensitive de correo en backend/src/main/java/com/frontreact/users/domain/EmailNormalizer.java
- [X] T009 Implementar validador de politica de contrasena en backend/src/main/java/com/frontreact/users/validation/PasswordPolicyValidator.java
- [X] T010 Implementar manejo global de errores API en backend/src/main/java/com/frontreact/users/api/ApiExceptionHandler.java
- [ ] T011 [P] Configurar OpenAPI/Swagger en backend/src/main/java/com/frontreact/users/config/OpenApiConfig.java
- [ ] T012 [P] Definir tipos y validaciones frontend de usuario en frontend/src/features/users/model/user.types.ts y frontend/src/features/users/model/user.validation.ts

**Checkpoint**: Fundacion lista; historias de usuario habilitadas.

---

## Phase 3: User Story 1 - Crear usuario con contraseña segura (Priority: P1) 🎯 MVP

**Goal**: Permitir alta de usuario con correo unico case-insensitive y contrasena fuerte.

**Independent Test**: Crear usuario valido y verificar alta; intentar correo duplicado o contrasena invalida y verificar rechazo con mensaje claro.

### Tests for User Story 1

- [ ] T013 [P] [US1] Crear prueba de integracion backend para POST /api/users en backend/src/test/java/com/frontreact/users/api/UserCreateControllerIT.java
- [ ] T014 [P] [US1] Crear prueba de integracion frontend para formulario de alta en frontend/tests/integration/users/user-create-form.test.tsx
- [ ] T015 [P] [US1] Crear prueba E2E de alta exitosa y alta invalida en frontend/tests/e2e/users/create-user.spec.ts

### Implementation for User Story 1

- [X] T016 [P] [US1] Crear DTOs de alta y respuesta en backend/src/main/java/com/frontreact/users/api/dto/CreateUserRequest.java y backend/src/main/java/com/frontreact/users/api/dto/UserResponse.java
- [ ] T017 [US1] Implementar servicio de hash de contrasena en backend/src/main/java/com/frontreact/users/security/PasswordHashService.java
- [X] T018 [US1] Implementar caso de uso de creacion de usuario en backend/src/main/java/com/frontreact/users/service/UserCommandService.java
- [X] T019 [US1] Exponer endpoint POST /api/users en backend/src/main/java/com/frontreact/users/api/UserController.java
- [ ] T020 [US1] Implementar pantalla y formulario de alta en frontend/src/features/users/pages/UserCreatePage.tsx
- [ ] T021 [US1] Implementar cliente API de creacion en frontend/src/features/users/services/usersApi.ts
- [ ] T022 [US1] Actualizar contrato API de alta en specs/003-crud-usuarios/contracts/api-users-crud-contract.md

**Checkpoint**: US1 funcional de manera independiente y lista para demo MVP.

---

## Phase 4: User Story 2 - Consultar y actualizar usuarios (Priority: P2)

**Goal**: Permitir listar, consultar detalle y actualizar correo/contrasena con las mismas reglas de validacion.

**Independent Test**: Listar usuarios, abrir detalle, actualizar datos validos y validar errores ante duplicado o politica invalida.

### Tests for User Story 2

- [ ] T023 [P] [US2] Crear prueba de integracion backend para GET/PUT /api/users en backend/src/test/java/com/frontreact/users/api/UserReadUpdateControllerIT.java
- [ ] T024 [P] [US2] Crear prueba de integracion frontend para listado y edicion en frontend/tests/integration/users/user-list-update.test.tsx
- [ ] T025 [P] [US2] Crear prueba E2E de actualizacion de usuario en frontend/tests/e2e/users/update-user.spec.ts

### Implementation for User Story 2

- [X] T026 [P] [US2] Crear DTO de actualizacion en backend/src/main/java/com/frontreact/users/api/dto/UpdateUserRequest.java
- [ ] T027 [US2] Implementar consulta de listado y detalle en backend/src/main/java/com/frontreact/users/service/UserQueryService.java
- [X] T028 [US2] Implementar actualizacion de usuario en backend/src/main/java/com/frontreact/users/service/UserCommandService.java
- [X] T029 [US2] Exponer endpoints GET /api/users, GET /api/users/{id} y PUT /api/users/{id} en backend/src/main/java/com/frontreact/users/api/UserController.java
- [ ] T030 [US2] Implementar pantalla de listado con accion de edicion en frontend/src/features/users/pages/UserListPage.tsx
- [ ] T031 [US2] Implementar formulario de edicion en frontend/src/features/users/components/UserEditForm.tsx
- [ ] T032 [US2] Implementar cliente API de listado, detalle y actualizacion en frontend/src/features/users/services/usersApi.ts
- [ ] T033 [US2] Definir rutas de feature usuarios en frontend/src/app/routes/userRoutes.tsx
- [ ] T034 [US2] Actualizar contrato API de lectura y actualizacion en specs/003-crud-usuarios/contracts/api-users-crud-contract.md

**Checkpoint**: US1 y US2 funcionan de manera independiente y acumulativa.

---

## Phase 5: User Story 3 - Eliminar usuarios (Priority: P3)

**Goal**: Permitir baja de usuario existente con respuesta consistente para inexistentes.

**Independent Test**: Eliminar un usuario existente y confirmar que desaparece del listado; eliminar inexistente y validar respuesta de no encontrado.

### Tests for User Story 3

- [ ] T035 [P] [US3] Crear prueba de integracion backend para DELETE /api/users/{id} en backend/src/test/java/com/frontreact/users/api/UserDeleteControllerIT.java
- [ ] T036 [P] [US3] Crear prueba de integracion frontend para accion de eliminacion en frontend/tests/integration/users/user-delete.test.tsx
- [ ] T037 [P] [US3] Crear prueba E2E de eliminacion de usuario en frontend/tests/e2e/users/delete-user.spec.ts

### Implementation for User Story 3

- [X] T038 [US3] Implementar caso de uso de eliminacion en backend/src/main/java/com/frontreact/users/service/UserCommandService.java
- [X] T039 [US3] Exponer endpoint DELETE /api/users/{id} en backend/src/main/java/com/frontreact/users/api/UserController.java
- [ ] T040 [US3] Implementar boton y confirmacion de eliminacion en frontend/src/features/users/components/UserDeleteButton.tsx
- [ ] T041 [US3] Integrar eliminacion y refresco de listado en frontend/src/features/users/pages/UserListPage.tsx
- [ ] T042 [US3] Actualizar contrato API de eliminacion en specs/003-crud-usuarios/contracts/api-users-crud-contract.md

**Checkpoint**: US3 completa el CRUD y mantiene independencia de prueba.

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Endurecimiento de calidad transversal y cierre de documentacion.

- [ ] T043 [P] Agregar pruebas unitarias backend para validadores en backend/src/test/java/com/frontreact/users/validation/PasswordPolicyValidatorTest.java
- [ ] T044 [P] Agregar pruebas unitarias backend para normalizacion de correo en backend/src/test/java/com/frontreact/users/domain/EmailNormalizerTest.java
- [ ] T045 [P] Agregar pruebas unitarias frontend de validacion de usuario en frontend/tests/unit/users/user.validation.test.ts
- [ ] T046 Actualizar guia de ejecucion de feature en specs/003-crud-usuarios/quickstart.md
- [ ] T047 Ejecutar validacion final y marcar checklist en specs/003-crud-usuarios/checklists/requirements.md

---

## Dependencies & Execution Order

### Phase Dependencies

- **Phase 1 (Setup)**: inicia inmediatamente.
- **Phase 2 (Foundational)**: depende de Phase 1 y bloquea todas las historias.
- **Phase 3 (US1)**: depende de completar Phase 2.
- **Phase 4 (US2)**: depende de completar Phase 2; puede avanzar tras US1 para reutilizar artefactos de UI/API.
- **Phase 5 (US3)**: depende de completar Phase 2; recomendado despues de US2 para reutilizar listado UI.
- **Phase 6 (Polish)**: depende de historias completadas.

### User Story Dependencies

- **US1 (P1)**: sin dependencia funcional de otras historias tras fundacion.
- **US2 (P2)**: independiente para prueba, pero reutiliza contratos y componentes creados en US1.
- **US3 (P3)**: independiente para prueba, reutiliza listado de US2 en frontend para accion de baja.

### Within Each User Story

- Escribir pruebas primero.
- DTO/Model antes de servicios.
- Servicios antes de controladores/endpoints.
- API cliente antes de integracion UI final.
- Cerrar actualizacion de contrato OpenAPI al final de cada historia.

### Parallel Opportunities

- Setup: T003 y T004 en paralelo.
- Foundational: T006, T007, T008, T011, T012 en paralelo.
- US1: T013, T014, T015 en paralelo; T016 puede correr en paralelo con T020.
- US2: T023, T024, T025 en paralelo; T026 y T030 pueden correr en paralelo.
- US3: T035, T036, T037 en paralelo; T040 puede correr en paralelo con T038.
- Polish: T043, T044, T045 en paralelo.

---

## Parallel Example: User Story 1

```bash
# Pruebas en paralelo
Task: "T013 [US1] Crear prueba de integracion backend para POST /api/users en backend/src/test/java/com/frontreact/users/api/UserCreateControllerIT.java"
Task: "T014 [US1] Crear prueba de integracion frontend para formulario de alta en frontend/tests/integration/users/user-create-form.test.tsx"
Task: "T015 [US1] Crear prueba E2E de alta exitosa y alta invalida en frontend/tests/e2e/users/create-user.spec.ts"

# Implementacion paralela de backend/frontend
Task: "T016 [US1] Crear DTOs de alta y respuesta en backend/src/main/java/com/frontreact/users/api/dto/CreateUserRequest.java y backend/src/main/java/com/frontreact/users/api/dto/UserResponse.java"
Task: "T020 [US1] Implementar pantalla y formulario de alta en frontend/src/features/users/pages/UserCreatePage.tsx"
```

## Parallel Example: User Story 2

```bash
# Pruebas en paralelo
Task: "T023 [US2] Crear prueba de integracion backend para GET/PUT /api/users en backend/src/test/java/com/frontreact/users/api/UserReadUpdateControllerIT.java"
Task: "T024 [US2] Crear prueba de integracion frontend para listado y edicion en frontend/tests/integration/users/user-list-update.test.tsx"
Task: "T025 [US2] Crear prueba E2E de actualizacion de usuario en frontend/tests/e2e/users/update-user.spec.ts"

# Implementacion paralela por capa
Task: "T027 [US2] Implementar consulta de listado y detalle en backend/src/main/java/com/frontreact/users/service/UserQueryService.java"
Task: "T030 [US2] Implementar pantalla de listado con accion de edicion en frontend/src/features/users/pages/UserListPage.tsx"
```

## Parallel Example: User Story 3

```bash
# Pruebas en paralelo
Task: "T035 [US3] Crear prueba de integracion backend para DELETE /api/users/{id} en backend/src/test/java/com/frontreact/users/api/UserDeleteControllerIT.java"
Task: "T036 [US3] Crear prueba de integracion frontend para accion de eliminacion en frontend/tests/integration/users/user-delete.test.tsx"
Task: "T037 [US3] Crear prueba E2E de eliminacion de usuario en frontend/tests/e2e/users/delete-user.spec.ts"

# Implementacion paralela
Task: "T038 [US3] Implementar caso de uso de eliminacion en backend/src/main/java/com/frontreact/users/service/UserCommandService.java"
Task: "T040 [US3] Implementar boton y confirmacion de eliminacion en frontend/src/features/users/components/UserDeleteButton.tsx"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Completar Phase 1 y Phase 2.
2. Completar Phase 3 (US1).
3. Validar alta de usuario con reglas de correo unico case-insensitive y contrasena fuerte.
4. Demostrar MVP.

### Incremental Delivery

1. Base tecnica: Setup + Foundational.
2. Entrega 1: US1 (crear usuario).
3. Entrega 2: US2 (listar/consultar/actualizar).
4. Entrega 3: US3 (eliminar).
5. Cierre: Polish y pruebas transversales.

### Parallel Team Strategy

1. Equipo A: backend dominio/servicios/controladores.
2. Equipo B: frontend formularios/rutas/consumo API.
3. Equipo C: pruebas (integracion, E2E, unitarias) en paralelo por historia.

---

## Notes

- Todas las tareas siguen formato de checklist obligatorio con ID secuencial.
- Etiquetas `[US1]`, `[US2]`, `[US3]` solo se usan en fases de historias.
- Cada historia tiene criterio de prueba independiente.
- El contrato OpenAPI/Swagger se actualiza dentro de cada historia para evitar deriva documental.

# Tasks: CRUD de Invernaderos

**Input**: Design documents from /specs/004-crud-invernaderos/
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/

**Tests**: No se agregan tareas de pruebas porque el spec no solicita enfoque TDD explicito.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: [ID] [P?] [Story] Description

- [P]: Can run in parallel (different files, no dependencies)
- [Story]: Which user story this task belongs to (US1, US2, US3)
- Include exact file paths in descriptions

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Inicializar base de modulo para CRUD de invernaderos full-stack.

- [X] T001 Crear estructura base backend del dominio greenhouses en backend/src/main/java/com/frontreact/greenhouses/GreenhousesApplication.java
- [X] T002 Configurar parametros base del modulo en backend/src/main/resources/application.yml
- [X] T003 [P] Crear cliente API base de invernaderos en frontend/src/features/greenhouse/services/greenhouseApi.ts
- [X] T004 [P] Crear rutas base de pantallas de invernaderos en frontend/src/app/routes/greenhouseRoutes.tsx

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Construir infraestructura de datos, validaciones y contrato base que bloquea historias.

**CRITICAL**: No user story work can begin until this phase is complete.

- [X] T005 Crear migracion de tabla greenhouses con FK user_id en backend/src/main/resources/db/migration/V2__create_greenhouses_table.sql
- [ ] T006 [P] Agregar restriccion de unicidad por usuario (user_id + name) en backend/src/main/resources/db/migration/V3__add_greenhouse_name_unique_per_user.sql
- [X] T007 [P] Implementar entidad GreenhouseEntity en backend/src/main/java/com/frontreact/greenhouses/domain/GreenhouseEntity.java
- [X] T008 [P] Implementar enum GreenhouseStatus con catalogo permitido en backend/src/main/java/com/frontreact/greenhouses/domain/GreenhouseStatus.java
- [X] T009 [P] Implementar repositorio GreenhouseRepository con busqueda por userId+name en backend/src/main/java/com/frontreact/greenhouses/domain/GreenhouseRepository.java
- [ ] T010 Implementar validador de campos obligatorios name/location en backend/src/main/java/com/frontreact/greenhouses/validation/GreenhouseFieldValidator.java
- [ ] T011 Implementar validador de estado de negocio en backend/src/main/java/com/frontreact/greenhouses/validation/GreenhouseStatusValidator.java
- [X] T012 Implementar validador de existencia de usuario asociado en backend/src/main/java/com/frontreact/greenhouses/service/UserReferenceValidator.java
- [X] T013 Implementar validador de unicidad de nombre por usuario en backend/src/main/java/com/frontreact/greenhouses/service/GreenhouseNameUniquenessValidator.java
- [X] T014 [P] Definir tipos frontend de invernadero en frontend/src/features/greenhouse/model/greenhouse.types.ts
- [X] T015 [P] Implementar validaciones frontend del formulario de invernadero en frontend/src/features/greenhouse/model/greenhouse.validation.ts
- [ ] T016 [P] Configurar documentacion OpenAPI base de greenhouses en backend/src/main/java/com/frontreact/greenhouses/config/OpenApiGreenhouseConfig.java

**Checkpoint**: Foundation ready - user story implementation can now begin.

---

## Phase 3: User Story 1 - Crear invernadero asociado a usuario (Priority: P1) MVP

**Goal**: Permitir alta de invernadero con name/location/status y userId validos, respetando unicidad por usuario.

**Independent Test**: Crear invernadero valido para usuario existente debe funcionar; crear con usuario inexistente o nombre duplicado para el mismo usuario debe fallar.

### Implementation for User Story 1

- [X] T017 [P] [US1] Crear DTO de entrada de alta en backend/src/main/java/com/frontreact/greenhouses/api/dto/CreateGreenhouseRequest.java
- [X] T018 [P] [US1] Crear DTO de salida de invernadero en backend/src/main/java/com/frontreact/greenhouses/api/dto/GreenhouseResponse.java
- [X] T019 [US1] Implementar flujo de creacion en backend/src/main/java/com/frontreact/greenhouses/service/GreenhouseCommandService.java
- [X] T020 [US1] Exponer endpoint POST /api/greenhouses en backend/src/main/java/com/frontreact/greenhouses/api/GreenhouseController.java
- [ ] T021 [US1] Implementar pantalla de alta de invernadero en frontend/src/features/greenhouse/pages/GreenhouseCreatePage.tsx
- [X] T022 [US1] Integrar llamada POST de alta en frontend/src/features/greenhouse/services/greenhouseApi.ts
- [ ] T023 [US1] Documentar validacion de nombre unico por usuario en specs/004-crud-invernaderos/contracts/api-greenhouses-crud-contract.md

**Checkpoint**: User Story 1 funcional e independiente.

---

## Phase 4: User Story 2 - Consultar y actualizar invernaderos (Priority: P2)

**Goal**: Permitir listar y actualizar invernaderos incluyendo cambio de estado y usuario asociado con validaciones de referencia y unicidad.

**Independent Test**: Listar y actualizar datos validos debe funcionar; actualizar con estado invalido, userId inexistente o nombre duplicado para el mismo usuario debe fallar.

### Implementation for User Story 2

- [X] T024 [P] [US2] Crear DTO de actualizacion de invernadero en backend/src/main/java/com/frontreact/greenhouses/api/dto/UpdateGreenhouseRequest.java
- [X] T025 [US2] Implementar consultas de listado y detalle en backend/src/main/java/com/frontreact/greenhouses/service/GreenhouseQueryService.java
- [X] T026 [US2] Implementar actualizacion con regla de unicidad por usuario en backend/src/main/java/com/frontreact/greenhouses/service/GreenhouseCommandService.java
- [X] T027 [US2] Exponer endpoints GET /api/greenhouses y GET /api/greenhouses/{id} en backend/src/main/java/com/frontreact/greenhouses/api/GreenhouseController.java
- [X] T028 [US2] Exponer endpoint PUT /api/greenhouses/{id} en backend/src/main/java/com/frontreact/greenhouses/api/GreenhouseController.java
- [ ] T029 [US2] Implementar pantalla de listado de invernaderos en frontend/src/features/greenhouse/pages/GreenhouseListPage.tsx
- [ ] T030 [US2] Implementar formulario de edicion de invernadero en frontend/src/features/greenhouse/components/GreenhouseEditForm.tsx
- [ ] T031 [US2] Integrar llamadas de list/detail/update en frontend/src/features/greenhouse/services/greenhouseApi.ts
- [ ] T032 [US2] Actualizar navegacion de consulta y edicion en frontend/src/app/routes/greenhouseRoutes.tsx
- [ ] T033 [US2] Actualizar contrato de lectura/actualizacion en specs/004-crud-invernaderos/contracts/api-greenhouses-crud-contract.md

**Checkpoint**: User Stories 1 and 2 funcionales e independientes.

---

## Phase 5: User Story 3 - Eliminar invernaderos (Priority: P3)

**Goal**: Permitir eliminar invernaderos existentes con manejo correcto de inexistentes.

**Independent Test**: Eliminar un invernadero existente lo quita del listado; eliminar inexistente retorna not found sin efectos colaterales.

### Implementation for User Story 3

- [X] T034 [US3] Implementar flujo de eliminacion en backend/src/main/java/com/frontreact/greenhouses/service/GreenhouseCommandService.java
- [X] T035 [US3] Exponer endpoint DELETE /api/greenhouses/{id} en backend/src/main/java/com/frontreact/greenhouses/api/GreenhouseController.java
- [ ] T036 [US3] Implementar accion de eliminar en frontend/src/features/greenhouse/components/GreenhouseDeleteButton.tsx
- [ ] T037 [US3] Integrar eliminacion y refresco de listado en frontend/src/features/greenhouse/pages/GreenhouseListPage.tsx
- [ ] T038 [US3] Actualizar contrato de eliminacion en specs/004-crud-invernaderos/contracts/api-greenhouses-crud-contract.md

**Checkpoint**: All user stories are functional and independently testable.

---

## Phase 6: Polish and Cross-Cutting Concerns

**Purpose**: Cerrar consistencia transversal y documentacion final.

- [ ] T039 [P] Unificar mapeo de errores de validacion de dominio en backend/src/main/java/com/frontreact/greenhouses/api/GreenhouseErrorMapper.java
- [ ] T040 [P] Mejorar accesibilidad de formularios y mensajes de error en frontend/src/features/greenhouse/styles/greenhouse.css
- [ ] T041 Actualizar pasos de verificacion de feature en specs/004-crud-invernaderos/quickstart.md
- [ ] T042 Ejecutar validacion final de alcance funcional en specs/004-crud-invernaderos/checklists/requirements.md

---

## Dependencies and Execution Order

### Phase Dependencies

- Setup (Phase 1): No dependencies.
- Foundational (Phase 2): Depends on Setup and blocks all user stories.
- User Story phases (3-5): Depend on Foundational completion.
- Polish (Phase 6): Depends on all desired user stories completion.

### User Story Dependencies

- US1 (P1): Starts after Foundational; no dependency on other stories.
- US2 (P2): Starts after Foundational; reuses US1 artifacts but remains independently testable.
- US3 (P3): Starts after Foundational; can reuse list flow from US2 but remains independently testable.

### Within Each User Story

- DTO and model changes before services.
- Services before controller endpoints.
- API integrations before final UI wiring.
- Contract updates before story close.

### Parallel Opportunities

- Phase 1: T003 and T004.
- Phase 2: T006, T007, T008, T009, T014, T015, T016.
- US1: T017 and T018.
- US2: T024 and T029.
- Phase 6: T039 and T040.

---

## Parallel Example: User Story 1

- Task: T017 [US1] Crear DTO de entrada de alta en backend/src/main/java/com/frontreact/greenhouses/api/dto/CreateGreenhouseRequest.java
- Task: T018 [US1] Crear DTO de salida de invernadero en backend/src/main/java/com/frontreact/greenhouses/api/dto/GreenhouseResponse.java

## Parallel Example: User Story 2

- Task: T024 [US2] Crear DTO de actualizacion de invernadero en backend/src/main/java/com/frontreact/greenhouses/api/dto/UpdateGreenhouseRequest.java
- Task: T029 [US2] Implementar pantalla de listado de invernaderos en frontend/src/features/greenhouse/pages/GreenhouseListPage.tsx

## Parallel Example: User Story 3

- Task: T034 [US3] Implementar flujo de eliminacion en backend/src/main/java/com/frontreact/greenhouses/service/GreenhouseCommandService.java
- Task: T036 [US3] Implementar accion de eliminar en frontend/src/features/greenhouse/components/GreenhouseDeleteButton.tsx

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1.
2. Complete Phase 2.
3. Complete Phase 3 (US1).
4. Validate creation flow including per-user name uniqueness.

### Incremental Delivery

1. Complete Setup + Foundational.
2. Deliver US1 (crear).
3. Deliver US2 (consultar y actualizar).
4. Deliver US3 (eliminar).
5. Finalize with Polish.

### Parallel Team Strategy

1. Backend track: migrations, repositories, services, controllers.
2. Frontend track: pages, forms, API clients and routes.
3. Documentation track: OpenAPI contract and quickstart updates.

---

## Notes

- All tasks follow required checklist format.
- Story labels appear only on user story phases.
- Each user story includes independent test criteria.
- Paths are explicit for immediate execution.

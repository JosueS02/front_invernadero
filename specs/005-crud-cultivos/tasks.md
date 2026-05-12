# Tasks: CRUD de Cultivos

**Input**: Design documents from /specs/005-crud-cultivos/
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/

**Tests**: No se agregan tareas de pruebas en esta version porque no se solicito enfoque TDD de forma explicita en el spec.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: [ID] [P?] [Story] Description

- [P]: Can run in parallel (different files, no dependencies)
- [Story]: Which user story this task belongs to (US1, US2, US3)
- Include exact file paths in descriptions

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Inicializar estructura base full-stack para el dominio de cultivos.

- [X] T001 Crear base de modulo backend de cultivos en backend/src/main/java/com/frontreact/crops/CropsApplication.java
- [X] T002 Configurar propiedades iniciales del modulo en backend/src/main/resources/application.yml
- [X] T003 [P] Crear base de servicio frontend para cultivos en frontend/src/features/greenhouse/services/cropApi.ts
- [X] T004 [P] Crear base de rutas de UI para cultivos en frontend/src/app/routes/greenhouseRoutes.tsx

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Infraestructura de datos y validacion que bloquea todas las historias.

**CRITICAL**: No user story work can begin until this phase is complete.

- [X] T005 Crear migracion de tabla crops con foreign key a users en backend/src/main/resources/db/migration/V4__create_crops_table.sql
- [ ] T006 [P] Crear migracion de unicidad de nombre por usuario en backend/src/main/resources/db/migration/V5__add_crop_name_unique_per_user.sql
- [X] T007 [P] Implementar entidad CropEntity en backend/src/main/java/com/frontreact/crops/domain/CropEntity.java
- [X] T008 [P] Implementar repositorio CropRepository con consulta por userId y name en backend/src/main/java/com/frontreact/crops/domain/CropRepository.java
- [ ] T009 Implementar validador de nombre obligatorio en backend/src/main/java/com/frontreact/crops/validation/CropNameValidator.java
- [X] T010 Implementar validador de tipo numerico para rangos en backend/src/main/java/com/frontreact/crops/validation/CropNumericRangeValidator.java
- [X] T011 Implementar validador de regla min menor que max por metrica en backend/src/main/java/com/frontreact/crops/validation/CropMinMaxValidator.java
- [X] T012 Implementar validador de unicidad de nombre por usuario en backend/src/main/java/com/frontreact/crops/service/CropNameUniquenessValidator.java
- [X] T013 Implementar verificador de existencia de usuario FK en backend/src/main/java/com/frontreact/crops/service/UserReferenceValidator.java
- [ ] T014 [P] Implementar tipos de dominio frontend para cultivo en frontend/src/features/greenhouse/model/crop.types.ts
- [ ] T015 [P] Implementar validaciones frontend de formulario de cultivo en frontend/src/features/greenhouse/model/crop.validation.ts
- [ ] T016 [P] Configurar base OpenAPI para endpoints de cultivos en backend/src/main/java/com/frontreact/crops/config/OpenApiCropConfig.java

**Checkpoint**: Foundation ready - user story implementation can now begin.

---

## Phase 3: User Story 1 - Crear cultivo con rangos y usuario asociado (Priority: P1) MVP

**Goal**: Permitir alta de cultivo con nombre, rangos validos de temperatura/humedad/luz y relacion valida a usuario.

**Independent Test**: Crear cultivo con datos validos y usuario existente debe funcionar; crear con usuario inexistente, rangos invalidos o nombre duplicado para el mismo usuario debe fallar con mensaje claro.

### Implementation for User Story 1

- [X] T017 [P] [US1] Crear DTO de alta de cultivo en backend/src/main/java/com/frontreact/crops/api/dto/CreateCropRequest.java
- [X] T018 [P] [US1] Crear DTO de respuesta de cultivo en backend/src/main/java/com/frontreact/crops/api/dto/CropResponse.java
- [X] T019 [US1] Implementar caso de uso de creacion con validacion de unicidad por usuario en backend/src/main/java/com/frontreact/crops/service/CropCommandService.java
- [X] T020 [US1] Exponer endpoint POST /api/crops en backend/src/main/java/com/frontreact/crops/api/CropController.java
- [ ] T021 [US1] Implementar formulario de alta de cultivo en frontend/src/features/greenhouse/pages/CropCreatePage.tsx
- [X] T022 [US1] Integrar llamada de alta en frontend/src/features/greenhouse/services/cropApi.ts
- [ ] T023 [US1] Actualizar contrato de alta incluyendo regla de nombre unico por usuario en specs/005-crud-cultivos/contracts/api-crops-crud-contract.md

**Checkpoint**: User Story 1 funcional e independiente.

---

## Phase 4: User Story 2 - Consultar y actualizar cultivos (Priority: P2)

**Goal**: Permitir consulta y actualizacion de cultivos incluyendo cambios de rangos y usuario asociado con validacion consistente.

**Independent Test**: Listar cultivos y actualizar datos validos debe funcionar; actualizar con rangos invalidos, usuario inexistente o nombre duplicado para el mismo usuario debe fallar.

### Implementation for User Story 2

- [X] T024 [P] [US2] Crear DTO de actualizacion de cultivo en backend/src/main/java/com/frontreact/crops/api/dto/UpdateCropRequest.java
- [X] T025 [US2] Implementar consultas list y detail en backend/src/main/java/com/frontreact/crops/service/CropQueryService.java
- [X] T026 [US2] Implementar actualizacion con validacion de rangos y unicidad por usuario en backend/src/main/java/com/frontreact/crops/service/CropCommandService.java
- [X] T027 [US2] Exponer endpoints GET /api/crops y GET /api/crops/{id} en backend/src/main/java/com/frontreact/crops/api/CropController.java
- [X] T028 [US2] Exponer endpoint PUT /api/crops/{id} en backend/src/main/java/com/frontreact/crops/api/CropController.java
- [ ] T029 [US2] Implementar listado de cultivos en frontend/src/features/greenhouse/pages/CropListPage.tsx
- [ ] T030 [US2] Implementar formulario de edicion en frontend/src/features/greenhouse/components/CropEditForm.tsx
- [ ] T031 [US2] Integrar consultas y actualizacion en frontend/src/features/greenhouse/services/cropApi.ts
- [ ] T032 [US2] Actualizar rutas de consulta y edicion en frontend/src/app/routes/greenhouseRoutes.tsx
- [ ] T033 [US2] Actualizar contrato de consulta y actualizacion en specs/005-crud-cultivos/contracts/api-crops-crud-contract.md

**Checkpoint**: User Stories 1 and 2 funcionales e independientes.

---

## Phase 5: User Story 3 - Eliminar cultivos (Priority: P3)

**Goal**: Permitir baja de cultivos existentes con manejo correcto de inexistentes.

**Independent Test**: Eliminar un cultivo existente lo remueve del listado; eliminar inexistente devuelve error de recurso no encontrado.

### Implementation for User Story 3

- [X] T034 [US3] Implementar caso de uso de eliminacion en backend/src/main/java/com/frontreact/crops/service/CropCommandService.java
- [X] T035 [US3] Exponer endpoint DELETE /api/crops/{id} en backend/src/main/java/com/frontreact/crops/api/CropController.java
- [ ] T036 [US3] Implementar accion de eliminar en frontend/src/features/greenhouse/components/CropDeleteButton.tsx
- [ ] T037 [US3] Integrar eliminacion y refresco de lista en frontend/src/features/greenhouse/pages/CropListPage.tsx
- [ ] T038 [US3] Actualizar contrato de eliminacion en specs/005-crud-cultivos/contracts/api-crops-crud-contract.md

**Checkpoint**: All user stories are functional and independently testable.

---

## Phase 6: Polish and Cross-Cutting Concerns

**Purpose**: Asegurar consistencia transversal y cierre documental.

- [ ] T039 [P] Normalizar mensajes de error de dominio en backend/src/main/java/com/frontreact/crops/api/CropErrorMapper.java
- [ ] T040 [P] Mejorar accesibilidad de formularios y estados de error en frontend/src/features/greenhouse/styles/greenhouse.css
- [ ] T041 Actualizar guia de uso y verificacion en specs/005-crud-cultivos/quickstart.md
- [ ] T042 Ejecutar validacion final de cobertura funcional en specs/005-crud-cultivos/checklists/requirements.md

---

## Dependencies and Execution Order

### Phase Dependencies

- Setup (Phase 1): No dependencies.
- Foundational (Phase 2): Depends on Setup and blocks all user stories.
- User Story phases (3 to 5): Depend on Foundational completion.
- Polish (Phase 6): Depends on completion of desired user stories.

### User Story Dependencies

- US1 (P1): Starts after Foundational, no dependency on other stories.
- US2 (P2): Starts after Foundational; can reuse artifacts from US1 but remains independently testable.
- US3 (P3): Starts after Foundational; can reuse list flow from US2 but remains independently testable.

### Within Each User Story

- DTOs and models before services.
- Services before controller endpoints.
- API integration before final UI wiring.
- Contract updates before story close.

### Parallel Opportunities

- Phase 1: T003 and T004.
- Phase 2: T006, T007, T008, T014, T015 and T016.
- US1: T017 and T018.
- US2: T024 and T029.
- Phase 6: T039 and T040.

---

## Parallel Example: User Story 1

- Task: T017 [US1] Crear DTO de alta de cultivo en backend/src/main/java/com/frontreact/crops/api/dto/CreateCropRequest.java
- Task: T018 [US1] Crear DTO de respuesta de cultivo en backend/src/main/java/com/frontreact/crops/api/dto/CropResponse.java

## Parallel Example: User Story 2

- Task: T024 [US2] Crear DTO de actualizacion de cultivo en backend/src/main/java/com/frontreact/crops/api/dto/UpdateCropRequest.java
- Task: T029 [US2] Implementar listado de cultivos en frontend/src/features/greenhouse/pages/CropListPage.tsx

## Parallel Example: User Story 3

- Task: T034 [US3] Implementar caso de uso de eliminacion en backend/src/main/java/com/frontreact/crops/service/CropCommandService.java
- Task: T036 [US3] Implementar accion de eliminar en frontend/src/features/greenhouse/components/CropDeleteButton.tsx

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1.
2. Complete Phase 2.
3. Complete Phase 3 (US1).
4. Validate independent behavior for crop creation flow.

### Incremental Delivery

1. Setup plus Foundational.
2. Deliver US1 (crear).
3. Deliver US2 (consultar y actualizar).
4. Deliver US3 (eliminar).
5. Finalize with Polish.

### Parallel Team Strategy

1. Backend track: services, repositories, controllers.
2. Frontend track: pages, forms, API integration.
3. Documentation track: OpenAPI contract and quickstart updates.

---

## Notes

- All tasks follow required checklist format.
- Story labels appear only on user story phases.
- Each story includes an independent test criterion.
- Paths are explicit for immediate execution.

# Tasks: CRUD de Plantacion

**Input**: Design documents from `/specs/007-crud-plantacion/`
**Prerequisites**: plan.md (required), spec.md (required), research.md, data-model.md, contracts/, quickstart.md

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Preparar estructura inicial de backend y frontend para el dominio Plantacion.

- [X] T001 Crear paquete base de modulo plantings en `backend/src/main/java/com/frontreact/plantings/`
- [X] T002 Crear pagina base de plantacion en `frontend/src/features/greenhouse/pages/PlantingPage.tsx`
- [X] T003 [P] Registrar ruta de plantacion en `frontend/src/app/routes/greenhouseRoutes.tsx`
- [X] T004 [P] Agregar opcion de menu para plantacion en `frontend/src/features/greenhouse/components/MenuDrawer.tsx`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Construir base de datos, dominio y contratos tecnicos compartidos que bloquean todas las historias.

**⚠️ CRITICAL**: Ninguna historia de usuario inicia antes de completar esta fase.

- [X] T005 Crear migracion de tabla plantings y constraints en `backend/src/main/resources/db/migration/V7__create_plantings_table.sql`
- [X] T006 [P] Definir enum de estado planting en `backend/src/main/java/com/frontreact/plantings/domain/PlantingStatus.java`
- [X] T007 [P] Implementar entidad JPA Planting en `backend/src/main/java/com/frontreact/plantings/domain/Planting.java`
- [X] T008 [P] Crear repositorio JPA PlantingRepository en `backend/src/main/java/com/frontreact/plantings/domain/PlantingRepository.java`
- [X] T009 Crear DTO base PlantingRequest en `backend/src/main/java/com/frontreact/plantings/api/dto/PlantingRequest.java`
- [X] T010 [P] Crear DTO base PlantingResponse en `backend/src/main/java/com/frontreact/plantings/api/dto/PlantingResponse.java`
- [X] T011 Crear mapper de entidad/DTO de plantacion en `backend/src/main/java/com/frontreact/plantings/api/PlantingMapper.java`
- [X] T012 [P] Definir tipos frontend de plantacion y filtro en `frontend/src/features/greenhouse/model/planting.types.ts`
- [X] T013 [P] Crear validaciones frontend de plantacion en `frontend/src/features/greenhouse/model/planting.validation.ts`
- [X] T014 Crear cliente API base de plantacion en `frontend/src/features/greenhouse/services/plantingApi.ts`
- [X] T015 Actualizar contrato OpenAPI base de schemas plantacion en `specs/007-crud-plantacion/contracts/api-plantacion-contract.md`

**Checkpoint**: Fundacion completada, historias listas para implementacion independiente.

---

## Phase 3: User Story 1 - Registrar Plantacion (Priority: P1) 🎯 MVP

**Goal**: Permitir registrar una plantacion valida con ownership, reglas de fecha/hora y unicidad de activa por combinacion.

**Independent Test**: Crear una plantacion desde UI y verificar persistencia con respuesta valida y visualizacion en listado.

### Tests for User Story 1

- [ ] T016 [P] [US1] Crear prueba backend de alta valida en `backend/src/test/java/com/frontreact/plantings/api/PlantingControllerCreateTest.java`
- [ ] T017 [P] [US1] Crear prueba backend de validacion temporal en `backend/src/test/java/com/frontreact/plantings/service/PlantingServiceDateValidationTest.java`
- [ ] T018 [P] [US1] Crear prueba frontend de formulario alta en `frontend/tests/integration/greenhouse/planting-create-form.test.tsx`
- [ ] T019 [P] [US1] Crear prueba E2E de alta exitosa en `frontend/tests/e2e/greenhouse/planting-create-success.spec.ts`

### Implementation for User Story 1

- [X] T020 [US1] Implementar servicio de creacion y ownership en `backend/src/main/java/com/frontreact/plantings/service/PlantingService.java`
- [X] T021 [US1] Implementar regla de fechaFinalizado obligatoria en inactivo en `backend/src/main/java/com/frontreact/plantings/service/PlantingService.java`
- [X] T022 [US1] Implementar regla unicidad de activa por combinacion en `backend/src/main/java/com/frontreact/plantings/service/PlantingService.java`
- [X] T023 [US1] Implementar endpoint POST de plantacion en `backend/src/main/java/com/frontreact/plantings/api/PlantingController.java`
- [X] T024 [US1] Implementar accion create en API frontend en `frontend/src/features/greenhouse/services/plantingApi.ts`
- [X] T025 [US1] Construir formulario de alta en `frontend/src/features/greenhouse/pages/PlantingPage.tsx`
- [X] T026 [US1] Integrar validaciones de fecha-hora en UI en `frontend/src/features/greenhouse/model/planting.validation.ts`
- [X] T027 [US1] Mostrar errores de backend de alta en `frontend/src/features/greenhouse/pages/PlantingPage.tsx`
- [X] T028 [US1] Alinear contrato API de create en `specs/007-crud-plantacion/contracts/api-plantacion-contract.md`
- [X] T029 [US1] Alinear contrato UI de alta en `specs/007-crud-plantacion/contracts/ui-plantacion-contract.md`

**Checkpoint**: US1 funcional, demostrable y testeable de forma independiente (MVP).

---

## Phase 4: User Story 2 - Consultar y Editar Plantaciones (Priority: P2)

**Goal**: Listar plantaciones del usuario por defecto en Activas, permitir filtro por estado y edicion con reglas de negocio.

**Independent Test**: Visualizar listado con filtro por defecto Activas y editar una plantacion manteniendo validaciones.

### Tests for User Story 2

- [ ] T030 [P] [US2] Crear prueba backend de listado filtrado por estado en `backend/src/test/java/com/frontreact/plantings/api/PlantingControllerListTest.java`
- [ ] T031 [P] [US2] Crear prueba backend de edicion con conflicto de activa en `backend/src/test/java/com/frontreact/plantings/service/PlantingServiceUpdateConflictTest.java`
- [ ] T032 [P] [US2] Crear prueba frontend de filtro por estado en `frontend/tests/integration/greenhouse/planting-list-filter.test.tsx`
- [ ] T033 [P] [US2] Crear prueba frontend de edicion valida en `frontend/tests/integration/greenhouse/planting-edit-form.test.tsx`
- [ ] T034 [P] [US2] Crear prueba E2E de editar plantacion en `frontend/tests/e2e/greenhouse/planting-edit-success.spec.ts`

### Implementation for User Story 2

- [X] T035 [US2] Implementar endpoint GET con filtro status en `backend/src/main/java/com/frontreact/plantings/api/PlantingController.java`
- [X] T036 [US2] Implementar endpoint PUT de actualizacion en `backend/src/main/java/com/frontreact/plantings/api/PlantingController.java`
- [X] T037 [US2] Implementar metodos list y update en API frontend en `frontend/src/features/greenhouse/services/plantingApi.ts`
- [X] T038 [US2] Renderizar listado de plantaciones en `frontend/src/features/greenhouse/pages/PlantingPage.tsx`
- [X] T039 [US2] Implementar filtro Activas/Todas/Inactivas en `frontend/src/features/greenhouse/pages/PlantingPage.tsx`
- [X] T040 [US2] Implementar flujo de edicion y guardado en `frontend/src/features/greenhouse/pages/PlantingPage.tsx`
- [X] T041 [US2] Alinear contrato API de list/update en `specs/007-crud-plantacion/contracts/api-plantacion-contract.md`
- [X] T042 [US2] Alinear contrato UI de listado/edicion en `specs/007-crud-plantacion/contracts/ui-plantacion-contract.md`

**Checkpoint**: US2 funcional e independiente sobre base de fundacion.

---

## Phase 5: User Story 3 - Eliminar Plantacion (Priority: P3)

**Goal**: Ejecutar eliminacion como baja logica (`Inactivo`) preservando historial y consistencia de listado.

**Independent Test**: Eliminar una plantacion y verificar que cambia a Inactivo y deja de verse en filtro Activas.

### Tests for User Story 3

- [ ] T043 [P] [US3] Crear prueba backend de delete como baja logica en `backend/src/test/java/com/frontreact/plantings/api/PlantingControllerDeleteSoftTest.java`
- [ ] T044 [P] [US3] Crear prueba frontend de accion eliminar con confirmacion en `frontend/tests/integration/greenhouse/planting-soft-delete.test.tsx`
- [ ] T045 [P] [US3] Crear prueba E2E de baja logica en `frontend/tests/e2e/greenhouse/planting-soft-delete.spec.ts`

### Implementation for User Story 3

- [X] T046 [US3] Implementar endpoint DELETE con baja logica en `backend/src/main/java/com/frontreact/plantings/api/PlantingController.java`
- [X] T047 [US3] Implementar metodo delete en API frontend en `frontend/src/features/greenhouse/services/plantingApi.ts`
- [X] T048 [US3] Implementar confirmacion y accion eliminar en `frontend/src/features/greenhouse/pages/PlantingPage.tsx`
- [X] T049 [US3] Refrescar listado tras baja logica en `frontend/src/features/greenhouse/pages/PlantingPage.tsx`
- [X] T050 [US3] Alinear contrato API/UI de baja logica en `specs/007-crud-plantacion/contracts/api-plantacion-contract.md`

**Checkpoint**: US3 funcional e independiente, preservando historial operativo.

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Ajustes finales de calidad, accesibilidad, documentacion y verificacion integral.

- [X] T051 [P] Ajustar estilos y estados de error de plantacion en `frontend/src/features/greenhouse/styles/greenhouse.css`
- [X] T052 [P] Mejorar accesibilidad de formulario/listado en `frontend/src/features/greenhouse/pages/PlantingPage.tsx`
- [ ] T053 Actualizar guia de validacion manual en `specs/007-crud-plantacion/quickstart.md`
- [ ] T054 Ejecutar y registrar pruebas backend de plantacion en `backend/src/test/java/com/frontreact/plantings/`
- [ ] T055 Ejecutar y registrar pruebas frontend de plantacion en `frontend/tests/integration/greenhouse/`

---

## Dependencies & Execution Order

### Phase Dependencies

- **Phase 1 (Setup)**: Sin dependencias.
- **Phase 2 (Foundational)**: Depende de Phase 1 y bloquea toda historia.
- **Phase 3 (US1)**: Depende de completar Phase 2.
- **Phase 4 (US2)**: Depende de completar Phase 2.
- **Phase 5 (US3)**: Depende de completar Phase 2.
- **Phase 6 (Polish)**: Depende de las historias objetivo completadas.

### User Story Dependencies

- **US1 (P1)**: Inicia tras Foundational; entrega MVP por si sola.
- **US2 (P2)**: Inicia tras Foundational; reutiliza entidad/servicio base, pero se valida de forma independiente.
- **US3 (P3)**: Inicia tras Foundational; depende funcionalmente de listado para verificar baja logica en UI.

### Within Each User Story

- Pruebas primero (deben fallar antes de implementar).
- Reglas de dominio/servicio antes de controller/API.
- API frontend antes de flujos de pantalla.
- Contratos actualizados al cierre de cada historia.

---

## Parallel Opportunities

- Setup en paralelo: T003 y T004 tras T001/T002.
- Foundational en paralelo: T006, T007, T008, T010, T012 y T013 tras T005.
- Historias en paralelo por equipo: US1, US2 y US3 pueden arrancar luego de Foundational.

## Parallel Example: User Story 1

```bash
Task: T016 [US1] backend create test in backend/src/test/java/com/frontreact/plantings/api/PlantingControllerCreateTest.java
Task: T018 [US1] frontend create form test in frontend/tests/integration/greenhouse/planting-create-form.test.tsx
Task: T019 [US1] e2e create flow in frontend/tests/e2e/greenhouse/planting-create-success.spec.ts
```

## Parallel Example: User Story 2

```bash
Task: T030 [US2] backend list filter test in backend/src/test/java/com/frontreact/plantings/api/PlantingControllerListTest.java
Task: T032 [US2] frontend list filter test in frontend/tests/integration/greenhouse/planting-list-filter.test.tsx
Task: T034 [US2] e2e edit flow in frontend/tests/e2e/greenhouse/planting-edit-success.spec.ts
```

## Parallel Example: User Story 3

```bash
Task: T043 [US3] backend soft delete test in backend/src/test/java/com/frontreact/plantings/api/PlantingControllerDeleteSoftTest.java
Task: T044 [US3] frontend soft delete test in frontend/tests/integration/greenhouse/planting-soft-delete.test.tsx
Task: T045 [US3] e2e soft delete flow in frontend/tests/e2e/greenhouse/planting-soft-delete.spec.ts
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Completar Phase 1 y Phase 2.
2. Completar Phase 3 (US1).
3. Validar alta de punta a punta.
4. Demostrar MVP antes de ampliar alcance.

### Incremental Delivery

1. Entregar MVP con US1 (crear plantacion).
2. Entregar US2 (listar/editar con filtros).
3. Entregar US3 (baja logica).
4. Cerrar con polish y pruebas finales.

### Parallel Team Strategy

1. Equipo completo finaliza Setup + Foundational.
2. Luego dividir por historias:
   - Dev A: backend endpoints/reglas.
   - Dev B: frontend UI/form/listado.
   - Dev C: pruebas y contratos.
3. Integrar por checkpoint de historia.

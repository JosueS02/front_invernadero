# Tasks: CRUD de Catalogo de Sensores

**Input**: Design documents from /specs/008-sensor-catalog-crud/
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/, quickstart.md

**Tests**: Se incluyen tareas de pruebas porque el plan exige cobertura unitaria, integracion y E2E proporcional al riesgo.

**Organization**: Tareas agrupadas por historia de usuario para implementacion y validacion independiente.

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Preparar estructura base de dominio para catalogo de sensores en backend y frontend.

- [X] T001 Crear paquete base del dominio sensors en backend/src/main/java/com/frontreact/sensors/
- [X] T002 Crear estructura frontend de catalogo en frontend/src/features/greenhouse/pages/SensorCatalogPage.tsx y frontend/src/features/greenhouse/services/sensorCatalogApi.ts
- [X] T003 [P] Registrar ruta de catalogo de sensores en frontend/src/app/routes/greenhouseRoutes.tsx
- [ ] T004 [P] Agregar acceso de menu a Catalogo de Sensores en frontend/src/features/greenhouse/components/MenuDrawer.tsx
- [X] T005 [P] Crear estilos base del modulo en frontend/src/features/greenhouse/styles/greenhouse.css

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Construir persistencia, contratos tecnicos y validaciones compartidas que bloquean todas las historias.

**CRITICAL**: Ninguna historia de usuario inicia antes de completar esta fase.

- [X] T006 Crear migracion de tabla sensor_catalog con IDs fijos y version en backend/src/main/resources/db/migration/V8__create_sensor_catalog_table.sql
- [X] T007 Crear migracion de semillas canonicas (Humedad, Temperatura, Luz, CO2) en backend/src/main/resources/db/migration/V9__seed_sensor_catalog.sql
- [X] T008 [P] Definir entidad SensorCatalogo en backend/src/main/java/com/frontreact/sensors/domain/SensorCatalog.java
- [X] T009 [P] Definir repositorio SensorCatalogRepository en backend/src/main/java/com/frontreact/sensors/domain/SensorCatalogRepository.java
- [X] T010 [P] Definir DTOs base de respuesta y actualizacion en backend/src/main/java/com/frontreact/sensors/api/dto/SensorCatalogResponse.java y backend/src/main/java/com/frontreact/sensors/api/dto/UpdateSensorUnitRequest.java
- [X] T011 Implementar validador de unidad requerida (trim no vacio) en backend/src/main/java/com/frontreact/sensors/validation/SensorUnitValidator.java
- [X] T012 Implementar control de concurrencia por expectedVersion/updatedAt en backend/src/main/java/com/frontreact/sensors/service/SensorCatalogConcurrencyValidator.java
- [X] T013 Implementar guard de rol administrador para actualizacion en backend/src/main/java/com/frontreact/sensors/service/SensorCatalogAuthorizationService.java
- [X] T014 Implementar servicio de auto-reparacion al arranque para sensores faltantes en backend/src/main/java/com/frontreact/sensors/service/SensorCatalogBootstrapService.java
- [X] T015 [P] Definir tipos frontend de catalogo y conflictos en frontend/src/features/greenhouse/model/sensor-catalog.types.ts
- [X] T016 [P] Definir validaciones frontend de unidad en frontend/src/features/greenhouse/model/sensor-catalog.validation.ts
- [X] T017 Configurar mapeo de errores 403/404/409 de catalogo en backend/src/main/java/com/frontreact/shared/api/GlobalExceptionHandler.java
- [ ] T018 Actualizar contrato OpenAPI de catalogo en specs/008-sensor-catalog-crud/contracts/api-sensor-catalog-contract.md

**Checkpoint**: Fundacion lista para implementar historias en forma independiente.

---

## Phase 3: User Story 1 - Consultar Catalogo Base de Sensores (Priority: P1) MVP

**Goal**: Permitir consulta del catalogo fijo para usuarios autenticados, mostrando IDs fijos y unidades canonicas.

**Independent Test**: Abrir pantalla de catalogo y validar que aparecen exactamente los 4 sensores base con id, nombre y unidad.

### Tests for User Story 1

- [ ] T019 [P] [US1] Crear prueba backend de listado de catalogo fijo en backend/src/test/java/com/frontreact/sensors/api/SensorCatalogListControllerTest.java
- [ ] T020 [P] [US1] Crear prueba backend de auto-reparacion de sensores faltantes en backend/src/test/java/com/frontreact/sensors/service/SensorCatalogBootstrapServiceTest.java
- [ ] T021 [P] [US1] Crear prueba frontend de render de tabla con 4 sensores base en frontend/tests/integration/greenhouse/sensor-catalog-list.test.tsx
- [ ] T022 [P] [US1] Crear prueba E2E de visualizacion de catalogo base en frontend/tests/e2e/greenhouse/sensor-catalog-list.spec.ts

### Implementation for User Story 1

- [X] T023 [US1] Implementar endpoint GET /api/sensors/catalog en backend/src/main/java/com/frontreact/sensors/api/SensorCatalogController.java
- [X] T024 [US1] Implementar servicio de consulta de catalogo en backend/src/main/java/com/frontreact/sensors/service/SensorCatalogQueryService.java
- [X] T025 [US1] Implementar cliente frontend de consulta en frontend/src/features/greenhouse/services/sensorCatalogApi.ts
- [X] T026 [US1] Implementar pantalla de listado de catalogo en frontend/src/features/greenhouse/pages/SensorCatalogPage.tsx
- [X] T027 [US1] Implementar estado vacio/errores de carga de catalogo en frontend/src/features/greenhouse/pages/SensorCatalogPage.tsx
- [ ] T028 [US1] Alinear contrato UI de listado y columnas en specs/008-sensor-catalog-crud/contracts/ui-sensor-catalog-contract.md

**Checkpoint**: US1 funcional, demostrable y desplegable como MVP.

---

## Phase 4: User Story 2 - Actualizar Unidad de Sensor (Priority: P2)

**Goal**: Permitir actualizacion de unidad solo para administradores con validacion y control de concurrencia.

**Independent Test**: Actualizar unidad con usuario admin y verificar persistencia; con usuario no admin o version desactualizada debe rechazar.

### Tests for User Story 2

- [ ] T029 [P] [US2] Crear prueba backend de actualizacion exitosa por admin en backend/src/test/java/com/frontreact/sensors/api/SensorCatalogUpdateControllerTest.java
- [ ] T030 [P] [US2] Crear prueba backend de rechazo por rol no admin en backend/src/test/java/com/frontreact/sensors/service/SensorCatalogAuthorizationServiceTest.java
- [ ] T031 [P] [US2] Crear prueba backend de conflicto concurrente 409 en backend/src/test/java/com/frontreact/sensors/service/SensorCatalogConcurrencyValidatorTest.java
- [ ] T032 [P] [US2] Crear prueba frontend de edicion de unidad valida en frontend/tests/integration/greenhouse/sensor-catalog-edit.test.tsx
- [ ] T033 [P] [US2] Crear prueba frontend de mensaje por conflicto 409 en frontend/tests/integration/greenhouse/sensor-catalog-conflict.test.tsx
- [ ] T034 [P] [US2] Crear prueba E2E de actualizacion de unidad por admin en frontend/tests/e2e/greenhouse/sensor-catalog-update-admin.spec.ts

### Implementation for User Story 2

- [X] T035 [US2] Implementar endpoint PUT /api/sensors/catalog/{id} con validaciones en backend/src/main/java/com/frontreact/sensors/api/SensorCatalogController.java
- [X] T036 [US2] Implementar servicio de actualizacion de unidad y versionado en backend/src/main/java/com/frontreact/sensors/service/SensorCatalogCommandService.java
- [X] T037 [US2] Integrar validacion de permisos admin en flujo de actualizacion en backend/src/main/java/com/frontreact/sensors/service/SensorCatalogCommandService.java
- [X] T038 [US2] Integrar validacion de expectedVersion/updatedAt en flujo de actualizacion en backend/src/main/java/com/frontreact/sensors/service/SensorCatalogCommandService.java
- [X] T039 [US2] Implementar accion de editar unidad en frontend/src/features/greenhouse/pages/SensorCatalogPage.tsx
- [X] T040 [US2] Implementar bloqueo visual de edicion para no-admin en frontend/src/features/greenhouse/pages/SensorCatalogPage.tsx
- [X] T041 [US2] Implementar manejo de respuestas 403 y 409 en frontend/src/features/greenhouse/pages/SensorCatalogPage.tsx
- [ ] T042 [US2] Alinear contrato API de actualizacion y errores en specs/008-sensor-catalog-crud/contracts/api-sensor-catalog-contract.md

**Checkpoint**: US2 funcional e independiente sobre base de US1.

---

## Phase 5: User Story 3 - Proteger Catalogo Fijo (Priority: P3)

**Goal**: Bloquear creacion y eliminacion de sensores, y garantizar auto-reparacion del catalogo base faltante al arranque.

**Independent Test**: Intentar crear/eliminar sensores y validar rechazo; simular faltante y validar que se repone automaticamente al iniciar.

### Tests for User Story 3

- [ ] T043 [P] [US3] Crear prueba backend de rechazo de POST catalogo cerrado en backend/src/test/java/com/frontreact/sensors/api/SensorCatalogCreateBlockedTest.java
- [ ] T044 [P] [US3] Crear prueba backend de rechazo de DELETE catalogo cerrado en backend/src/test/java/com/frontreact/sensors/api/SensorCatalogDeleteBlockedTest.java
- [ ] T045 [P] [US3] Crear prueba backend de reinsercion de faltantes con IDs canonicos en backend/src/test/java/com/frontreact/sensors/service/SensorCatalogBootstrapRepairTest.java
- [ ] T046 [P] [US3] Crear prueba frontend de ausencia de acciones crear/eliminar en frontend/tests/integration/greenhouse/sensor-catalog-closed-ui.test.tsx
- [ ] T047 [P] [US3] Crear prueba E2E de bloqueo catalogo cerrado en frontend/tests/e2e/greenhouse/sensor-catalog-closed.spec.ts

### Implementation for User Story 3

- [X] T048 [US3] Implementar respuesta explicita de catalogo cerrado para POST en backend/src/main/java/com/frontreact/sensors/api/SensorCatalogController.java
- [X] T049 [US3] Implementar respuesta explicita de catalogo cerrado para DELETE en backend/src/main/java/com/frontreact/sensors/api/SensorCatalogController.java
- [X] T050 [US3] Implementar politica de no exponer accion crear/eliminar en UI en frontend/src/features/greenhouse/pages/SensorCatalogPage.tsx
- [ ] T051 [US3] Completar auto-reparacion de IDs y unidades canonicas al arranque en backend/src/main/java/com/frontreact/sensors/service/SensorCatalogBootstrapService.java
- [ ] T052 [US3] Alinear contrato UI/API de catalogo cerrado en specs/008-sensor-catalog-crud/contracts/ui-sensor-catalog-contract.md y specs/008-sensor-catalog-crud/contracts/api-sensor-catalog-contract.md

**Checkpoint**: US3 funcional e independiente con catalogo fijo protegido.

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Cerrar accesibilidad, calidad transversal y validacion final de la feature.

- [ ] T053 [P] Ajustar accesibilidad de tabla, formulario y mensajes aria-live en frontend/src/features/greenhouse/pages/SensorCatalogPage.tsx
- [ ] T054 [P] Ajustar estilos de estados de error/confirmacion en frontend/src/features/greenhouse/styles/greenhouse.css
- [ ] T055 Actualizar guia de validacion final en specs/008-sensor-catalog-crud/quickstart.md
- [ ] T056 Ejecutar y registrar pruebas backend del modulo sensors en backend/src/test/java/com/frontreact/sensors/
- [ ] T057 Ejecutar y registrar pruebas frontend del catalogo en frontend/tests/integration/greenhouse/ y frontend/tests/e2e/greenhouse/
- [ ] T058 Verificar sincronizacion final de OpenAPI/Swagger para catalogo en specs/008-sensor-catalog-crud/contracts/api-sensor-catalog-contract.md

---

## Dependencies & Execution Order

### Phase Dependencies

- Phase 1 Setup: inicia inmediatamente.
- Phase 2 Foundational: depende de Phase 1 y bloquea todas las historias.
- Phase 3 US1: depende de completar Phase 2.
- Phase 4 US2: depende de completar Phase 2 y de endpoint/listado de US1.
- Phase 5 US3: depende de completar Phase 2.
- Phase 6 Polish: depende de historias implementadas.

### User Story Dependencies

- US1 (P1): base MVP, independiente tras foundational.
- US2 (P2): depende funcionalmente de la consulta de catalogo (US1) para editar.
- US3 (P3): independiente tras foundational, aunque comparte controlador y contratos con US1/US2.

### Within Each User Story

- Pruebas primero y en fallo esperado antes de implementar.
- DTOs/modelos antes de servicios.
- Servicios antes de controlador/endpoints.
- API frontend antes de wiring final en pagina.
- Contratos actualizados al cierre de cada historia.

## Parallel Opportunities

- Setup en paralelo: T003, T004, T005.
- Foundational en paralelo: T008, T009, T010, T015, T016.
- US1 en paralelo: T019-T022.
- US2 en paralelo: T029-T034.
- US3 en paralelo: T043-T047.
- Polish en paralelo: T053 y T054.

## Parallel Example: User Story 1

- Backend list test: backend/src/test/java/com/frontreact/sensors/api/SensorCatalogListControllerTest.java
- Frontend list integration test: frontend/tests/integration/greenhouse/sensor-catalog-list.test.tsx
- Backend bootstrap repair test: backend/src/test/java/com/frontreact/sensors/service/SensorCatalogBootstrapServiceTest.java
- Frontend E2E list test: frontend/tests/e2e/greenhouse/sensor-catalog-list.spec.ts

## Parallel Example: User Story 2

- Backend auth test: backend/src/test/java/com/frontreact/sensors/service/SensorCatalogAuthorizationServiceTest.java
- Frontend edit integration test: frontend/tests/integration/greenhouse/sensor-catalog-edit.test.tsx
- Backend conflict test: backend/src/test/java/com/frontreact/sensors/service/SensorCatalogConcurrencyValidatorTest.java
- Frontend conflict integration test: frontend/tests/integration/greenhouse/sensor-catalog-conflict.test.tsx

## Parallel Example: User Story 3

- Backend create-blocked test: backend/src/test/java/com/frontreact/sensors/api/SensorCatalogCreateBlockedTest.java
- Backend delete-blocked test: backend/src/test/java/com/frontreact/sensors/api/SensorCatalogDeleteBlockedTest.java
- Frontend closed-catalog integration test: frontend/tests/integration/greenhouse/sensor-catalog-closed-ui.test.tsx
- Frontend closed-catalog E2E test: frontend/tests/e2e/greenhouse/sensor-catalog-closed.spec.ts

---

## Implementation Strategy

### MVP First (User Story 1 only)

1. Completar Phase 1 Setup.
2. Completar Phase 2 Foundational.
3. Completar Phase 3 US1.
4. Validar US1 de forma independiente antes de extender.

### Incremental Delivery

1. Entregar MVP con US1 (consulta de catalogo fijo).
2. Entregar US2 (edicion de unidad con permisos y concurrencia).
3. Entregar US3 (catalogo cerrado y auto-reparacion de faltantes).
4. Cerrar con Polish y evidencia de pruebas.

### Parallel Team Strategy

1. Equipo completo en Setup + Foundational.
2. Luego dividir por historia:
   - Dev A: backend services/controller del catalogo.
   - Dev B: frontend pagina/API client del catalogo.
   - Dev C: pruebas y contratos por historia.
3. Integracion al cierre de cada checkpoint.

---

## Notes

- Todas las tareas siguen formato estricto checklist con ID secuencial.
- Etiquetas [US1], [US2], [US3] solo en fases de historias.
- Las tareas [P] se limitaron a archivos sin dependencia directa.
- Cada historia define criterio de prueba independiente y ejecutable.

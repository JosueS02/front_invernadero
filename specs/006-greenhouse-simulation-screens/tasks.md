# Tasks: Greenhouse Simulation Screens

**Input**: Design documents from `/specs/006-greenhouse-simulation-screens/`
**Prerequisites**: plan.md (required), spec.md (required), research.md, data-model.md, contracts/

**Tests**: Se incluyen tareas de pruebas porque el spec define criterios de testing por historia y objetivos medibles.

**Organization**: Tareas agrupadas por historia de usuario para implementación y validación independiente.

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Preparar estructura técnica base para módulo de simulación en frontend/backend.

- [X] T001 Add simulation route placeholders in frontend/src/app/routes/greenhouseRoutes.tsx
- [X] T002 Create simulation shared frontend types in frontend/src/features/greenhouse/model/simulation.types.ts
- [X] T003 [P] Create simulation API client skeleton in frontend/src/features/greenhouse/services/simulationApi.ts
- [X] T004 [P] Create simulation package marker in backend/src/main/java/com/frontreact/simulation/package-info.java
- [X] T005 [P] Create simulation test package marker in backend/src/test/java/com/frontreact/simulation/package-info.java

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Infraestructura y contratos comunes que bloquean todas las historias.

**⚠️ CRITICAL**: Ninguna historia inicia antes de completar esta fase.

- [X] T006 Create simulation sessions migration in backend/src/main/resources/db/migration/V4__create_simulation_sessions_table.sql
- [X] T007 Create simulation states migration in backend/src/main/resources/db/migration/V5__create_simulation_state_tables.sql
- [X] T008 [P] Implement SimulationSession entity in backend/src/main/java/com/frontreact/simulation/domain/SimulationSession.java
- [X] T009 [P] Implement ActuatorState entity with updatedAt in backend/src/main/java/com/frontreact/simulation/domain/ActuatorState.java
- [X] T010 [P] Implement ClimateEventState entity with updatedAt in backend/src/main/java/com/frontreact/simulation/domain/ClimateEventState.java
- [X] T011 [P] Implement SimulationSessionRepository in backend/src/main/java/com/frontreact/simulation/domain/SimulationSessionRepository.java
- [X] T012 [P] Implement ActuatorStateRepository in backend/src/main/java/com/frontreact/simulation/domain/ActuatorStateRepository.java
- [X] T013 [P] Implement ClimateEventStateRepository in backend/src/main/java/com/frontreact/simulation/domain/ClimateEventStateRepository.java
- [X] T014 Implement authenticated-user resolver for simulation module in backend/src/main/java/com/frontreact/simulation/service/AuthenticatedUserResolver.java
- [X] T015 Implement ownership validator using authenticated context in backend/src/main/java/com/frontreact/simulation/service/SimulationOwnershipValidator.java
- [X] T016 [P] Remove userId from simulation API contract definitions in specs/006-greenhouse-simulation-screens/contracts/api-simulation-contract.md
- [X] T017 [P] Implement simulation session store in frontend/src/features/greenhouse/model/simulationSession.store.ts
- [X] T018 [P] Add reusable simulation API error helper in frontend/src/features/greenhouse/services/simulationApi.ts

**Checkpoint**: Persistencia, repositorios, identidad autenticada y base de API listos para historias.

---

## Phase 3: User Story 1 - Seleccionar Invernadero y Cosecha para Simulacion (Priority: P1) 🎯 MVP

**Goal**: Resolver entrada condicional AVAILABLE/PRODUCTION, selección válida de cosecha y estado vacío cuando no existan invernaderos disponibles.

**Independent Test**: Verificar flujo de entrada completo incluyendo redirect por PRODUCTION, filtrado de cosechas INACTIVE del usuario autenticado y empty state con retorno a inicio.

### Tests for User Story 1

- [X] T019 [P] [US1] Add backend service test for entry screen resolution in backend/src/test/java/com/frontreact/simulation/service/SimulationEntryServiceTest.java
- [X] T020 [P] [US1] Add backend service test for authenticated ownership filtering in backend/src/test/java/com/frontreact/simulation/service/SimulationEntryOwnershipTest.java
- [X] T021 [P] [US1] Add integration test for simulation start screen and crop filtering in frontend/tests/integration/greenhouse/simulation-start.test.tsx
- [X] T022 [P] [US1] Add integration test for no-available-greenhouses empty state in frontend/tests/integration/greenhouse/simulation-empty-state.test.tsx
- [X] T023 [P] [US1] Add e2e test for available-greenhouse start flow in frontend/tests/e2e/greenhouse/simulation-start-available.spec.ts
- [X] T024 [P] [US1] Add e2e test for production redirect to actuators in frontend/tests/e2e/greenhouse/simulation-start-production-redirect.spec.ts

### Implementation for User Story 1

- [X] T025 [P] [US1] Implement entry response DTOs with entryScreen in backend/src/main/java/com/frontreact/simulation/api/dto/SimulationEntryResponse.java
- [X] T026 [P] [US1] Implement start session request DTO without userId in backend/src/main/java/com/frontreact/simulation/api/dto/StartSimulationRequest.java
- [X] T027 [US1] Implement entry query service using authenticated user context in backend/src/main/java/com/frontreact/simulation/service/SimulationEntryService.java
- [X] T028 [US1] Implement start session service with INACTIVE crop validation in backend/src/main/java/com/frontreact/simulation/service/SimulationSessionService.java
- [X] T029 [US1] Implement entry/crops/start endpoints without client userId in backend/src/main/java/com/frontreact/simulation/api/SimulationController.java
- [X] T030 [P] [US1] Implement simulation start page UI in frontend/src/features/greenhouse/pages/SimulationStartPage.tsx
- [X] T031 [P] [US1] Implement simulation empty-state page UI in frontend/src/features/greenhouse/pages/SimulationEmptyStatePage.tsx
- [X] T032 [P] [US1] Add start and empty-state styles in frontend/src/features/greenhouse/styles/simulation.css
- [X] T033 [US1] Implement entry and start API calls in frontend/src/features/greenhouse/services/simulationApi.ts
- [X] T034 [US1] Add conditional navigation for start/actuators/empty-state in frontend/src/app/routes/greenhouseRoutes.tsx
- [X] T035 [US1] Implement back-to-home actions in frontend/src/features/greenhouse/pages/SimulationStartPage.tsx

**Checkpoint**: US1 funcional e independiente con selección válida, entrada condicional y empty state.

---

## Phase 4: User Story 2 - Controlar Actuadores durante la Simulacion (Priority: P2)

**Goal**: Mostrar actuadores del invernadero activo y soportar toggles con persistencia inmediata, updatedAt y rollback optimista ante error.

**Independent Test**: Verificar alternancia gris/verde, persistencia instantánea, retorno de updatedAt y rollback de UI si falla backend.

### Tests for User Story 2

- [X] T036 [P] [US2] Add backend service test for actuator toggle persistence in backend/src/test/java/com/frontreact/simulation/service/ActuatorStateServiceTest.java
- [X] T037 [P] [US2] Add backend test for last-write-wins timestamp behavior in backend/src/test/java/com/frontreact/simulation/service/ActuatorLastWriteWinsTest.java
- [X] T038 [P] [US2] Add integration test for actuator color transitions in frontend/tests/integration/greenhouse/simulation-actuators.test.tsx
- [X] T039 [P] [US2] Add integration test for optimistic rollback on actuator error in frontend/tests/integration/greenhouse/simulation-actuators-rollback.test.tsx
- [X] T040 [P] [US2] Add e2e test for actuator toggle success path in frontend/tests/e2e/greenhouse/simulation-actuators-toggle.spec.ts

### Implementation for User Story 2

- [X] T041 [P] [US2] Implement actuator state DTO with updatedAt in backend/src/main/java/com/frontreact/simulation/api/dto/ActuatorStateResponse.java
- [X] T042 [US2] Implement actuator state service with immediate persistence in backend/src/main/java/com/frontreact/simulation/service/ActuatorStateService.java
- [X] T043 [US2] Implement actuators GET/PATCH endpoints in backend/src/main/java/com/frontreact/simulation/api/SimulationController.java
- [X] T044 [P] [US2] Implement actuators page UI in frontend/src/features/greenhouse/pages/SimulationActuatorsPage.tsx
- [X] T045 [P] [US2] Add actuator state styles (gray/green) in frontend/src/features/greenhouse/styles/simulation.css
- [X] T046 [US2] Implement actuator API calls and typing in frontend/src/features/greenhouse/services/simulationApi.ts
- [X] T047 [US2] Implement optimistic toggle + rollback logic for actuators in frontend/src/features/greenhouse/pages/SimulationActuatorsPage.tsx

**Checkpoint**: US2 funcional e independiente con persistencia inmediata y rollback optimista.

---

## Phase 5: User Story 3 - Gestionar Eventos Climaticos (Priority: P3)

**Goal**: Listar y alternar eventos climáticos con persistencia inmediata, updatedAt y rollback optimista ante error.

**Independent Test**: Verificar toggle individual por evento, consistencia visual inmediata y rollback de UI en caso de fallo.

### Tests for User Story 3

- [X] T048 [P] [US3] Add backend service test for climate event persistence in backend/src/test/java/com/frontreact/simulation/service/ClimateEventStateServiceTest.java
- [X] T049 [P] [US3] Add backend test for climate last-write-wins timestamp behavior in backend/src/test/java/com/frontreact/simulation/service/ClimateLastWriteWinsTest.java
- [X] T050 [P] [US3] Add integration test for climate events list and toggles in frontend/tests/integration/greenhouse/simulation-climate-events.test.tsx
- [X] T051 [P] [US3] Add integration test for optimistic rollback on climate event error in frontend/tests/integration/greenhouse/simulation-climate-events-rollback.test.tsx
- [X] T052 [P] [US3] Add e2e test for climate event toggle flow in frontend/tests/e2e/greenhouse/simulation-climate-events-toggle.spec.ts

### Implementation for User Story 3

- [X] T053 [P] [US3] Implement climate event DTO with updatedAt in backend/src/main/java/com/frontreact/simulation/api/dto/ClimateEventStateResponse.java
- [X] T054 [US3] Implement climate event service with immediate persistence in backend/src/main/java/com/frontreact/simulation/service/ClimateEventStateService.java
- [X] T055 [US3] Implement climate events GET/PATCH endpoints in backend/src/main/java/com/frontreact/simulation/api/SimulationController.java
- [X] T056 [P] [US3] Implement climate events page UI in frontend/src/features/greenhouse/pages/SimulationClimateEventsPage.tsx
- [X] T057 [P] [US3] Add climate events styles in frontend/src/features/greenhouse/styles/simulation.css
- [X] T058 [US3] Implement climate event API calls and typing in frontend/src/features/greenhouse/services/simulationApi.ts
- [X] T059 [US3] Implement optimistic toggle + rollback logic for climate events in frontend/src/features/greenhouse/pages/SimulationClimateEventsPage.tsx

**Checkpoint**: US3 funcional e independiente con toggles y rollback optimista.

---

## Phase 6: User Story 4 - Navegar por Menu de Simulacion y Dashboard (Priority: P4)

**Goal**: Restringir menú a tres destinos operativos, mostrar dashboard sincronizado y permitir salida a inicio.

**Independent Test**: Verificar destinos permitidos del menú, resumen consistente del dashboard y salida correcta del invernadero.

### Tests for User Story 4

- [X] T060 [P] [US4] Add integration test for simulation menu destination constraints in frontend/tests/integration/greenhouse/simulation-menu-navigation.test.tsx
- [X] T061 [P] [US4] Add integration test for dashboard summary sync with updatedAt values in frontend/tests/integration/greenhouse/simulation-dashboard.test.tsx
- [X] T062 [P] [US4] Add e2e test for exit-to-home behavior in frontend/tests/e2e/greenhouse/simulation-exit-to-home.spec.ts
- [X] T063 [P] [US4] Add backend service test for simulation exit flow in backend/src/test/java/com/frontreact/simulation/service/SimulationExitServiceTest.java

### Implementation for User Story 4

- [X] T064 [P] [US4] Implement dashboard response DTO in backend/src/main/java/com/frontreact/simulation/api/dto/SimulationDashboardResponse.java
- [X] T065 [US4] Implement dashboard aggregation and exit logic in backend/src/main/java/com/frontreact/simulation/service/SimulationDashboardService.java
- [X] T066 [US4] Implement dashboard/exit endpoints in backend/src/main/java/com/frontreact/simulation/api/SimulationController.java
- [X] T067 [P] [US4] Implement simulation dashboard page in frontend/src/features/greenhouse/pages/SimulationDashboardPage.tsx
- [X] T068 [P] [US4] Implement simulation-only menu component with bottom exit action in frontend/src/features/greenhouse/components/SimulationMenu.tsx
- [X] T069 [US4] Integrate simulation menu and dashboard routes in frontend/src/app/routes/greenhouseRoutes.tsx
- [X] T070 [US4] Add dashboard/menu/exit styles in frontend/src/features/greenhouse/styles/simulation.css
- [X] T071 [US4] Implement dashboard and exit API calls in frontend/src/features/greenhouse/services/simulationApi.ts

**Checkpoint**: US4 funcional e independiente con menú acotado, dashboard y salida.

---

## Phase 7: Polish & Cross-Cutting Concerns

**Purpose**: Cierre de calidad transversal y documentación final.

- [X] T072 [P] Add/update OpenAPI annotations for simulation endpoints in backend/src/main/java/com/frontreact/simulation/api/SimulationController.java
- [X] T073 [P] Add simulation exception mappings in backend/src/main/java/com/frontreact/common/GlobalExceptionHandler.java
- [X] T074 [P] Add accessibility and keyboard checks for simulation controls in frontend/src/features/greenhouse/components/SimulationMenu.tsx
- [X] T075 [P] Update quickstart validations for new empty-state and rollback behavior in specs/006-greenhouse-simulation-screens/quickstart.md
- [X] T076 Verify contract alignment with authenticated-user context in specs/006-greenhouse-simulation-screens/contracts/api-simulation-contract.md
- [X] T077 Run and record backend validation commands in specs/006-greenhouse-simulation-screens/quickstart.md
- [X] T078 Run and record frontend validation commands in specs/006-greenhouse-simulation-screens/quickstart.md

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: inicia inmediatamente.
- **Foundational (Phase 2)**: depende de Setup y bloquea todas las historias.
- **User Stories (Phase 3-6)**: dependen de Foundational.
- **Polish (Phase 7)**: depende de historias completadas.

### User Story Dependencies

- **US1 (P1)**: inicia tras Foundational; entrega MVP completo.
- **US2 (P2)**: inicia tras Foundational; usa sesión activa para pruebas E2E.
- **US3 (P3)**: inicia tras Foundational; usa sesión activa para pruebas E2E.
- **US4 (P4)**: inicia tras Foundational; integra estados de US2/US3 en dashboard.

### Within Each User Story

- Tests primero y fallando antes de implementar.
- DTOs/modelos antes de servicios.
- Servicios antes de endpoints.
- API/frontend client antes de wiring de páginas/rutas.

## Parallel Opportunities

- **Phase 1**: T003, T004, T005.
- **Phase 2**: T008-T013 y T016-T018.
- **US1**: T019-T024 en paralelo; luego T025-T026 y T030-T032.
- **US2**: T036-T040 en paralelo; luego T041, T044, T045.
- **US3**: T048-T052 en paralelo; luego T053, T056, T057.
- **US4**: T060-T063 en paralelo; luego T064, T067, T068.
- **Phase 7**: T072-T076 en paralelo.

---

## Parallel Example: User Story 1

```bash
Task: "T019 [US1] Add backend service test for entry screen resolution in backend/src/test/java/com/frontreact/simulation/service/SimulationEntryServiceTest.java"
Task: "T021 [US1] Add integration test for simulation start screen and crop filtering in frontend/tests/integration/greenhouse/simulation-start.test.tsx"
Task: "T022 [US1] Add integration test for no-available-greenhouses empty state in frontend/tests/integration/greenhouse/simulation-empty-state.test.tsx"
Task: "T024 [US1] Add e2e test for production redirect to actuators in frontend/tests/e2e/greenhouse/simulation-start-production-redirect.spec.ts"
```

## Parallel Example: User Story 2

```bash
Task: "T037 [US2] Add backend test for last-write-wins timestamp behavior in backend/src/test/java/com/frontreact/simulation/service/ActuatorLastWriteWinsTest.java"
Task: "T038 [US2] Add integration test for actuator color transitions in frontend/tests/integration/greenhouse/simulation-actuators.test.tsx"
Task: "T039 [US2] Add integration test for optimistic rollback on actuator error in frontend/tests/integration/greenhouse/simulation-actuators-rollback.test.tsx"
```

## Parallel Example: User Story 3

```bash
Task: "T049 [US3] Add backend test for climate last-write-wins timestamp behavior in backend/src/test/java/com/frontreact/simulation/service/ClimateLastWriteWinsTest.java"
Task: "T050 [US3] Add integration test for climate events list and toggles in frontend/tests/integration/greenhouse/simulation-climate-events.test.tsx"
Task: "T051 [US3] Add integration test for optimistic rollback on climate event error in frontend/tests/integration/greenhouse/simulation-climate-events-rollback.test.tsx"
```

## Parallel Example: User Story 4

```bash
Task: "T060 [US4] Add integration test for simulation menu destination constraints in frontend/tests/integration/greenhouse/simulation-menu-navigation.test.tsx"
Task: "T061 [US4] Add integration test for dashboard summary sync with updatedAt values in frontend/tests/integration/greenhouse/simulation-dashboard.test.tsx"
Task: "T062 [US4] Add e2e test for exit-to-home behavior in frontend/tests/e2e/greenhouse/simulation-exit-to-home.spec.ts"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1 (Setup).
2. Complete Phase 2 (Foundational).
3. Complete Phase 3 (US1).
4. Validar escenarios independientes de US1 y demostrar MVP.

### Incremental Delivery

1. Entregar US1 (entrada condicional + empty state + start válido).
2. Entregar US2 (actuadores con rollback optimista).
3. Entregar US3 (eventos con rollback optimista).
4. Entregar US4 (dashboard + menú + salida).
5. Finalizar con Phase 7 para contratos, accesibilidad y validación final.

### Parallel Team Strategy

1. Equipo completo en Setup + Foundational.
2. Luego trabajo paralelo por historias (US2 y US3 en paralelo una vez haya sesión base).
3. Cierre con US4 y Polish.

---

## Notes

- Formato checklist estricto aplicado en todas las tareas: `- [ ] Txxx [P] [USx] Descripcion con ruta`.
- Etiqueta `[USx]` solo aparece en fases de historias de usuario.
- Cada historia incluye criterio de prueba independiente y ejecutable.

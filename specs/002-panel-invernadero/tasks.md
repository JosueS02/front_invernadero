# Tasks: Panel de Gestion de Invernadero

**Input**: Design documents from /specs/002-panel-invernadero/
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/

**Tests**: Se incluyen tareas de pruebas porque el plan y la constitucion exigen validacion unitaria, integracion y E2E.

**Organization**: Tareas agrupadas por historia de usuario para permitir implementacion y validacion independiente.

## Format: [ID] [P?] [Story] Description

- [P]: Puede ejecutarse en paralelo (archivos distintos, sin dependencias)
- [Story]: Historia asociada (US1, US2, US3)
- Cada tarea incluye ruta de archivo explicita

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Preparar estructura de feature greenhouse en frontend y base de rutas/pruebas.

- [x] T001 Crear estructura base de feature en frontend/src/features/greenhouse/components/, frontend/src/features/greenhouse/pages/, frontend/src/features/greenhouse/model/ y frontend/src/features/greenhouse/styles/
- [x] T002 Crear archivo de rutas de gestion en frontend/src/app/routes/greenhouseRoutes.tsx
- [x] T003 [P] Crear estilos base de modulo greenhouse en frontend/src/features/greenhouse/styles/greenhouse.css
- [x] T004 [P] Crear carpetas de pruebas de modulo en frontend/tests/unit/greenhouse/, frontend/tests/integration/greenhouse/ y frontend/tests/e2e/greenhouse/

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Construir cimientos comunes para topbar persistente, menu y modelos de dominio.

**CRITICAL**: Ninguna historia debe iniciar sin cerrar esta fase.

- [x] T005 Crear tipos de dominio UserSession, Greenhouse, CropProfile y NavigationItem en frontend/src/features/greenhouse/model/greenhouse.types.ts
- [x] T006 Crear utilidades de validacion de campos obligatorios y regla min < max en frontend/src/features/greenhouse/model/greenhouse.validation.ts
- [x] T007 [P] Implementar componente TopBar persistente con menu izquierdo y correo derecho en frontend/src/features/greenhouse/components/TopBar.tsx
- [x] T008 [P] Implementar componente MenuDrawer con opciones Inicio, Invernadero y Cosecha en frontend/src/features/greenhouse/components/MenuDrawer.tsx
- [x] T009 Implementar layout compartido para las tres pantallas en frontend/src/features/greenhouse/components/ManagementLayout.tsx
- [x] T010 Implementar estado base de sesion para mostrar correo en topbar en frontend/src/features/greenhouse/model/session.store.ts
- [x] T011 Integrar rutas /inicio, /invernadero y /cosecha en frontend/src/app/routes/greenhouseRoutes.tsx

**Checkpoint**: Infraestructura lista para implementar historias funcionales.

---

## Phase 3: User Story 1 - Crear Invernadero con Configuracion Base (Priority: P1) MVP

**Goal**: Permitir crear invernadero con nombre, ubicacion y checklist de sensores/actuadores desde un formulario validado.

**Independent Test**: En /invernadero, usuario puede completar nombre/ubicacion, seleccionar checklist y enviar; sin campos obligatorios no puede enviar.

### Tests for User Story 1

- [x] T012 [P] [US1] Crear pruebas unitarias de validacion de formulario de invernadero en frontend/tests/unit/greenhouse/greenhouse.validation.test.ts
- [x] T013 [P] [US1] Crear prueba de integracion de render/validaciones de pantalla Invernadero en frontend/tests/integration/greenhouse/greenhouse-form.test.tsx
- [x] T014 [US1] Crear prueba E2E de alta de invernadero valida en frontend/tests/e2e/greenhouse/create-greenhouse.spec.ts

### Implementation for User Story 1

- [x] T015 [US1] Implementar pantalla Invernadero con campos Nombre/Ubicacion en frontend/src/features/greenhouse/pages/GreenhousePage.tsx
- [x] T016 [US1] Implementar checklist de Sensores y Actuadores en frontend/src/features/greenhouse/pages/GreenhousePage.tsx
- [x] T017 [US1] Implementar envio y bloqueo por validaciones en frontend/src/features/greenhouse/pages/GreenhousePage.tsx
- [x] T018 [US1] Aplicar estilos visuales del formulario de invernadero en frontend/src/features/greenhouse/styles/greenhouse.css

**Checkpoint**: US1 funcional y demostrable de forma independiente.

---

## Phase 4: User Story 2 - Configurar Parametros de Cosecha (Priority: P2)

**Goal**: Permitir configurar cosecha con nombre y rangos min/max de temperatura, humedad y luz.

**Independent Test**: En /cosecha, formulario permite envio con datos validos y bloquea min >= max o entradas invalidas.

### Tests for User Story 2

- [x] T019 [P] [US2] Crear pruebas unitarias de regla minimo < maximo en frontend/tests/unit/greenhouse/crop-range.validation.test.ts
- [x] T020 [P] [US2] Crear prueba de integracion de formulario de cosecha y errores en frontend/tests/integration/greenhouse/crop-form.test.tsx
- [x] T021 [US2] Crear prueba E2E de configuracion de cosecha valida e invalida en frontend/tests/e2e/greenhouse/crop-config.spec.ts

### Implementation for User Story 2

- [x] T022 [US2] Implementar pantalla Cosecha con nombre y campos min/max en frontend/src/features/greenhouse/pages/CropPage.tsx
- [x] T023 [US2] Implementar validaciones de tipo numerico y regla min < max en frontend/src/features/greenhouse/pages/CropPage.tsx
- [x] T024 [US2] Aplicar estilos visuales del formulario de cosecha en frontend/src/features/greenhouse/styles/greenhouse.css

**Checkpoint**: US2 funcional sin depender de cambios adicionales en US1.

---

## Phase 5: User Story 3 - Navegar por Menu Principal de Gestion (Priority: P3)

**Goal**: Garantizar navegacion por menu entre Inicio, Invernadero y Cosecha con topbar persistente mostrando correo.

**Independent Test**: Desde cualquier vista, menu navega en una accion a las tres pantallas y topbar permanece visible con correo.

### Tests for User Story 3

- [x] T025 [P] [US3] Crear prueba de integracion de topbar persistente y menu en frontend/tests/integration/greenhouse/navigation-shell.test.tsx
- [x] T026 [P] [US3] Crear prueba de integracion de rutas Inicio/Invernadero/Cosecha en frontend/tests/integration/greenhouse/route-switch.test.tsx
- [x] T027 [US3] Crear prueba E2E de navegacion completa del menu en frontend/tests/e2e/greenhouse/menu-navigation.spec.ts

### Implementation for User Story 3

- [x] T028 [US3] Implementar pantalla Inicio en frontend/src/features/greenhouse/pages/HomePage.tsx
- [x] T029 [US3] Integrar ManagementLayout y menu en las rutas de modulo en frontend/src/app/routes/greenhouseRoutes.tsx
- [x] T030 [US3] Integrar enlace de modulo tras login hacia /inicio en frontend/src/app/routes/authRoutes.tsx
- [x] T031 [US3] Ajustar responsividad y accesibilidad de topbar/menu en frontend/src/features/greenhouse/styles/greenhouse.css

**Checkpoint**: US3 funcional con navegacion completa y topbar persistente.

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Cerrar validaciones transversales, documentacion y verificacion final.

- [x] T032 [P] Actualizar contrato UI con detalles finales de implementacion en specs/002-panel-invernadero/contracts/ui-greenhouse-management-contract.md
- [x] T033 [P] Actualizar quickstart con comandos y rutas finales en specs/002-panel-invernadero/quickstart.md
- [x] T034 Ejecutar suite completa (unit/integration/e2e/build) desde frontend/ y corregir regresiones en frontend/tests/ y frontend/src/
- [x] T035 Revisar consistencia visual, textos y estados de error en frontend/src/features/greenhouse/styles/greenhouse.css

---

## Dependencies & Execution Order

### Phase Dependencies

- Phase 1 (Setup): inicia inmediatamente.
- Phase 2 (Foundational): depende de Phase 1 y bloquea historias.
- Phase 3 (US1): depende de Phase 2.
- Phase 4 (US2): depende de Phase 2.
- Phase 5 (US3): depende de Phase 2 e integra rutas de US1/US2.
- Phase 6 (Polish): depende de cierre de US1, US2 y US3.

### User Story Dependencies

- US1 (P1): base funcional del modulo.
- US2 (P2): independiente de US1 tras cimientos compartidos.
- US3 (P3): requiere que las pantallas objetivo ya existan para navegacion completa.

### Within Each User Story

- Pruebas primero (fallando inicialmente).
- Implementacion de pantalla y validaciones.
- Integracion con layout/menu/rutas.
- Validacion final de la historia.

### Parallel Opportunities

- T003 y T004 en paralelo.
- T007 y T008 en paralelo.
- T012 y T013 en paralelo.
- T019 y T020 en paralelo.
- T025 y T026 en paralelo.
- T032 y T033 en paralelo.

---

## Parallel Example: User Story 2

```bash
Task: "T019 [US2] pruebas unitarias de rangos en frontend/tests/unit/greenhouse/crop-range.validation.test.ts"
Task: "T020 [US2] integracion de formulario en frontend/tests/integration/greenhouse/crop-form.test.tsx"
```

---

## Implementation Strategy

### MVP First (User Story 1)

1. Completar Phase 1 (Setup).
2. Completar Phase 2 (Foundational).
3. Completar Phase 3 (US1).
4. Validar US1 de forma aislada.

### Incremental Delivery

1. Entregar MVP con US1 (alta de invernadero).
2. Incorporar US2 (configuracion de cosecha).
3. Incorporar US3 (navegacion completa y shell persistente).
4. Cerrar con polish y regression pass.

### Parallel Team Strategy

1. Equipo cierra Setup + Foundational.
2. Luego:
   - Dev A: US1
   - Dev B: US2
   - Dev C: US3
3. Integracion y cierre conjunto en Phase 6.

---

## Notes

- Todas las tareas cumplen formato estricto con ID y ruta.
- Tareas [P] solo en archivos independientes.
- Cada historia incluye criterio de prueba independiente.
- El alcance de esta iteracion se mantiene en UI/UX y validaciones de cliente.

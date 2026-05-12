# Implementation Plan: Greenhouse Simulation Screens

**Branch**: `006-greenhouse-simulation-screens` | **Date**: 2026-04-09 | **Spec**: `specs/006-greenhouse-simulation-screens/spec.md`
**Input**: Feature specification from `specs/006-greenhouse-simulation-screens/spec.md`

## Summary

Implementar un flujo de 5 pantallas de simulacion para invernaderos con reglas de entrada condicional: si el invernadero esta en estado AVAILABLE se muestra la pantalla de inicio de simulador; si esta en PRODUCTION se omite y se redirige directo a actuadores. El diseno mantiene control operacional en tres vistas (actuadores, eventos climaticos y dashboard), agrega boton de salida a inicio, y asegura consistencia entre frontend React/TypeScript y backend Spring Boot/PostgreSQL con contratos UI/API definidos.

## Technical Context

**Language/Version**: Frontend TypeScript 5.x + React 18.x; Backend Java 17 + Spring Boot 3.x  
**Primary Dependencies**: React, React Router DOM, Spring Web, Spring Validation, Spring Data JPA, PostgreSQL driver, Flyway, OpenAPI/Swagger  
**Storage**: PostgreSQL con migraciones versionadas (Flyway)  
**Testing**: Vitest + Testing Library (unit/integration frontend), Playwright (E2E frontend), JUnit/Spring tests para backend  
**Target Platform**: Web app (desktop y mobile browser) + API REST en Linux server local/dev  
**Project Type**: Web application (frontend + backend)  
**Performance Goals**: Navegacion entre pantallas de simulacion sin bloqueos perceptibles; render interactivo fluido en toggles de actuadores/eventos  
**Constraints**: Mantener reglas de negocio de estado (AVAILABLE/PRODUCTION), aislamiento por usuario autenticado y accesibilidad de controles por teclado  
**Scale/Scope**: 5 pantallas de simulacion, 1 menu acotado de 3 destinos operativos + salida, sesion de simulacion por usuario/invernadero

## Constitution Check (Pre-Design Gate)

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- Frontend React + TypeScript: PASS. Se mantienen tipos en entidades de simulacion y contratos de UI.
- Backend Spring Boot 3 + Java 17: PASS. Endpoints propuestos para simulacion siguen stack vigente.
- PostgreSQL + migraciones versionadas: PASS. Estados de simulacion persistibles cuando aplique estado de servidor.
- OpenAPI 3/Swagger actualizado: PASS. Contrato API define endpoints requeridos para documentar.
- Cobertura de pruebas proporcional al riesgo: PASS. Quickstart define validaciones unitarias/integracion/E2E del flujo.
- Accesibilidad y consistencia UX: PASS. Contrato UI incluye navegacion por teclado y contraste.
- Documentacion actualizada para arquitectura/contratos: PASS. research.md, data-model.md, quickstart.md y contracts creados.

## Phase 0: Research Output

Artifacto generado: `specs/006-greenhouse-simulation-screens/research.md`

- Entrada condicional por estado del invernadero: decidido y justificado.
- Filtro de cosechas por estado INACTIVE y propietario: decidido y justificado.
- Estados visuales de actuadores/eventos y menu acotado: decidido y justificado.
- Persistencia de estado de sesion de simulacion cuando aplique: decidido y justificado.
- Contratos UI/API separados para trazabilidad: decidido y justificado.

No quedan elementos NEEDS CLARIFICATION.

## Phase 1: Design & Contracts Output

Artifactos generados:

- `specs/006-greenhouse-simulation-screens/data-model.md`
- `specs/006-greenhouse-simulation-screens/quickstart.md`
- `specs/006-greenhouse-simulation-screens/contracts/ui-simulation-flow-contract.md`
- `specs/006-greenhouse-simulation-screens/contracts/api-simulation-contract.md`

Resumen de diseno:

- Modelo de dominio de simulacion con `SimulationSession`, `ActuatorState`, `ClimateEventState` y `SimulationDashboardSummary`.
- Reglas de transicion de estado para sesion/actuadores/eventos definidas.
- Contrato UI cubre visibilidad condicional de pantalla inicial, colores de actuadores, menu y salida.
- Contrato API define endpoints de entrada, inicio, control de actuadores/eventos, dashboard y salida.

## Phase 2 Preview (for /speckit.tasks)

Bloques de implementacion previstos:

1. Routing y paginas frontend de simulacion (5 pantallas + menu acotado).
2. Servicios frontend para consumir endpoints de simulacion.
3. Endpoints backend de simulacion y validaciones de ownership/estado.
4. Persistencia y sincronizacion de estado de sesion.
5. Pruebas unitarias/integracion/E2E para rutas y reglas criticas.
6. Actualizacion de OpenAPI/Swagger y documentacion tecnica.

## Project Structure

### Documentation (this feature)

```text
specs/006-greenhouse-simulation-screens/
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
├── contracts/
│   ├── api-simulation-contract.md
│   └── ui-simulation-flow-contract.md
└── tasks.md
```

### Source Code (repository root)

```text
backend/
├── src/main/java/com/frontreact/
│   ├── users/
│   ├── greenhouses/
│   ├── crops/
│   └── common/
└── src/main/resources/
    ├── application.yml
    └── db/migration/

frontend/
├── src/app/routes/
├── src/features/auth/
├── src/features/greenhouse/
│   ├── components/
│   ├── pages/
│   ├── model/
│   └── styles/
└── tests/
    ├── unit/
    ├── integration/
    └── e2e/
```

**Structure Decision**: Se adopta estructura de aplicacion web con frontend y backend separados. El alcance funcional de simulacion se implementara principalmente en `frontend/src/features/greenhouse/` y en nuevos endpoints del backend bajo `backend/src/main/java/com/frontreact/`, conservando el patron actual por dominio.

## Constitution Check (Post-Design Re-Check)

- Frontend React + TypeScript: PASS.
- Backend Spring Boot 3 + Java 17: PASS.
- PostgreSQL + migraciones versionadas: PASS.
- OpenAPI 3/Swagger: PASS (contrato API definido para implementar en docs).
- Pruebas proporcionales al riesgo: PASS (quickstart define escenarios criticos).
- Accesibilidad/UX: PASS (contrato UI explicito).
- Documentacion actualizada: PASS.

## Complexity Tracking

Sin violaciones constitucionales que requieran justificacion.

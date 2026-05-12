# Implementation Plan: CRUD de Catalogo de Sensores

**Branch**: `008-sensor-catalog-crud` | **Date**: 2026-04-14 | **Spec**: `/specs/008-sensor-catalog-crud/spec.md`
**Input**: Feature specification from `/specs/008-sensor-catalog-crud/spec.md`

## Summary

Implementar mantenimiento controlado del catalogo de sensores con conjunto fijo (Humedad, Temperatura, Luz y CO2), IDs estables entre ambientes, unidades canonicas iniciales y auto-reparacion de faltantes al arranque. El alcance funcional permite consulta para usuarios autenticados y actualizacion de unidad solo para administradores, con control de concurrencia (conflict) para evitar sobrescrituras silenciosas. Se cubre backend Spring Boot (reglas de negocio, persistencia, API/OpenAPI) y frontend React (listado, edicion de unidad con manejo de permisos/errores), con pruebas unitarias, integracion y E2E.

## Technical Context

**Language/Version**: Frontend TypeScript 5.x + React 18.x; Backend Java 17 + Spring Boot 3.3.x  
**Primary Dependencies**: React, React Router DOM, Vite, Vitest, Playwright, Spring Web, Spring Validation, Spring Data JPA, Flyway, Springdoc OpenAPI  
**Storage**: PostgreSQL con migraciones Flyway versionadas  
**Testing**: Frontend Vitest + Testing Library + Playwright; Backend JUnit (spring-boot-starter-test)  
**Target Platform**: Aplicacion web full-stack (SPA + REST) en Linux  
**Project Type**: Web application (frontend + backend)  
**Performance Goals**: Consulta/refresco de catalogo en <= 2 s para operaciones de lectura y actualizacion validas  
**Constraints**: Catalogo cerrado a 4 sensores base; actualizacion restringida a rol administrador; deteccion obligatoria de conflictos concurrentes; IDs fijos y unidades canonicas consistentes entre ambientes  
**Scale/Scope**: Una entidad de catalogo con 4 registros base, una operacion editable (unidad), y reglas de inicializacion/consistencia al arranque

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

### Pre-Design Gate

- Frontend uses React + TypeScript with explicit typing in critical flows: **PASS**
- Backend uses Spring Boot 3 on Java 17 for all new server-side features: **PASS**
- Data persistence for business entities uses PostgreSQL with versioned migrations: **PASS**
- API contracts are defined/updated in OpenAPI 3 and exposed via Swagger: **PASS**
- Test strategy includes unit + integration + E2E coverage proportional to risk: **PASS**
- Accessibility and UX consistency impact is evaluated for all UI changes: **PASS**
- Plan includes documentation updates when architecture/contracts are modified: **PASS**

### Post-Design Gate

- Research decisions documented in `research.md`: **PASS**
- Data model and validation/state rules documented in `data-model.md`: **PASS**
- API/UI contracts documented in `/contracts`: **PASS**
- Quickstart reflects permisos, concurrencia y auto-reparacion: **PASS**

## Project Structure

### Documentation (this feature)

```text
specs/008-sensor-catalog-crud/
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
├── contracts/
│   ├── api-sensor-catalog-contract.md
│   └── ui-sensor-catalog-contract.md
└── tasks.md
```

### Source Code (repository root)

```text
backend/
├── src/main/java/com/frontreact/
│   ├── sensors/
│   └── shared/
└── src/main/resources/db/migration/

frontend/
├── src/features/greenhouse/
│   ├── pages/
│   ├── model/
│   └── services/
└── tests/
    ├── unit/
    ├── integration/
    └── e2e/
```

**Structure Decision**: Mantener arquitectura full-stack por dominio existente, agregando capacidades de catalogo en backend `sensors` y pantalla/servicio en frontend bajo `features/greenhouse` para minimizar friccion de integracion.

## Complexity Tracking

No constitution violations identified; section intentionally empty.

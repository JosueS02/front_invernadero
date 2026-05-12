# Implementation Plan: CRUD de Cultivos

**Branch**: `005-crud-cultivos` | **Date**: 2026-04-08 | **Spec**: [/home/pedro/Escritorio/Redes/Frontend/FrontReact/specs/005-crud-cultivos/spec.md](./spec.md)
**Input**: Feature specification from `/specs/005-crud-cultivos/spec.md`

**Note**: This template is filled in by the `/speckit.plan` command. See `.specify/templates/plan-template.md` for the execution workflow.

## Summary

Se implementara un CRUD completo de cultivos con nombre y rangos minimos/maximos de temperatura, humedad y luz, con asociacion obligatoria a usuario mediante foreign key. La solucion sera full-stack: frontend React + TypeScript para formularios y gestion, backend Spring Boot 3 con Java 17 para API REST, PostgreSQL para persistencia e integridad referencial, y OpenAPI 3/Swagger para contrato de endpoints.

## Technical Context

**Language/Version**: Frontend TypeScript 5.x + React 18.x; Backend Java 17 + Spring Boot 3.x  
**Primary Dependencies**: React, React Router DOM, Spring Web, Spring Validation, Spring Data JPA, PostgreSQL driver, OpenAPI 3/Swagger  
**Storage**: PostgreSQL (tabla de cultivos con foreign key hacia usuarios)  
**Testing**: Frontend Vitest + React Testing Library + Playwright; Backend JUnit + Spring Boot Test + pruebas de repositorio/servicio/controlador  
**Target Platform**: Navegadores modernos (frontend) + Linux server/JVM 17 (backend)
**Project Type**: Web application full-stack (frontend + backend REST)  
**Performance Goals**: Operaciones CRUD de cultivos en <500ms p95 en entorno local; respuesta de validacion de formulario en cliente en <100ms percibido  
**Constraints**: nombre obligatorio; para temperatura/humedad/luz se debe cumplir minimo < maximo; campos de rango numericos; asociacion obligatoria a usuario existente; contrato OpenAPI sincronizado  
**Scale/Scope**: Modulo CRUD de cultivos con 5 endpoints base (create, list, get, update, delete) y relacion many-to-one hacia usuarios

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- Gate 1 - Full-Stack Architecture by Domain: PASS. El dominio cultivos se modela con capas frontend/backend separadas y coherentes.
- Gate 2 - Type Safety and API Contract Clarity: PASS. Se planifican DTOs tipados y contrato OpenAPI versionado para CRUD de cultivos.
- Gate 3 - Testing as Delivery Gate: PASS. Se define cobertura por capas para validaciones de rangos e integridad referencial.
- Gate 4 - Accessibility and UX Consistency: PASS. Formularios de cultivos incluyen validaciones claras y navegacion por teclado.
- Gate 5 - Simplicity, Performance and Operability: PASS. Alcance acotado a nombre + tres pares de rangos + FK de usuario.

Post-Phase 1 Re-check:

- Gate 1 - PASS. Data model separa entidad Cultivo y referencia Usuario con reglas de integridad.
- Gate 2 - PASS. Contrato API explicita payloads, validaciones y errores para rangos/foreign key.
- Gate 3 - PASS. Quickstart define verificaciones funcionales para alta, consulta/actualizacion y baja.
- Gate 4 - PASS. El contrato de UI/API plantea mensajes de error accionables para cada regla de rango.
- Gate 5 - PASS. No se incorporan historicos, auditoria avanzada ni reglas fuera del alcance requerido.

## Project Structure

### Documentation (this feature)

```text
specs/005-crud-cultivos/
├── plan.md              # This file (/speckit.plan command output)
├── research.md          # Phase 0 output (/speckit.plan command)
├── data-model.md        # Phase 1 output (/speckit.plan command)
├── quickstart.md        # Phase 1 output (/speckit.plan command)
├── contracts/           # Phase 1 output (/speckit.plan command)
└── tasks.md             # Phase 2 output (/speckit.tasks command - NOT created by /speckit.plan)
```

### Source Code (repository root)
```text
backend/
├── src/
│   ├── models/
│   ├── services/
│   └── api/
└── tests/

frontend/
├── src/
│   ├── components/
│   ├── pages/
│   └── services/
└── tests/
```

**Structure Decision**: Se adopta estructura web full-stack con separacion `frontend/` y `backend/`. El dominio `crops` se implementa en `frontend/src/features/` para UI y en `backend/src/` para API/servicios/persistencia, con contratos documentados en `specs/005-crud-cultivos/contracts/`.

## Complexity Tracking

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| None | N/A | N/A |

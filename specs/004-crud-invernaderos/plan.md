# Implementation Plan: CRUD de Invernaderos

**Branch**: `004-crud-invernaderos` | **Date**: 2026-04-08 | **Spec**: [/home/pedro/Escritorio/Redes/Frontend/FrontReact/specs/004-crud-invernaderos/spec.md](./spec.md)
**Input**: Feature specification from `/specs/004-crud-invernaderos/spec.md`

**Note**: This template is filled in by the `/speckit.plan` command. See `.specify/templates/plan-template.md` for the execution workflow.

## Summary

Se implementara un CRUD completo de invernaderos con campos nombre, ubicacion y estado, incorporando una relacion obligatoria de llave foranea hacia usuario. La solucion sera full-stack: frontend React + TypeScript para gestion y formularios, backend Spring Boot 3 con Java 17 para API REST, persistencia en PostgreSQL con integridad referencial y contrato de API en OpenAPI 3/Swagger.

## Technical Context

**Language/Version**: Frontend TypeScript 5.x + React 18.x; Backend Java 17 + Spring Boot 3.x  
**Primary Dependencies**: React, React Router DOM, Spring Web, Spring Validation, Spring Data JPA, PostgreSQL driver, OpenAPI 3/Swagger  
**Storage**: PostgreSQL (tabla de invernaderos con foreign key hacia usuarios)  
**Testing**: Frontend Vitest + React Testing Library + Playwright; Backend JUnit + Spring Boot Test + pruebas de repositorio/servicio/controlador  
**Target Platform**: Navegadores modernos (frontend) + Linux server/JVM 17 (backend)
**Project Type**: Web application full-stack (frontend + backend REST)  
**Performance Goals**: Operaciones CRUD de invernaderos en <500ms p95 en entorno local; respuesta de validacion de formulario en cliente en <100ms percibido  
**Constraints**: nombre y ubicacion obligatorios; estado en catalogo permitido (ACTIVO, INACTIVO, MANTENIMIENTO); asociacion obligatoria a usuario existente; contrato OpenAPI sincronizado  
**Scale/Scope**: Modulo CRUD de invernaderos con 5 endpoints base (create, list, get, update, delete) y relacion many-to-one hacia usuarios

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- Gate 1 - Full-Stack Architecture by Domain: PASS. Se define dominio invernaderos con capas frontend/backend separadas y cohesionadas por contrato.
- Gate 2 - Type Safety and API Contract Clarity: PASS. Se tipan entidades/DTOs y se versiona contrato OpenAPI para endpoints CRUD.
- Gate 3 - Testing as Delivery Gate: PASS. Se establece cobertura unitaria, integracion y E2E sobre validaciones y flujos CRUD.
- Gate 4 - Accessibility and UX Consistency: PASS. Formularios de alta/edicion exigen labels, estados de error claros y navegacion por teclado.
- Gate 5 - Simplicity, Performance and Operability: PASS. Alcance acotado a cuatro atributos de invernadero con FK a usuario y catalogo de estado fijo.

Post-Phase 1 Re-check:

- Gate 1 - PASS. Data model separa entidad Invernadero y referencia Usuario con reglas de integridad.
- Gate 2 - PASS. Contrato API explicita validaciones, errores y estructura de payloads.
- Gate 3 - PASS. Quickstart define pruebas minimas por historia (crear, consultar/actualizar, eliminar).
- Gate 4 - PASS. Contrato funcional contempla feedback de validacion para datos obligatorios y estado invalido.
- Gate 5 - PASS. No se agregan requisitos de auditoria/historicos fuera de alcance.

## Project Structure

### Documentation (this feature)

```text
specs/004-crud-invernaderos/
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

**Structure Decision**: Se adopta estructura web full-stack con separacion `frontend/` y `backend/`. El dominio `greenhouses` vive en `frontend/src/features/` para UI y en `backend/src/` para API, servicios y persistencia, documentando contratos en `specs/004-crud-invernaderos/contracts/`.

## Complexity Tracking

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| None | N/A | N/A |

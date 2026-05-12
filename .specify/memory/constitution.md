<!--
Sync Impact Report
- Version change: 1.0.0 -> 1.1.0
- Modified principles:
	- I. React Component-First Architecture -> I. Full-Stack Architecture by Domain
	- II. Type Safety and Contract Clarity -> II. Type Safety and API Contract Clarity
	- III. Testing as a Quality Gate (Non-Negotiable) -> III. Testing as a Delivery Gate (Non-Negotiable)
	- V. Performance and Simplicity by Default -> V. Simplicity, Performance and Operability by Default
- Added sections: None
- Removed sections: None
- Templates requiring updates:
	- ✅ updated: .specify/templates/plan-template.md
	- ✅ updated: .specify/templates/spec-template.md
	- ✅ updated: .specify/templates/tasks-template.md
	- ✅ updated: .github/copilot-instructions.md
	- ✅ not applicable (directory not present): .specify/templates/commands/*.md
- Follow-up TODOs: None
-->

# FrontReact Constitution

## Core Principles

### I. Full-Stack Architecture by Domain
Cada funcionalidad MUST definirse por dominio y abarcar sus capas de frontend y backend cuando aplique. En frontend, la UI se construye con componentes React reutilizables, pequeños y de responsabilidad clara. En backend, los servicios MUST implementarse con Spring Boot 3 sobre Java 17. La composición y separación de responsabilidades prevalecen sobre soluciones acopladas entre capas.

### II. Type Safety and API Contract Clarity
El proyecto usa TypeScript en frontend y tipado explícito en backend mediante DTOs y contratos claros. Todo flujo crítico (props, respuestas de API, estado compartido, formularios, payloads HTTP) MUST estar tipado y validado explícitamente. Se prohíbe el uso de `any` en código nuevo salvo casos excepcionales documentados en el PR.

Toda API HTTP MUST tener contrato OpenAPI 3 actualizado y visible mediante Swagger para habilitar descubribilidad, pruebas y alineación entre frontend y backend.

### III. Testing as a Delivery Gate (Non-Negotiable)
Todo cambio funcional requiere pruebas proporcionadas al riesgo: unitarias para lógica aislada, integración para interacción entre componentes, servicios y persistencia, y E2E para flujos críticos de usuario. No se acepta una feature sin evidencia de pruebas pasando en CI tanto para frontend como para backend.

### IV. Accessibility and UX Consistency
La accesibilidad es un requerimiento base, no opcional. Se deben respetar semántica HTML, navegación por teclado, etiquetas accesibles y contraste suficiente. La UI debe seguir un sistema de diseño consistente (tokens, espaciado, tipografía y estados de interacción).

### V. Simplicity, Performance and Operability by Default
Se optimiza primero la experiencia percibida: carga inicial rápida, renderizados predecibles y uso racional de estado global. En backend, se priorizan endpoints simples, observables y con manejo consistente de errores. Se favorecen soluciones mantenibles (YAGNI). Toda complejidad adicional debe justificarse con datos o una necesidad clara del producto.

## Technical Standards

- Stack base obligatorio: React + TypeScript (frontend) y Spring Boot 3 + Java 17 (backend).
- Persistencia obligatoria de negocio: PostgreSQL.
- Documentacion de API obligatoria: OpenAPI 3 con Swagger.
- Gestión de estado: primero estado local; estado global solo cuando exista necesidad transversal real.
- Datos remotos: se deben centralizar patrones de fetching, caché y manejo de errores.
- Cambios de modelo persistente MUST incluir migraciones versionadas y estrategia de rollback.
- Estructura: organización por features o dominios, evitando carpetas genéricas sin contexto de negocio.
- Seguridad frontend: nunca exponer secretos en cliente; validar entradas y manejar errores sin filtrar datos sensibles.
- Seguridad backend: validación de entradas, sanitización, manejo de excepciones, y configuración segura de acceso a base de datos.
- Calidad: lint y formateo automatizados, sin warnings críticos en ramas listas para merge.

## Development Workflow and Quality Gates

- Todo trabajo parte de una especificación clara (objetivo, alcance, criterios de aceptación).
- Cada PR debe incluir: resumen técnico, evidencia de pruebas y evaluación de impacto en UX/accesibilidad y contratos API.
- Revisión mínima de código por otro integrante antes de merge a rama principal.
- No se permite merge si fallan build, tests o validaciones de calidad definidas en CI.
- Cambios que afecten arquitectura, contratos o patrones comunes requieren actualización de documentación.
- Todo cambio de endpoint MUST reflejarse en OpenAPI/Swagger dentro del mismo cambio.

## Governance

Esta constitución prevalece sobre prácticas no documentadas del equipo.

Proceso de enmienda:
1. Toda propuesta de cambio MUST describir alcance, motivación e impacto.
2. Se requiere acuerdo explícito del equipo mantenedor antes de aprobar.
3. Toda enmienda MUST actualizar versión y fecha de modificación.

Política de versionado:
- MAJOR: eliminación o redefinición incompatible de principios.
- MINOR: nuevos principios, secciones o ampliaciones normativas.
- PATCH: aclaraciones editoriales sin cambio normativo.

Revisión de cumplimiento:
- Cada PR y cada revisión técnica MUST validar cumplimiento explícito de esta constitución.
- Toda excepción MUST quedar registrada con plan de mitigación y fecha de retiro.

**Version**: 1.1.0 | **Ratified**: 2026-04-06 | **Last Amended**: 2026-04-08

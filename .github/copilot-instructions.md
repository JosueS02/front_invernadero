# FrontReact Development Guidelines

Auto-generated from all feature plans. Last updated: 2026-04-14

## Active Technologies
- TypeScript 5.x + React 18.x + React, React DOM, React Router DOM, validaciones de formulario en cliente (002-panel-invernadero)
- Estado en memoria de UI en esta fase (persistencia externa fuera de alcance) (002-panel-invernadero)
- Frontend TypeScript 5.x + React 18.x; Backend Java 17 + Spring Boot 3.x + React, React Router DOM, Spring Web, Spring Validation, Spring Data JPA, PostgreSQL driver, OpenAPI 3/Swagger (003-crud-usuarios)
- PostgreSQL (tabla de usuarios con unicidad de correo) (003-crud-usuarios)
- PostgreSQL (tabla de invernaderos con foreign key hacia usuarios) (004-crud-invernaderos)
- PostgreSQL (tabla de cultivos con foreign key hacia usuarios) (005-crud-cultivos)
- Frontend TypeScript 5.x + React 18.x; Backend Java 17 + Spring Boot 3.x + React, React Router DOM, Spring Web, Spring Validation, Spring Data JPA, PostgreSQL driver, Flyway, OpenAPI/Swagger (006-greenhouse-simulation-screens)
- PostgreSQL con migraciones versionadas (Flyway) (006-greenhouse-simulation-screens)
- Frontend TypeScript 5.x + React 18.x; Backend Java 17 + Spring Boot 3.3.x + React, React Router DOM, Vite, Vitest, Playwright, Spring Web, Spring Validation, Spring Data JPA, Flyway, Springdoc OpenAPI (007-crud-plantacion)
- PostgreSQL con migraciones Flyway versionadas (007-crud-plantacion)

- TypeScript 5.x + React 18.x + React, React DOM, React Router DOM, validacion nativa HTML + utilidades de validacion de formularios (001-pantallas-auth)
- Java 17 + Spring Boot 3.x + PostgreSQL + OpenAPI 3/Swagger para servicios backend

## Project Structure

```text
backend/
frontend/
tests/
```

## Commands

npm test && npm run lint
./mvnw test

## Code Style

TypeScript 5.x + React 18.x: Follow standard conventions
Java 17 + Spring Boot 3.x: Follow standard conventions

## Recent Changes
- 008-sensor-catalog-crud: Added Frontend TypeScript 5.x + React 18.x; Backend Java 17 + Spring Boot 3.3.x + React, React Router DOM, Vite, Vitest, Playwright, Spring Web, Spring Validation, Spring Data JPA, Flyway, Springdoc OpenAPI
- 008-sensor-catalog-crud: Added Frontend TypeScript 5.x + React 18.x; Backend Java 17 + Spring Boot 3.3.x + React, React Router DOM, Vite, Vitest, Playwright, Spring Web, Spring Validation, Spring Data JPA, Flyway, Springdoc OpenAPI
- 007-crud-plantacion: Added Frontend TypeScript 5.x + React 18.x; Backend Java 17 + Spring Boot 3.3.x + React, React Router DOM, Vite, Vitest, Playwright, Spring Web, Spring Validation, Spring Data JPA, Flyway, Springdoc OpenAPI


<!-- MANUAL ADDITIONS START -->
<!-- MANUAL ADDITIONS END -->

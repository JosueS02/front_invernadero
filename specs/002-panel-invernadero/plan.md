# Implementation Plan: Panel de Gestion de Invernadero

**Branch**: `002-panel-invernadero` | **Date**: 2026-04-06 | **Spec**: [/home/pedro/Escritorio/Redes/Frontend/FrontReact/specs/002-panel-invernadero/spec.md](./spec.md)
**Input**: Feature specification from `/specs/002-panel-invernadero/spec.md`

**Note**: This template is filled in by the `/speckit.plan` command. See `.specify/templates/plan-template.md` for the execution workflow.

## Summary

Se implementaran tres pantallas post-login (Inicio, Invernadero, Cosecha) con barra superior persistente que incluya icono de menu a la izquierda y correo autenticado a la derecha. La pantalla Invernadero permitira nombre/ubicacion y checklist de sensores/actuadores. La pantalla Cosecha registrara nombre y rangos min/max de temperatura, humedad y luz. Se reutilizara arquitectura por features, formularios tipados, validaciones de dominio y navegacion cliente.

## Technical Context

**Language/Version**: TypeScript 5.x + React 18.x  
**Primary Dependencies**: React, React DOM, React Router DOM, validaciones de formulario en cliente  
**Storage**: Estado en memoria de UI en esta fase (persistencia externa fuera de alcance)  
**Testing**: Vitest + React Testing Library + Playwright  
**Target Platform**: Navegadores modernos desktop y mobile
**Project Type**: Frontend web SPA (codigo en carpeta frontend/)  
**Performance Goals**: Navegacion entre pantallas en una sola accion y render inicial de cada pantalla en menos de 2 segundos en condiciones normales  
**Constraints**: Barra superior persistente con correo/menu visible; validacion min < max en cada metrica; UI responsiva y accesible por teclado  
**Scale/Scope**: 3 pantallas funcionales, 2 formularios principales, 1 menu de navegacion, validaciones de dominio para rangos

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- Gate 1 - Arquitectura Component-First: PASS. Se planifica separacion por feature (`features/greenhouse`) y componentes reutilizables de layout/form.
- Gate 2 - Type Safety: PASS. Todas las entidades de formulario y estado de menu tendran tipado explicito.
- Gate 3 - Testing Quality Gate: PASS. Se definen pruebas unitarias, integracion y E2E para rutas y validaciones.
- Gate 4 - Accessibility and UX: PASS. Se incluye navegacion por teclado, labels visibles y consistencia de barra superior en todas las vistas.
- Gate 5 - Performance and Simplicity: PASS. Se mantiene estado local y alcance acotado a UI/formularios.

Post-Phase 1 Re-check:

- Gate 1 - PASS. Estructura y contratos separan menu, invernadero y cosecha por componentes.
- Gate 2 - PASS. Data model documenta entidades tipadas de sesion, invernadero y cosecha.
- Gate 3 - PASS. Quickstart define cobertura de pruebas por historia y flujo de menu.
- Gate 4 - PASS. Contrato UI exige barra persistente y rutas consistentes.
- Gate 5 - PASS. Sin complejidad accidental ni dependencias no justificadas.

## Project Structure

### Documentation (this feature)

```text
specs/002-panel-invernadero/
├── plan.md              # This file (/speckit.plan command output)
├── research.md          # Phase 0 output (/speckit.plan command)
├── data-model.md        # Phase 1 output (/speckit.plan command)
├── quickstart.md        # Phase 1 output (/speckit.plan command)
├── contracts/           # Phase 1 output (/speckit.plan command)
└── tasks.md             # Phase 2 output (/speckit.tasks command - NOT created by /speckit.plan)
```

### Source Code (repository root)
```text
frontend/
├── src/
│   ├── app/
│   │   └── routes/
│   └── features/
│       ├── auth/
│       └── greenhouse/
│           ├── components/
│           ├── pages/
│           ├── model/
│           └── styles/
├── public/
│   └── images/
└── tests/
    ├── unit/
    ├── integration/
    └── e2e/
```

**Structure Decision**: [Document the selected structure and reference the real
directories captured above]

Se adopta estructura web SPA en carpeta `frontend/` con arquitectura por feature para aislar dominio de invernadero y reutilizar barra superior/menu entre pantallas sin acoplar con autenticacion.

## Complexity Tracking

No se identifican violaciones de constitucion que requieran excepcion.

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| None | N/A | N/A |

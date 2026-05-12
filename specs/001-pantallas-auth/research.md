# Research: Pantallas de Autenticacion

## Decision 1: Navegacion entre Login y Crear Usuario
- Decision: Usar enrutamiento cliente con dos rutas dedicadas (`/login` y `/crear-usuario`) y navegacion desde texto bajo boton en Login.
- Rationale: Hace explicita la separacion de pantallas y simplifica pruebas E2E de redireccion.
- Alternatives considered: Vista unica con toggle interno; descartada porque reduce claridad de rutas y trazabilidad de escenarios.

## Decision 2: Estructura visual en cards + header rectangular
- Decision: Definir un contenedor card reutilizable para ambos formularios y un componente de header rectangular comun.
- Rationale: Cumple consistencia visual, evita duplicacion y mantiene componente-primero.
- Alternatives considered: Estilos duplicados por pantalla; descartado por costo de mantenimiento y riesgo de inconsistencia visual.

## Decision 3: Validacion de campos de correo y contrasena
- Decision: Validar correo con formato estandar y contrasena requerida antes del envio.
- Rationale: Cubre requisitos FR-010 y edge cases de campos vacios o invalidos.
- Alternatives considered: Validacion solo al enviar sin feedback por campo; descartada por peor experiencia de usuario.

## Decision 4: Requisitos de color obligatorios
- Decision: Declarar `#3D9F49` y `#36D30B` como tokens de color para header, boton y texto inferior.
- Rationale: Garantiza cumplimiento exacto de especificacion y facilita auditoria visual.
- Alternatives considered: Uso de verdes aproximados; descartado por incumplimiento de requisito explicito.

## Decision 5: Estrategia de pruebas
- Decision: Cubrir con pruebas unitarias (validaciones), integracion (render + flujo de formulario) y E2E (redireccion login -> crear usuario).
- Rationale: Alineado con la constitucion y con los criterios de exito del feature.
- Alternatives considered: Solo pruebas manuales; descartado por no cumplir quality gate de testing.

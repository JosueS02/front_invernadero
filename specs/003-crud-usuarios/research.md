# Research: CRUD de Usuarios Basico

## Decision 1: Regla de contrasena fuerte en capa cliente y servidor
- Decision: Validar politica de contrasena tanto en frontend como en backend.
- Rationale: Evita feedback tardio al usuario y garantiza enforcement centralizado en API.
- Alternatives considered: Validar solo en frontend; descartado por riesgo de bypass via llamadas directas a API.

## Decision 2: Unicidad de correo case-insensitive
- Decision: Tratar el correo como unico sin distinguir mayusculas/minusculas.
- Rationale: Reduce duplicados semanticos y comportamientos inesperados para usuarios.
- Alternatives considered: Unicidad sensible a mayusculas; descartado por baja usabilidad y mayor riesgo operativo.

## Decision 3: Contrasena no retornable en respuestas de consulta
- Decision: Excluir siempre la contrasena de respuestas de listado y detalle.
- Rationale: Minimiza exposicion de datos sensibles y alinea controles de seguridad basicos.
- Alternatives considered: Retornar hash de contrasena; descartado por no aportar valor funcional a CRUD administrativo.

## Decision 4: Eliminacion fisica en alcance inicial
- Decision: Implementar delete fisico para mantener CRUD basico y alcance simple.
- Rationale: El requerimiento solicita CRUD directo y no exige auditoria ni recuperacion.
- Alternatives considered: Soft delete con bandera de estado; descartado por complejidad no requerida en esta iteracion.

## Decision 5: Contrato API explicito en OpenAPI 3 + Swagger
- Decision: Documentar endpoints create/list/get/update/delete y errores de validacion en contrato dedicado.
- Rationale: Facilita alineacion entre frontend/backend y pruebas de contrato.
- Alternatives considered: Documentacion informal en README; descartado por menor trazabilidad y menor calidad contractual.

## Decision 6: Estrategia de pruebas por riesgo
- Decision: Unitarias para validadores y reglas de negocio, integracion para capa API + persistencia, E2E para flujo principal de formulario CRUD.
- Rationale: Cubre el quality gate constitucional con costo de mantenimiento razonable.
- Alternatives considered: Solo pruebas unitarias; descartado por falta de cobertura de integracion de persistencia y flujos reales.

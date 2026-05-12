# Research: CRUD de Invernaderos

## Decision 1: Estado de invernadero con catalogo cerrado
- Decision: Usar catalogo fijo de estado: ACTIVO, INACTIVO, MANTENIMIENTO.
- Rationale: Simplifica validaciones y evita estados ambiguos en la primera iteracion.
- Alternatives considered: Estado libre por texto; descartado por inconsistencias y mayor riesgo de datos sucios.

## Decision 2: Foreign key obligatoria a usuario existente
- Decision: Requerir `userId` valido en alta y actualizacion de invernadero.
- Rationale: Garantiza trazabilidad de propiedad y consistencia referencial.
- Alternatives considered: Permitir invernadero sin usuario; descartado por incumplir requisito de negocio.

## Decision 3: Validacion dual en frontend y backend
- Decision: Validar nombre/ubicacion/estado en formulario y en API.
- Rationale: Mejora UX con feedback inmediato y mantiene seguridad/consistencia en servidor.
- Alternatives considered: Validar solo backend; descartado por peor experiencia de usuario.

## Decision 4: Errores de dominio estandarizados
- Decision: Devolver errores claros para `usuario no existe`, `invernadero no existe`, `estado invalido` y `campos requeridos`.
- Rationale: Reduce reprocesos y facilita correccion en primer reintento.
- Alternatives considered: Mensajes genericos; descartado por baja accionabilidad.

## Decision 5: Contrato OpenAPI 3 sincronizado por historia
- Decision: Mantener contrato de endpoints create/list/get/update/delete y errores en documento dedicado.
- Rationale: Alinea frontend/backend y soporta pruebas de integracion/contrato.
- Alternatives considered: Documentacion informal; descartado por menor trazabilidad.

## Decision 6: Estrategia de pruebas por capa
- Decision: Unitarias para validadores y reglas, integracion para API + persistencia, E2E para flujo CRUD principal.
- Rationale: Cumple quality gate y minimiza regresiones de datos relacionales.
- Alternatives considered: Solo pruebas unitarias; descartado por falta de cobertura end-to-end.

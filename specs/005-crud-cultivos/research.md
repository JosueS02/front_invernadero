# Research: CRUD de Cultivos

## Decision 1: Rango estricto por metrica
- Decision: Aplicar regla estricta `minimo < maximo` para temperatura, humedad y luz.
- Rationale: Evita configuraciones inconsistentes y asegura que los rangos sean operables.
- Alternatives considered: Permitir `minimo == maximo`; descartado por no representar un rango real.

## Decision 2: Foreign key obligatoria a usuario existente
- Decision: Requerir `userId` valido en creacion y actualizacion de cultivo.
- Rationale: Garantiza propiedad del cultivo y consistencia referencial.
- Alternatives considered: Permitir cultivo sin usuario; descartado por incumplir requisito funcional.

## Decision 3: Validacion en frontend y backend
- Decision: Validar campos obligatorios y reglas de rango en ambas capas.
- Rationale: Mejora UX en formulario y conserva enforcement de negocio en API.
- Alternatives considered: Validar solo en backend; descartado por feedback tardio al usuario.

## Decision 4: Manejo de errores orientado a correccion
- Decision: Responder errores explicitos para usuario inexistente, cultivo inexistente, rango invalido y tipo no numerico.
- Rationale: Reduce reintentos fallidos y acelera correccion en formularios.
- Alternatives considered: Mensajes genericos; descartado por baja accionabilidad.

## Decision 5: Contrato OpenAPI 3 versionado
- Decision: Documentar endpoints create/list/get/update/delete de cultivos y sus errores en contrato dedicado.
- Rationale: Alinea equipos frontend/backend y facilita pruebas de integracion.
- Alternatives considered: Documentacion libre en README; descartado por menor trazabilidad.

## Decision 6: Pruebas por riesgo y capa
- Decision: Unitarias para validadores de rangos, integracion para API/persistencia, E2E para flujos CRUD de formulario.
- Rationale: Cubre quality gate con costo de mantenimiento razonable.
- Alternatives considered: Solo unitarias; descartado por falta de cobertura de flujos end-to-end.

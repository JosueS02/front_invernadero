# Research: CRUD de Plantacion

## Decision 1: Ownership estricto por usuario en relaciones
- Decision: Toda operacion CRUD de plantacion valida que el invernadero y cultivo referenciados pertenezcan al usuario autenticado.
- Rationale: Evita fuga o manipulacion de datos entre usuarios y mantiene coherencia del dominio.
- Alternatives considered: Validar solo existencia global de invernadero/cultivo; descartado por riesgo de acceso cruzado.

## Decision 2: Validacion temporal estricta con cierre obligatorio en inactivacion
- Decision: `fechaFinalizado` debe ser mayor/igual a `fechaPlantado` y pasa a ser obligatoria cuando estado=`Inactivo`.
- Rationale: Garantiza trazabilidad temporal del cierre de plantaciones y elimina ambiguedad operativa.
- Alternatives considered: Permitir inactivacion sin fecha final; descartado por huecos historicos y reglas inconsistentes.

## Decision 3: Estado operativo binario para MVP
- Decision: El estado de plantacion se limita a `Activo` e `Inactivo` en esta iteracion.
- Rationale: Cubre alcance solicitado con baja complejidad y reduce ambiguedad de transiciones.
- Alternatives considered: Agregar estados intermedios (pausado, finalizado); descartado por no ser requisito primario actual.

## Decision 4: Baja logica en lugar de borrado fisico
- Decision: La accion de eliminar cambia estado a `Inactivo` y conserva el registro historico.
- Rationale: Mantiene auditabilidad y evita perdida de contexto de produccion.
- Alternatives considered: Hard delete; descartado por perdida irreversible de historial.

## Decision 5: Unicidad operativa de activas por combinacion
- Decision: Se permite como maximo una plantacion `Activa` por combinacion invernadero+cultivo y usuario.
- Rationale: Evita duplicidad de ciclo activo para el mismo contexto agronomico.
- Alternatives considered: Multiples activas por combinacion; descartado por complejidad y ambiguedad operacional.

## Decision 6: Fechas con hora local
- Decision: `fechaPlantado` y `fechaFinalizado` se manejan como fecha-hora local en formato `YYYY-MM-DDTHH:mm`.
- Rationale: Permite precision temporal suficiente para operacion diaria sin introducir complejidad de conversion global en esta iteracion.
- Alternatives considered: Solo fecha o UTC obligatorio; descartado por menor precision operativa o sobrecarga prematura.

## Decision 7: Listado enfocado en activos por defecto
- Decision: El listado principal muestra `Activas` por defecto y habilita filtros a `Todas` e `Inactivas`.
- Rationale: Prioriza la operacion diaria y mantiene acceso al historico bajo demanda.
- Alternatives considered: Mostrar todo siempre o separar en vistas fijas; descartado por ruido visual o complejidad de navegacion.

## Decision 8: Listado por usuario con refresco inmediato post-operacion
- Decision: Tras crear/editar/baja logica, el listado se recarga desde backend para reflejar estado real.
- Rationale: Asegura visibilidad consistente de cambios y reduce discrepancias de UI.
- Alternatives considered: Actualizacion solo optimista local; descartado por riesgo de desincronizacion en errores o concurrencia.

## Decision 9: Contratos API y UI separados
- Decision: Mantener un contrato API para endpoints y un contrato UI para flujos de formulario/listado.
- Rationale: Mejora trazabilidad de requisitos y facilita pruebas independientes por capa.
- Alternatives considered: Un solo documento mixto; descartado por menor claridad en responsabilidades.

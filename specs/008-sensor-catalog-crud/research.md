# Research: CRUD de Catalogo de Sensores

## Decision 1: Catalogo cerrado con cuatro sensores base
- Decision: Limitar el catalogo a Humedad, Temperatura, Luz y CO2, sin altas ni bajas en esta iteracion.
- Rationale: Alinea alcance funcional solicitado y evita complejidad de gobernanza de nuevos sensores.
- Alternatives considered: CRUD completo con alta/baja; descartado por contradecir requerimiento explicito.

## Decision 2: Actualizacion de unidad solo para administradores
- Decision: Permitir modificar `unidad` exclusivamente a usuarios con rol administrador.
- Rationale: Protege integridad del catalogo maestro y reduce riesgo de cambios accidentales.
- Alternatives considered: Edicion por cualquier usuario autenticado; descartado por menor control operativo.

## Decision 3: IDs fijos predefinidos entre ambientes
- Decision: Cada sensor base tiene un `id` estable y no editable, consistente en dev/test/prod.
- Rationale: Facilita semillas deterministicas, trazabilidad y referencias estables desde otros modulos.
- Alternatives considered: IDs autogenerados por ambiente; descartado por riesgo de drift entre entornos.

## Decision 4: Control de concurrencia con conflicto explicito
- Decision: Detectar version/fecha desactualizada en actualizacion y devolver conflicto sin sobrescritura silenciosa.
- Rationale: Evita perdida de datos cuando dos administradores editan en paralelo.
- Alternatives considered: Last-write-wins; descartado por comportamiento no determinista y riesgo operativo.

## Decision 5: Auto-reparacion de catalogo al arranque
- Decision: En cada inicio, verificar sensores base y reinsertar faltantes conservando IDs y valores canonicos.
- Rationale: Aumenta resiliencia ante desincronizaciones manuales o restauraciones incompletas.
- Alternatives considered: Fallar arranque o solo alertar; descartado para evitar indisponibilidad o deuda operativa.

## Decision 6: Unidades canonicas iniciales
- Decision: Definir unidades iniciales como Humedad `%`, Temperatura `°C`, Luz `lux`, CO2 `ppm`.
- Rationale: Elimina ambiguedad semantica desde semilla y simplifica pruebas de aceptacion.
- Alternatives considered: Unidades vacias o configurables por ambiente; descartado por inconsistencia funcional.

## Decision 7: Contratos API y UI separados
- Decision: Mantener documentos independientes para API y UI.
- Rationale: Mejora trazabilidad por capa y facilita validacion de pruebas orientadas a contrato.
- Alternatives considered: Un unico documento mixto; descartado por menor claridad y mantenibilidad.

# Research: Simulacion de Invernadero

## Decision 1: Pantalla inicial condicional por estado de invernadero
- Decision: Mostrar pantalla de iniciar simulador solo para invernaderos en estado disponible y omitirla cuando el estado sea produccion.
- Rationale: Evita pasos redundantes en produccion y respeta el flujo operativo indicado por negocio.
- Alternatives considered: Mostrar siempre la pantalla inicial; descartado por friccion innecesaria en invernaderos ya configurados.

## Decision 2: Filtro estricto de cosechas por estado y propietario
- Decision: El combo de cosechas en el inicio de simulacion mostrara solo cosechas inactivas y solo del usuario autenticado.
- Rationale: Previene selecciones invalidas y evita usar cosechas activas en nueva simulacion.
- Alternatives considered: Mostrar todas las cosechas del sistema; descartado por riesgo de acceso a datos ajenos e inconsistencias de estado.

## Decision 3: Modelo visual binario para actuadores
- Decision: Usar dos estados visuales para actuadores en simulacion: gris (apagado) y verde (activo).
- Rationale: Facilita lectura rapida del estado operativo durante la simulacion.
- Alternatives considered: Uso exclusivo de texto o iconos sin color; descartado por menor legibilidad inmediata.

## Decision 4: Eventos climaticos con activacion individual
- Decision: Gestionar eventos climaticos como lista con accion de activar y desactivar por evento.
- Rationale: Mantiene control granular y simplifica pruebas de estado por item.
- Alternatives considered: Activar eventos en bloque; descartado por limitar control operativo.

## Decision 5: Menu de simulacion acotado y salida explicita
- Decision: Definir menu de simulacion con tres destinos (actuadores, eventos climaticos, dashboard) y boton final de salir del invernadero.
- Rationale: Mantiene foco del usuario en el contexto de simulacion y ofrece salida clara a inicio.
- Alternatives considered: Reusar menu general de gestion; descartado por mezclar opciones fuera del alcance de simulacion.

## Decision 6: Persistencia de cambios de estado de simulacion
- Decision: Persistir en backend el estado de actuadores/eventos de la sesion de simulacion cuando aplique estado de servidor.
- Rationale: Permite consistencia entre pantallas y continuidad de la simulacion.
- Alternatives considered: Estado solo en frontend; descartado por potencial desincronizacion y perdida al recargar.

## Decision 7: Contratos UI/API separados para trazabilidad
- Decision: Documentar reglas de flujo en contrato UI y endpoints de simulacion en contrato API.
- Rationale: Mejora alineacion entre frontend/backend y facilita validar requisitos de navegacion y datos.
- Alternatives considered: Un unico documento mixto; descartado por menor claridad y mantenibilidad.

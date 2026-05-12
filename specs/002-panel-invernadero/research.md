# Research: Panel de Gestion de Invernadero

## Decision 1: Barra superior persistente
- Decision: Implementar layout base con topbar fija que se reutiliza en Inicio, Invernadero y Cosecha.
- Rationale: Garantiza consistencia de navegacion y visibilidad permanente de menu/correo.
- Alternatives considered: Duplicar topbar por pantalla; descartado por riesgo de inconsistencias y sobrecosto de mantenimiento.

## Decision 2: Navegacion por menu hamburguesa
- Decision: Usar icono de tres lineas en la izquierda que despliega opciones Inicio, Invernadero y Cosecha.
- Rationale: Cumple especificacion y mejora navegacion en resoluciones pequenas.
- Alternatives considered: Tabs fijas en topbar; descartado por menor compatibilidad visual con requerimiento de menu lateral.

## Decision 3: Modelo de formulario de Cosecha
- Decision: Validar pares min/max para temperatura, humedad y luz con regla estricta minimo < maximo.
- Rationale: Evita configuraciones invalidas y reduce errores operativos.
- Alternatives considered: Permitir minimo igual maximo; descartado por no representar rango util.

## Decision 4: Formulario de Invernadero con checklists
- Decision: Separar checklist en dos grupos: sensores y actuadores con catalogos fijos iniciales.
- Rationale: Clarifica seleccion y evita ambiguedad al usuario.
- Alternatives considered: Lista unica mezclada; descartado por menor legibilidad.

## Decision 5: Estrategia de pruebas
- Decision: Unitarias para validaciones de rango, integracion para formularios/menu, E2E para rutas y persistencia visual de topbar.
- Rationale: Cubre requisitos de calidad de constitucion y reduce regresiones de navegacion.
- Alternatives considered: Solo pruebas manuales; descartado por no cumplir quality gate.

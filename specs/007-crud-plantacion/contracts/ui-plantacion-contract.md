# UI Contract: Flujo de Plantacion

## Screens / Views

### 1. Plantacion List + Form
- Seccion de listado con columnas:
  - Invernadero
  - Cultivo
  - Fecha plantado
  - Fecha finalizado
  - Estado
  - Acciones (Editar, Eliminar)
- Filtro de estado en listado:
  - `Activas` (default)
  - `Todas`
  - `Inactivas`
- Formulario de alta/edicion con campos:
  - Invernadero (selector)
  - Cultivo (selector)
  - Fecha plantado (datetime-local)
  - Fecha finalizado (datetime-local, obligatoria si estado=`Inactivo`)
  - Estado (Activo/Inactivo)

## UI Behaviors
- Alta exitosa: limpiar formulario y refrescar listado.
- Edicion: cargar datos en formulario o modal, guardar y refrescar listado.
- Eliminacion: pedir confirmacion y aplicar baja logica (cambiar estado a `Inactivo`).
- Errores de backend: mostrar mensaje visible y comprensible.
- Validacion temporal en cliente: advertir si `fechaFinalizado < fechaPlantado` antes de enviar.
- Validacion de estado en cliente: exigir `fechaFinalizado` cuando estado=`Inactivo`.
- Validacion de negocio backend: mostrar conflicto cuando ya existe una `Activa` para la misma combinacion invernadero+cultivo.

## Accessibility
- Todos los campos con `label` asociado.
- Navegacion por teclado en formulario y tabla.
- Errores anunciados con semantica accesible (`aria-live` o equivalente).

## Testable Scenarios
- Crear plantacion valida y verla en lista.
- Intentar guardar con fechas invalidas y ver mensaje.
- Intentar guardar/activar duplicando combinacion activa y ver error de conflicto.
- Editar estado de una plantacion existente.
- Eliminar y verificar que cambia a `Inactivo` y no aparece en filtro `Activas`.
- Cargar pantalla sin plantaciones y mostrar estado vacio.

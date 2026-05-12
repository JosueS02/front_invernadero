# UI Contract: Catalogo de Sensores

## Screens / Views

### 1. Catalogo de Sensores
- Tabla/listado con columnas:
  - ID
  - Codigo
  - Nombre
  - Unidad
  - Acciones (Editar unidad)
- El listado muestra exactamente 4 filas base en esta iteracion.
- No hay accion visible de crear ni eliminar sensor.
- La accion Editar unidad solo se habilita visualmente para usuarios administradores.

### 2. Edicion de Unidad
- Formulario modal o inline con campo:
  - Unidad (texto)
- Metadata de concurrencia (version/updatedAt) enviada en segundo plano
- Acciones:
  - Guardar
  - Cancelar

## UI Behaviors
- Carga inicial: mostrar catalogo de sensores base.
- Edicion exitosa: cerrar formulario, mostrar confirmacion y refrescar listado.
- Usuario sin rol admin: UI bloquea accion de editar y muestra estado de solo lectura.
- Validacion cliente: unidad requerida, trim no vacio.
- Conflicto concurrente (409): mostrar mensaje para recargar datos antes de reintentar.
- Error backend: mostrar mensaje visible y comprensible.
- Intentos de alta/baja por URL/accion no autorizada: mostrar mensaje de catalogo cerrado.

## Accessibility
- Tabla y formulario con semantica adecuada.
- Campo de unidad con `label` asociado.
- Navegacion por teclado completa en listado y formulario.
- Mensajes de error/confirmacion anunciados en region accesible (`aria-live` o equivalente).

## Testable Scenarios
- Visualizar los 4 sensores base al entrar a la pantalla.
- Verificar visualizacion de IDs fijos y unidades canonicas iniciales.
- Editar unidad con valor valido y confirmar actualizacion en listado.
- Intentar editar con usuario no admin y validar bloqueo de accion.
- Intentar guardar unidad vacia y ver error de validacion.
- Simular conflicto concurrente y validar mensaje/flujo de recarga.
- Verificar ausencia de accion crear/eliminar en UI.
- Simular respuesta de catalogo cerrado y validar mensaje al usuario.

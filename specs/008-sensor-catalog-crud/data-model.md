# Data Model: CRUD de Catalogo de Sensores

## Entity: SensorCatalogo
- Description: Representa un sensor predefinido del catalogo maestro.
- Fields:
  - id: ID con formato PREFIJO-NNNN (obligatorio, PK, fijo por sensor)
  - codigo: string (obligatorio, unico, inmutable; `HUMEDAD`, `TEMPERATURA`, `LUZ`, `CO2`)
  - nombre: string (obligatorio, inmutable en esta iteracion)
  - unidad: string (obligatorio, editable solo por admin)
  - version: number (obligatorio, control de concurrencia optimista)
  - createdAt: datetime (obligatorio)
  - updatedAt: datetime (obligatorio)
- Seed canonico:
  - HUMEDAD -> `%`
  - TEMPERATURA -> `°C`
  - LUZ -> `lux`
  - CO2 -> `ppm`
- Rules:
  - Deben existir exactamente 4 sensores base en todo momento.
  - `id` y `codigo` son estables entre ambientes y no editables desde UI.
  - `unidad` no puede ser vacia ni solo espacios.
  - No se permite crear ni eliminar sensores por operacion de usuario.
  - Al arranque, faltantes se reinsertan con su `id` fijo y unidad canonica.

## Entity: SensorCatalogoUpdateRequest
- Description: Payload para actualizar unidad de sensor existente.
- Fields:
  - unidad: string (obligatorio)
  - expectedVersion: number o expectedUpdatedAt: datetime (obligatorio para control de concurrencia)
- Rules:
  - Solo rol administrador puede ejecutar actualizacion.
  - Si metadata de concurrencia no coincide con ultima version persistida -> conflicto.
  - Rechazar actualizacion para `id` inexistente.

## Entity: SensorCatalogoResponse
- Description: Representacion de salida para consulta y edicion.
- Fields:
  - id: ID con formato PREFIJO-NNNN
  - codigo: string
  - nombre: string
  - unidad: string
  - version: number
  - createdAt: datetime
  - updatedAt: datetime

## Relationships
- Sin relaciones obligatorias en esta iteracion.
- Se asume referencia futura desde modulos de simulacion/configuracion.

## State Transitions
- `unidad`: valor_anterior -> valor_nuevo (si validacion y permisos OK).
- `version`: n -> n+1 por cada actualizacion exitosa.
- Update con version desactualizada -> sin cambio de estado (conflict).

## Formato de IDs

- Usuarios: `USE-0001`
- Invernaderos: `INV-0001`
- Cultivos: `CRO-0001`
- Sensores: `SEN-0001`
- Plantaciones: `PLA-0001`

Regla general: prefijo por entidad + guion + numero secuencial de 4 digitos.

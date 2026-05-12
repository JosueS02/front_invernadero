# Data Model: CRUD de Plantacion

## Entity: Plantacion
- Description: Registro del ciclo de cultivo en un invernadero para un usuario.
- Fields:
  - id: ID con formato PREFIJO-NNNN (obligatorio, PK)
  - userId: ID con formato PREFIJO-NNNN (obligatorio)
  - greenhouseId: ID con formato PREFIJO-NNNN (obligatorio, FK a Invernadero)
  - cropId: ID con formato PREFIJO-NNNN (obligatorio, FK a Cultivo)
  - plantedAt: datetime-local `YYYY-MM-DDTHH:mm` (obligatorio)
  - finishedAt: datetime-local `YYYY-MM-DDTHH:mm` (opcional solo si status=ACTIVE)
  - status: enum (ACTIVE, INACTIVE)
  - createdAt: datetime (obligatorio)
  - updatedAt: datetime (obligatorio)
- Rules:
  - `finishedAt` debe ser mayor/igual a `plantedAt` cuando este presente.
  - Si `status=INACTIVE`, `finishedAt` es obligatorio.
  - `greenhouseId` y `cropId` deben pertenecer al mismo `userId` de la plantacion.
  - Solo puede existir una plantacion `ACTIVE` por combinacion (`userId`, `greenhouseId`, `cropId`).
  - La eliminacion funcional se modela como transicion `ACTIVE -> INACTIVE` (baja logica).

## Entity: PlantacionCreateRequest
- Description: Payload para crear plantacion.
- Fields:
  - greenhouseId: ID con formato PREFIJO-NNNN
  - cropId: ID con formato PREFIJO-NNNN
  - plantedAt: datetime-local `YYYY-MM-DDTHH:mm`
  - finishedAt: datetime-local `YYYY-MM-DDTHH:mm` | null
  - status: ACTIVE | INACTIVE
- Rules:
  - Todos los campos obligatorios salvo `finishedAt` cuando `status=ACTIVE`.
  - Si `status=INACTIVE`, `finishedAt` obligatorio.
  - Rechazar si ya existe una `ACTIVE` con la misma combinacion invernadero+cultivo para el usuario.
  - Rechazar request si relaciones no son accesibles por el usuario autenticado.

## Entity: PlantacionUpdateRequest
- Description: Payload para editar plantacion existente.
- Fields:
  - greenhouseId: ID con formato PREFIJO-NNNN
  - cropId: ID con formato PREFIJO-NNNN
  - plantedAt: datetime-local `YYYY-MM-DDTHH:mm`
  - finishedAt: datetime-local `YYYY-MM-DDTHH:mm` | null
  - status: ACTIVE | INACTIVE
- Rules:
  - Debe validar mismas reglas que creacion.
  - Debe impedir activar una plantacion si viola unicidad de `ACTIVE` por combinacion.
  - Debe rechazar actualizacion de plantacion inexistente.

## Entity: PlantacionResponse
- Description: Representacion de salida para listado y detalle.
- Fields:
  - id: ID con formato PREFIJO-NNNN
  - userId: ID con formato PREFIJO-NNNN
  - greenhouseId: ID con formato PREFIJO-NNNN
  - greenhouseName: string
  - cropId: ID con formato PREFIJO-NNNN
  - cropName: string
  - plantedAt: datetime-local string `YYYY-MM-DDTHH:mm`
  - finishedAt: datetime-local string `YYYY-MM-DDTHH:mm` | null
  - status: ACTIVE | INACTIVE
  - createdAt: datetime
  - updatedAt: datetime

## Entity: PlantacionListFilter
- Description: Filtro de estado para el listado principal.
- Fields:
  - statusFilter: ACTIVE (default) | INACTIVE | ALL

## Relationships
- Usuario 1:N Plantacion.
- Invernadero 1:N Plantacion.
- Cultivo 1:N Plantacion.

## State Transitions
- ACTIVE -> INACTIVE: permitido por edicion de estado.
- INACTIVE -> ACTIVE: permitido por edicion de estado.
- Cualquier transicion debe mantener coherencia temporal de fechas.
- `INACTIVE -> ACTIVE` solo si no existe otra `ACTIVE` en la misma combinacion invernadero+cultivo.

## Formato de IDs

- Usuarios: `USE-0001`
- Invernaderos: `INV-0001`
- Cultivos: `CRO-0001`
- Sensores: `SEN-0001`
- Plantaciones: `PLA-0001`

Regla general: prefijo por entidad + guion + numero secuencial de 4 digitos.

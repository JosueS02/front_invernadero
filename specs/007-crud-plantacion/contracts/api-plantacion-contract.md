# API Contract: Plantacion CRUD

## Base
- Prefix: `/api/plantings`
- Auth context: usuario autenticado (id de usuario validado en backend)
- Content-Type: `application/json`

## Endpoints

### GET `/api/plantings?userId={id}&status={ACTIVE|INACTIVE|ALL}`
- Purpose: listar plantaciones del usuario; por defecto `status=ACTIVE`.
- Response 200:
```json
[
  {
    "id": "USE-0001",
    "userId": "USE-0001",
    "greenhouseId": "USE-0001",
    "greenhouseName": "Invernadero Norte",
    "cropId": "USE-0001",
    "cropName": "Tomate",
    "plantedAt": "2026-04-09T08:30",
    "finishedAt": null,
    "status": "ACTIVE",
    "createdAt": "2026-04-09T16:20:00",
    "updatedAt": "2026-04-09T16:20:00"
  }
]
```

### POST `/api/plantings`
- Purpose: crear plantacion.
- Request body:
```json
{
  "userId": "USE-0001",
  "greenhouseId": "USE-0001",
  "cropId": "USE-0001",
  "plantedAt": "2026-04-09T08:30",
  "finishedAt": null,
  "status": "ACTIVE"
}
```
- Response 201: `PlantingResponse`.
- Errors:
  - 400: validacion de fechas, formato datetime-local o payload invalido.
  - 404: usuario/invernadero/cultivo inexistente o no accesible.
  - 409: conflicto de unicidad operativa (`ACTIVE` duplicada para la misma combinacion invernadero+cultivo).

### PUT `/api/plantings/{id}`
- Purpose: actualizar plantacion existente.
- Request body: mismo formato que create.
- Response 200: `PlantingResponse` actualizado.
- Errors:
  - 400: validacion de fechas/formato o reglas de estado.
  - 404: plantacion no encontrada o recurso no accesible.
  - 409: conflicto de unicidad operativa al intentar activar.

### DELETE `/api/plantings/{id}`
- Purpose: eliminar plantacion mediante baja logica (set `status=INACTIVE`).
- Response 200: `PlantingResponse` actualizado.
- Errors:
  - 404: plantacion no encontrada.

## Business Validation Rules
- `finishedAt` debe ser >= `plantedAt` cuando este presente.
- Si `status=INACTIVE`, `finishedAt` es obligatoria.
- `greenhouseId` y `cropId` deben pertenecer al `userId`.
- `status` permitido: `ACTIVE` o `INACTIVE`.
- Solo una plantacion `ACTIVE` por combinacion (`userId`, `greenhouseId`, `cropId`).

## OpenAPI Alignment
- Todos los endpoints y schemas anteriores deben reflejarse en OpenAPI 3 y visualizarse en Swagger.

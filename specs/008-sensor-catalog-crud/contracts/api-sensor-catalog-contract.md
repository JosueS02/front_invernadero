# API Contract: Catalogo de Sensores

## Base
- Prefix: `/api/sensors/catalog`
- Auth context: usuario autenticado
- Content-Type: `application/json`
- Catalog policy: fijo a 4 sensores base con IDs estables

## Endpoints

### GET `/api/sensors/catalog`
- Purpose: listar catalogo fijo de sensores.
- Response 200:
```json
[
  {
    "id": "11111111-1111-1111-1111-111111111111",
    "codigo": "HUMEDAD",
    "nombre": "Humedad",
    "unidad": "%",
    "version": 1,
    "createdAt": "2026-04-14T10:00:00",
    "updatedAt": "2026-04-14T10:00:00"
  },
  {
    "id": "22222222-2222-2222-2222-222222222222",
    "codigo": "TEMPERATURA",
    "nombre": "Temperatura",
    "unidad": "°C",
    "version": 1,
    "createdAt": "2026-04-14T10:00:00",
    "updatedAt": "2026-04-14T10:00:00"
  }
]
```

### PUT `/api/sensors/catalog/{id}`
- Purpose: actualizar unidad de un sensor existente (solo rol administrador).
- Request body:
```json
{
  "unidad": "ppm",
  "expectedVersion": 3
}
```
- Response 200:
```json
{
  "id": "USE-0001",
  "codigo": "CO2",
  "nombre": "CO2",
  "unidad": "ppm",
  "version": 4,
  "createdAt": "2026-04-14T10:00:00",
  "updatedAt": "2026-04-14T10:15:00"
}
```
- Errors:
  - 400: unidad vacia o payload invalido.
  - 403: usuario sin rol administrador.
  - 404: sensor no encontrado.
  - 409: conflicto por concurrencia (version desactualizada).

### POST `/api/sensors/catalog`
- Purpose: no soportado en esta iteracion.
- Response 405/409:
```json
{
  "error": "CATALOGO_CERRADO",
  "message": "No se permite crear sensores en esta iteracion"
}
```

### DELETE `/api/sensors/catalog/{id}`
- Purpose: no soportado en esta iteracion.
- Response 405/409:
```json
{
  "error": "CATALOGO_CERRADO",
  "message": "No se permite eliminar sensores en esta iteracion"
}
```

## Business Validation Rules
- Catalogo fijo a 4 sensores base: Humedad, Temperatura, Luz, CO2.
- IDs de sensores base son fijos y estables entre ambientes.
- Unidades canonicas iniciales: `%`, `°C`, `lux`, `ppm` segun sensor base.
- Solo se permite actualizar `unidad`.
- Solo administradores pueden actualizar `unidad`.
- `unidad` obligatoria y no vacia.
- Actualizacion requiere metadata de concurrencia (version/fecha esperada).
- Si metadata no coincide con estado persistido se retorna conflicto y no se guarda.
- Intentos de crear/eliminar deben rechazarse de forma explicita.

## Startup Consistency
- En el arranque, el backend valida presencia de los 4 sensores base.
- Si detecta faltantes, los reinserta automaticamente con su ID fijo y unidad canonica.

## OpenAPI Alignment
- Todos los endpoints y esquemas anteriores deben reflejarse en OpenAPI 3 y visualizarse en Swagger.

# API Contract: Crops CRUD

## Scope
Contrato funcional para CRUD de cultivos con campos `name`, rangos de temperatura/humedad/luz y `userId`.

## Base Path
- `/api/crops`

## Endpoints

### POST /api/crops
- Purpose: Crear cultivo.
- Request Body:
  - name: string (requerido)
  - temperatureMin: number (requerido)
  - temperatureMax: number (requerido)
  - humidityMin: number (requerido)
  - humidityMax: number (requerido)
  - lightMin: number (requerido)
  - lightMax: number (requerido)
  - userId: ID con formato PREFIJO-NNNN (requerido)
- Validation:
  - name obligatorio
  - todos los rangos numericos
  - para cada metrica: minimo < maximo
  - userId existente
- Responses:
  - `201 Created`: cultivo creado
  - `400 Bad Request`: validacion de campos o rangos
  - `404 Not Found`: usuario referenciado no existe

### GET /api/crops
- Purpose: Listar cultivos.
- Responses:
  - `200 OK`: lista de cultivos con rangos y usuario asociado

### GET /api/crops/{id}
- Purpose: Obtener detalle de cultivo.
- Responses:
  - `200 OK`: cultivo encontrado
  - `404 Not Found`: cultivo inexistente

### PUT /api/crops/{id}
- Purpose: Actualizar nombre, rangos y/o usuario asociado.
- Request Body:
  - name: string (opcional)
  - temperatureMin: number (opcional)
  - temperatureMax: number (opcional)
  - humidityMin: number (opcional)
  - humidityMax: number (opcional)
  - lightMin: number (opcional)
  - lightMax: number (opcional)
  - userId: ID con formato PREFIJO-NNNN (opcional)
- Validation:
  - al menos un campo presente
  - si hay rango parcial, debe permitir validar consistencia min<max con el valor complementario vigente
  - si se incluye userId, validar existencia
- Responses:
  - `200 OK`: cultivo actualizado
  - `400 Bad Request`: payload invalido
  - `404 Not Found`: cultivo o usuario inexistente

### DELETE /api/crops/{id}
- Purpose: Eliminar cultivo.
- Responses:
  - `204 No Content`: eliminacion exitosa
  - `404 Not Found`: cultivo inexistente

## Error Contract
- Estructura base de error:
  - code: string
  - message: string
  - details: array<string> (opcional)

## Security and Data Handling Rules
- Validar en backend la integridad referencial entre cultivo y usuario.
- Validar en backend la consistencia de rangos min/max aunque haya validacion en frontend.
- OpenAPI 3/Swagger MUST reflejar exactamente este contrato en la implementacion.

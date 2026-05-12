# API Contract: Greenhouses CRUD

## Scope
Contrato funcional para CRUD de invernaderos con campos `name`, `location`, `status` y `userId`.

## Base Path
- `/api/greenhouses`

## Endpoints

### POST /api/greenhouses
- Purpose: Crear invernadero.
- Request Body:
  - name: string (requerido)
  - location: string (requerido)
  - status: string (requerido; ACTIVO, INACTIVO, MANTENIMIENTO)
  - userId: ID con formato PREFIJO-NNNN (requerido)
- Validation:
  - name/location requeridos
  - status dentro del catalogo
  - userId existente
- Responses:
  - `201 Created`: invernadero creado
  - `400 Bad Request`: validacion de campos
  - `404 Not Found`: usuario referenciado no existe

### GET /api/greenhouses
- Purpose: Listar invernaderos.
- Responses:
  - `200 OK`: lista de invernaderos con relacion de usuario

### GET /api/greenhouses/{id}
- Purpose: Obtener detalle de invernadero.
- Responses:
  - `200 OK`: invernadero encontrado
  - `404 Not Found`: invernadero inexistente

### PUT /api/greenhouses/{id}
- Purpose: Actualizar nombre, ubicacion, estado y/o usuario asociado.
- Request Body:
  - name: string (opcional)
  - location: string (opcional)
  - status: string (opcional)
  - userId: ID con formato PREFIJO-NNNN (opcional)
- Validation:
  - al menos un campo presente
  - reglas de obligatoriedad/catalogo/existencia segun campos enviados
- Responses:
  - `200 OK`: invernadero actualizado
  - `400 Bad Request`: payload invalido
  - `404 Not Found`: invernadero o usuario inexistente

### DELETE /api/greenhouses/{id}
- Purpose: Eliminar invernadero.
- Responses:
  - `204 No Content`: eliminacion exitosa
  - `404 Not Found`: invernadero inexistente

## Error Contract
- Estructura base de error:
  - code: string
  - message: string
  - details: array<string> (opcional)

## Security and Data Handling Rules
- Validar en backend la integridad referencial entre invernadero y usuario.
- Mantener mensajes de error de validacion claros para correccion de formulario.
- OpenAPI 3/Swagger MUST reflejar exactamente este contrato en la implementacion.

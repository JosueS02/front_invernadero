# API Contract: Users CRUD

## Scope
Contrato funcional para CRUD de usuarios con campos `email` y `password`.

## Base Path
- `/api/users`

## Endpoints

### POST /api/users
- Purpose: Crear usuario.
- Request Body:
  - email: string (requerido)
  - password: string (requerido)
- Validation:
  - email valido y no duplicado
  - password con minimo 8 caracteres, mayuscula, minuscula, numero y caracter especial
- Responses:
  - `201 Created`: usuario creado (sin password/passwordHash)
  - `400 Bad Request`: validacion de formato o politica de password
  - `409 Conflict`: correo duplicado

### GET /api/users
- Purpose: Listar usuarios.
- Responses:
  - `200 OK`: lista de usuarios (id, email, createdAt, updatedAt)

### GET /api/users/{id}
- Purpose: Obtener detalle de usuario.
- Responses:
  - `200 OK`: usuario encontrado (sin password/passwordHash)
  - `404 Not Found`: usuario inexistente

### PUT /api/users/{id}
- Purpose: Actualizar email y/o password de usuario.
- Request Body:
  - email: string (opcional)
  - password: string (opcional)
- Validation:
  - al menos un campo presente
  - reglas de email y password aplican igual que en creacion
- Responses:
  - `200 OK`: usuario actualizado (sin password/passwordHash)
  - `400 Bad Request`: payload invalido
  - `404 Not Found`: usuario inexistente
  - `409 Conflict`: correo duplicado

### DELETE /api/users/{id}
- Purpose: Eliminar usuario.
- Responses:
  - `204 No Content`: eliminacion exitosa
  - `404 Not Found`: usuario inexistente

## Error Contract
- Estructura base de error:
  - code: string
  - message: string
  - details: array<string> (opcional)

## Security and Data Handling Rules
- Nunca exponer password ni passwordHash en respuestas.
- La validacion de password debe ejecutarse en backend aunque exista validacion en frontend.
- OpenAPI 3/Swagger MUST reflejar exactamente este contrato en la implementacion.

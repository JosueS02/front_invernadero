# API Contract: Simulation Module

## Scope
Contrato funcional para endpoints de soporte del flujo de simulacion.

## Base Path
- `/api/simulation`

## Endpoints

### GET /api/simulation/entry
- Purpose: Resolver pantalla de entrada de simulacion segun estado de invernadero.
- Query params:
  - greenhouseId: ID con formato PREFIJO-NNNN (requerido)
- Responses:
  - `200 OK`: payload con `entryScreen` (`START_SIMULATOR` o `ACTUATORS`) y datos base.
  - `403 Forbidden`: greenhouse no pertenece al usuario.
  - `404 Not Found`: usuario o invernadero inexistente.

### GET /api/simulation/crops
- Purpose: Obtener cosechas seleccionables para iniciar simulacion.
- Rules:
  - Debe devolver solo cosechas INACTIVE del usuario.
- Responses:
  - `200 OK`: lista de cosechas inactivas.

### POST /api/simulation/sessions
- Purpose: Iniciar sesion de simulacion.
- Request body:
  - greenhouseId: ID con formato PREFIJO-NNNN
  - cropId: ID con formato PREFIJO-NNNN
- Responses:
  - `201 Created`: sesion iniciada.
  - `400 Bad Request`: cultivo invalido para iniciar.
  - `403 Forbidden`: recurso no pertenece al usuario.

### GET /api/simulation/{sessionId}/actuators
- Purpose: Listar actuadores y estado actual en sesion.
- Responses:
  - `200 OK`: lista de actuadores con `isActive`.

### PATCH /api/simulation/{sessionId}/actuators/{actuatorKey}
- Purpose: Activar/desactivar actuador.
- Request body:
  - isActive: boolean
- Responses:
  - `200 OK`: estado actualizado.
  - `404 Not Found`: actuador inexistente en sesion.

### GET /api/simulation/{sessionId}/climate-events
- Purpose: Listar eventos climaticos y estado.
- Responses:
  - `200 OK`: lista de eventos con `isActive`.

### PATCH /api/simulation/{sessionId}/climate-events/{eventKey}
- Purpose: Activar/desactivar evento climatico.
- Request body:
  - isActive: boolean
- Responses:
  - `200 OK`: estado actualizado.
  - `404 Not Found`: evento inexistente en sesion.

### GET /api/simulation/{sessionId}/dashboard
- Purpose: Obtener resumen de dashboard de simulacion.
- Responses:
  - `200 OK`: resumen consolidado de estado.

### POST /api/simulation/{sessionId}/exit
- Purpose: Finalizar contexto de simulacion al salir del invernadero.
- Responses:
  - `204 No Content`: sesion finalizada.

## Error Contract
- Estructura base:
  - code: string
  - message: string
  - details: array<string> (opcional)

## Security and Data Handling Rules
- Todos los endpoints deben validar propiedad de recursos por usuario autenticado.
- La identidad de usuario se deriva del contexto autenticado del backend (sesion/token), no de parametros del cliente.
- OpenAPI 3/Swagger MUST mantenerse sincronizado con este contrato.
- Cambios persistentes de estado en simulacion MUST almacenarse en PostgreSQL cuando aplique estado de servidor.

# Data Model: Simulacion de Invernadero

## Entity: SimulationSession
- Description: Contexto activo de simulacion para un usuario.
- Fields:
  - id: ID con formato PREFIJO-NNNN (obligatorio, generado por sistema)
  - userId: ID con formato PREFIJO-NNNN (obligatorio)
  - greenhouseId: ID con formato PREFIJO-NNNN (obligatorio)
  - cropId: ID con formato PREFIJO-NNNN (obligatorio)
  - startedAt: datetime (obligatorio)
  - status: enum (ACTIVE, FINISHED)
- Rules:
  - Solo puede iniciarse si el invernadero esta en estado disponible o produccion.
  - Si el invernadero esta en produccion, el flujo entra directo a actuadores.

## Entity: SimulationGreenhouseView
- Description: Vista de invernadero usada en la pantalla de inicio de simulacion.
- Fields:
  - greenhouseId: ID con formato PREFIJO-NNNN
  - name: string
  - location: string
  - greenhouseStatus: enum (AVAILABLE, PRODUCTION, INACTIVE, MAINTENANCE)
  - sensors: string[]
  - actuators: string[]
- Rules:
  - Solo se usa para invernaderos del usuario autenticado.

## Entity: CropSelectableOption
- Description: Opcion de cosecha seleccionable para iniciar simulacion.
- Fields:
  - cropId: ID con formato PREFIJO-NNNN
  - name: string
  - cropStatus: enum (ACTIVE, INACTIVE)
  - userId: ID con formato PREFIJO-NNNN
- Rules:
  - Debe mostrarse solo cuando cropStatus = INACTIVE.
  - Debe pertenecer al usuario autenticado.

## Entity: ActuatorState
- Description: Estado operativo de un actuador durante simulacion.
- Fields:
  - actuatorKey: string
  - label: string
  - isActive: boolean
  - updatedAt: datetime
- Rules:
  - `isActive=false` se representa en gris.
  - `isActive=true` se representa en verde.

## Entity: ClimateEventState
- Description: Estado de un evento climatico en simulacion.
- Fields:
  - eventKey: string
  - label: string
  - isActive: boolean
  - updatedAt: datetime
- Rules:
  - Debe permitir toggle individual activo/inactivo.

## Entity: SimulationDashboardSummary
- Description: Resumen consolidado para dashboard de simulacion.
- Fields:
  - sessionId: ID con formato PREFIJO-NNNN
  - activeActuatorCount: number
  - activeClimateEventCount: number
  - greenhouseName: string
  - selectedCropName: string
  - lastUpdatedAt: datetime
- Rules:
  - Debe reflejar estados actuales de actuadores y eventos climaticos.

## State Transitions
- SimulationSession:
  - CREATED -> ACTIVE: al iniciar simulacion con cultivo valido.
  - ACTIVE -> FINISHED: al salir del invernadero o cerrar simulacion.
- ActuatorState:
  - OFF -> ON: activar actuador.
  - ON -> OFF: desactivar actuador.
- ClimateEventState:
  - INACTIVE -> ACTIVE: activar evento.
  - ACTIVE -> INACTIVE: desactivar evento.

## Formato de IDs

- Usuarios: `USE-0001`
- Invernaderos: `INV-0001`
- Cultivos: `CRO-0001`
- Sensores: `SEN-0001`
- Plantaciones: `PLA-0001`

Regla general: prefijo por entidad + guion + numero secuencial de 4 digitos.

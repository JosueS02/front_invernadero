# Data Model: CRUD de Cultivos

## Entity: User
- Description: Usuario propietario o responsable de cultivos.
- Fields:
  - id: ID con formato PREFIJO-NNNN (obligatorio)
  - email: string (obligatorio)
- Rules:
  - Debe existir antes de asociar un cultivo.

## Entity: Crop
- Description: Configuracion de cultivo con rangos ambientales.
- Fields:
  - id: ID con formato PREFIJO-NNNN (obligatorio, generado por sistema)
  - name: string (obligatorio)
  - temperatureMin: number (obligatorio)
  - temperatureMax: number (obligatorio)
  - humidityMin: number (obligatorio)
  - humidityMax: number (obligatorio)
  - lightMin: number (obligatorio)
  - lightMax: number (obligatorio)
  - userId: ID con formato PREFIJO-NNNN (obligatorio, foreign key a User.id)
  - createdAt: datetime (obligatorio)
  - updatedAt: datetime (obligatorio)
- Validation Rules:
  - name no puede ser vacio ni solo espacios.
  - temperatureMin < temperatureMax.
  - humidityMin < humidityMax.
  - lightMin < lightMax.
  - todos los campos de rango deben ser numericos.
  - userId debe referenciar un usuario existente.

## View Model: CropResponse
- Description: Representacion de cultivo para respuestas de API y consumo frontend.
- Fields:
  - id: ID con formato PREFIJO-NNNN
  - name: string
  - temperatureMin: number
  - temperatureMax: number
  - humidityMin: number
  - humidityMax: number
  - lightMin: number
  - lightMax: number
  - userId: ID con formato PREFIJO-NNNN
  - createdAt: datetime
  - updatedAt: datetime

## Command Model: CreateCropCommand
- Description: Payload de creacion de cultivo.
- Fields:
  - name: string
  - temperatureMin: number
  - temperatureMax: number
  - humidityMin: number
  - humidityMax: number
  - lightMin: number
  - lightMax: number
  - userId: ID con formato PREFIJO-NNNN
- Rules:
  - Aplica obligatoriedad, tipo numerico, regla min<max por metrica y existencia de usuario.

## Command Model: UpdateCropCommand
- Description: Payload de actualizacion de cultivo.
- Fields:
  - name: string (opcional)
  - temperatureMin: number (opcional)
  - temperatureMax: number (opcional)
  - humidityMin: number (opcional)
  - humidityMax: number (opcional)
  - lightMin: number (opcional)
  - lightMax: number (opcional)
  - userId: ID con formato PREFIJO-NNNN (opcional)
- Rules:
  - Si se actualiza algun par de rangos, se valida min<max para ese par.
  - Si se incluye userId, valida existencia de usuario.
  - Al menos un campo debe enviarse para actualizar.

## State Transitions
- Created: cultivo creado con todos los rangos validos y referencia de usuario.
- Updated: cambio de nombre, rangos y/o usuario asociado con validaciones de consistencia.
- Deleted: cultivo removido y no visible en consultas posteriores.

## Formato de IDs

- Usuarios: `USE-0001`
- Invernaderos: `INV-0001`
- Cultivos: `CRO-0001`
- Sensores: `SEN-0001`
- Plantaciones: `PLA-0001`

Regla general: prefijo por entidad + guion + numero secuencial de 4 digitos.

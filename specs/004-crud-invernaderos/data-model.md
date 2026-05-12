# Data Model: CRUD de Invernaderos

## Entity: User
- Description: Usuario propietario o responsable de invernaderos.
- Fields:
  - id: ID con formato PREFIJO-NNNN (obligatorio)
  - email: string (obligatorio)
- Rules:
  - Debe existir antes de asociar un invernadero.

## Entity: Greenhouse
- Description: Unidad de invernadero administrable.
- Fields:
  - id: ID con formato PREFIJO-NNNN (obligatorio, generado por sistema)
  - name: string (obligatorio)
  - location: string (obligatorio)
  - status: enum (ACTIVO, INACTIVO, MANTENIMIENTO)
  - userId: ID con formato PREFIJO-NNNN (obligatorio, foreign key a User.id)
  - createdAt: datetime (obligatorio)
  - updatedAt: datetime (obligatorio)
- Validation Rules:
  - name y location no pueden ser vacios ni contener solo espacios.
  - status debe pertenecer al catalogo permitido.
  - userId debe referenciar un usuario existente.

## View Model: GreenhouseResponse
- Description: Representacion de invernadero para respuestas de API y consumo frontend.
- Fields:
  - id: ID con formato PREFIJO-NNNN
  - name: string
  - location: string
  - status: string
  - userId: ID con formato PREFIJO-NNNN
  - createdAt: datetime
  - updatedAt: datetime

## Command Model: CreateGreenhouseCommand
- Description: Payload de creacion de invernadero.
- Fields:
  - name: string
  - location: string
  - status: string
  - userId: ID con formato PREFIJO-NNNN
- Rules:
  - Aplica reglas de obligatoriedad, catalogo de estado y existencia de usuario.

## Command Model: UpdateGreenhouseCommand
- Description: Payload de actualizacion de invernadero.
- Fields:
  - name: string (opcional)
  - location: string (opcional)
  - status: string (opcional)
  - userId: ID con formato PREFIJO-NNNN (opcional)
- Rules:
  - Si se incluye `status`, valida catalogo.
  - Si se incluye `userId`, valida existencia de usuario.
  - Al menos un campo debe enviarse para actualizar.

## State Transitions
- Created: invernadero creado con referencia valida a usuario.
- Updated: cambio de nombre, ubicacion, estado y/o usuario asociado.
- Deleted: invernadero removido y no visible en consultas posteriores.

## Formato de IDs

- Usuarios: `USE-0001`
- Invernaderos: `INV-0001`
- Cultivos: `CRO-0001`
- Sensores: `SEN-0001`
- Plantaciones: `PLA-0001`

Regla general: prefijo por entidad + guion + numero secuencial de 4 digitos.

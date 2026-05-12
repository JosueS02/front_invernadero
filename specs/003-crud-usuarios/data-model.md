# Data Model: CRUD de Usuarios Basico

## Entity: User
- Description: Cuenta administrable con credenciales basicas para el sistema.
- Fields:
  - id: ID con formato PREFIJO-NNNN (obligatorio, generado por sistema)
  - email: string (obligatorio, unico, formato email)
  - passwordHash: string (obligatorio, nunca expuesto en respuestas)
  - createdAt: datetime (obligatorio)
  - updatedAt: datetime (obligatorio)
- Validation Rules:
  - email debe tener formato valido y normalizarse para comparacion de unicidad.
  - password de entrada debe cumplir: minimo 8 caracteres, al menos una mayuscula, una minuscula, un numero y un caracter especial.
  - passwordHash se almacena tras aplicar algoritmo de hash seguro en backend.

## View Model: UserResponse
- Description: Representacion de usuario para respuestas de API y consumo frontend.
- Fields:
  - id: ID con formato PREFIJO-NNNN
  - email: string
  - createdAt: datetime
  - updatedAt: datetime
- Rules:
  - Nunca incluir password ni passwordHash.

## Command Model: CreateUserCommand
- Description: Payload de creacion de usuario.
- Fields:
  - email: string
  - password: string
- Rules:
  - Debe aplicar validaciones de formato email, unicidad y politica de contrasena.

## Command Model: UpdateUserCommand
- Description: Payload de actualizacion de usuario.
- Fields:
  - email: string (opcional en actualizacion parcial)
  - password: string (opcional en actualizacion parcial)
- Rules:
  - Si se envia email, valida formato y unicidad.
  - Si se envia password, valida politica de complejidad.
  - Al menos uno de los campos debe estar presente.

## State Transitions
- Created: usuario insertado con email unico y passwordHash.
- Updated: cambio de email y/o passwordHash en usuario existente.
- Deleted: usuario removido de persistencia y no visible en consultas posteriores.

## Formato de IDs

- Usuarios: `USE-0001`
- Invernaderos: `INV-0001`
- Cultivos: `CRO-0001`
- Sensores: `SEN-0001`
- Plantaciones: `PLA-0001`

Regla general: prefijo por entidad + guion + numero secuencial de 4 digitos.

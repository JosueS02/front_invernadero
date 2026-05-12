# Data Model: Pantallas de Autenticacion

## Entity: AuthCredentials
- Description: Datos de acceso capturados en formularios de login y creacion de usuario.
- Fields:
  - email: string (obligatorio, formato correo valido)
  - password: string (obligatorio, no vacio, no solo espacios)
- Validation Rules:
  - email debe incluir formato local@dominio valido
  - password debe contener al menos un caracter visible

## Entity: AuthFormState
- Description: Estado de UI y validacion del formulario de autenticacion.
- Fields:
  - values: AuthCredentials
  - errors: map<string, string>
  - isSubmitting: boolean
  - submitEnabled: boolean
- State Transitions:
  - idle -> editing: cuando usuario escribe en campos
  - editing -> invalid: cuando hay errores de validacion
  - editing -> valid: cuando ambos campos son validos
  - valid -> submitting: al pulsar boton principal
  - submitting -> idle: al terminar procesamiento

## Entity: AuthNavigationIntent
- Description: Accion de navegacion iniciada por el texto bajo el boton de login.
- Fields:
  - sourceScreen: enum (login)
  - targetScreen: enum (crear-usuario)
  - triggerType: enum (text-click)
- Rules:
  - Debe ejecutarse en una sola accion
  - Debe mantener foco en contenedor principal de destino para accesibilidad

## Formato de IDs

- Usuarios: `USE-0001`
- Invernaderos: `INV-0001`
- Cultivos: `CRO-0001`
- Sensores: `SEN-0001`
- Plantaciones: `PLA-0001`

Regla general: prefijo por entidad + guion + numero secuencial de 4 digitos.

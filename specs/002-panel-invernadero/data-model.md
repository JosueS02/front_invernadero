# Data Model: Panel de Gestion de Invernadero

## Entity: UserSession
- Description: Informacion minima de sesion para barra superior.
- Fields:
  - email: string (obligatorio, visible en topbar)
  - authenticated: boolean
- Rules:
  - Si email no existe, se muestra valor de respaldo configurable

## Entity: Greenhouse
- Description: Configuracion principal del invernadero.
- Fields:
  - name: string (obligatorio)
  - location: string (obligatorio)
  - sensors: SensorType[]
  - actuators: ActuatorType[]
- Validation Rules:
  - name y location no vacios
  - sensors y actuators aceptan lista vacia o seleccion multiple segun politica de negocio

## Entity: CropProfile
- Description: Parametros ambientales para una cosecha.
- Fields:
  - cropName: string (obligatorio)
  - temperatureMin: number (Celsius)
  - temperatureMax: number (Celsius)
  - humidityMin: number (porcentaje)
  - humidityMax: number (porcentaje)
  - lightMin: number (lux)
  - lightMax: number (lux)
- Validation Rules:
  - todos los campos numericos son obligatorios
  - para cada par: min < max
  - valores no numericos son rechazados

## Entity: NavigationItem
- Description: Opcion de menu para cambiar de pantalla.
- Fields:
  - key: enum (inicio, invernadero, cosecha)
  - label: string
  - route: string
- Rules:
  - Cada key mapea de forma unica a una ruta

## Formato de IDs

- Usuarios: `USE-0001`
- Invernaderos: `INV-0001`
- Cultivos: `CRO-0001`
- Sensores: `SEN-0001`
- Plantaciones: `PLA-0001`

Regla general: prefijo por entidad + guion + numero secuencial de 4 digitos.

# Quickstart: Pantallas de Autenticacion

## Objetivo
Implementar y validar dos pantallas de autenticacion (Login y Crear Usuario) con requisitos visuales y de navegacion definidos en la especificacion.

## Pasos de implementacion sugeridos
1. Crear modulo de feature para autenticacion con rutas separadas para Login y Crear Usuario.
2. Implementar componente de card reutilizable para ambos formularios.
3. Implementar header rectangular reutilizable en color `#3D9F49`.
4. Crear formulario base con campos de correo y contrasena y validaciones de obligatoriedad/formato.
5. Implementar boton principal en color `#36D30B` en ambas pantallas.
6. En Login, agregar texto bajo boton en color `#36D30B` para redireccion a Crear Usuario.
7. En Crear Usuario, agregar texto bajo boton en color `#36D30B` para redireccion a Login.
8. Aplicar politica de contrasena: minimo 8 caracteres, un numero y un simbolo.
9. Verificar comportamiento responsive en movil y escritorio.
10. Agregar pruebas:
   - Unitarias para validacion de correo y contrasena.
   - Integracion para renderizado de card, header y accion de formulario.
   - E2E para flujo de redireccion desde Login a Crear Usuario.

## Criterios de verificacion rapida
- Existen dos pantallas distintas para login y registro.
- Ambos formularios muestran correo + contrasena en cards.
- Header rectangular usa `#3D9F49`.
- Boton principal y texto inferior usan `#36D30B`.
- Redireccion desde Login a Crear Usuario funciona en una accion.
- Redireccion desde Crear Usuario a Login funciona en una accion.
- Login y registro validos redirigen a pantalla de exito simple.
- Contrasena sin numero/simbolo o menor a 8 caracteres no permite envio.
- Formularios invalidos no se envian.

## Comandos de verificacion

1. Instalar dependencias: `npm install`
2. Ejecutar pruebas unitarias/integracion: `npm run test`
3. Ejecutar pruebas E2E: `npm run test:e2e`

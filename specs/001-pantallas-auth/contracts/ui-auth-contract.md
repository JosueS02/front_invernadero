# UI Contract: Auth Screens

## Scope
Contrato de interfaz para las pantallas Login y Crear Usuario.

## Screen: Login
- Must render:
  - Header rectangular visible con color `#3D9F49`
  - Card de formulario
  - Campo correo (obligatorio)
  - Campo contrasena (obligatorio)
  - Boton principal "Iniciar sesion" con color `#36D30B`
  - Texto de redireccion bajo el boton con color `#36D30B`
- Interaction rules:
  - Click en texto de redireccion debe navegar a pantalla Crear Usuario
  - Envio con datos invalidos bloqueado y con errores visibles

## Screen: Crear Usuario
- Must render:
  - Header rectangular visible con color `#3D9F49`
  - Card de formulario
  - Campo correo (obligatorio)
  - Campo contrasena (obligatorio)
  - Boton principal "Crear usuario" con color `#36D30B`
  - Texto de redireccion bajo el boton con color `#36D30B`
- Interaction rules:
  - Click en texto de redireccion debe navegar a pantalla Login
  - Envio con datos invalidos bloqueado y con errores visibles
  - Contrasena valida requiere minimo 8 caracteres, un numero y un simbolo

## Shared UX/Accessibility Rules
- Navegacion por teclado completa en campos, boton y texto interactivo.
- Labels asociados a campos de correo y contrasena.
- Contraste suficiente entre texto y fondo para lectura.
- Layout responsive sin recorte de controles o texto.

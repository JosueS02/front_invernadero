# Quickstart: CRUD de Usuarios Basico

## Objetivo
Implementar CRUD de usuarios con dos campos de negocio (email y password) y politica de contrasena fuerte.

## Alcance funcional
- Crear usuario con email unico y password valida.
- Listar usuarios sin exponer credenciales.
- Consultar un usuario por identificador.
- Actualizar email y/o password con validaciones.
- Eliminar usuario existente.

## Reglas de negocio clave
- Password valida si cumple todo:
  - Minimo 8 caracteres
  - Al menos una mayuscula
  - Al menos una minuscula
  - Al menos un numero
  - Al menos un caracter especial
- Email obligatorio, formato valido y unico.
- Password/passwordHash nunca se devuelve en respuestas.

## Pasos de implementacion sugeridos
1. Definir entidad `User` y migracion SQL en PostgreSQL con restriccion de unicidad para `email`.
2. Implementar validadores de email y politica de password en backend.
3. Implementar endpoints REST (POST, GET list, GET by id, PUT, DELETE).
4. Documentar contrato en OpenAPI 3 y publicar Swagger UI.
5. Implementar vistas y formularios frontend para alta, consulta, edicion y baja.
6. Implementar mensajes de error claros para validaciones de email/password y recursos inexistentes.
7. Agregar pruebas frontend y backend segun riesgo.

## Verificacion rapida
- Crear usuario valido retorna exito.
- Crear usuario con password invalida retorna error de validacion.
- Crear/editar con email duplicado retorna conflicto.
- Listado y detalle no devuelven password/passwordHash.
- Actualizacion respeta mismas reglas de validacion que creacion.
- Eliminacion exitosa retira al usuario de consultas posteriores.

## Comandos de validacion sugeridos
1. Frontend:
   - `cd frontend`
   - `npm install`
   - `npm run test`
2. Backend:
   - `cd backend`
   - `./mvnw test`
3. End-to-end (si aplica en frontend):
   - `cd frontend`
   - `npm run test:e2e`

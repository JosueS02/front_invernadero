# Quickstart: CRUD de Invernaderos

## Objetivo
Implementar CRUD de invernaderos con campos nombre, ubicacion, estado y asociacion obligatoria a usuario.

## Alcance funcional
- Crear invernadero con `name`, `location`, `status` y `userId`.
- Listar invernaderos con usuario asociado.
- Consultar invernadero por identificador.
- Actualizar datos de invernadero existente.
- Eliminar invernadero existente.

## Reglas de negocio clave
- `name` y `location` son obligatorios.
- `status` permitido: ACTIVO, INACTIVO, MANTENIMIENTO.
- `userId` obligatorio y debe existir.
- No se permite persistir invernadero sin usuario valido.

## Pasos de implementacion sugeridos
1. Crear migracion SQL de tabla `greenhouses` con FK hacia `users`.
2. Definir entidad `Greenhouse` y repositorio con reglas de integridad referencial.
3. Implementar validadores de campos obligatorios y catalogo de estado.
4. Implementar endpoints REST (POST, GET list, GET by id, PUT, DELETE).
5. Publicar contrato en OpenAPI 3 y Swagger.
6. Implementar vistas y formularios frontend para alta, consulta, edicion y baja.
7. Agregar pruebas frontend y backend por historia de usuario.

## Verificacion rapida
- Alta valida con usuario existente retorna exito.
- Alta o edicion con `userId` inexistente retorna error.
- Alta o edicion con estado invalido retorna error.
- Consulta lista/detalle devuelve datos de invernadero y `userId` asociado.
- Eliminacion valida retira el registro de consultas posteriores.

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

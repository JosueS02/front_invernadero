# Quickstart: CRUD de Cultivos

## Objetivo
Implementar CRUD de cultivos con nombre, rangos de temperatura/humedad/luz y asociacion obligatoria a usuario.

## Alcance funcional
- Crear cultivo con nombre, rangos min/max y userId.
- Listar cultivos con sus rangos y usuario asociado.
- Consultar cultivo por identificador.
- Actualizar nombre, rangos y usuario asociado de cultivo existente.
- Eliminar cultivo existente.

## Reglas de negocio clave
- `name` obligatorio.
- `temperatureMin < temperatureMax`.
- `humidityMin < humidityMax`.
- `lightMin < lightMax`.
- Campos de rango deben ser numericos.
- `userId` obligatorio y existente.

## Pasos de implementacion sugeridos
1. Crear migracion SQL de tabla `crops` con FK hacia `users`.
2. Definir entidad `Crop` y repositorio con validaciones de integridad referencial.
3. Implementar validadores de nombre, tipo numerico y regla min<max por metrica.
4. Implementar endpoints REST (POST, GET list, GET by id, PUT, DELETE).
5. Publicar contrato OpenAPI 3 y Swagger para `crops`.
6. Implementar formularios y vistas frontend para alta, consulta, edicion y baja.
7. Incorporar mensajes de error claros para rangos invalidos y referencias inexistentes.

## Verificacion rapida
- Alta valida con usuario existente retorna exito.
- Alta/edicion con rango invalido retorna error.
- Alta/edicion con `userId` inexistente retorna error.
- Consulta lista/detalle devuelve nombre, rangos y userId.
- Eliminacion valida retira el cultivo de consultas posteriores.

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

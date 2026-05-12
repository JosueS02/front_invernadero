# Quickstart: CRUD de Catalogo de Sensores

## Objetivo
Habilitar mantenimiento controlado de un catalogo fijo de sensores con consulta para usuarios autenticados y actualizacion de unidad solo para administradores, preservando el conjunto base: Humedad, Temperatura, Luz y CO2.

## Flujo funcional esperado
1. Usuario autenticado abre modulo de Catalogo de Sensores.
2. Visualiza los cuatro sensores base con sus campos de identificacion y unidad.
3. Si tiene rol administrador, edita la unidad de un sensor existente.
4. Guarda y confirma que el listado se actualiza con el nuevo valor.
5. Si intenta crear o eliminar sensores, el sistema bloquea la accion con mensaje claro.
6. Si dos administradores editan en paralelo, el sistema detecta conflicto y evita sobrescritura silenciosa.

## Reglas clave
- El catalogo debe contener exactamente cuatro sensores base en esta iteracion.
- IDs fijos por sensor entre ambientes.
- Unidades canonicas iniciales: Humedad `%`, Temperatura `°C`, Luz `lux`, CO2 `ppm`.
- No se permite alta de sensores.
- No se permite eliminacion de sensores.
- La unidad es obligatoria y no puede ser texto vacio.
- Solo administradores pueden actualizar unidad.
- Debe existir control de concurrencia por version/fecha para actualizaciones.
- En cada arranque, si faltan sensores base, se reinsertan automaticamente.
- Los errores de negocio deben ser visibles y comprensibles en UI.

## Verificacion rapida
- Consultar catalogo y confirmar presencia de Humedad, Temperatura, Luz y CO2.
- Validar IDs fijos y unidades canonicas al iniciar ambiente limpio.
- Actualizar unidad de un sensor con valor valido y verificar persistencia.
- Intentar actualizar unidad sin rol administrador y verificar rechazo por permisos.
- Intentar guardar unidad vacia y verificar mensaje de validacion.
- Simular actualizacion concurrente y verificar respuesta de conflicto.
- Intentar crear sensor nuevo y verificar rechazo controlado.
- Intentar eliminar sensor existente y verificar rechazo controlado.
- Simular faltante de sensor base y verificar auto-reparacion al arranque.

## Contratos asociados
- API contract: `specs/008-sensor-catalog-crud/contracts/api-sensor-catalog-contract.md`
- UI contract: `specs/008-sensor-catalog-crud/contracts/ui-sensor-catalog-contract.md`

## Comandos sugeridos
1. Backend:
   - `cd backend`
   - `mvn test`
2. Frontend:
   - `cd frontend`
   - `npm run test`
   - `npm run test:e2e`

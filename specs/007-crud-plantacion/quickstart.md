# Quickstart: CRUD de Plantacion

## Objetivo
Habilitar CRUD de plantaciones con referencias a invernadero y cultivo, manejo de fechas (`plantado` y `finalizado`) y estado operativo (`Activo`/`Inactivo`).

## Flujo funcional esperado
1. Usuario autenticado abre modulo de Plantacion.
2. Visualiza por defecto plantaciones `Activas` y puede filtrar a `Todas` o `Inactivas`.
3. Crea una plantacion seleccionando invernadero, cultivo, fecha-hora de plantado y estado.
4. Define fecha-hora de finalizacion cuando el estado sea `Inactivo` (obligatoria en ese caso).
5. Edita una plantacion existente para actualizar datos.
6. Elimina una plantacion con confirmacion aplicando baja logica (cambio a `Inactivo`).

## Reglas clave
- No permitir `fechaFinalizado` menor que `fechaPlantado`.
- Manejar fechas en formato local `YYYY-MM-DDTHH:mm`.
- Exigir `fechaFinalizado` cuando estado=`Inactivo`.
- Invernadero y cultivo de la plantacion deben pertenecer al usuario actual.
- Permitir solo una plantacion `Activa` por combinacion invernadero+cultivo.
- El listado debe refrescarse tras cada operacion exitosa.
- Errores de validacion deben mostrarse en UI en lenguaje claro.

## Verificacion rapida
- Crear plantacion valida: aparece en listado.
- Crear con fechas invalidas/incompletas: se rechaza y muestra error.
- Intentar segunda plantacion `Activa` en misma combinacion: se rechaza con error de negocio.
- Editar estado/fechas: se persiste y refleja en listado.
- Eliminar: cambia a `Inactivo`; no aparece en filtro por defecto `Activas`.
- Operar con IDs ajenos: backend rechaza con error controlado.

## Contratos asociados
- API contract: `specs/007-crud-plantacion/contracts/api-plantacion-contract.md`
- UI contract: `specs/007-crud-plantacion/contracts/ui-plantacion-contract.md`

## Comandos sugeridos
1. Backend:
   - `cd backend`
   - `mvn test`
2. Frontend:
   - `cd frontend`
   - `npm run test`
   - `npm run test:e2e`

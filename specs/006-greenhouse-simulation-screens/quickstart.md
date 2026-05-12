# Quickstart: Simulacion de Invernadero

## Objetivo
Implementar el flujo de 5 pantallas de simulacion con entrada condicional por estado del invernadero, control de actuadores, eventos climaticos, dashboard y menu acotado.

## Flujo esperado
1. Usuario autenticado entra al modulo de simulacion.
2. Si invernadero esta AVAILABLE:
   - Mostrar pantalla de iniciar simulador con nombre, ubicacion, sensores, actuadores y combo de cosechas inactivas del usuario.
3. Si invernadero esta PRODUCTION:
   - Omitir pantalla inicial y redirigir directamente a actuadores.
4. Desde menu de simulacion navegar solo a:
   - Actuadores
   - Eventos climaticos
   - Dashboard
5. Al final del menu, boton "Salir del invernadero" redirige a Inicio.

## Reglas de negocio clave
- Combo de cosechas: solo INACTIVE y del usuario autenticado.
- Actuadores: gris cuando apagado, verde cuando activo.
- Eventos climaticos: cada evento puede activarse/desactivarse de forma individual.
- Cuando no hay invernaderos disponibles: mostrar estado vacio con boton de volver a inicio.
- Toggling en UI: comportamiento optimista con rollback si la respuesta backend falla.

## Verificacion rapida
- Invernadero AVAILABLE muestra pantalla de iniciar simulador.
- Invernadero PRODUCTION redirige directo a actuadores.
- No aparecen cosechas ACTIVE ni cosechas de otro usuario.
- Toggle de actuadores cambia entre gris y verde.
- Toggle de eventos climaticos cambia estado visible.
- Si falla un toggle, el estado visual vuelve al previo y se muestra mensaje de error.
- Menu muestra solo 3 destinos operativos y boton de salida a inicio.

## Contratos asociados
- UI contract: `specs/006-greenhouse-simulation-screens/contracts/ui-simulation-flow-contract.md`
- API contract: `specs/006-greenhouse-simulation-screens/contracts/api-simulation-contract.md`

## Comandos sugeridos
1. Frontend:
   - `cd frontend`
   - `npm run build`
   - `npm run test`
2. Backend:
   - `cd backend`
   - `mvn test`

## Validacion ejecutada

### Backend
1. `mvn -DskipTests compile -Dstyle.color=never`
   - Resultado: BUILD SUCCESS.
2. `mvn -Dtest=SimulationEntryServiceTest,SimulationEntryOwnershipTest,ActuatorStateServiceTest,ActuatorLastWriteWinsTest,ClimateEventStateServiceTest,ClimateLastWriteWinsTest,SimulationExitServiceTest test -Dstyle.color=never`
   - Resultado: BUILD SUCCESS.
   - Resumen: Tests run = 8, Failures = 0, Errors = 0, Skipped = 0.

### Frontend
1. `npm run -s build`
   - Resultado: build completado correctamente.
2. `npm run -s test -- --run tests/integration/greenhouse/simulation-start.test.tsx tests/integration/greenhouse/simulation-empty-state.test.tsx tests/integration/greenhouse/simulation-actuators.test.tsx tests/integration/greenhouse/simulation-actuators-rollback.test.tsx tests/integration/greenhouse/simulation-climate-events.test.tsx tests/integration/greenhouse/simulation-climate-events-rollback.test.tsx tests/integration/greenhouse/simulation-menu-navigation.test.tsx tests/integration/greenhouse/simulation-dashboard.test.tsx`
   - Resultado: 8 archivos, 8 pruebas, todo en verde.

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUserSession } from "../model/session.store";
import { getSimulationSession } from "../model/simulationSession.store";
import { listGreenhousesByUserPaged, type GreenhouseApiResponse } from "../services/greenhouseApi";

const PAGE_SIZE = 5;

function getStatusLabel(status: GreenhouseApiResponse["status"]): string {
  if (status === "ACTIVE") return "Disponible";
  if (status === "PRODUCTION") return "Produccion";
  if (status === "INACTIVE") return "Inactivo";
  return "Mantenimiento";
}

export function HomePage() {
  const navigate = useNavigate();
  const session = getUserSession();
  const activeSimulationSession = getSimulationSession();
  const [greenhouses, setGreenhouses] = useState<GreenhouseApiResponse[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState("");

  useEffect(() => {
    if (!session.id) {
      setGreenhouses([]);
      return;
    }

    let isActive = true;

    async function loadGreenhouses() {
      setIsLoading(true);
      setApiError("");
      try {
        const { items, total } = await listGreenhousesByUserPaged(session.id, currentPage, PAGE_SIZE);
        if (isActive) {
          setGreenhouses(items);
          setTotalItems(total);

          const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));
          if (currentPage >= totalPages) {
            setCurrentPage(totalPages - 1);
          }
        }
      } catch (error) {
        if (isActive) {
          setApiError(error instanceof Error ? error.message : "No se pudieron cargar los invernaderos");
          setTotalItems(0);
        }
      } finally {
        if (isActive) {
          setIsLoading(false);
        }
      }
    }

    void loadGreenhouses();

    function onWindowFocus() {
      void loadGreenhouses();
    }

    window.addEventListener("focus", onWindowFocus);

    return () => {
      isActive = false;
      window.removeEventListener("focus", onWindowFocus);
    };
  }, [session.id, currentPage]);

  const totalPages = Math.max(1, Math.ceil(totalItems / PAGE_SIZE));
  const canGoPrev = currentPage > 0;
  const canGoNext = currentPage + 1 < totalPages;

  return (
    <section className="management-page" aria-label="Pantalla inicio">
      <div className="management-card">
        <h1>Inicio</h1>
        <p>Selecciona Invernadero o Cosecha desde el menu para gestionar tu operacion.</p>

        <section className="home-greenhouses" aria-label="Invernadero">
          <h2>Invernadero</h2>

          {activeSimulationSession ? (
            <p className="field-note">
              Este equipo ya esta mostrando un invernadero. Para visualizar otro, primero sal del invernadero actual.
            </p>
          ) : null}

          {isLoading ? <p>Cargando invernaderos...</p> : null}
          {apiError ? <p className="field-error">{apiError}</p> : null}

          {!isLoading && !apiError && greenhouses.length === 0 ? (
            <p>No hay ningun invernadero creado o registrado</p>
          ) : null}

          {!isLoading && !apiError && greenhouses.length > 0 ? (
            <>
              <ul className="home-greenhouse-list">
                {greenhouses.map((greenhouse) => (
                  <li key={greenhouse.id} className="home-greenhouse-item">
                    <div>
                      <h3>{greenhouse.name}</h3>
                      <p>{greenhouse.location || "Sin ubicacion"}</p>
                      <p><strong>Estado:</strong> {getStatusLabel(greenhouse.status)}</p>
                      <p><strong>Actuadores:</strong> {(greenhouse.actuatorNames || []).join(", ") || "Sin actuadores"}</p>
                    </div>
                    <button
                      type="button"
                      className="secondary-action"
                      disabled={Boolean(activeSimulationSession && activeSimulationSession.greenhouseId !== greenhouse.id)}
                      title={
                        activeSimulationSession && activeSimulationSession.greenhouseId !== greenhouse.id
                          ? "Sal del invernadero actual para visualizar otro"
                          : "Visualizar invernadero"
                      }
                      onClick={() => {
                        const params = new URLSearchParams({
                          greenhouseId: greenhouse.id,
                          greenhouseName: greenhouse.name,
                          greenhouseLocation: greenhouse.location || "",
                          sensorNames: (greenhouse.sensorNames || []).join(","),
                          actuatorNames: (greenhouse.actuatorNames || []).join(",")
                        });
                        navigate(`/simulacion/inicio?${params.toString()}`);
                      }}
                    >
                      Visualizar
                    </button>
                  </li>
                ))}
              </ul>

              <div className="home-pagination" aria-label="Paginacion de invernaderos">
                <button
                  type="button"
                  className="secondary-action"
                  onClick={() => setCurrentPage((prev) => Math.max(0, prev - 1))}
                  disabled={!canGoPrev}
                >
                  Anterior
                </button>
                <p>
                  Pagina {totalItems === 0 ? 0 : currentPage + 1} de {totalPages}
                </p>
                <button
                  type="button"
                  className="secondary-action"
                  onClick={() => setCurrentPage((prev) => prev + 1)}
                  disabled={!canGoNext}
                >
                  Siguiente
                </button>
              </div>
            </>
          ) : null}
        </section>
      </div>
    </section>
  );
}

import { FormEvent, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import type { CropSelectableOption, SimulationEntryResponse } from "../model/simulation.types";
import { getUserSession } from "../model/session.store";
import { clearSimulationSession, getSimulationSession, saveSimulationSession } from "../model/simulationSession.store";
import { listCropsByUser } from "../services/cropApi";
import { listGreenhousesByUser, updateGreenhouse } from "../services/greenhouseApi";
import { createPlanting, listPlantingsByUser, updatePlanting } from "../services/plantingApi";
import { getSimulationCrops, getSimulationEntry, startSimulationSession } from "../services/simulationApi";
import "../styles/simulation.css";

function toLocalDateTimeApiValue(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");
  return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
}

async function ensureActivePlanting(params: {
  userId: string;
  greenhouseId: string;
  cropId: string;
  plantedAt: string;
}): Promise<void> {
  const allItems = await listPlantingsByUser(params.userId, "ALL");

  const alreadyActive = allItems.some(
    (item) =>
      item.greenhouseId === params.greenhouseId &&
      item.cropId === params.cropId &&
      item.status === "ACTIVE"
  );

  if (alreadyActive) {
    return;
  }

  const inactiveMatch = allItems.find(
    (item) =>
      item.greenhouseId === params.greenhouseId &&
      item.cropId === params.cropId &&
      item.status === "INACTIVE"
  );

  if (inactiveMatch) {
    await updatePlanting(inactiveMatch.id, {
      userId: params.userId,
      greenhouseId: params.greenhouseId,
      cropId: params.cropId,
      plantedAt: params.plantedAt,
      finishedAt: null,
      status: "ACTIVE"
    });
    return;
  }

  await createPlanting({
    userId: params.userId,
    greenhouseId: params.greenhouseId,
    cropId: params.cropId,
    plantedAt: params.plantedAt,
    finishedAt: null,
    status: "ACTIVE"
  });
}

async function loadSelectableCrops(userId: string): Promise<CropSelectableOption[]> {
  try {
    return await getSimulationCrops();
  } catch {
    const [cropData, activePlantings] = await Promise.all([
      listCropsByUser(userId),
      listPlantingsByUser(userId, "ACTIVE")
    ]);

    const activeCropIds = new Set(activePlantings.map((item) => item.cropId));

    return cropData
      .filter((item) => !activeCropIds.has(item.id))
      .map((item) => ({
        cropId: item.id,
        name: item.name,
        cropStatus: "INACTIVE" as const
      }));
  }
}

function readSessionFromEntry(entryData: SimulationEntryResponse): { sessionId: string; greenhouseId: string; cropId: string } | null {
  const candidate = entryData as unknown as {
    sessionId?: string;
    greenhouseId?: string;
    cropId?: string;
    session?: { sessionId?: string; greenhouseId?: string; cropId?: string };
  };

  const nested = candidate.session;
  const sessionId = nested?.sessionId ?? candidate.sessionId;
  const greenhouseId = nested?.greenhouseId ?? candidate.greenhouseId;
  const cropId = nested?.cropId ?? candidate.cropId;

  if (!sessionId || !greenhouseId || !cropId) {
    return null;
  }

  return { sessionId, greenhouseId, cropId };
}

export function SimulationStartPage() {
  const navigate = useNavigate();
  const session = getUserSession();
  const [searchParams] = useSearchParams();
  const [entry, setEntry] = useState<SimulationEntryResponse | null>(null);
  const [crops, setCrops] = useState<CropSelectableOption[]>([]);
  const [selectedCropId, setSelectedCropId] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadEntry() {
      setLoading(true);
      setError("");
      const greenhouseId = searchParams.get("greenhouseId") ?? "";
      const greenhouseName = searchParams.get("greenhouseName") ?? "Invernadero";
      const greenhouseLocation = searchParams.get("greenhouseLocation") ?? "Sin ubicacion";
      const sensorNamesFromQuery = (searchParams.get("sensorNames") ?? "")
        .split(",")
        .map((sensor) => sensor.trim())
        .filter(Boolean);
      const actuatorNamesFromQuery = (searchParams.get("actuatorNames") ?? "")
        .split(",")
        .map((actuator) => actuator.trim())
        .filter(Boolean);

      if (!greenhouseId) {
        navigate("/inicio", { replace: true });
        return;
      }

      const currentSession = getSimulationSession();
      if (currentSession && currentSession.greenhouseId !== greenhouseId) {
        navigate("/simulacion/actuadores", { replace: true });
        return;
      }

      if (currentSession && currentSession.greenhouseId === greenhouseId) {
        navigate("/simulacion/actuadores", { replace: true });
        return;
      }

      try {
        const entryData = await getSimulationEntry(greenhouseId);

        if (entryData.entryScreen === "EMPTY") {
          navigate("/simulacion/vacio", { replace: true });
          return;
        }

        if (entryData.entryScreen === "ACTUATORS") {
          const entrySession = readSessionFromEntry(entryData);
          if (entrySession) {
            saveSimulationSession({
              ...entrySession,
              sensorNames: sensorNamesFromQuery,
              actuatorNames: actuatorNamesFromQuery
            });
          } else if (session.id) {
            try {
              const activePlantings = await listPlantingsByUser(session.id, "ACTIVE");
              const activePlanting = activePlantings.find((item) => item.greenhouseId === greenhouseId);
              if (activePlanting) {
                const resumedSession = await startSimulationSession({
                  greenhouseId,
                  cropId: activePlanting.cropId
                });

                saveSimulationSession({
                  ...resumedSession,
                  sensorNames: sensorNamesFromQuery,
                  actuatorNames: actuatorNamesFromQuery
                });
              }
            } catch {
              // no-op: fallback navigation below preserves existing behavior
            }
          }

          navigate("/simulacion/actuadores", { replace: true });
          return;
        }

        const entryWithSensors = entryData.greenhouse
          ? {
              ...entryData,
              greenhouse: {
                ...entryData.greenhouse,
                sensors: entryData.greenhouse.sensors.length > 0
                  ? entryData.greenhouse.sensors
                  : sensorNamesFromQuery,
                actuators: entryData.greenhouse.actuators.length > 0
                  ? entryData.greenhouse.actuators
                  : actuatorNamesFromQuery
              }
            }
          : entryData;

        setEntry(entryWithSensors);

        if (!session.id) {
          setError("Debes iniciar sesion para cargar cosechas.");
          setCrops([]);
          return;
        }

        setCrops(await loadSelectableCrops(session.id));
      } catch (loadError) {
        // Keep simulation entry visible with real greenhouse info when API data is partially unavailable.
        setEntry({
          entryScreen: "START_SIMULATOR",
          greenhouse: {
            greenhouseId,
            name: greenhouseName,
            location: greenhouseLocation,
            greenhouseStatus: "AVAILABLE",
            sensors: sensorNamesFromQuery,
            actuators: actuatorNamesFromQuery.length > 0 ? actuatorNamesFromQuery : ["Ventilador", "Riego", "Luz", "Extractores de Aire", "Malla"]
          }
        });

        if (session.id) {
          try {
            setCrops(await loadSelectableCrops(session.id));
          } catch {
            setCrops([]);
          }
        } else {
          setCrops([]);
        }

        setError(loadError instanceof Error ? loadError.message : "No se pudo cargar la simulacion");
      } finally {
        setLoading(false);
      }
    }

    void loadEntry();
  }, [navigate, searchParams, session.id]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!selectedCropId || !entry?.greenhouse?.greenhouseId || !entry?.greenhouse?.name) {
      setError("Selecciona una cosecha valida antes de iniciar.");
      return;
    }

    if (!session.id) {
      setError("Debes iniciar sesion para actualizar el estado del invernadero.");
      return;
    }

    const activeSession = getSimulationSession();
    if (activeSession && activeSession.greenhouseId !== entry.greenhouse.greenhouseId) {
      try {
        const userGreenhouses = await listGreenhousesByUser(session.id);
        const sessionGreenhouseExists = userGreenhouses.some((item) => item.id === activeSession.greenhouseId);

        if (!sessionGreenhouseExists) {
          // Session points to a deleted/old greenhouse (e.g., after DB cleanup).
          clearSimulationSession();
        } else {
          setError("Ya hay una simulacion activa en otro invernadero. Finalizala antes de iniciar una nueva.");
          return;
        }
      } catch {
        setError("No se pudo validar la simulacion activa. Intenta de nuevo.");
        return;
      }
    }

    try {
      setError("");
      await updateGreenhouse(entry.greenhouse.greenhouseId, {
        userId: session.id,
        name: entry.greenhouse.name,
        location: entry.greenhouse.location,
        status: "PRODUCTION"
      });
    } catch (statusError) {
      setError(statusError instanceof Error ? statusError.message : "No se pudo actualizar el estado del invernadero");
      return;
    }

    try {
      await ensureActivePlanting({
        userId: session.id,
        greenhouseId: entry.greenhouse.greenhouseId,
        cropId: selectedCropId,
        plantedAt: toLocalDateTimeApiValue(new Date())
      });
    } catch (plantingError) {
      setError(
        plantingError instanceof Error
          ? `No se pudo registrar la plantacion automaticamente: ${plantingError.message}`
          : "No se pudo registrar la plantacion automaticamente"
      );
      return;
    }

    try {
      const nextSession = await startSimulationSession({
        greenhouseId: entry.greenhouse.greenhouseId,
        cropId: selectedCropId
      });
      saveSimulationSession({
        ...nextSession,
        sensorNames: entry.greenhouse.sensors,
        actuatorNames: entry.greenhouse.actuators
      });
      navigate("/simulacion/actuadores", { replace: true });
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : "No se pudo iniciar la simulacion");
    }
  }

  if (loading) {
    return (
      <div className="management-shell" aria-label="Simulacion cargando">
        <header className="management-topbar simulation-topbar">
          <button className="simulation-topbar-back" type="button" onClick={() => navigate("/inicio")}>Retroceder</button>
          <p className="session-email simulation-topbar-email" aria-label="Correo de usuario autenticado">{session.email}</p>
        </header>

        <main className="management-content">
          <section className="management-page">
            <div className="management-card simulation-card">
              <p>Cargando simulacion...</p>
            </div>
          </section>
        </main>
      </div>
    );
  }

  const canStart = Boolean(selectedCropId && entry?.greenhouse?.greenhouseId);

  return (
    <div className="management-shell" aria-label="Simulacion inicio">
      <header className="management-topbar simulation-topbar">
        <button className="simulation-topbar-back" type="button" onClick={() => navigate("/inicio")}>Retroceder</button>
        <p className="session-email simulation-topbar-email" aria-label="Correo de usuario autenticado">{session.email}</p>
      </header>

      <main className="management-content">
        <section className="management-page">
          <form
            id="simulation-start-form"
            className="management-card simulation-card"
            onSubmit={(event) => void handleSubmit(event)}
          >
            <h1>Iniciar simulacion</h1>
            <p><strong>Invernadero:</strong> {entry?.greenhouse?.name ?? "-"}</p>
            <p><strong>Ubicacion:</strong> {entry?.greenhouse?.location ?? "-"}</p>
            <p><strong>Estado:</strong> Disponible</p>

            <p><strong>Sensores:</strong> {entry?.greenhouse?.sensors.join(", ") || "Sin sensores registrados"}</p>
            <p><strong>Actuadores:</strong> {entry?.greenhouse?.actuators.join(", ") || "Sin actuadores registrados"}</p>

            <label htmlFor="simulation-crop">Cosecha (solo inactivas)</label>
            <select
              id="simulation-crop"
              value={selectedCropId}
              onChange={(event) => setSelectedCropId(event.target.value)}
            >
              <option value="">Selecciona una cosecha</option>
              {crops.map((item) => (
                <option key={item.cropId} value={item.cropId}>
                  {item.name}
                </option>
              ))}
            </select>
            {crops.length === 0 ? <p className="field-error">No hay cosechas registradas para este usuario.</p> : null}

            <div className="simulation-actions simulation-actions-end">
              <button className="simulation-btn simulation-btn-start" type="submit" disabled={!canStart}>
                Comenzar simulacion
              </button>
            </div>

            {error ? <p className="field-error">{error}</p> : null}
          </form>
        </section>
      </main>
    </div>
  );
}

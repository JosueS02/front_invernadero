import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { SimulationClimateEventState } from "../model/simulation.types";
import { clearSimulationSession, getSimulationSession } from "../model/simulationSession.store";
import { listSimulationClimateEvents, toggleSimulationClimateEvent } from "../services/simulationApi";
import "../styles/simulation.css";

const LOCAL_EVENTS: SimulationClimateEventState[] = [
  { eventKey: "VIAJES_SOLARES", label: "Viajes Solares", isActive: false, updatedAt: "" },
  { eventKey: "SEQUIA", label: "Sequia", isActive: false, updatedAt: "" },
  { eventKey: "LLUVIA", label: "Lluvia", isActive: false, updatedAt: "" },
  { eventKey: "VIENTO", label: "Viento", isActive: false, updatedAt: "" },
  { eventKey: "PLAGAS", label: "Plagas", isActive: false, updatedAt: "" }
];

export function SimulationClimateEventsPage() {
  const navigate = useNavigate();
  const [items, setItems] = useState<SimulationClimateEventState[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    async function load() {
      const session = getSimulationSession();
      if (!session) {
        navigate("/simulacion/inicio", { replace: true });
        return;
      }

      try {
        setError("");
        if (session.sessionId.startsWith("local-")) {
          setItems(LOCAL_EVENTS);
          return;
        }

        const data = await listSimulationClimateEvents(session.sessionId);
        setItems(data);
      } catch (loadError) {
        setItems(LOCAL_EVENTS);
        setError(loadError instanceof Error ? loadError.message : "No se pudo cargar eventos climaticos");
      }
    }

    void load();
  }, [navigate]);

  async function handleToggle(item: SimulationClimateEventState) {
    const session = getSimulationSession();
    if (!session) {
      clearSimulationSession();
      navigate("/simulacion/inicio", { replace: true });
      return;
    }

    if (session.sessionId.startsWith("local-")) {
      setItems((current) =>
        current.map((state) =>
          state.eventKey === item.eventKey ? { ...state, isActive: !state.isActive } : state
        )
      );
      setError("");
      return;
    }

    const previous = [...items];
    const optimistic = items.map((state) =>
      state.eventKey === item.eventKey ? { ...state, isActive: !state.isActive } : state
    );
    setItems(optimistic);

    try {
      const updated = await toggleSimulationClimateEvent(session.sessionId, item.eventKey, !item.isActive);
      setItems((current) =>
        current.map((state) => (state.eventKey === updated.eventKey ? updated : state))
      );
      setError("");
    } catch (toggleError) {
      setItems(previous);
      setError(toggleError instanceof Error ? toggleError.message : "No se pudo actualizar el evento");
    }
  }

  return (
    <section className="management-page" aria-label="Simulacion - Eventos climaticos">
      <div className="management-card simulation-card">
        <h1>Simulacion - Eventos climaticos</h1>
        <p>Activa o desactiva eventos climaticos de forma individual.</p>

        <div className="simulation-toggle-list">
          {items.map((item) => (
            <button
              key={item.eventKey}
              type="button"
              className={item.isActive ? "sim-toggle active" : "sim-toggle inactive"}
              onClick={() => void handleToggle(item)}
            >
              {item.label}
            </button>
          ))}
        </div>

        {error ? <p className="field-error">{error}</p> : null}
      </div>
    </section>
  );
}

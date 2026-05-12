import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { SimulationActuatorState } from "../model/simulation.types";
import { clearSimulationSession, getSimulationSession } from "../model/simulationSession.store";
import { listSimulationActuators, toggleSimulationActuator } from "../services/simulationApi";
import "../styles/simulation.css";

const LOCAL_ACTUATORS: SimulationActuatorState[] = [
  { actuatorKey: "VENTILADOR", label: "Ventilador", isActive: false, updatedAt: "" },
  { actuatorKey: "RIEGO", label: "Riego", isActive: false, updatedAt: "" },
  { actuatorKey: "LUZ", label: "Luz", isActive: false, updatedAt: "" },
  { actuatorKey: "EXTRACTORES", label: "Extractores de Aire", isActive: false, updatedAt: "" },
  { actuatorKey: "MALLA", label: "Malla", isActive: false, updatedAt: "" }
];

function normalizeActuatorLabel(value: string): string {
  return value.trim().toLowerCase();
}

function filterAssignedActuators(items: SimulationActuatorState[], assignedNames?: string[]): SimulationActuatorState[] {
  if (!assignedNames || assignedNames.length === 0) {
    return items;
  }

  const assigned = new Set(assignedNames.map(normalizeActuatorLabel));
  return items.filter((item) => assigned.has(normalizeActuatorLabel(item.label)));
}

export function SimulationActuatorsPage() {
  const navigate = useNavigate();
  const [items, setItems] = useState<SimulationActuatorState[]>([]);
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
        const assignedActuators = session.actuatorNames;
        if (session.sessionId.startsWith("local-")) {
          setItems(filterAssignedActuators(LOCAL_ACTUATORS, assignedActuators));
          return;
        }

        const data = await listSimulationActuators(session.sessionId);
        setItems(filterAssignedActuators(data, assignedActuators));
      } catch (loadError) {
        setItems(filterAssignedActuators(LOCAL_ACTUATORS, session.actuatorNames));
        setError(loadError instanceof Error ? loadError.message : "No se pudo cargar actuadores");
      }
    }

    void load();
  }, [navigate]);

  async function handleToggle(item: SimulationActuatorState) {
    const session = getSimulationSession();
    if (!session) {
      clearSimulationSession();
      navigate("/simulacion/inicio", { replace: true });
      return;
    }

    if (session.sessionId.startsWith("local-")) {
      setItems((current) =>
        current.map((state) =>
          state.actuatorKey === item.actuatorKey ? { ...state, isActive: !state.isActive } : state
        )
      );
      setError("");
      return;
    }

    const previous = [...items];
    const optimistic = items.map((state) =>
      state.actuatorKey === item.actuatorKey ? { ...state, isActive: !state.isActive } : state
    );
    setItems(optimistic);

    try {
      const updated = await toggleSimulationActuator(session.sessionId, item.actuatorKey, !item.isActive);
      setItems((current) =>
        current.map((state) => (state.actuatorKey === updated.actuatorKey ? updated : state))
      );
      setError("");
    } catch (toggleError) {
      setItems(previous);
      setError(toggleError instanceof Error ? toggleError.message : "No se pudo actualizar el actuador");
    }
  }

  return (
    <section className="management-page simulation-actuators-page" aria-label="Simulacion - Actuadores">
      <div className="management-card simulation-card actuators-card">
        <h1>Sistema Modular</h1>

        <div className="actuator-grid">
          {items.map((item) => (
            <div key={item.actuatorKey} className="actuator-item">
              <button
                type="button"
                className={item.isActive ? "actuator-circle active" : "actuator-circle inactive"}
                onClick={() => void handleToggle(item)}
                aria-label={`Alternar ${item.label}`}
              >
                <span className="actuator-inner-icon" aria-hidden="true" />
              </button>
              <p className="actuator-label">{item.label}</p>
            </div>
          ))}
        </div>

        {error ? <p className="field-error">{error}</p> : null}
      </div>
    </section>
  );
}

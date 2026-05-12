import type { SimulationSessionRef } from "./simulation.types";

const SIMULATION_SESSION_KEY = "frontreact.simulation.session";
// TTL for a saved session on the client before it's considered expired (ms)
const SESSION_TTL_MS = 5 * 60 * 1000; // 5 minutes

function nowIso(): string {
  return new Date().toISOString();
}

export function getSimulationSession(): SimulationSessionRef | null {
  if (typeof window === "undefined") return null;
  const rawValue = window.localStorage.getItem(SIMULATION_SESSION_KEY);
  if (!rawValue) return null;

  try {
    const parsed = JSON.parse(rawValue) as Partial<SimulationSessionRef>;
    if (!parsed.sessionId || !parsed.greenhouseId || !parsed.cropId) {
      return null;
    }

    // If session has no savedAt (older client versions) treat it as stale and remove it
    if (!parsed.savedAt) {
      try {
        window.localStorage.removeItem(SIMULATION_SESSION_KEY);
      } catch {
        // ignore
      }
      return null;
    }

    // Expire stale client sessions so a crashed/closed tab doesn't block navigation forever
    const saved = Date.parse(parsed.savedAt);
    if (!Number.isFinite(saved) || Date.now() - saved > SESSION_TTL_MS) {
      try {
        window.localStorage.removeItem(SIMULATION_SESSION_KEY);
      } catch {
        // ignore
      }
      return null;
    }

    return {
      sessionId: parsed.sessionId,
      greenhouseId: parsed.greenhouseId,
      cropId: parsed.cropId,
      sensorNames: Array.isArray(parsed.sensorNames) ? parsed.sensorNames : undefined,
      actuatorNames: Array.isArray(parsed.actuatorNames) ? parsed.actuatorNames : undefined,
      savedAt: parsed.savedAt
    };
  } catch {
    return null;
  }
}

export function saveSimulationSession(session: SimulationSessionRef): void {
  if (typeof window === "undefined") return;
  const toSave: SimulationSessionRef = { ...session, savedAt: nowIso() };
  window.localStorage.setItem(SIMULATION_SESSION_KEY, JSON.stringify(toSave));
}

export function clearSimulationSession(): void {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(SIMULATION_SESSION_KEY);
}

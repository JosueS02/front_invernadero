import type {
  CropSelectableOption,
  SimulationActuatorState,
  SimulationClimateEventState,
  SimulationEntryResponse,
  SimulationSessionRef
} from "../model/simulation.types";
import { getUserSession } from "../model/session.store";

const API_BASE_URL =
  (import.meta as ImportMeta & { env?: Record<string, string> }).env?.VITE_API_BASE_URL ??
  "http://localhost:8080";

interface ApiErrorPayload {
  message?: string;
}

function buildAuthHeaders(): Record<string, string> {
  const session = getUserSession();
  return session.id ? { "X-User-Id": session.id } : {};
}

export async function parseSimulationApiError(response: Response): Promise<string> {
  try {
    const payload = (await response.json()) as ApiErrorPayload;
    return payload.message || "Error inesperado en simulacion";
  } catch {
    return "No fue posible procesar la respuesta del servidor de simulacion";
  }
}

export async function getSimulationEntry(greenhouseId?: string): Promise<SimulationEntryResponse> {
  const query = greenhouseId ? `?greenhouseId=${encodeURIComponent(greenhouseId)}` : "";
  const response = await fetch(`${API_BASE_URL}/api/simulation/entry${query}`, {
    headers: buildAuthHeaders(),
    credentials: "include"
  });

  if (!response.ok) {
    throw new Error(await parseSimulationApiError(response));
  }

  return (await response.json()) as SimulationEntryResponse;
}

export async function getSimulationCrops(): Promise<CropSelectableOption[]> {
  const response = await fetch(`${API_BASE_URL}/api/simulation/crops`, {
    headers: buildAuthHeaders(),
    credentials: "include"
  });

  if (!response.ok) {
    throw new Error(await parseSimulationApiError(response));
  }

  return (await response.json()) as CropSelectableOption[];
}

export async function startSimulationSession(payload: {
  greenhouseId: string;
  cropId: string;
}): Promise<SimulationSessionRef> {
  const response = await fetch(`${API_BASE_URL}/api/simulation/sessions`, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...buildAuthHeaders() },
    credentials: "include",
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    throw new Error(await parseSimulationApiError(response));
  }

  return (await response.json()) as SimulationSessionRef;
}

export async function listSimulationActuators(sessionId: string): Promise<SimulationActuatorState[]> {
  const response = await fetch(`${API_BASE_URL}/api/simulation/${encodeURIComponent(sessionId)}/actuators`, {
    headers: buildAuthHeaders(),
    credentials: "include"
  });

  if (!response.ok) {
    throw new Error(await parseSimulationApiError(response));
  }

  return (await response.json()) as SimulationActuatorState[];
}

export async function toggleSimulationActuator(
  sessionId: string,
  actuatorKey: string,
  isActive: boolean
): Promise<SimulationActuatorState> {
  const response = await fetch(
    `${API_BASE_URL}/api/simulation/${encodeURIComponent(sessionId)}/actuators/${encodeURIComponent(actuatorKey)}`,
    {
      method: "PATCH",
      headers: { "Content-Type": "application/json", ...buildAuthHeaders() },
      credentials: "include",
      body: JSON.stringify({ isActive })
    }
  );

  if (!response.ok) {
    throw new Error(await parseSimulationApiError(response));
  }

  return (await response.json()) as SimulationActuatorState;
}

export async function listSimulationClimateEvents(sessionId: string): Promise<SimulationClimateEventState[]> {
  const response = await fetch(`${API_BASE_URL}/api/simulation/${encodeURIComponent(sessionId)}/climate-events`, {
    headers: buildAuthHeaders(),
    credentials: "include"
  });

  if (!response.ok) {
    throw new Error(await parseSimulationApiError(response));
  }

  return (await response.json()) as SimulationClimateEventState[];
}

export async function toggleSimulationClimateEvent(
  sessionId: string,
  eventKey: string,
  isActive: boolean
): Promise<SimulationClimateEventState> {
  const response = await fetch(
    `${API_BASE_URL}/api/simulation/${encodeURIComponent(sessionId)}/climate-events/${encodeURIComponent(eventKey)}`,
    {
      method: "PATCH",
      headers: { "Content-Type": "application/json", ...buildAuthHeaders() },
      credentials: "include",
      body: JSON.stringify({ isActive })
    }
  );

  if (!response.ok) {
    throw new Error(await parseSimulationApiError(response));
  }

  return (await response.json()) as SimulationClimateEventState;
}

export interface SimulationDashboardSummary {
  sessionId: string;
  activeActuatorCount: number;
  activeClimateEventCount: number;
  greenhouseName: string;
  selectedCropName: string;
  lastUpdatedAt: string;
}

export async function getSimulationDashboard(sessionId: string): Promise<SimulationDashboardSummary> {
  const response = await fetch(`${API_BASE_URL}/api/simulation/${encodeURIComponent(sessionId)}/dashboard`, {
    headers: buildAuthHeaders(),
    credentials: "include"
  });

  if (!response.ok) {
    throw new Error(await parseSimulationApiError(response));
  }

  return (await response.json()) as SimulationDashboardSummary;
}

export async function exitSimulationSession(sessionId: string): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/api/simulation/${encodeURIComponent(sessionId)}/exit`, {
    method: "POST",
    headers: buildAuthHeaders(),
    credentials: "include"
  });

  if (!response.ok) {
    throw new Error(await parseSimulationApiError(response));
  }
}



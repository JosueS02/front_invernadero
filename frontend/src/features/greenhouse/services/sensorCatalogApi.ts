import type { SensorCatalogItem, UpdateSensorUnitInput } from "../model/sensor-catalog.types";

const API_BASE_URL =
  (import.meta as ImportMeta & { env?: Record<string, string> }).env?.VITE_API_BASE_URL ??
  "http://localhost:8080";

interface ApiErrorPayload {
  message?: string;
}

export class SensorCatalogApiError extends Error {
  status: number;

  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}

async function parseApiError(response: Response): Promise<string> {
  try {
    const payload = (await response.json()) as ApiErrorPayload;
    return payload.message || "Error inesperado de API";
  } catch {
    return "No fue posible procesar la respuesta del servidor";
  }
}

export async function listSensorCatalog(): Promise<SensorCatalogItem[]> {
  const response = await fetch(`${API_BASE_URL}/api/sensors/catalog`, {
    cache: "no-store"
  });

  if (!response.ok) {
    throw new SensorCatalogApiError(response.status, await parseApiError(response));
  }

  return (await response.json()) as SensorCatalogItem[];
}

export async function updateSensorUnit(
  id: string,
  payload: UpdateSensorUnitInput,
  userRole: string
): Promise<SensorCatalogItem> {
  const response = await fetch(`${API_BASE_URL}/api/sensors/catalog/${encodeURIComponent(id)}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "X-User-Role": userRole
    },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    throw new SensorCatalogApiError(response.status, await parseApiError(response));
  }

  return (await response.json()) as SensorCatalogItem;
}

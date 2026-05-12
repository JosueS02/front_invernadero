import type {
  PlantingApiPayload,
  PlantingApiResponse,
  PlantingStatusFilter
} from "../model/planting.types";

const API_BASE_URL =
  (import.meta as ImportMeta & { env?: Record<string, string> }).env?.VITE_API_BASE_URL ??
  "http://localhost:8080";

interface ApiErrorPayload {
  message?: string;
}

async function parseApiError(response: Response): Promise<string> {
  try {
    const payload = (await response.json()) as ApiErrorPayload;
    return payload.message || "Error inesperado de API";
  } catch {
    return "No fue posible procesar la respuesta del servidor";
  }
}

export async function listPlantingsByUser(
  userId: string,
  status: PlantingStatusFilter = "ACTIVE"
): Promise<PlantingApiResponse[]> {
  const query = new URLSearchParams({ userId, status });
  const response = await fetch(`${API_BASE_URL}/api/plantings?${query.toString()}`, {
    cache: "no-store"
  });

  if (!response.ok) {
    throw new Error(await parseApiError(response));
  }

  return (await response.json()) as PlantingApiResponse[];
}

export async function createPlanting(payload: PlantingApiPayload): Promise<PlantingApiResponse> {
  const response = await fetch(`${API_BASE_URL}/api/plantings`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    throw new Error(await parseApiError(response));
  }

  return (await response.json()) as PlantingApiResponse;
}

export async function updatePlanting(id: string, payload: PlantingApiPayload): Promise<PlantingApiResponse> {
  const response = await fetch(`${API_BASE_URL}/api/plantings/${encodeURIComponent(id)}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    throw new Error(await parseApiError(response));
  }

  return (await response.json()) as PlantingApiResponse;
}

export async function deletePlanting(id: string): Promise<PlantingApiResponse> {
  const response = await fetch(`${API_BASE_URL}/api/plantings/${encodeURIComponent(id)}`, {
    method: "DELETE"
  });

  if (!response.ok) {
    throw new Error(await parseApiError(response));
  }

  return (await response.json()) as PlantingApiResponse;
}

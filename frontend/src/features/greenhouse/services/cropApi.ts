const API_BASE_URL =
  (import.meta as ImportMeta & { env?: Record<string, string> }).env?.VITE_API_BASE_URL ??
  "http://localhost:8080";

export interface CreateCropPayload {
  userId: string;
  name: string;
  minTemperature: number;
  maxTemperature: number;
  minHumidity: number;
  maxHumidity: number;
  minSoilMoisture: number;
  maxSoilMoisture: number;
}

export interface CropApiResponse {
  id: string;
  userId: string;
  name: string;
  minTemperature: number;
  maxTemperature: number;
  minHumidity: number;
  maxHumidity: number;
  minSoilMoisture: number;
  maxSoilMoisture: number;
  createdAt: string;
  updatedAt: string;
}

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

export async function createCrop(payload: CreateCropPayload): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/api/crops`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    throw new Error(await parseApiError(response));
  }
}

export async function listCropsByUser(userId: string): Promise<CropApiResponse[]> {
  const response = await fetch(`${API_BASE_URL}/api/crops?userId=${encodeURIComponent(userId)}`, {
    cache: "no-store"
  });

  if (!response.ok) {
    throw new Error(await parseApiError(response));
  }

  return (await response.json()) as CropApiResponse[];
}

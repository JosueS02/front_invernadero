const API_BASE_URL =
  (import.meta as ImportMeta & { env?: Record<string, string> }).env?.VITE_API_BASE_URL ??
  "http://localhost:8080";

export interface CreateGreenhousePayload {
  userId: string;
  name: string;
  location: string;
  status: "ACTIVE" | "PRODUCTION" | "INACTIVE" | "MAINTENANCE";
  sensorIds: string[];
  actuatorIds: string[];
}

export interface GreenhouseApiResponse {
  id: string;
  userId: string;
  name: string;
  location: string | null;
  status: "ACTIVE" | "PRODUCTION" | "INACTIVE" | "MAINTENANCE";
  sensorIds: string[];
  sensorNames: string[];
  actuatorIds: string[];
  actuatorNames: string[];
  createdAt: string;
  updatedAt: string;
}

export interface GreenhousePageResponse {
  items: GreenhouseApiResponse[];
  total: number;
}

export interface UpdateGreenhousePayload {
  userId: string;
  name: string;
  location: string;
  status: "ACTIVE" | "PRODUCTION" | "INACTIVE" | "MAINTENANCE";
  sensorIds?: string[];
  actuatorIds?: string[];
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

export async function createGreenhouse(payload: CreateGreenhousePayload): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/api/greenhouses`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    throw new Error(await parseApiError(response));
  }
}

export async function listGreenhousesByUser(userId: string): Promise<GreenhouseApiResponse[]> {
  const response = await fetch(`${API_BASE_URL}/api/greenhouses?userId=${encodeURIComponent(userId)}`, {
    cache: "no-store"
  });

  if (!response.ok) {
    throw new Error(await parseApiError(response));
  }

  return (await response.json()) as GreenhouseApiResponse[];
}

export async function listGreenhousesByUserPaged(
  userId: string,
  page: number,
  size: number
): Promise<GreenhousePageResponse> {
  const query = new URLSearchParams({
    userId,
    page: String(page),
    size: String(size)
  });

  const response = await fetch(`${API_BASE_URL}/api/greenhouses?${query.toString()}`, {
    cache: "no-store"
  });

  if (!response.ok) {
    throw new Error(await parseApiError(response));
  }

  const items = (await response.json()) as GreenhouseApiResponse[];
  const totalHeader = response.headers.get("X-Total-Count");
  const total = totalHeader ? Number(totalHeader) : items.length;

  return {
    items,
    total: Number.isNaN(total) ? items.length : total
  };
}

export async function updateGreenhouse(id: string, payload: UpdateGreenhousePayload): Promise<GreenhouseApiResponse> {
  const response = await fetch(`${API_BASE_URL}/api/greenhouses/${encodeURIComponent(id)}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    throw new Error(await parseApiError(response));
  }

  return (await response.json()) as GreenhouseApiResponse;
}

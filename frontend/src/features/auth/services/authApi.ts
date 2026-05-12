import type { AuthCredentials } from "../model/auth.types";

const API_BASE_URL =
  (import.meta as ImportMeta & { env?: Record<string, string> }).env?.VITE_API_BASE_URL ??
  "";

export interface UserApiResponse {
  id: string;
  email: string;
  fullName: string;
  createdAt: string;
  updatedAt: string;
  token?: string;
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

export async function registerUser(credentials: AuthCredentials): Promise<UserApiResponse> {
  const response = await fetch(`${API_BASE_URL}/api/users`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({
      email: credentials.email,
      fullName: credentials.email.split("@")[0],
      password: credentials.password
    })
  });

  if (!response.ok) {
    throw new Error(await parseApiError(response));
  }

  return (await response.json()) as UserApiResponse;
}

export async function loginUser(credentials: AuthCredentials): Promise<UserApiResponse> {
  const response = await fetch(`${API_BASE_URL}/api/users/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(credentials)
  });

  if (!response.ok) {
    throw new Error(await parseApiError(response));
  }

  return (await response.json()) as UserApiResponse;
}

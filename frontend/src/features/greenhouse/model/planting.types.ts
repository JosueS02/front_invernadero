export type PlantingStatus = "ACTIVE" | "INACTIVE";
export type PlantingStatusFilter = "ACTIVE" | "INACTIVE" | "ALL";

export interface PlantingFormData {
  greenhouseId: string;
  cropId: string;
  plantedAt: string;
  finishedAt: string;
  status: PlantingStatus;
}

export interface PlantingFormErrors {
  greenhouseId?: string;
  cropId?: string;
  plantedAt?: string;
  finishedAt?: string;
  status?: string;
}

export interface PlantingApiPayload {
  userId: string;
  greenhouseId: string;
  cropId: string;
  plantedAt: string;
  finishedAt: string | null;
  status: PlantingStatus;
}

export interface PlantingApiResponse {
  id: string;
  userId: string;
  greenhouseId: string;
  greenhouseName: string;
  cropId: string;
  cropName: string;
  plantedAt: string;
  finishedAt: string | null;
  status: PlantingStatus;
  createdAt: string;
  updatedAt: string;
}

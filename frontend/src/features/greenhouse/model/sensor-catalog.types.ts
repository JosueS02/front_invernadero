export interface SensorCatalogItem {
  id: string;
  codigo: string;
  nombre: string;
  unidad: string;
  version: number;
  createdAt: string;
  updatedAt: string;
}

export interface UpdateSensorUnitInput {
  unidad: string;
  expectedVersion?: number;
  expectedUpdatedAt?: string;
}

export interface SensorConflictState {
  status: 409;
  message: string;
}

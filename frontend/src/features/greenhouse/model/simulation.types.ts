export type SimulationEntryScreen = "START_SIMULATOR" | "ACTUATORS" | "EMPTY";

export interface SimulationGreenhouseView {
  greenhouseId: string;
  name: string;
  location: string;
  greenhouseStatus: "AVAILABLE" | "PRODUCTION" | "INACTIVE" | "MAINTENANCE";
  sensors: string[];
  actuators: string[];
}

export interface CropSelectableOption {
  cropId: string;
  name: string;
  cropStatus: "ACTIVE" | "INACTIVE";
}

export interface SimulationEntryResponse {
  entryScreen: SimulationEntryScreen;
  greenhouse: SimulationGreenhouseView | null;
}

export interface SimulationSessionRef {
  sessionId: string;
  greenhouseId: string;
  cropId: string;
  sensorNames?: string[];
  actuatorNames?: string[];
  savedAt?: string; // ISO timestamp when session was stored on this client
}

export interface SimulationActuatorState {
  actuatorKey: string;
  label: string;
  isActive: boolean;
  updatedAt: string;
}

export interface SimulationClimateEventState {
  eventKey: string;
  label: string;
  isActive: boolean;
  updatedAt: string;
}

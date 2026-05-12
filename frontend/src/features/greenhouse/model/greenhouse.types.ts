export interface UserSession {
  id: string;
  email: string;
}

export interface Greenhouse {
  name: string;
  location: string;
  sensors: string[];
  actuators: string[];
}

export interface NumericRange {
  min: string;
  max: string;
}

export interface CropProfile {
  name: string;
  temperature: NumericRange;
  humidity: NumericRange;
  light: NumericRange;
}

export interface NavigationItem {
  label: string;
  path: string;
}

export interface GreenhouseFormErrors {
  name?: string;
  location?: string;
  sensors?: string;
  actuators?: string;
}

export interface CropFormErrors {
  name?: string;
  temperature?: string;
  humidity?: string;
  light?: string;
}

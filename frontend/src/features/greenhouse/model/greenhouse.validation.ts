import type {
  CropFormErrors,
  CropProfile,
  GreenhouseFormErrors,
  Greenhouse,
  NumericRange
} from "./greenhouse.types";

function isBlank(value: string): boolean {
  return !value.trim();
}

function parseNonNegativeNumber(value: string): number | undefined {
  const parsed = Number(value);
  if (Number.isNaN(parsed) || parsed < 0) return undefined;
  return parsed;
}

export function validateRequired(value: string, fieldLabel: string): string | undefined {
  if (isBlank(value)) return `${fieldLabel} es obligatorio`;
  return undefined;
}

export function validateMinLessThanMax(
  minValue: string,
  maxValue: string,
  metricLabel: string
): string | undefined {
  const min = parseNonNegativeNumber(minValue);
  const max = parseNonNegativeNumber(maxValue);

  if (min === undefined || max === undefined) {
    return `${metricLabel}: ingresa valores numericos mayores o iguales a 0`;
  }

  if (min >= max) {
    return `${metricLabel}: el minimo debe ser menor al maximo`;
  }

  return undefined;
}

export function validateGreenhouseForm(greenhouse: Greenhouse): GreenhouseFormErrors {
  return {
    name: validateRequired(greenhouse.name, "Nombre"),
    location: validateRequired(greenhouse.location, "Ubicacion"),
    sensors: greenhouse.sensors.length > 0 ? undefined : "Selecciona al menos 1 sensor",
    actuators: greenhouse.actuators.length > 0 ? undefined : "Selecciona al menos 1 actuador"
  };
}

function validateRange(range: NumericRange, label: string): string | undefined {
  if (isBlank(range.min) || isBlank(range.max)) {
    return `${label}: minimo y maximo son obligatorios`;
  }

  return validateMinLessThanMax(range.min, range.max, label);
}

export function validateCropForm(crop: CropProfile): CropFormErrors {
  return {
    name: validateRequired(crop.name, "Nombre de cosecha"),
    temperature: validateRange(crop.temperature, "Temperatura"),
    humidity: validateRange(crop.humidity, "Humedad"),
    light: validateRange(crop.light, "Luz")
  };
}

import type { PlantingFormData, PlantingFormErrors } from "./planting.types";

function isBlank(value: string): boolean {
  return !value.trim();
}

function isInvalidDateTime(value: string): boolean {
  if (isBlank(value)) return true;
  return Number.isNaN(new Date(value).getTime());
}

export function validatePlantingForm(form: PlantingFormData): PlantingFormErrors {
  const errors: PlantingFormErrors = {};

  if (isBlank(form.greenhouseId)) {
    errors.greenhouseId = "Selecciona un invernadero";
  }

  if (isBlank(form.cropId)) {
    errors.cropId = "Selecciona un cultivo";
  }

  if (isInvalidDateTime(form.plantedAt)) {
    errors.plantedAt = "Fecha de plantado invalida";
  }

  if (form.status === "INACTIVE" && isBlank(form.finishedAt)) {
    errors.finishedAt = "Fecha finalizada es obligatoria cuando estado es Inactivo";
  }

  if (!isBlank(form.finishedAt) && isInvalidDateTime(form.finishedAt)) {
    errors.finishedAt = "Fecha finalizada invalida";
  }

  if (!isBlank(form.plantedAt) && !isBlank(form.finishedAt)) {
    const plantedAt = new Date(form.plantedAt).getTime();
    const finishedAt = new Date(form.finishedAt).getTime();
    if (!Number.isNaN(plantedAt) && !Number.isNaN(finishedAt) && finishedAt < plantedAt) {
      errors.finishedAt = "Fecha finalizada debe ser mayor o igual a fecha de plantado";
    }
  }

  return errors;
}

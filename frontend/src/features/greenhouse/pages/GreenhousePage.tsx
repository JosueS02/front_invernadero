import { FormEvent, useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import type { Greenhouse, GreenhouseFormErrors } from "../model/greenhouse.types";
import { validateGreenhouseForm } from "../model/greenhouse.validation";
import type { ManagementOutletContext } from "../components/ManagementLayout";
import { getUserSession } from "../model/session.store";
import { createGreenhouse } from "../services/greenhouseApi";

const SENSOR_OPTIONS = ["Humedad", "Temperatura", "Luz", "CO2"];
const ACTUATOR_OPTIONS = ["Ventilador", "Riego", "Luz", "Extractores de Aire", "Malla"];
const DEFAULT_GREENHOUSE_STATUS = "ACTIVE";

const SENSOR_ID_BY_LABEL: Record<string, string> = {
  Humedad: "SEN-0001",
  Temperatura: "SEN-0002",
  Luz: "SEN-0003",
  CO2: "SEN-0004"
};

const ACTUATOR_ID_BY_LABEL: Record<string, string> = {
  Ventilador: "ACT-0001",
  Riego: "ACT-0002",
  Luz: "ACT-0003",
  "Extractores de Aire": "ACT-0004",
  Malla: "ACT-0005"
};

function toggleSelection(current: string[], item: string): string[] {
  if (current.includes(item)) {
    return current.filter((value) => value !== item);
  }

  return [...current, item];
}

export function GreenhousePage() {
  const { setHasUnsavedChanges } = useOutletContext<ManagementOutletContext>();
  const session = getUserSession();
  const [form, setForm] = useState<Greenhouse>({
    name: "",
    location: "",
    sensors: [],
    actuators: []
  });
  const [errors, setErrors] = useState<GreenhouseFormErrors>({});
  const [successMessage, setSuccessMessage] = useState("");
  const [apiError, setApiError] = useState("");

  const isDirty =
    form.name.trim().length > 0 ||
    form.location.trim().length > 0 ||
    form.sensors.length > 0 ||
    form.actuators.length > 0;

  useEffect(() => {
    setHasUnsavedChanges(isDirty);
  }, [isDirty, setHasUnsavedChanges]);

  useEffect(() => {
    function onBeforeUnload(event: BeforeUnloadEvent) {
      if (!isDirty) return;
      event.preventDefault();
      event.returnValue = "";
    }

    window.addEventListener("beforeunload", onBeforeUnload);
    return () => window.removeEventListener("beforeunload", onBeforeUnload);
  }, [isDirty]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validateGreenhouseForm(form);
    setErrors(nextErrors);

    if (nextErrors.name || nextErrors.location || nextErrors.sensors || nextErrors.actuators) {
      setSuccessMessage("");
      return;
    }

    if (!session.id) {
      setApiError("Debes iniciar sesion para crear un invernadero.");
      setSuccessMessage("");
      return;
    }

    try {
      setApiError("");
      await createGreenhouse({
        userId: session.id,
        name: form.name,
        location: form.location,
        status: DEFAULT_GREENHOUSE_STATUS,
        sensorIds: form.sensors.map((sensor) => SENSOR_ID_BY_LABEL[sensor]).filter(Boolean),
        actuatorIds: form.actuators.map((actuator) => ACTUATOR_ID_BY_LABEL[actuator]).filter(Boolean)
      });

      setSuccessMessage("Invernadero creado correctamente con estado Disponible.");
      setForm({ name: "", location: "", sensors: [], actuators: [] });
      setErrors({});
      setHasUnsavedChanges(false);
    } catch (error) {
      setSuccessMessage("");
      setApiError(error instanceof Error ? error.message : "No se pudo crear el invernadero");
    }
  }

  return (
    <section className="management-page" aria-label="Pantalla invernadero">
      <form className="management-card form-card" onSubmit={(event) => void handleSubmit(event)} noValidate>
        <h1>Invernadero</h1>

        <label htmlFor="greenhouse-name">Nombre</label>
        <input
          id="greenhouse-name"
          value={form.name}
          onChange={(event) => {
            setSuccessMessage("");
            setForm((current) => ({ ...current, name: event.target.value }));
          }}
          aria-invalid={Boolean(errors.name)}
        />
        {errors.name ? <p className="field-error">{errors.name}</p> : null}

        <label htmlFor="greenhouse-location">Ubicacion</label>
        <input
          id="greenhouse-location"
          value={form.location}
          onChange={(event) => {
            setSuccessMessage("");
            setForm((current) => ({ ...current, location: event.target.value }));
          }}
          aria-invalid={Boolean(errors.location)}
        />
        {errors.location ? <p className="field-error">{errors.location}</p> : null}

        <p><strong>Estado predeterminado:</strong> Disponible</p>

        <fieldset className="checklist-block">
          <legend>Sensores disponibles</legend>
          {SENSOR_OPTIONS.map((sensor) => (
            <label key={sensor} className="checkbox-item">
              <input
                type="checkbox"
                checked={form.sensors.includes(sensor)}
                onChange={() => {
                  setSuccessMessage("");
                  setForm((current) => ({
                    ...current,
                    sensors: toggleSelection(current.sensors, sensor)
                  }));
                }}
              />
              {sensor}
            </label>
          ))}
          {errors.sensors ? <p className="field-error">{errors.sensors}</p> : null}
        </fieldset>

        <fieldset className="checklist-block">
          <legend>Actuadores disponibles</legend>
          {ACTUATOR_OPTIONS.map((actuator) => (
            <label key={actuator} className="checkbox-item">
              <input
                type="checkbox"
                checked={form.actuators.includes(actuator)}
                onChange={() => {
                  setSuccessMessage("");
                  setForm((current) => ({
                    ...current,
                    actuators: toggleSelection(current.actuators, actuator)
                  }));
                }}
              />
              {actuator}
            </label>
          ))}
          {errors.actuators ? <p className="field-error">{errors.actuators}</p> : null}
        </fieldset>

        <button className="primary" type="submit">
          Crear invernadero
        </button>

        {successMessage ? <p className="success-message">{successMessage}</p> : null}
        {apiError ? <p className="field-error">{apiError}</p> : null}
      </form>
    </section>
  );
}

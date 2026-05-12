import { FormEvent, useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import type { CropFormErrors, CropProfile, NumericRange } from "../model/greenhouse.types";
import { validateCropForm } from "../model/greenhouse.validation";
import type { ManagementOutletContext } from "../components/ManagementLayout";
import { getUserSession } from "../model/session.store";
import { createCrop } from "../services/cropApi";

function updateRange(current: NumericRange, key: "min" | "max", value: string): NumericRange {
  return {
    ...current,
    [key]: value
  };
}

export function CropPage() {
  const { setHasUnsavedChanges } = useOutletContext<ManagementOutletContext>();
  const session = getUserSession();
  const [form, setForm] = useState<CropProfile>({
    name: "",
    temperature: { min: "", max: "" },
    humidity: { min: "", max: "" },
    light: { min: "", max: "" }
  });
  const [errors, setErrors] = useState<CropFormErrors>({});
  const [successMessage, setSuccessMessage] = useState("");
  const [apiError, setApiError] = useState("");

  const isDirty = Object.values(form).some((value) => {
    if (typeof value === "string") return value.trim().length > 0;
    return value.min.trim().length > 0 || value.max.trim().length > 0;
  });

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
    const nextErrors = validateCropForm(form);
    setErrors(nextErrors);

    if (nextErrors.name || nextErrors.temperature || nextErrors.humidity || nextErrors.light) {
      setSuccessMessage("");
      return;
    }

    if (!session.id) {
      setApiError("Debes iniciar sesion para guardar una cosecha.");
      setSuccessMessage("");
      return;
    }

    try {
      setApiError("");
      await createCrop({
        userId: session.id,
        name: form.name,
        minTemperature: Number(form.temperature.min),
        maxTemperature: Number(form.temperature.max),
        minHumidity: Number(form.humidity.min),
        maxHumidity: Number(form.humidity.max),
        minSoilMoisture: Number(form.light.min),
        maxSoilMoisture: Number(form.light.max)
      });

      setSuccessMessage("Cosecha configurada correctamente.");
      setForm({
        name: "",
        temperature: { min: "", max: "" },
        humidity: { min: "", max: "" },
        light: { min: "", max: "" }
      });
      setErrors({});
      setHasUnsavedChanges(false);
    } catch (error) {
      setSuccessMessage("");
      setApiError(error instanceof Error ? error.message : "No se pudo guardar la cosecha");
    }
  }

  return (
    <section className="management-page" aria-label="Pantalla cosecha">
      <form className="management-card form-card" onSubmit={(event) => void handleSubmit(event)} noValidate>
        <h1>Cosecha</h1>

        <label htmlFor="crop-name">Nombre de cosecha</label>
        <input
          id="crop-name"
          value={form.name}
          onChange={(event) => {
            setSuccessMessage("");
            setForm((current) => ({ ...current, name: event.target.value }));
          }}
          aria-invalid={Boolean(errors.name)}
        />
        {errors.name ? <p className="field-error">{errors.name}</p> : null}

        <section className="crop-detail" aria-label="Detalle">
          <h2>Detalle</h2>

          <div className="crop-row">
            <div className="crop-field">
              <label htmlFor="humidity-max">Humedad MAX:</label>
              <input
                id="humidity-max"
                inputMode="decimal"
                value={form.humidity.max}
                onChange={(event) => {
                  setSuccessMessage("");
                  setForm((current) => ({
                    ...current,
                    humidity: updateRange(current.humidity, "max", event.target.value)
                  }));
                }}
                aria-invalid={Boolean(errors.humidity)}
              />
            </div>
            <div className="crop-field">
              <label htmlFor="humidity-min">Humedad MIN:</label>
              <input
                id="humidity-min"
                inputMode="decimal"
                value={form.humidity.min}
                onChange={(event) => {
                  setSuccessMessage("");
                  setForm((current) => ({
                    ...current,
                    humidity: updateRange(current.humidity, "min", event.target.value)
                  }));
                }}
                aria-invalid={Boolean(errors.humidity)}
              />
            </div>
          </div>

          <div className="crop-row">
            <div className="crop-field">
              <label htmlFor="light-max">Luminacion MAX:</label>
              <input
                id="light-max"
                inputMode="decimal"
                value={form.light.max}
                onChange={(event) => {
                  setSuccessMessage("");
                  setForm((current) => ({
                    ...current,
                    light: updateRange(current.light, "max", event.target.value)
                  }));
                }}
                aria-invalid={Boolean(errors.light)}
              />
            </div>
            <div className="crop-field">
              <label htmlFor="light-min">Luminacion MIN:</label>
              <input
                id="light-min"
                inputMode="decimal"
                value={form.light.min}
                onChange={(event) => {
                  setSuccessMessage("");
                  setForm((current) => ({
                    ...current,
                    light: updateRange(current.light, "min", event.target.value)
                  }));
                }}
                aria-invalid={Boolean(errors.light)}
              />
            </div>
          </div>

          <div className="crop-row">
            <div className="crop-field">
              <label htmlFor="temperature-max">Temperatura MAX:</label>
              <input
                id="temperature-max"
                inputMode="decimal"
                value={form.temperature.max}
                onChange={(event) => {
                  setSuccessMessage("");
                  setForm((current) => ({
                    ...current,
                    temperature: updateRange(current.temperature, "max", event.target.value)
                  }));
                }}
                aria-invalid={Boolean(errors.temperature)}
              />
            </div>
            <div className="crop-field">
              <label htmlFor="temperature-min">Temperatura MIN:</label>
              <input
                id="temperature-min"
                inputMode="decimal"
                value={form.temperature.min}
                onChange={(event) => {
                  setSuccessMessage("");
                  setForm((current) => ({
                    ...current,
                    temperature: updateRange(current.temperature, "min", event.target.value)
                  }));
                }}
                aria-invalid={Boolean(errors.temperature)}
              />
            </div>
          </div>

          {errors.humidity ? <p className="field-error range-error">{errors.humidity}</p> : null}
          {errors.light ? <p className="field-error range-error">{errors.light}</p> : null}
          {errors.temperature ? <p className="field-error range-error">{errors.temperature}</p> : null}
        </section>

        <button className="primary" type="submit">
          Guardar cosecha
        </button>

        {successMessage ? <p className="success-message">{successMessage}</p> : null}
        {apiError ? <p className="field-error">{apiError}</p> : null}
      </form>
    </section>
  );
}

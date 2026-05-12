import { FormEvent, useEffect, useMemo, useState } from "react";
import { useOutletContext } from "react-router-dom";
import type { ManagementOutletContext } from "../components/ManagementLayout";
import { getUserSession } from "../model/session.store";
import type {
  PlantingApiPayload,
  PlantingApiResponse,
  PlantingFormData,
  PlantingFormErrors,
  PlantingStatus,
  PlantingStatusFilter
} from "../model/planting.types";
import { validatePlantingForm } from "../model/planting.validation";
import { listCropsByUser, type CropApiResponse } from "../services/cropApi";
import { listGreenhousesByUser, type GreenhouseApiResponse } from "../services/greenhouseApi";
import {
  createPlanting,
  deletePlanting,
  listPlantingsByUser,
  updatePlanting
} from "../services/plantingApi";

const INITIAL_FORM: PlantingFormData = {
  greenhouseId: "",
  cropId: "",
  plantedAt: "",
  finishedAt: "",
  status: "ACTIVE"
};

function toLocalDateTimeInput(value: string | null): string {
  if (!value) return "";
  return value.slice(0, 16);
}

function getStatusLabel(status: PlantingStatus): string {
  return status === "ACTIVE" ? "Activo" : "Inactivo";
}

export function PlantingPage() {
  const { setHasUnsavedChanges } = useOutletContext<ManagementOutletContext>();
  const session = getUserSession();

  const [form, setForm] = useState<PlantingFormData>(INITIAL_FORM);
  const [errors, setErrors] = useState<PlantingFormErrors>({});
  const [items, setItems] = useState<PlantingApiResponse[]>([]);
  const [greenhouses, setGreenhouses] = useState<GreenhouseApiResponse[]>([]);
  const [crops, setCrops] = useState<CropApiResponse[]>([]);
  const [statusFilter, setStatusFilter] = useState<PlantingStatusFilter>("ACTIVE");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const isDirty = useMemo(() => {
    return (
      form.greenhouseId !== INITIAL_FORM.greenhouseId ||
      form.cropId !== INITIAL_FORM.cropId ||
      form.plantedAt !== INITIAL_FORM.plantedAt ||
      form.finishedAt !== INITIAL_FORM.finishedAt ||
      form.status !== INITIAL_FORM.status
    );
  }, [form]);

  useEffect(() => {
    setHasUnsavedChanges(isDirty);
  }, [isDirty, setHasUnsavedChanges]);

  useEffect(() => {
    if (!session.id) return;

    let active = true;
    async function loadDependencies() {
      try {
        const [greenhouseItems, cropItems] = await Promise.all([
          listGreenhousesByUser(session.id),
          listCropsByUser(session.id)
        ]);
        if (active) {
          setGreenhouses(greenhouseItems);
          setCrops(cropItems);
        }
      } catch (error) {
        if (active) {
          setApiError(error instanceof Error ? error.message : "No se pudieron cargar las dependencias");
        }
      }
    }

    void loadDependencies();

    return () => {
      active = false;
    };
  }, [session.id]);

  useEffect(() => {
    if (!session.id) {
      setItems([]);
      return;
    }

    let active = true;
    async function loadPlantings() {
      setIsLoading(true);
      setApiError("");
      try {
        const data = await listPlantingsByUser(session.id, statusFilter);
        if (active) {
          setItems(data);
        }
      } catch (error) {
        if (active) {
          setApiError(error instanceof Error ? error.message : "No se pudieron cargar las plantaciones");
        }
      } finally {
        if (active) {
          setIsLoading(false);
        }
      }
    }

    void loadPlantings();

    return () => {
      active = false;
    };
  }, [session.id, statusFilter]);

  function clearForm() {
    setForm(INITIAL_FORM);
    setErrors({});
    setEditingId(null);
    setHasUnsavedChanges(false);
  }

  async function refreshList() {
    if (!session.id) return;
    const data = await listPlantingsByUser(session.id, statusFilter);
    setItems(data);
  }

  function toPayload(nextForm: PlantingFormData): PlantingApiPayload {
    return {
      userId: session.id,
      greenhouseId: nextForm.greenhouseId,
      cropId: nextForm.cropId,
      plantedAt: nextForm.plantedAt,
      finishedAt: nextForm.finishedAt.trim() ? nextForm.finishedAt : null,
      status: nextForm.status
    };
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSuccessMessage("");
    const nextErrors = validatePlantingForm(form);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    if (!session.id) {
      setApiError("Debes iniciar sesion para administrar plantaciones.");
      return;
    }

    try {
      setApiError("");
      const payload = toPayload(form);
      if (editingId) {
        await updatePlanting(editingId, payload);
        setSuccessMessage("Plantacion actualizada correctamente.");
      } else {
        await createPlanting(payload);
        setSuccessMessage("Plantacion creada correctamente.");
      }
      await refreshList();
      clearForm();
    } catch (error) {
      setApiError(error instanceof Error ? error.message : "No se pudo guardar la plantacion");
    }
  }

  function onEdit(item: PlantingApiResponse) {
    setSuccessMessage("");
    setApiError("");
    setEditingId(item.id);
    setForm({
      greenhouseId: item.greenhouseId,
      cropId: item.cropId,
      plantedAt: toLocalDateTimeInput(item.plantedAt),
      finishedAt: toLocalDateTimeInput(item.finishedAt),
      status: item.status
    });
  }

  async function onDelete(item: PlantingApiResponse) {
    const confirmed = window.confirm("Deseas marcar esta plantacion como inactiva?");
    if (!confirmed) return;

    try {
      setApiError("");
      setSuccessMessage("");
      await deletePlanting(item.id);
      await refreshList();
      setSuccessMessage("Plantacion marcada como inactiva.");
    } catch (error) {
      setApiError(error instanceof Error ? error.message : "No se pudo eliminar la plantacion");
    }
  }

  return (
    <section className="management-page" aria-label="Pantalla plantacion">
      <div className="management-card planting-card">
        <h1>Plantacion</h1>

        <form className="form-card" onSubmit={(event) => void handleSubmit(event)} noValidate>
          <div className="planting-grid">
            <div>
              <label htmlFor="planting-greenhouse">Invernadero</label>
              <select
                id="planting-greenhouse"
                value={form.greenhouseId}
                onChange={(event) => {
                  setSuccessMessage("");
                  setForm((current) => ({ ...current, greenhouseId: event.target.value }));
                }}
              >
                <option value="">Selecciona invernadero</option>
                {greenhouses.map((greenhouse) => (
                  <option key={greenhouse.id} value={greenhouse.id}>
                    {greenhouse.name}
                  </option>
                ))}
              </select>
              {errors.greenhouseId ? <p className="field-error">{errors.greenhouseId}</p> : null}
            </div>

            <div>
              <label htmlFor="planting-crop">Cultivo</label>
              <select
                id="planting-crop"
                value={form.cropId}
                onChange={(event) => {
                  setSuccessMessage("");
                  setForm((current) => ({ ...current, cropId: event.target.value }));
                }}
              >
                <option value="">Selecciona cultivo</option>
                {crops.map((crop) => (
                  <option key={crop.id} value={crop.id}>
                    {crop.name}
                  </option>
                ))}
              </select>
              {errors.cropId ? <p className="field-error">{errors.cropId}</p> : null}
            </div>

            <div>
              <label htmlFor="planting-planted-at">Fecha de plantado</label>
              <input
                id="planting-planted-at"
                type="datetime-local"
                value={form.plantedAt}
                onChange={(event) => {
                  setSuccessMessage("");
                  setForm((current) => ({ ...current, plantedAt: event.target.value }));
                }}
              />
              {errors.plantedAt ? <p className="field-error">{errors.plantedAt}</p> : null}
            </div>

            <div>
              <label htmlFor="planting-finished-at">Fecha finalizada</label>
              <input
                id="planting-finished-at"
                type="datetime-local"
                value={form.finishedAt}
                onChange={(event) => {
                  setSuccessMessage("");
                  setForm((current) => ({ ...current, finishedAt: event.target.value }));
                }}
              />
              {errors.finishedAt ? <p className="field-error">{errors.finishedAt}</p> : null}
            </div>

            <div>
              <label htmlFor="planting-status">Estado</label>
              <select
                id="planting-status"
                value={form.status}
                onChange={(event) => {
                  setSuccessMessage("");
                  setForm((current) => ({ ...current, status: event.target.value as PlantingStatus }));
                }}
              >
                <option value="ACTIVE">Activo</option>
                <option value="INACTIVE">Inactivo</option>
              </select>
            </div>
          </div>

          <div className="planting-actions">
            <button className="primary" type="submit">
              {editingId ? "Guardar cambios" : "Crear plantacion"}
            </button>
            {editingId ? (
              <button type="button" className="secondary-action" onClick={clearForm}>
                Cancelar
              </button>
            ) : null}
          </div>

          {successMessage ? <p className="success-message">{successMessage}</p> : null}
          {apiError ? <p className="field-error">{apiError}</p> : null}
        </form>

        <section className="planting-list" aria-label="Listado de plantaciones">
          <div className="planting-list-header">
            <h2>Plantaciones</h2>
            <label htmlFor="planting-filter" className="planting-filter-label">
              Filtro estado
            </label>
            <select
              id="planting-filter"
              value={statusFilter}
              onChange={(event) => setStatusFilter(event.target.value as PlantingStatusFilter)}
            >
              <option value="ACTIVE">Activas</option>
              <option value="INACTIVE">Inactivas</option>
              <option value="ALL">Todas</option>
            </select>
          </div>

          {isLoading ? <p>Cargando plantaciones...</p> : null}
          {!isLoading && items.length === 0 ? <p>No hay plantaciones para este filtro.</p> : null}

          {!isLoading && items.length > 0 ? (
            <table className="planting-table">
              <thead>
                <tr>
                  <th>Invernadero</th>
                  <th>Cultivo</th>
                  <th>Plantado</th>
                  <th>Finalizado</th>
                  <th>Estado</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <tr key={item.id}>
                    <td>{item.greenhouseName}</td>
                    <td>{item.cropName}</td>
                    <td>{toLocalDateTimeInput(item.plantedAt).replace("T", " ")}</td>
                    <td>{item.finishedAt ? toLocalDateTimeInput(item.finishedAt).replace("T", " ") : "-"}</td>
                    <td>{getStatusLabel(item.status)}</td>
                    <td className="planting-table-actions">
                      <button type="button" className="secondary-action" onClick={() => onEdit(item)}>
                        Editar
                      </button>
                      <button type="button" className="secondary-action" onClick={() => void onDelete(item)}>
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : null}
        </section>
      </div>
    </section>
  );
}

import { useEffect, useState } from "react";
import type { SensorCatalogItem } from "../model/sensor-catalog.types";
import { validateSensorUnit } from "../model/sensor-catalog.validation";
import { getSessionRole } from "../model/session.store";
import {
  listSensorCatalog,
  SensorCatalogApiError,
  updateSensorUnit
} from "../services/sensorCatalogApi";

export function SensorCatalogPage() {
  const role = getSessionRole();
  const isAdmin = role.toUpperCase() === "ADMIN" || role.toUpperCase() === "ROLE_ADMIN";

  const [items, setItems] = useState<SensorCatalogItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [unitDraft, setUnitDraft] = useState("");

  useEffect(() => {
    let active = true;

    async function loadCatalog() {
      setIsLoading(true);
      setErrorMessage("");
      setSuccessMessage("");
      try {
        const data = await listSensorCatalog();
        if (active) {
          setItems(data);
        }
      } catch (error) {
        if (active) {
          setErrorMessage(error instanceof Error ? error.message : "No se pudo cargar el catalogo");
        }
      } finally {
        if (active) {
          setIsLoading(false);
        }
      }
    }

    void loadCatalog();

    return () => {
      active = false;
    };
  }, []);

  function startEdit(item: SensorCatalogItem) {
    setSuccessMessage("");
    setErrorMessage("");
    setEditingId(item.id);
    setUnitDraft(item.unidad);
  }

  function cancelEdit() {
    setEditingId(null);
    setUnitDraft("");
  }

  async function saveUnit(item: SensorCatalogItem) {
    const unitError = validateSensorUnit(unitDraft);
    if (unitError) {
      setErrorMessage(unitError);
      return;
    }

    try {
      setIsSaving(true);
      setErrorMessage("");
      setSuccessMessage("");

      const updated = await updateSensorUnit(
        item.id,
        { unidad: unitDraft.trim(), expectedVersion: item.version },
        role
      );

      setItems((current) => current.map((sensor) => (sensor.id === item.id ? updated : sensor)));
      setEditingId(null);
      setUnitDraft("");
      setSuccessMessage("Unidad actualizada correctamente.");
    } catch (error) {
      if (error instanceof SensorCatalogApiError && error.status === 409) {
        setErrorMessage("Otro usuario actualizo este sensor. Recarga y vuelve a intentar.");
        return;
      }

      if (error instanceof SensorCatalogApiError && error.status === 403) {
        setErrorMessage("No tienes permisos para actualizar unidades.");
        return;
      }

      setErrorMessage(error instanceof Error ? error.message : "No se pudo actualizar la unidad");
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <section className="management-page" aria-label="Pantalla catalogo de sensores">
      <div className="management-card sensor-catalog-card">
        <h1>Catalogo de Sensores</h1>

        {!isAdmin ? (
          <p className="sensor-catalog-note">
            Vista de solo lectura. Solo administradores pueden actualizar la unidad de los sensores.
          </p>
        ) : null}

        {isLoading ? <p>Cargando catalogo...</p> : null}
        {errorMessage ? <p className="field-error">{errorMessage}</p> : null}
        {successMessage ? <p className="success-message">{successMessage}</p> : null}

        {!isLoading && !errorMessage && items.length === 0 ? (
          <p>No hay sensores disponibles en el catalogo.</p>
        ) : null}

        {!isLoading && items.length > 0 ? (
          <table className="sensor-catalog-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Codigo</th>
                <th>Nombre</th>
                <th>Unidad</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.codigo}</td>
                  <td>{item.nombre}</td>
                  <td>
                    {editingId === item.id ? (
                      <input
                        className="sensor-unit-input"
                        value={unitDraft}
                        onChange={(event) => setUnitDraft(event.target.value)}
                        aria-label={`Unidad para ${item.nombre}`}
                      />
                    ) : (
                      item.unidad
                    )}
                  </td>
                  <td className="sensor-catalog-actions">
                    {isAdmin && editingId !== item.id ? (
                      <button type="button" className="secondary-action" onClick={() => startEdit(item)}>
                        Editar unidad
                      </button>
                    ) : null}
                    {isAdmin && editingId === item.id ? (
                      <>
                        <button
                          type="button"
                          className="primary sensor-save-button"
                          onClick={() => void saveUnit(item)}
                          disabled={isSaving}
                        >
                          Guardar
                        </button>
                        <button type="button" className="secondary-action" onClick={cancelEdit} disabled={isSaving}>
                          Cancelar
                        </button>
                      </>
                    ) : null}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : null}
      </div>
    </section>
  );
}

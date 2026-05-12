import { useEffect, useState, type CSSProperties } from "react";
import { useNavigate } from "react-router-dom";
import { getSimulationSession, clearSimulationSession } from "../model/simulationSession.store";
import { getSimulationDashboard, exitSimulationSession, type SimulationDashboardSummary } from "../services/simulationApi";
import "../styles/simulation.css";


// 🟢 NUEVO: Importamos las librerías de WebSocket
import { Client } from '@stomp/stompjs';
import * as SockJS from 'sockjs-client';

interface MetricSeries {
  humidity: number[];
  temperature: number[];
  light: number[];
  co2: number[];
}

// 🟢 NOTA: Ya no necesitamos buildPoints ni getMetricSeries 
// porque ahora los datos vendrán en tiempo real desde el servidor.

function toSvgPoints(values: number[], width: number, height: number, padding: number): string {
  const step = (width - padding * 2) / Math.max(1, values.length - 1);
  const max = Math.max(...values);
  const min = Math.min(...values);
  const range = Math.max(1, max - min);

  return values
    .map((value, index) => {
      const x = padding + index * step;
      const y = padding + ((max - value) / range) * (height - padding * 2);
      return `${x},${y}`;
    })
    .join(" ");
}

function toAreaPath(values: number[], width: number, height: number, padding: number): string {
  const step = (width - padding * 2) / Math.max(1, values.length - 1);
  const max = Math.max(...values);
  const min = Math.min(...values);
  const range = Math.max(1, max - min);

  const points = values.map((value, index) => {
    const x = padding + index * step;
    const y = padding + ((max - value) / range) * (height - padding * 2);
    return { x, y };
  });

  const start = points[0];
  const linePath = points.map((point) => `L ${point.x} ${point.y}`).join(" ");
  return `M ${start.x} ${height - padding} ${linePath} L ${points[points.length - 1].x} ${height - padding} Z`;
}

export function SimulationDashboardPage() {
  const navigate = useNavigate();
  const [summary, setSummary] = useState<SimulationDashboardSummary | null>(null);
  const [error, setError] = useState("");
  const [finalizeError, setFinalizeError] = useState("");
  const [finalizing, setFinalizing] = useState(false);

  // 🟢 NUEVO: Estado para almacenar el historial de lecturas en tiempo real
  // Inicializamos con 8 valores base para que las gráficas no se vean vacías al inicio.
  const [realTimeData, setRealTimeData] = useState<MetricSeries>({
    humidity: Array(8).fill(50),      // 50% inicial
    temperature: Array(8).fill(20),   // 20°C inicial
    light: Array(8).fill(200),        // 200 lux inicial
    co2: Array(8).fill(400)           // 400 ppm inicial
  });

  // Efecto 1: Carga de metadatos (Se mantiene igual)
  useEffect(() => {
    async function load() {
      const session = getSimulationSession();
      if (!session) {
        navigate("/simulacion/inicio", { replace: true });
        return;
      }

      try {
        if (session.sessionId.startsWith("local-")) {
          setSummary({
            sessionId: session.sessionId,
            activeActuatorCount: 0,
            activeClimateEventCount: 0,
            greenhouseName: "Invernadero en simulacion",
            selectedCropName: "Cosecha seleccionada",
            lastUpdatedAt: new Date().toISOString()
          });
          setError("");
          return;
        }

        const data = await getSimulationDashboard(session.sessionId);
        setSummary(data);
        setError("");
      } catch (loadError) {
        setError(loadError instanceof Error ? loadError.message : "No se pudo cargar dashboard");
      }
    }

    void load();
  }, [navigate]);

  // 🟢 NUEVO: Efecto 2 - Conexión WebSocket a Spring Boot
  useEffect(() => {
    // Definimos la URL de tu servidor WebSockets (Ajustada si usas .env)
    const socketUrl = import.meta.env.VITE_API_URL 
      ? import.meta.env.VITE_API_URL.replace('/api', '') + '/ws-invernadero'
      : 'http://localhost:8080/ws-invernadero';

const socket = new (SockJS as any)(socketUrl);
    const stompClient = new Client({
      webSocketFactory: () => socket,
      onConnect: () => {
        console.log('🔌 ¡Conectado al servidor WebSocket en tiempo real!');
        
        // Nos suscribimos al canal de telemetría de Sensores
        stompClient.subscribe('/topic/sensores', (mensaje) => {
          const lectura = JSON.parse(mensaje.body);
          // lectura = { sensorId, tipoSensor, valor, unidad, timestamp }
          
          setRealTimeData((prev) => {
            const newData = { ...prev };
            const tipo = lectura.tipoSensor.toUpperCase();
            
            // Actualizamos la gráfica correspondiente desplazando los valores a la izquierda (como un electrocardiograma)
            if (tipo === 'HUMEDAD') {
              newData.humidity = [...prev.humidity.slice(1), Math.max(0, Math.round(lectura.valor * 10) / 10)];
            } else if (tipo === 'TEMPERATURA') {
              newData.temperature = [...prev.temperature.slice(1), Math.max(0, Math.round(lectura.valor * 10) / 10)];
            } else if (tipo === 'LUZ') {
              newData.light = [...prev.light.slice(1), Math.max(0, Math.round(lectura.valor))];
            } else if (tipo === 'CO2') {
              newData.co2 = [...prev.co2.slice(1), Math.max(0, Math.round(lectura.valor))];
            }
            
            return newData;
          });
        });
      },
      onStompError: (frame) => {
        console.error('Error de Broker: ' + frame.headers['message']);
      },
    });

    stompClient.activate();

    // Desconectar cuando salgamos de la pantalla
    return () => {
      stompClient.deactivate();
      console.log('🔌 Desconectado del servidor WebSocket');
    };
  }, []);

  // 🟢 NUEVO: Ahora 'series' usa el estado realTimeData en lugar de la función fake
  const series = realTimeData;
  const session = getSimulationSession();
  const assignedSensors = new Set((session?.sensorNames ?? []).map((name) => name.trim().toLowerCase()));
  const hasAssignedSensors = assignedSensors.size > 0;

  const showHumidity = !hasAssignedSensors || assignedSensors.has("humedad");
  const showTemperature = !hasAssignedSensors || assignedSensors.has("temperatura");
  const showLight = !hasAssignedSensors || assignedSensors.has("luz");
  const showCo2 = !hasAssignedSensors || assignedSensors.has("co2");
  
  const humidityValue = series.humidity[series.humidity.length - 1];
  const temperatureValue = series.temperature[series.temperature.length - 1];
  const lightValue = series.light[series.light.length - 1];
  const co2Value = series.co2[series.co2.length - 1];

  const humidityPercent = Math.max(0, Math.min(100, humidityValue));
  const temperaturePercent = Math.max(0, Math.min(100, (temperatureValue / 40) * 100));
  const lightPercent = Math.max(0, Math.min(100, (lightValue / 800) * 100));

  const co2Width = 520;
  const co2Height = 130;
  const co2Padding = 8;
  const co2Points = toSvgPoints(series.co2, co2Width, co2Height, co2Padding);
  const co2AreaPath = toAreaPath(series.co2, co2Width, co2Height, co2Padding);
  const co2TrendUp = co2Value >= (series.co2[series.co2.length - 2] ?? co2Value);

  return (
    <section className="management-page" aria-label="Simulacion - Dashboard">
      <div className="management-card simulation-card simulation-dashboard-card">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12 }}>
          <h1>Simulacion - Dashboard</h1>
          <div>
            <button
              type="button"
              className="secondary-action"
              disabled={finalizing}
              onClick={async () => {
                const session = getSimulationSession();
                setFinalizeError("");
                if (!session) {
                  setFinalizeError("No hay una simulacion activa para finalizar.");
                  return;
                }
                if (session.sessionId.startsWith("local-")) {
                  setFinalizeError("No se puede finalizar porque la simulacion no esta registrada en el servidor.");
                  return;
                }

                try {
                  setFinalizing(true);
                  await exitSimulationSession(session.sessionId);
                  clearSimulationSession();
                  navigate("/inicio");
                } catch {
                  setFinalizeError("No se pudo finalizar la simulacion. Intenta de nuevo.");
                } finally {
                  setFinalizing(false);
                }
              }}
            >
              Finalizar simulacion
            </button>
          </div>
        </div>

        <div className="simulation-dashboard-meta" aria-label="Resumen de simulacion">
          <p><strong>Invernadero:</strong> {summary?.greenhouseName ?? "-"}</p>
          <p><strong>Cosecha:</strong> {summary?.selectedCropName ?? "-"}</p>
          <p><strong>Actuadores activos:</strong> {summary?.activeActuatorCount ?? 0}</p>
          <p><strong>Eventos activos:</strong> {summary?.activeClimateEventCount ?? 0}</p>
        </div>

        <div className="dashboard-chart-grid" role="list" aria-label="Graficas de monitoreo ambiental">
          {showHumidity ? <article
            role="listitem"
            className="dashboard-chart-card chart-humidity"
            style={{ background: "linear-gradient(135deg, #ebfff4 0%, #f5fffd 100%)" } as CSSProperties}
          >
            <header className="dashboard-chart-header">
              <h2>Humedad</h2>
            </header>

            <div className="humidity-pie-wrap">
              <div
                className="humidity-pie"
                aria-label="Grafica de pastel de humedad"
                style={{
                  background: `conic-gradient(#1a9f6b 0deg ${humidityPercent * 3.6}deg, #d3e8da ${humidityPercent * 3.6}deg 360deg)`
                } as CSSProperties}
              >
                <div className="humidity-pie-inner">
                  <strong>{humidityPercent.toFixed(0)}%</strong>
                  <span>{humidityValue.toFixed(1)} %HR</span>
                </div>
              </div>
            </div>
          </article> : null}

          {showTemperature ? <article
            role="listitem"
            className="dashboard-chart-card chart-temperature"
            style={{ background: "linear-gradient(135deg, #fff3ec 0%, #fffaf2 100%)" } as CSSProperties}
          >
            <header className="dashboard-chart-header">
              <h2>Temperatura</h2>
            </header>

            <div className="thermometer-wrap" aria-label="Grafica tipo termometro de temperatura">
              <div className="thermometer-stem">
                <span
                  className="thermometer-fill"
                  style={{ height: `${temperaturePercent}%` } as CSSProperties}
                />
              </div>
              <p className="dashboard-chart-value">
                {temperatureValue.toFixed(1)}
                <span>°C</span>
              </p>
            </div>
          </article> : null}

          {showLight ? <article
            role="listitem"
            className="dashboard-chart-card chart-light"
            style={{ background: "linear-gradient(135deg, #fffbe8 0%, #fffef2 100%)" } as CSSProperties}
          >
            <header className="dashboard-chart-header">
              <h2>Luz</h2>
            </header>

            <div className="light-widget" aria-label="Indicador de luz con relleno">
              <div className="light-sun">
                <div className="light-sun-rays" aria-hidden="true" />
                <div className="light-sun-core">
                  <span
                    className="light-sun-fill"
                    style={{ height: `${lightPercent}%` } as CSSProperties}
                  />
                  <span className="light-sun-icon" aria-hidden="true">☀</span>
                </div>
              </div>
              <p className="dashboard-chart-value">
                {Math.round(lightValue)}
                <span>lux</span>
              </p>
            </div>
          </article> : null}

          {showCo2 ? <article
            role="listitem"
            className="dashboard-chart-card chart-co2-long"
            style={{ background: "linear-gradient(135deg, #edf4ff 0%, #f7faff 100%)" } as CSSProperties}
          >
            <header className="dashboard-chart-header">
              <h2>CO2</h2>
              <p className={co2TrendUp ? "trend-up" : "trend-down"}>{co2TrendUp ? "Subiendo" : "Bajando"}</p>
            </header>

            <p className="dashboard-chart-value">
              {Math.round(co2Value)}
              <span>ppm</span>
            </p>

            <svg viewBox={`0 0 ${co2Width} ${co2Height}`} className="dashboard-chart-svg dashboard-chart-svg-long" aria-label="Grafica de CO2">
              <defs>
                <linearGradient id="fill-co2-long" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#3867e8" stopOpacity="0.42" />
                  <stop offset="100%" stopColor="#3867e8" stopOpacity="0.04" />
                </linearGradient>
              </defs>
              <path d={co2AreaPath} fill="url(#fill-co2-long)" />
              <polyline points={co2Points} fill="none" stroke="#3867e8" strokeWidth="3" strokeLinecap="round" />
            </svg>
          </article> : null}

          {!showHumidity && !showTemperature && !showLight && !showCo2 ? (
            <article role="listitem" className="dashboard-chart-card">
              <header className="dashboard-chart-header">
                <h2>Sin sensores asignados</h2>
              </header>
              <p className="dashboard-chart-value">No hay graficas disponibles para este invernadero.</p>
            </article>
          ) : null}
        </div>

        {finalizeError ? <p className="field-error">{finalizeError}</p> : null}
        {error ? <p className="field-error">{error}</p> : null}
      </div>
    </section>
  );
}
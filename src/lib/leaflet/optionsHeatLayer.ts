import type { HeatMapOptions } from "leaflet";

/**
 * Configuración optimizada para Leaflet HeatLayer.
 * Mantiene la privacidad de los puntos y suaviza las transiciones visuales en escala de grises.
 */
const optionsHeatLayer: HeatMapOptions = {
  radius: 25,
  blur: 15,
  maxZoom: 8,
  max: 1.0,          // Fijamos que 1.0 (6 horas) sea el tope del color
  minOpacity: 0.25,  // Hace visible el reporte de 1 hora aunque esté aislado

  // Paleta de degradado en escala de grises (de menos horas a más horas sin luz)
  gradient: {
    0.16: '#e0e0e0', // 1 Hora: Gris muy claro (Afectación inicial)
    0.33: '#b5b5b5', // 2 Horas: Gris claro
    0.50: '#8e8e8e', // 3 Horas: Gris medio
    0.66: '#666666', // 4 Horas: Gris oscuro
    0.83: '#3a3a3a', // 5 Horas: Gris carbón
    1.00: '#1a1a1a'  // 6 Horas o más: Negro / Gris extremo (Zona crítica)
  }
};

export default optionsHeatLayer;

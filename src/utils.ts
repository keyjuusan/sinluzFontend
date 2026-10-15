import type { ReporteType } from "./types";

export function extraerCoordenadas(reportes: ReporteType[]) {
  // 2. Mapeamos calculando la intensidad basada en el tiempo sin luz
  return reportes.map((reporte) => {
    // NOTA: Asegúrate de cambiar 'horasSinLuz' por el nombre exacto de la propiedad en tu 'ReporteType'
    const horas = reporte.horas_duracion || 1;

    // Limitamos entre 1 y la cantidad critica de horas, luego dividimos entre la cantidad critica de horas para obtener el rango (0.16 a 1.0)
    const HORA_CRITICA = 7;
    const intensidad =
      Math.max(1, Math.min(HORA_CRITICA, horas)) / HORA_CRITICA;
    // console.log(intensidad)

    return [reporte.lat, reporte.lng, intensidad] as [
      number,
      number,
      number,
    ];
  });
}
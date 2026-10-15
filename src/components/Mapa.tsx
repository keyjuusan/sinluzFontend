// import { ModernHeatmapLayer } from "@/components/ModernHeatmapLayer";
// import InfoClickMap from "./InfoClickMap";
import LeafletMap from "./LeafletMap";
import { ModernHeatmapLayer } from "./ModernHeatmapLayer";
// import { mockReportes } from "@/mocks";

// const simulacionGetReportes = new Promise<ReporteType[]>((resolve, reject) => {
//   setTimeout(() => {
//     resolve(mockReportes);
//   }, 1000);
// });

export default function Mapa({coordenadasReportes}:{coordenadasReportes:[number, number, number?][]}) {


  return (
    <LeafletMap>
      {/*<InfoClickMap />*/}
      {/* @ts-ignore */}
      <ModernHeatmapLayer points={coordenadasReportes} />
    </LeafletMap>
  );
}

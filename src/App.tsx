import React, { useEffect, useState } from "react";
const Mapa = React.lazy(() => import("./components/Mapa"));

import Menu from "./components/Menu";
import ControlFlotante from "./components/ControlFlotante";
import type { ReporteResponseType } from "./types";
import { miApi } from "./lib/axios/api";
import { extraerCoordenadas } from "./utils";

function App() {
  const [verMapa, setVerMapa] = useState(false);

  // 1. Modificamos el tipo del estado para soportar [lat, lng, intensidad?]
  const [coordenadasReportes, setCoordenadasReportes] =
    useState<[number, number, number?][]>([]);
  useEffect(() => {
    miApi
      .get<ReporteResponseType>("/reportes")
      .then(({ data: { reportes } }) => {
        setCoordenadasReportes(extraerCoordenadas(reportes));
      });
  }, []);

  function handleClickBtnVolver() {
    setVerMapa(false);
  }

  return (
    <div className="h-dvh w-dvw relative">
      {verMapa ? <Mapa coordenadasReportes={coordenadasReportes}/> : <Menu setVerMapa={setVerMapa} />}
      {/* Botón flotante para regresar al menú oscuro (opcional, por si quieres probar) */}
      {verMapa && (
        <ControlFlotante handleClickBtnVolver={handleClickBtnVolver} setCoordenadasReportes={ setCoordenadasReportes} />
      )}
      {/*<span className="absolute bottom-0 z-10 bg-gray-700 text-amber-50 w-full text-center">
        ... sin conexión ...
      </span>*/}
    </div>
  );
}

export default App;
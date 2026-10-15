import { miApi } from "@/lib/axios/api";
import type { ReporteResponseType, ReporteType } from "@/types";
import { extraerCoordenadas } from "@/utils";
import { useEffect, useState } from "react";

interface Props {
  handleClickBtnVolver: () => void;
  setCoordenadasReportes: (coordenadas: [number, number, number?][]) => void;
}

const horaActual = new Date().getHours().toString();

export default function ControlFlotante({
  handleClickBtnVolver,
  setCoordenadasReportes,
}: Props) {
  const [filtroHora, setFiltroHora] = useState<string>(horaActual);

  useEffect(() => {
    miApi
      .get<ReporteResponseType>("/reportes", { params: {hora:filtroHora} })
      .then(({ data: { reportes } }) => {
        setCoordenadasReportes(extraerCoordenadas(reportes));
      });
  }, [filtroHora]);

  return (
    <>
      <button
        onClick={() => handleClickBtnVolver()}
        className="absolute top-4 right-4 bg-gray-900 text-white p-2 rounded shadow-md"
      >
        Volver
      </button>
      <label className="absolute bottom-0 left-1/2 right-1/2 -translate-x-1/2 w-8/10 py-4 flex flex-col items-center" >
        <p className="text-gray-950 w-fit">{filtroHora}:00 - { Number(filtroHora) == 23 ? 0:Number(filtroHora)+1}:00</p>
      <input
        type="range"
        step="1"
        min="0"
        max="23"
        onChange={(e) => setFiltroHora(e.target.value)}
        value={filtroHora}
        className=" w-full"
      />
      </label>
    </>
  );
}

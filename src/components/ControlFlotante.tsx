import { miApi } from "@/lib/axios/api";
import type { ReporteResponseType } from "@/types";
import { extraerCoordenadas } from "@/utils";
import { useEffect, useState } from "react";
import moment from "moment";
import { Ripple } from "./loading-ui/ripple";

interface Props {
  handleClickBtnVolver: () => void;
  setCoordenadasReportes: (coordenadas: [number, number, number?][]) => void;
}

const horaActual = new Date().getHours().toString();
const fechaActual = moment().format("YYYY-MM-DD");

export default function ControlFlotante({
  handleClickBtnVolver,
  setCoordenadasReportes,
}: Props) {
  const [filtroHora, setFiltroHora] = useState<string>(horaActual);
  const [filtroFecha, setFiltroFecha] = useState<string>(fechaActual);
  const [loading,setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    miApi
      .get<ReporteResponseType>("/reportes", { params: { hora: filtroHora,dia: filtroFecha } })
      .then(({ data: { reportes } }) => {
        setCoordenadasReportes(extraerCoordenadas(reportes));
      }).finally(()=>setLoading(false));
  }, [filtroHora,filtroFecha]);

  return (
    <>
      {loading?<Ripple className="size-10 text-center absolute stroke-blue-600 top-0 left-0 m-4" />:null}
      <button
        onClick={() => handleClickBtnVolver()}
        className="absolute top-4 right-4 bg-gray-900 text-white p-2 rounded shadow-md"
      >
        Volver
      </button>
      <label className="absolute bottom-0 left-1/2 right-1/2 -translate-x-1/2 w-8/10 py-4 flex flex-col items-center">
        <p className="text-gray-950 w-fit">
          {filtroHora}:00 -{" "}
          {Number(filtroHora) == 23 ? 0 : Number(filtroHora) + 1}:00
        </p>
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
      <label className="absolute top-0 left-1/2 -translate-x-1/2 text-gray-950 border mt-4 ">
        <input
          type="date"
          value={filtroFecha}
          onChange={(e) => setFiltroFecha(e.target.value)}
          className="bg-amber-50 p-2 outline-0 rounded"
        />
      </label>
    </>
  );
}

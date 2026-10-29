import BtnReportar from "./BtnReportar";
import {Toaster} from "react-hot-toast"

export default function Menu({ setVerMapa }:{setVerMapa:(bool:boolean)=>void}) {
  return (
    <div className="bg-gray-950 w-full h-full absolute top-0 justify-center flex items-center flex-col gap-10">
      <div className="flex flex-col gap-2">
        <h1 className="text-6xl text-blue-600">Venezuela</h1>
      <h2 className="text-4xl">¿Se te fue la luz?</h2>
</div>
      <div className="flex flex-col gap-4 w-4/10">
        <BtnReportar
          className="w-full"
          reporte={{
            id_usuario: "dispositiv",
            lat: 10.163560279490476,
            lng: -69.35668945312501,
            horas_duracion: 6,
          }}
        />
        <button
          onClick={() => setVerMapa(true)}
          className=" bg-white text-black p-2 rounded w-full"
        >
          Ver Reportes
        </button>
      </div>
      <Toaster/>
    </div>
  );
}

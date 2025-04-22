import { typeColors } from "@/helpers/color";
import { Pokemon } from "@/types/types";
import Image from "next/image";

export default function PokeCard({ name, image, id, types, onClick}: Pokemon) {
  const type = types[0];
  const bgColor = typeColors[type] || "#F5F5F5";

  return (
    <div
    onClick={onClick}
    className="cursor-pointer rounded-lg shadow-md bg-white p-4 hover:shadow-lg transition"
    style={{ backgroundColor: bgColor }}
  >
    <div className="rounded-2xl shadow-md p-4 text-center relative transition-transform hover:scale-105 bg-white" >
      <span className="absolute top-2 right-2 text-sm font-semibold text-gray-600">#{id}</span>
      <Image src={image} alt={name} height={100} width={100} className="w-24 h-24 mx-auto" />
      <h2 className="text-xl font-bold capitalize mt-2">{name}</h2>
      <div className="flex justify-center gap-2 mt-2 flex-wrap">
        {types.map((t) => (
          <span key={t} className="text-xs font-semibold px-3 py-1 rounded-full capitalize shadow-sm border border-neutral-950" style={{ backgroundColor: typeColors[t] || "#E0E0E0" }}>
            {t}
          </span>
        ))}
      </div>
    </div>
    </div>
  );
}

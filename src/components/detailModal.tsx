"use client";
import { typeColors } from "@/helpers/color";
import { PokemonDetails, PokemonEvo, PokemonStat } from "@/types/types";
import { Dialog, DialogContent, DialogTitle, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Image from "next/image";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  pokemon: PokemonDetails | null;
}

export default function PokemonDetailModal({ isOpen, onClose, pokemon }: Props) {
  if (!pokemon) return null;

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogContent className="max-w-xl relative">
        <IconButton onClick={onClose} className="absolute top-3 left-2">
          <CloseIcon />
        </IconButton>

        <DialogTitle className="text-xl font-bold text-center">
          #{pokemon.id} {pokemon.name}
        </DialogTitle>

        <div className="flex flex-col items-center gap-4">
          <Image src={pokemon.images} alt={pokemon.name} width={120} height={120} className="object-contain" />
          <p className="text-sm text-gray-500 text-center max-w-sm">{pokemon.description}</p>

          <div className="flex gap-2">
            {pokemon.types.map((type) => (
              <span
              key={type}
              className={`text-black px-2 py-1 rounded-full text-sm border`}
              style={{ backgroundColor: typeColors[type] || "#666" }}
            >
              {type}
            </span>
            
            ))}
          </div>

          <div className="grid grid-cols-2 gap-x-4 text-sm mt-3 border p-3 rounded-lg">
            <div className="space-y-1">
              {[
                { label: "Height", value: pokemon.height },
                { label: "Weight", value: pokemon.weight },
                { label: "Habitat", value: pokemon.habitat },
              ].map((item) => (
                <div key={item.label} className="grid grid-cols-[80px_auto]">
                  <span className="font-semibold">{item.label}</span>
                  <span>: {item.value}</span>
                </div>
              ))}
            </div>

            <div className="space-y-1">
              {[
                { label: "Abilities", value: pokemon.abilities.join(", ") },
                { label: "Color", value: pokemon.color },
                { label: "Shape", value: pokemon.shape },
              ].map((item) => (
                <div key={item.label} className="grid grid-cols-[80px_auto]">
                  <span className="font-semibold">{item.label}</span>
                  <span>: {item.value}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="w-full mt-4 border p-3 rounded-lg">
            <p className="font-semibold text-center mb-2">Stats</p>
            <div className="space-y-1">
              {pokemon.stats.map((s: PokemonStat) => (
                <div key={s.name} className="flex justify-between text-sm">
                  <span>{s.name}</span>
                  <span>{s.base_stat}</span>
                </div>
              ))}
            </div>
          </div>

          {pokemon.evolutions?.length > 0 && (
            <div className="w-full mt-4 border p-3 rounded-lg">
              <p className="font-semibold text-center mb-2">Evolutions</p>
              <div className="flex justify-center gap-7 flex-wrap">
                {pokemon.evolutions.map((evo: PokemonEvo) => (
                  <div key={evo.id} className="flex flex-col items-center">
                    <Image src={evo.image} alt={evo.name} width={60} height={60} />
                    <p className="text-sm font-medium">
                      #{evo.id} {evo.name}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

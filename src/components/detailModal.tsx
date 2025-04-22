"use client";
import { typeColors } from "@/helpers/color";
import { PokemonDetails, PokemonEvo, PokemonStat } from "@/types/types";
import { Dialog, DialogContent, DialogTitle } from "@mui/material";
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
      <DialogContent className="max-w-xl">
        <DialogTitle className="text-xl font-bold text-center">
          #{pokemon.id} {pokemon.name}
        </DialogTitle>

        <div className="flex flex-col items-center gap-4">
          <Image src={pokemon.images} alt={pokemon.name} width={120} height={120} className="object-contain" />
          <p className="text-sm text-gray-500 text-center max-w-sm">{pokemon.description}</p>

          <div className="flex gap-2">
            {pokemon.types.map((type: string) => (
             <span key={type} className={`text-white px-2 py-1 rounded-full text-xs ${typeColors[type]}`}>
             {type}
           </span>
            ))}
          </div>

          <div className="grid grid-cols-2 w-full text-sm mt-4">
            <div>
              <p>
                <strong>Height:</strong> {pokemon.height}
              </p>
              <p>
                <strong>Weight:</strong> {pokemon.weight}
              </p>
              <p>
                <strong>Habitat:</strong> {pokemon.habitat}
              </p>
            </div>
            <div>
              <p>
                <strong>Abilities:</strong> {pokemon.abilities.join(", ")}
              </p>
              <p>
                <strong>Color:</strong> {pokemon.color}
              </p>
              <p>
                <strong>Shape:</strong> {pokemon.shape}
              </p>
            </div>
          </div>

          <div className="w-full mt-4">
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
            <div className="w-full mt-4">
              <p className="font-semibold text-center mb-2">Evolutions</p>
              <div className="flex justify-center gap-7">
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

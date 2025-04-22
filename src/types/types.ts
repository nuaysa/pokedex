export interface Pokemon {
  id: number;
  name: string;
  image: string;
  types: string[];
  onClick?: () => void;
}

export interface PokemonDetails {
  id: number;
  name: string;
  images: string;
  types: string[];
  abilities: string[];
  height: number;
  weight: number;
  description: string;
  habitat: string;
  color: string;
  shape: string;
  stats: PokemonStat[];
  evolutions: PokemonEvo[];
}

export interface PokemonStat {
  name: string;
  base_stat: number;
}

export interface PokemonEvo {
  id: number;
  name: string;
  image: string;
}

export interface EvolutionChain {
  species: { name: string; url: string };
  evolves_to: EvolutionChain[];
}
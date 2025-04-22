
export interface Pokemon {
  id: number;
  name: string;
  image: string;
  types: string[];
  onClick?: () => void; 
}

export interface PokemonDetails{
    id: number
    name: string,
    images: string,
    types: string[],
    abilities: string[],
    height: number,
    weight: number,
    description: string,
    habitat: string,
    color: string,
    shape: string
    stats: { name: string; base_stat: number }[];
    evolutions: { id: number; name: string; image: string }[];
}
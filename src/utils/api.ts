const BASE_URL = "https://pokeapi.co/api/v2";

export const fetchPokemonDetails = async (limit = 20, offset = 0, selectedType?: string, selectedAbility?: string) => {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`);
    const data = await res.json();
  
    const promises = data.results.map(async (pokemon: { name: string; url: string }) => {
      const res = await fetch(pokemon.url);
      const detail = await res.json();
  
      const types = detail.types.map((t: any) => t.type.name);
      const abilities = detail.abilities.map((a: any) => a.ability.name);
  
      return {
        id: detail.id,
        name: detail.name,
        images: detail.sprites.other["official-artwork"].front_default,
        types,
        abilities,
      };
    });
  
    const detailedData = await Promise.all(promises);
  
    let filtered = detailedData;
    if (selectedType) {
      filtered = filtered.filter((p) => p.types.includes(selectedType));
    }
    if (selectedAbility) {
      filtered = filtered.filter((p) => p.abilities.includes(selectedAbility));
    }
  
    return filtered;
  };

  
  export const fetchPokemonDetailByName = async (name: string) => {
    const res = await fetch(`${BASE_URL}/pokemon/${name}`);
    const detail = await res.json();
  
    const speciesRes = await fetch(detail.species.url);
    const speciesData = await speciesRes.json();
  
    const evolutionRes = await fetch(speciesData.evolution_chain.url);
    const evolutionData = await evolutionRes.json();
  
    const types = detail.types.map((t: any) => t.type.name);
    const abilities = detail.abilities.map((a: any) => a.ability.name);
  
    const stats = detail.stats.map((s: any) => ({
      name: s.stat.name,
      base_stat: s.base_stat,
    }));
  
    const descriptionEntry = speciesData.flavor_text_entries.find(
      (entry: any) => entry.language.name === "en"
    );
  
    const description = descriptionEntry ? descriptionEntry.flavor_text.replace(/\f|\n/g, ' ') : "No description available.";
  
    const evolutions: any[] = [];
  
    const traverseEvolutions = (evoData: any) => {
      if (!evoData) return;
      const evoName = evoData.species.name;
      const evoId = evoData.species.url.split("/").filter(Boolean).pop();
      const image = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${evoId}.png`;
      evolutions.push({ id: evoId, name: evoName, image });
      if (evoData.evolves_to.length > 0) {
        traverseEvolutions(evoData.evolves_to[0]);
      }
    };
  
    traverseEvolutions(evolutionData.chain);
  
    return {
      id: detail.id,
      name: detail.name,
      images: detail.sprites.other["official-artwork"].front_default,
      types,
      abilities,
      stats,
      height: detail.height,
      weight: detail.weight,
      description,
      habitat: speciesData.habitat?.name ?? "Unknown",
      color: speciesData.color?.name ?? "Unknown",
      shape: speciesData.shape?.name ?? "Unknown",
      evolutions,
    };
  };
  
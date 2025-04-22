"use client";

import { fetchPokemonDetailByName, fetchPokemonDetails } from "@/utils/api";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import PokeCard from "./pokeCard";
import { PokemonDetails } from "@/types/types";
import PokemonDetailModal from "./detailModal";

interface ScrollProps {
  selectedType: string;
  selectedAbility: string;
  searchQuery: string;
}

export default function Scroll({ selectedType, selectedAbility, searchQuery }: ScrollProps) {
  const [allPokemons, setAllPokemons] = useState<any[]>([]);
  const [displayedPokemons, setDisplayedPokemons] = useState<any[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [offset, setOffset] = useState(0);
  const [selectedPokemon, setSelectedPokemon] = useState<PokemonDetails | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [pokemonList, setPokemonList] = useState<{ name: string; url: string }[]>([]);
  const LIMIT = 20;

  const handleCardClick = async (name: string) => {
    const details = await fetchPokemonDetailByName(name);
    setSelectedPokemon(details);
    setModalOpen(true);
  };

  const loadPokemons = async (customOffset = offset) => {
    const newData = await fetchPokemonDetails(LIMIT, customOffset, selectedType, selectedAbility);
    const merged = [...allPokemons, ...newData];
    const unique = merged.filter((pokemon, index, self) => index === self.findIndex((p) => p.id === pokemon.id));
    setAllPokemons(unique);
    setOffset((prev) => prev + LIMIT);
    if (newData.length < LIMIT) setHasMore(false);
  };
  useEffect(() => {
    const fetchAllPokemonNames = async () => {
      const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=1000");
      const data = await res.json();
      setPokemonList(data.results);
    };
    fetchAllPokemonNames();
  }, []);
  const applyFilter = () => {
    let filtered = allPokemons;

    if (selectedType) {
      filtered = filtered.filter((pokemon) => pokemon.types.includes(selectedType));
    }

    if (selectedAbility) {
      filtered = filtered.filter((pokemon) => pokemon.abilities.includes(selectedAbility));
    }

    if (searchQuery.trim() !== "") {
      filtered = filtered.filter((pokemon) => pokemon.name.toLowerCase().includes(searchQuery.toLowerCase()));
    }

    setDisplayedPokemons(filtered);

    if (filtered.length === 0 && offset >= 1000) {
      setHasMore(false);
    }
  };

  useEffect(() => {
    loadPokemons();
  }, []);

  useEffect(() => {
    setAllPokemons([]);
    setDisplayedPokemons([]);
    setOffset(0);
    setHasMore(true);
    loadPokemons(0);
  }, [selectedType, selectedAbility]);

  useEffect(() => {
    applyFilter();
  }, [searchQuery, allPokemons, selectedType, selectedAbility]);

  useEffect(() => {
    const globalSearch = async () => {
      if (!searchQuery.trim()) {
        applyFilter();
        setHasMore(true);
        return;
      }

      const filteredList = pokemonList.filter((pokemon) => pokemon.name.toLowerCase().includes(searchQuery.toLowerCase()));

      const details = await Promise.all(filteredList.slice(0, 20).map((p) => fetchPokemonDetailByName(p.name)));

      setDisplayedPokemons(details);
      setHasMore(false);
    };
    if (searchQuery.trim() === "") {
      applyFilter();
      setHasMore(true);
    }
    globalSearch();
  }, [searchQuery]);

  return (
    <InfiniteScroll
      dataLength={displayedPokemons.length}
      next={loadPokemons}
      hasMore={hasMore}
      loader={displayedPokemons.length > 0 ? <h4 className="text-xl text-yellow-500 text-center my-10">Loading...</h4> : null}
      endMessage={displayedPokemons.length > 0 && !hasMore ? <p className="text-xl font-bold text-center items-center text-yellow-500 my-10">No more Pokémon to load.</p> : null}
    >
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {displayedPokemons.length === 0 ? (
          <p className="text-xl font-bold text-center items-center text-red-500">No Pokémon Found</p>
        ) : (
          displayedPokemons.map((pokemon) => <PokeCard key={pokemon.id} image={pokemon.images} name={pokemon.name} id={pokemon.id} types={pokemon.types} onClick={() => handleCardClick(pokemon.name)} />)
        )}
      </div>
      <PokemonDetailModal isOpen={modalOpen} onClose={() => setModalOpen(false)} pokemon={selectedPokemon} />
    </InfiniteScroll>
  );
}

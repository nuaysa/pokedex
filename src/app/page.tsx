"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import FilterTabs from "@/components/filterTabs";
import Scroll from "@/components/scrollComponent";
import Searchbar from "../components/searchBar";

export default function Home() {
  const [selectedType, setSelectedType] = useState("");
  const [typeOptions, setTypeOptions] = useState<{ label: string; value: string }[]>([]);
  const [abilityOptions, setAbilityOptions] = useState<{ label: string; value: string }[]>([]);
  const [selectedAbility, setSelectedAbility] = useState("");
  const [searchText, setSearchText] = useState("");
  const [committedQuery, setCommittedQuery] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  const handleSearch = () => {
    setCommittedQuery(searchText);
  };

  const handleTypeChange = (value: string) => {
    setSelectedType((prev) => (prev === value ? "" : value));
  };

  const handleAbilityChange = (value: string) => {
    setSelectedAbility((prev) => (prev === value ? "" : value));
  };

  useEffect(() => {
    const fetchTypes = async () => {
      const response = await fetch("https://pokeapi.co/api/v2/type");
      const data = await response.json();
      const options = data.results.map((type: { name: string }) => ({
        label: type.name,
        value: type.name,
      }));
      setTypeOptions([{ label: "All", value: "" }, ...options]);
    };

    const fetchAbilities = async () => {
      const response = await fetch("https://pokeapi.co/api/v2/ability");
      const data = await response.json();
      const options = data.results.map((type: { name: string }) => ({
        label: type.name,
        value: type.name,
      }));
      setAbilityOptions([{ label: "All", value: "" }, ...options]);
    };

    fetchAbilities();
    fetchTypes();
  }, []);

  return (
    <div className="flex flex-col items-center">
      <div className="w-full bg-gradient-to-b from-yellow-500 to-white py-5 flex flex-col items-center">
        <Image src="https://raw.githubusercontent.com/sleduardo20/pokedex/0671af442dff1d8f7141e49eb83b438885bbc9e9/public/img/logo.svg" alt="pokedex text" height={300} width={300} className="mb-4" />
        <Searchbar value={searchText} onChange={handleInputChange} onSearch={handleSearch} />

        <div className="bg-white mt-6 rounded-xl px-6 py-4 w-full max-w-7xl">
          <p className="text-yellow-500 font-bold text-lg">Type:</p>
          <div className="overflow-x-auto">
            <FilterTabs options={typeOptions} selectedFilter={selectedType} onFilterChange={handleTypeChange} />
          </div>
          <div>
            <p className="text-yellow-500 font-bold text-lg">Ability:</p>
            <div className="overflow-x-auto">
              <FilterTabs options={abilityOptions} selectedFilter={selectedAbility} onFilterChange={handleAbilityChange} />
            </div>
          </div>
        </div>

        <div className="max-w-6xl w-full py-20">
          <Scroll selectedType={selectedType} selectedAbility={selectedAbility} searchQuery={committedQuery} />
        </div>
      </div>
    </div>
  );
}

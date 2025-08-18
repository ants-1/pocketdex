import { SafeAreaView, View, Text, ActivityIndicator, TouchableOpacity } from "react-native";
import { useQuery } from "@apollo/client";
import PokedexList from "@/components/PokedexList";
import { useState } from "react";
import { SearchBar } from "@/components/SearchBar";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { GET_MY_DEX } from "@/graphql/queries/getMyDex";
import { localClient } from "@/graphql/apolloClient";
import FilterButton from "@/components/FilterButton";
import { POKEMON_TYPES, PokemonType } from "@/constants/pokemonTypes";
import { SORT_BY } from "@/constants/sortOptions";

export default function MyDexScreen() {
  const [searchText, setSearchText] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTypes, setSelectedTypes] = useState<PokemonType[]>([]);
  const [sortBy, setSortBy] = useState<"name-asc" | "name-desc" | "id-asc" | "id-desc">("id-asc");
  const [tempSelectedTypes, setTempSelectedTypes] = useState<string[]>(selectedTypes);
  const [tempSortBy, setTempSortBy] = useState(sortBy);

  const { data, loading, error, refetch } = useQuery(GET_MY_DEX, { client: localClient });

  const toggleFilterPanel = () => {
    if (isOpen) {
      setSelectedTypes(tempSelectedTypes);
      setSortBy(tempSortBy);
    } else {
      setTempSelectedTypes(selectedTypes);
      setTempSortBy(sortBy);
    }

    setIsOpen(!isOpen);
  };

  if (loading) return <ActivityIndicator className="flex-1" size="large" />;
  if (error)
    return (
      <View className="flex-1 items-center justify-center">
        <Text>Error: {error.message}</Text>
      </View>
    );

  const myDex = data?.myDex ?? [];

  const filteredPokemon = myDex
    .map((pokemon: any) => ({
      id: pokemon.id,
      name: pokemon.name,
      spriteUrl: pokemon.spriteUrl,
      pokemonTypes: pokemon.pokemonTypes,
      isMyDex: true,
      isFavorite: true,
    }))
    .filter((pokemon: any) =>
      pokemon.name.toLowerCase().includes(searchText.toLowerCase())
    )
    .filter((pokemon: any) =>
      selectedTypes.length > 0 ? selectedTypes.some((t) => pokemon.pokemonTypes.includes(t)) : true
    )
    .sort((a: any, b: any) => {
      switch (sortBy) {
        case "name-asc":
          return a.name.localeCompare(b.name);
        case "name-desc":
          return b.name.localeCompare(a.name);
        case "id-asc":
          return Number(a.id) - Number(b.id);
        case "id-desc":
          return Number(b.id) - Number(a.id);
        default:
          return Number(a.id) - Number(b.id);
      }
    });

  return (
    <SafeAreaView>
      <View className="flex flex-row items-center justify-center mb-6">
        <Text className="text-red-500 text-3xl font-bold mx-2">MyDex</Text>
        <MaterialCommunityIcons name="pokeball" size={32} color="#ef4444" />
      </View>

      <View className="flex flex-row justify-center">
        <SearchBar search={searchText} setSearch={setSearchText} />
        <FilterButton isOpen={isOpen} setIsOpen={toggleFilterPanel} />
      </View>

      {isOpen && (
        <View className="h-full px-12">
          <Text className="text-xl font-semibold text-red-500">Filter by Type</Text>
          <View className="flex-row flex-wrap gap-2 my-2">
            {POKEMON_TYPES.map((type) => {
              const isSelected = tempSelectedTypes.includes(type);

              return (
                <TouchableOpacity
                  key={type}
                  onPress={() => {
                    setTempSelectedTypes((prev) =>
                      isSelected ? prev.filter((t) => t !== type) : [...prev, type]
                    );
                  }}
                  className={`px-3 py-2 rounded-full border-2 ${isSelected ? "bg-red-500 border-black" : "bg-gray-200 border-gray-400"}`}
                >
                  <Text className={`${isSelected ? "text-white" : "text-black"} capitalize`}>
                    {type}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>

          <Text className="text-xl font-semibold text-red-500 mt-4">Sort by</Text>
          <View className="flex-row flex-wrap gap-2 my-2">
            {SORT_BY.map((option) => (
              <TouchableOpacity
                key={option.key}
                onPress={() => setTempSortBy(option.key as typeof sortBy)}
                className={`px-3 py-2 rounded-full border-2 ${tempSortBy === option.key ? "bg-red-500 border-black" : "bg-gray-200 border-gray-400"}`}
              >
                <Text className={tempSortBy === option.key ? "text-white" : "text-black"}>
                  {option.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      )}

      <View className="mb-80">
        <PokedexList
          pokemonData={filteredPokemon}
          isMyDex={true}
          refetchMyDex={refetch}
        />
      </View>
    </SafeAreaView>
  );
}

import { SafeAreaView, View, Text, ActivityIndicator, TouchableOpacity } from "react-native";
import PokedexList from "@/components/PokedexList";
import { useState } from "react";
import { SearchBar } from "@/components/SearchBar";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import FilterButton from "@/components/FilterButton";
import { useQuery } from "@apollo/client";
import { localClient } from "@/graphql/apolloClient";
import { GET_MY_DEX } from "@/graphql/queries/getMyDex";

const POKEMON_TYPES = [
  "normal", "fighting", "flying", "poison", "ground", "rock", "bug", "ghost",
  "steel", "fire", "water", "grass", "electric", "psychic", "ice", "dragon",
  "dark", "fairy", "stellar", "unknown", "shadow"
];

export default function MyDexScreen() {
  const { data, loading, error, refetch } = useQuery(GET_MY_DEX, { client: localClient });

  const [searchText, setSearchText] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [selectedType, setSelectedType] = useState<string | null>(null);

  if (loading) return <ActivityIndicator className="flex-1" size="large" />;
  if (error) return (
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
      selectedType ? pokemon.pokemonTypes.includes(selectedType) : true
    );

  return (
    <SafeAreaView>
      <View className="flex flex-row items-center justify-center mb-6">
        <Text className="text-red-500 text-3xl font-bold mx-2">MyDex</Text>
        <MaterialCommunityIcons name="pokeball" size={32} color="#ef4444" />
      </View>

      <View className="flex flex-row justify-center">
        <SearchBar search={searchText} setSearch={setSearchText} />
        <FilterButton isOpen={isOpen} setIsOpen={setIsOpen} />
      </View>

      {isOpen && (
        <View className="h-full px-12">
          <Text className="text-xl font-semibold text-red-500">Filter by Type</Text>
          <View className="flex-row flex-wrap gap-2 my-2">
            {POKEMON_TYPES.map((type) => (
              <TouchableOpacity
                key={type}
                onPress={() => setSelectedType(type === selectedType ? null : type)}
                className={`px-3 py-2 rounded-full border-2 ${selectedType === type ? "bg-red-500 border-black" : "bg-gray-200 border-gray-400"}`}
              >
                <Text className={`${selectedType === type ? "text-white" : "text-black"} capitalize`}>
                  {type}
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

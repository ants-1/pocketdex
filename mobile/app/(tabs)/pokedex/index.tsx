import { SafeAreaView, View, Text, ActivityIndicator, TouchableOpacity } from "react-native";
import { useQuery } from "@apollo/client";
import PokedexList from "@/components/PokedexList";
import { useState } from "react";
import { SearchBar } from "@/components/SearchBar";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { GET_GEN_ONE_POKEMON } from "@/graphql/queries/getGenOnePokemon";
import { GET_MY_DEX } from "@/graphql/queries/getMyDex";
import { localClient } from "@/graphql/apolloClient";
import FilterButton from "@/components/FilterButton";

const POKEMON_TYPES = [
  "normal", "fighting", "flying", "poison", "ground", "rock", "bug", "ghost",
  "steel", "fire", "water", "grass", "electric", "psychic", "ice", "dragon",
  "dark", "fairy", "stellar", "unknown", "shadow"
];

const SORT_BY = [
  { key: "name-asc", label: "Name (A-Z)" },
  { key: "name-desc", label: "Name (Z-A)" },
  { key: "id-asc", label: "Dex No (1-151)" },
  { key: "id-desc", label: "Dex No (151-1)" },
];

export default function PokedexScreen() {
  const [searchText, setSearchText] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<"name-asc" | "name-desc" | "id-asc" | "id-desc">("id-asc");

  const [tempSelectedTypes, setTempSelectedTypes] = useState<string[]>(selectedTypes);
  const [tempSortBy, setTempSortBy] = useState(sortBy);

  const sortMapping = {
    "name-asc": { "name": "asc" },
    "name-desc": { "name": "desc" },
    "id-asc": { "id": "asc" },
    "id-desc": { "id": "desc" },
  };

  const { data, loading, error, fetchMore, refetch } = useQuery(GET_GEN_ONE_POKEMON, {
    variables: {
      offset: 0,
      limit: 151,
      orderBy: sortMapping[sortBy],
      types: selectedTypes.length > 0 ? selectedTypes : POKEMON_TYPES,
    },
    notifyOnNetworkStatusChange: true,
  });

  const { data: myDexData, refetch: refetchMyDex } = useQuery(GET_MY_DEX, { client: localClient });

  const toggleFilterPanel = () => {
    if (isOpen) {
      setSelectedTypes(tempSelectedTypes);
      setSortBy(tempSortBy);

      refetch({
        offset: 0,
        limit: 151,
        orderBy: sortMapping[tempSortBy],
        types: tempSelectedTypes.length > 0 ? tempSelectedTypes : POKEMON_TYPES,
      });
    } else {
      setTempSelectedTypes(selectedTypes);
      setTempSortBy(sortBy);
    }

    setIsOpen(!isOpen);
  };

  if (loading && !data) return <ActivityIndicator className="flex-1" size="large" />;
  if (error)
    return (
      <View className="flex-1 items-center justify-center">
        <Text>Error: {error.message}</Text>
      </View>
    );

  const pokemonData = data?.gen1_species ?? [];
  const myDex = myDexData?.myDex ?? [];

  const filteredPokemon = pokemonData
    .map((item: any) => {
      const pokemon = item.pokemon_v2_pokemons[0];
      let spriteUrl = null;

      try {
        const sprites = pokemon.pokemon_v2_pokemonsprites[0]?.sprites;
        spriteUrl = typeof sprites === "string" ? JSON.parse(sprites)?.other?.home?.front_default : sprites?.other?.home?.front_default ?? null;
      } catch { }

      const pokemonTypes = pokemon.pokemon_v2_pokemontypes.map((t: any) => t.pokemon_v2_type.name);
      const isFavorite = myDex.some((fav: any) => fav.id === pokemon.id.toString());

      return {
        id: pokemon.id.toString(),
        name: pokemon.name,
        spriteUrl,
        pokemonTypes,
        height: pokemon.height,
        weight: pokemon.weight,
        isFavorite,
      };
    })
    .filter((pokemon: any) =>
      pokemon.name.toLowerCase().includes(searchText.toLowerCase())
    );

  const handleLoadMore = () => {
    fetchMore({
      variables: { offset: pokemonData.length, limit: 10 },
      updateQuery: (previousResult, { fetchMoreResult }) => {
        if (!fetchMoreResult) return previousResult;
        return {
          gen1_species: [...previousResult.gen1_species, ...fetchMoreResult.gen1_species],
        };
      },
    });
  };

  return (
    <SafeAreaView>
      <View className="flex flex-row items-center justify-center mb-6">
        <Text className="text-red-500 text-3xl font-bold mx-2">Pokedex</Text>
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
                  <Text className={`${isSelected ? "text-white" : "text-black"} capitalize`}>{type}</Text>
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
                <Text className={tempSortBy === option.key ? "text-white" : "text-black"}>{option.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      )}

      <View className="mb-80">
        <PokedexList
          pokemonData={filteredPokemon}
          onLoadMore={handleLoadMore}
          isMyDex={false}
          refetchMyDex={refetchMyDex}
        />
      </View>
    </SafeAreaView>
  );
}


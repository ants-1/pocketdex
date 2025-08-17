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
  "normal","fighting","flying","poison","ground","rock","bug","ghost",
  "steel","fire","water","grass","electric","psychic","ice","dragon",
  "dark","fairy","stellar","unknown","shadow"
];

export default function PokedexScreen() {
  const { loading, error, data, fetchMore } = useQuery(GET_GEN_ONE_POKEMON, {
    variables: { offset: 0, limit: 10, type: null },
    notifyOnNetworkStatusChange: true,
  });

  const { data: myDexData, refetch: refetchMyDex } = useQuery(GET_MY_DEX, {
    client: localClient,
  });

  const [searchText, setSearchText] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [selectedType, setSelectedType] = useState<string | null>(null);

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
        const spriteObj = typeof sprites === "string" ? JSON.parse(sprites) : sprites;
        spriteUrl = spriteObj?.other?.home?.front_default ?? null;
      } catch {
        spriteUrl = null;
      }

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
    )
    .filter((pokemon: any) =>
      selectedType ? pokemon.pokemonTypes.includes(selectedType) : true
    );

  const handleLoadMore = () => {
    fetchMore({
      variables: { offset: pokemonData.length, limit: 10 },
      updateQuery: (previousResult, { fetchMoreResult }) => {
        if (!fetchMoreResult) return previousResult;
        return {
          gen1_species: [
            ...previousResult.gen1_species,
            ...fetchMoreResult.gen1_species,
          ],
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
          onLoadMore={handleLoadMore}
          isMyDex={false}
          refetchMyDex={refetchMyDex} 
        />
      </View>
    </SafeAreaView>
  );
}

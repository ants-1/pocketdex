import { SafeAreaView, View, Text, ActivityIndicator } from "react-native";
import { useQuery } from "@apollo/client";
import PokedexList from "@/components/PokedexList";
import { useState } from "react";
import { SearchBar } from "@/components/SearchBar";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { GET_GEN_ONE_POKEMON } from "@/graphql/queries/getGenOnePokemon";
import FilterButton from "@/components/FilterButton";

export default function PokedexScreen() {
  const { loading, error, data, fetchMore } = useQuery(GET_GEN_ONE_POKEMON, {
    variables: { offset: 0, limit: 10 },
    notifyOnNetworkStatusChange: true,
  });

  const [searchText, setSearchText] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  if (loading && !data) return <ActivityIndicator className="flex-1" size="large" />;
  if (error)
    return (
      <View className="flex-1 items-center justify-center">
        <Text>Error: {error.message}</Text>
      </View>
    );

  const pokemonData = data?.gen1_species ?? [];

  const filteredPokemon = pokemonData
    .map((item: any) => {
      const pokemon = item.pokemon_v2_pokemons[0];
      let spriteUrl = null;

      try {
        const sprites = pokemon.pokemon_v2_pokemonsprites[0].sprites;
        const spriteObj = typeof sprites === "string" ? JSON.parse(sprites) : sprites;
        spriteUrl = spriteObj.other.home.front_default;
      } catch {
        spriteUrl = null;
      }

      const pokemonTypes = pokemon.pokemon_v2_pokemontypes.map((t: any) => t.pokemon_v2_type.name);

      return {
        id: pokemon.id.toString(),
        name: pokemon.name,
        spriteUrl,
        pokemonTypes,
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
        <FilterButton isOpen={isOpen} setIsOpen={setIsOpen} />
      </View>

      <View className="mb-80">
        <PokedexList
          pokemonData={filteredPokemon}
          isMyDex={false}
          onLoadMore={handleLoadMore}
        />
      </View>
    </SafeAreaView>
  );
}

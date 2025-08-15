import { gql } from "@apollo/client";
import { SafeAreaView, View, Text, ActivityIndicator } from "react-native";
import { useQuery } from "@apollo/client";
import PokedexList from "@/components/PokedexList";
import { useState } from "react";
import { SearchBar } from "@/components/SearchBar";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const GET_GEN_ONE_POKEMON = gql`
  query GetGenOnePokemon {
    gen1_species: pokemon_v2_pokemonspecies(
      where: { pokemon_v2_generation: { name: { _eq: "generation-i" } } }
      order_by: { id: asc }
    ) {
      pokemon_v2_pokemons {
        id
        name
        pokemon_v2_pokemonsprites {
          sprites
        }
      }
    }
  }
`;

export default function PokedexScreen() {
  const { loading, error, data } = useQuery(GET_GEN_ONE_POKEMON);

  const [searchText, setSearchText] = useState("");

  if (loading) return <ActivityIndicator className="flex-1" size="large" />;
  if (error) return <Text className="flex-1">Error: {error.message}</Text>;

  const pokemonData = data.gen1_species;
  const filteredPokemon = pokemonData.filter((item: any) => {
    const pokemon = item.pokemon_v2_pokemons[0];
    return pokemon.name.toLowerCase().includes(searchText.toLowerCase());
  });

  return (
    <SafeAreaView>
      <View className="flex flex-row items-center justify-center mb-6">
        <Text className="text-red-500 text-3xl font-bold mx-2">Pokedex</Text>
        <MaterialCommunityIcons name="pokeball" size={32} color={"#ef4444"} />
      </View>

      <SearchBar search={searchText} setSearch={setSearchText} />
      <PokedexList pokemonData={filteredPokemon} />
    </SafeAreaView>
  );
}
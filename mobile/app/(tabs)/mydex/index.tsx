import { SafeAreaView, View, Text, ActivityIndicator } from "react-native";
import PokedexList from "@/components/PokedexList";
import { useState } from "react";
import { SearchBar } from "@/components/SearchBar";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import FilterButton from "@/components/FilterButton";
import { useQuery } from "@apollo/client";
import { localClient } from "@/graphql/apolloClient";
import { GET_MY_DEX } from "@/graphql/queries/getMyDex";

export default function MyDexScreen() {
  const { data, loading, error } = useQuery(GET_MY_DEX, {
    client: localClient,
  });

  const [searchText, setSearchText] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  if (loading) return <ActivityIndicator className="flex-1" size="large" />;
  if (error)
    return (
      <View className="flex-1 items-center justify-center">
        <Text>Error: {error.message}</Text>
      </View>
    );

  const pokemonList = data?.myDex || [];
  console.log(data);

  const filteredPokemon = pokemonList.filter((pokemon: any) =>
    pokemon.name.toLowerCase().includes(searchText.toLowerCase())
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

      <View className="mb-80">
        <PokedexList pokemonData={filteredPokemon} isMyDex={true} />
      </View>
    </SafeAreaView>
  );
}

import { FlatList, TouchableOpacity, View, Text } from "react-native";
import { PokemonCard } from "./PokedexCard";

interface PokedexListProps {
  pokemonData: any[];
  isMyDex: boolean;
  onLoadMore?: () => void;
}

export default function PokedexList({ pokemonData, isMyDex, onLoadMore }: PokedexListProps) {
  return (
    <FlatList
      data={pokemonData}
      numColumns={2}
      columnWrapperStyle={{ justifyContent: "space-evenly" }}
      contentContainerStyle={{ padding: 8 }}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <View className="flex items-center mb-8">
          <PokemonCard pokemonDetails={item} isMyDex={isMyDex} />
        </View>
      )}
      ListFooterComponent={() => (
        <TouchableOpacity
          onPress={onLoadMore}
          className="bg-red-500 border-black border-2 p-3 rounded-full mt-4 mx-auto mb-10"
        >
          <Text className="text-white font-bold">Load More</Text>
        </TouchableOpacity>
      )}
    />
  );
}

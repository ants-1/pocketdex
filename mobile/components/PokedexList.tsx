import { FlatList, View } from "react-native";
import { PokemonCard } from "./PokedexCard";

interface PokedexListProps {
  pokemonData: any[];
  isMyDex: boolean;
  onLoadMore?: () => void;
  loadingMore?: boolean;
  hasMore?: boolean;
}

export default function PokedexList({
  pokemonData,
  isMyDex,
  onLoadMore,
  loadingMore = false,
  hasMore = true,
}: PokedexListProps) {
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
      onEndReached={() => {
        if (onLoadMore && !loadingMore && hasMore) onLoadMore();
      }}
      onEndReachedThreshold={0.7}
    />
  );
}

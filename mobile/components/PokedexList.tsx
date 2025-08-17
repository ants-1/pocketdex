import { FlatList, View, Text } from "react-native";
import { PokemonCard } from "./PokedexCard";

interface PokedexListProps {
  pokemonData: any[];
  onLoadMore?: () => void;
  loadingMore?: boolean;
  hasMore?: boolean;
  isMyDex: boolean;
  refetchMyDex?: () => void;
}

export default function PokedexList({
  pokemonData,
  onLoadMore,
  loadingMore = false,
  hasMore = true,
  isMyDex,
  refetchMyDex,
}: PokedexListProps) {
  return (
    <FlatList
      data={pokemonData}
      numColumns={2}
      columnWrapperStyle={{ justifyContent: "space-evenly" }}
      contentContainerStyle={{ padding: 8 }}
      keyExtractor={(item, index) => `${item.id}-${index}`}
      renderItem={({ item }) => (
        <View className="flex items-center mb-8">
          <PokemonCard
            pokemonDetails={item}
            isMyDex={isMyDex}
            isFav={item.isFavorite}
            refetchMyDex={refetchMyDex} 
          />
        </View>
      )}
      ListEmptyComponent={
        <View className="flex-1 items-center justify-center mt-8">
          <Text className="text-gray-500 text-lg">None Found</Text>
        </View>
      }
      onEndReached={() => {
        if (onLoadMore && !loadingMore && hasMore) onLoadMore();
      }}
      onEndReachedThreshold={0.7}
    />
  );
}

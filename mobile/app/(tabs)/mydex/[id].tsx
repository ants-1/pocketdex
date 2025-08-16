import { useLocalSearchParams, router } from "expo-router";
import { SafeAreaView, View, Text, Image, ScrollView, TouchableOpacity, ActivityIndicator } from "react-native";
import { useQuery } from "@apollo/client";
import { FontAwesome5 } from "@expo/vector-icons";
import { GET_POKEMON_BY_ID } from "@/graphql/queries/getPokemonById";

export default function MyDexDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const pokemonId = Number(id);

  const { loading, error, data } = useQuery(GET_POKEMON_BY_ID, {
    variables: { id: pokemonId },
  });

  if (loading) return <ActivityIndicator size="large" className="flex-1" />;
  if (error) return <Text>Error: {error.message}</Text>;

  const pokemon = data.pokemon_v2_pokemon_by_pk;

  let spriteUrl = null;
  try {
    const sprites = pokemon.pokemon_v2_pokemonsprites[0].sprites;
    const spriteObj = typeof sprites === "string" ? JSON.parse(sprites) : sprites;
    spriteUrl = spriteObj.other.home.front_default;
  } catch { }

  const types = pokemon.pokemon_v2_pokemontypes.map((t: any) => t.pokemon_v2_type.name);

  let moves = pokemon.pokemon_v2_pokemonmoves
    .filter((m: any) => m.level > 0)
    .sort((a: any, b: any) => a.level - b.level)
    .map((m: any) => ({
      name: m.pokemon_v2_move.name,
      level: m.level,
      power: m.pokemon_v2_move.power,
      accuracy: m.pokemon_v2_move.accuracy,
      damageClass: m.pokemon_v2_move.pokemon_v2_movedamageclass?.name,
    }));

  const seen = new Set<string>();

  moves = moves.filter((move: any) => {
    if (seen.has(move.name)) return false;
    seen.add(move.name);
    return true;
  });

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView contentContainerStyle={{ alignItems: "center", padding: 16 }}>
        <TouchableOpacity
          className="bg-red-500 border-black border-2 p-4 rounded-full w-16 h-16 self-start flex items-center justify-center"
          onPress={() => router.back()}
        >
          <FontAwesome5 name="chevron-left" size={20} color={"#FFF"} />
        </TouchableOpacity>

        {spriteUrl && <Image source={{ uri: spriteUrl }} className="w-72 h-72 mb-4" />}
        <Text className="text-2xl font-bold capitalize mb-2">{pokemon.name}</Text>
        <Text className="text-lg text-gray-500 capitalize mb-8">{types.join(" / ")}</Text>

        <Text className="text-xl font-semibold mb-4 underline">Moves</Text>
        <View className="flex gap-2 w-full">
          {moves.map((move: any, index: any) => (
            <View
              key={index}
              className="bg-red-500 border-black border-2 p-4 rounded-full flex-row justify-between items-center"
            >
              <Text className="capitalize font-medium text-white">{move.name}</Text>
              <Text className="text-sm text-white">
                Lv: {move.level} | Power: {move.power ?? "0"} | Acc: {move.accuracy ?? "-"} | {move.damageClass ?? "0"}
              </Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

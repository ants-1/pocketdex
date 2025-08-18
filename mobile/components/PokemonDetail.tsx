import { SafeAreaView, View, Text, Image, ScrollView, TouchableOpacity } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { router } from "expo-router";
import { Move } from "@/types/MoveType";

type PokemonDetailProps = {
  spriteUrl: string | null;
  name: string;
  types: string[];
  abilities: string[];
  moves: Move[];
};

export default function PokemonDetail({ spriteUrl, name, types, abilities, moves }: PokemonDetailProps) {
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
        <Text className="text-2xl font-bold capitalize mb-2">{name}</Text>
        <Text className="text-lg underline text-gray-700 capitalize font-semibold">
          Types:
        </Text>
        <Text className="text-lg text-gray-500 capitalize mb-4">{types.join(" / ")}</Text>
        <Text className="text-xl underline text-gray-700 capitalize font-semibold">
          Abilities:
        </Text>
        <Text className="text-lg text-gray-500 capitalize mb-4">{abilities.join(" / ")}</Text>

        <Text className="text-xl font-semibold mb-4 underline">Moves</Text>
        <View className="flex gap-2 w-full">
          {moves.map((move, index) => (
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

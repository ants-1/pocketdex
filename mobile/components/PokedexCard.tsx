import { useRouter } from "expo-router";
import { Image, Text, TouchableOpacity } from "react-native";

interface PokemonCardProps {
  pokemonDetails: {
    id: string;
    name: string;
    spriteUrl: string | null;
    pokemonTypes: [];
  };
}

export const PokemonCard: React.FC<PokemonCardProps> = ({ pokemonDetails }) => {
  const { id, spriteUrl, name, pokemonTypes } = pokemonDetails;
  const router = useRouter();

  return (
    <TouchableOpacity
      onPress={() => router.push(`/pokedex/${id}`)}
      className="flex items-center p-3 border-gray-300 border-2 rounded-xl h-48 w-40 gap-2"
    >
      {spriteUrl && <Image source={{ uri: spriteUrl }} className="w-20 h-20" />}
      <Text className="text-lg capitalize font-semibold">{name}</Text>
      <Text className="text-gray-500 capitalize">
        {pokemonTypes.join(" / ")}
      </Text>
    </TouchableOpacity>
  );
};

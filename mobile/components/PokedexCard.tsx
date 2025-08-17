import { Href, useRouter } from "expo-router";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { useState } from "react";

interface PokemonCardProps {
  pokemonDetails: {
    id: string;
    name: string;
    spriteUrl: string | null;
    pokemonTypes: string[];
  };
  isMyDex: boolean;
}

export const PokemonCard: React.FC<PokemonCardProps> = ({ pokemonDetails, isMyDex }) => {
  const { id, spriteUrl, name, pokemonTypes } = pokemonDetails;
  const router = useRouter();
  const pathname = isMyDex ? `/mydex/${id}` : `/pokedex/${id}`;

  const [isFavorite, setIsFavorite] = useState(isMyDex);

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);

    if (!isFavorite) {
      console.log(`Adding ${name} to MyDex`);
    } else {
      console.log(`Removing ${name} from MyDex`);
    }
  };

  return (
    <TouchableOpacity
      onPress={() => router.push(pathname as Href)}
      className="flex items-center justify-center p-3 border-gray-300 border-2 rounded-xl h-52 w-44 gap-2 relative"
    >
      {spriteUrl && <Image source={{ uri: spriteUrl }} className="w-20 h-20" />}
      <Text className="text-lg capitalize font-semibold">{name}</Text>
      <Text className="text-gray-500 capitalize">
        {pokemonTypes.join(" / ")}
      </Text>

      {/* Favorite button */}
      <TouchableOpacity
        onPress={toggleFavorite}
        className="absolute flex items-center justify-center top-2 right-2 bg-white rounded-full p-1 w-10 h-10"
      >
        <Text className={`text-xl ${isFavorite ? "text-red-500" : "text-gray-400"}`}>
          {isFavorite ? "♥" : "♡"}
        </Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

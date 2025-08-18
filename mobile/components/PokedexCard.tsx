import { Href, useRouter } from "expo-router";
import { Image, Text, TouchableOpacity } from "react-native";
import { useMutation } from "@apollo/client";
import { localClient } from "@/graphql/apolloClient";
import { ADD_TO_MY_DEX } from "@/graphql/mutations/addToMyDex";
import { REMOVE_FROM_MY_DEX } from "@/graphql/mutations/removeFromMyDex";
import { FontAwesome } from "@expo/vector-icons";

interface PokemonCardProps {
  pokemonDetails: {
    id: string;
    name: string;
    spriteUrl: string | null;
    pokemonTypes: string[];
  };
  isMyDex: boolean;
  refetchMyDex?: () => void;
  isFav: boolean;
}

export const PokemonCard: React.FC<PokemonCardProps> = ({ pokemonDetails, isMyDex, refetchMyDex, isFav }) => {
  const { id, spriteUrl, name, pokemonTypes } = pokemonDetails;
  const router = useRouter();
  const pathname = isMyDex ? `/mydex/${id}` : `/pokedex/${id}`;

  const [addToMyDex] = useMutation(ADD_TO_MY_DEX, { client: localClient });
  const [removeFromMyDex] = useMutation(REMOVE_FROM_MY_DEX, { client: localClient });

  const handleToggleFavorite = async () => {
    try {
      if (!isFav) {
        await addToMyDex({
          variables: { id, myDex: { id, name, pokemonTypes, spriteUrl } },
          refetchQueries: ["GetMyDex"],
        });
      } else {
        await removeFromMyDex({
          variables: { id },
          refetchQueries: ["GetMyDex"],
        });
      }
      refetchMyDex?.();
    } catch (err) {
      console.error("Failed to toggle MyDex:", err);
    }
  };

  return (
    <TouchableOpacity
      onPress={() => router.push(pathname as Href)}
      className="flex items-center justify-center p-3 border-gray-300 border-2 rounded-xl h-52 w-44 gap-2 relative"
    >
      {spriteUrl && <Image source={{ uri: spriteUrl }} className="w-20 h-20" />}
      <Text className="text-lg capitalize font-semibold">{name}</Text>
      <Text className="text-gray-500 capitalize">{pokemonTypes.join(" / ")}</Text>

      <TouchableOpacity
        onPress={handleToggleFavorite}
        className="absolute flex items-center justify-center top-2 right-2 bg-white rounded-full p-1 w-10 h-10"
      >
        <Text className={`${isFav ? "text-red-500" : "text-gray-400"}`}>
          {isFav ?
            <FontAwesome name="heart" className="w-10 h-10" /> :
            <FontAwesome name="heart-o" className="w-10 h-10" />}
        </Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
};


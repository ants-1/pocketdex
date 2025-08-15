import { View, Image, Text } from "react-native"

interface PokemonCardProps {
  pokemonDetails: any
}

export const PokemonCard: React.FC<PokemonCardProps> = ({ pokemonDetails }) => {
  const { spriteUrl, name } = pokemonDetails;

  return (
    <View className="flex items-center p-3 border-gray-200 border-2 rounded-xl h-40 w-40 gap-2">
      {spriteUrl && <Image source={{ uri: spriteUrl }} className="w-20 h-20" />}
      <Text className="text-lg capitalize font-semibold">{name}</Text>
    </View>
  )
}
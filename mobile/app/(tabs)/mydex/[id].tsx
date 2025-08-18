import { useLocalSearchParams } from "expo-router";
import { ActivityIndicator, View, Text } from "react-native";
import { useQuery } from "@apollo/client";
import { GET_POKEMON_BY_ID } from "@/graphql/queries/getPokemonById";
import PokemonDetail from "@/components/PokemonDetail";

export default function MyDexDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const pokemonId = Number(id);

  const { loading, error, data } = useQuery(GET_POKEMON_BY_ID, {
    variables: { id: pokemonId },
  });

  if (loading) return <ActivityIndicator size="large" className="flex-1" />;
  if (error)
    return (
      <View className="flex-1 items-center justify-center">
        <Text>Error: {error.message}</Text>
      </View>
    );

  const pokemon = data.pokemon_v2_pokemon_by_pk;

  let spriteUrl: string | null = null;
  try {
    const sprites = pokemon.pokemon_v2_pokemonsprites[0].sprites;
    const spriteObj = typeof sprites === "string" ? JSON.parse(sprites) : sprites;
    spriteUrl = spriteObj.other.home.front_default;
  } catch {
    spriteUrl = "";
  }

  const types = pokemon.pokemon_v2_pokemontypes.map((t: any) => t.pokemon_v2_type.name);

  const abilities = pokemon.pokemon_v2_pokemonabilities.map(
    (a: any) => a.pokemon_v2_ability.name
  );

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
    <PokemonDetail
      spriteUrl={spriteUrl}
      name={pokemon.name}
      types={types}
      abilities={abilities} 
      moves={moves}
    />
  );
}

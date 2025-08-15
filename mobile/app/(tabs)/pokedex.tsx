import { gql } from "@apollo/client";
import { SafeAreaView, View, Text, Image, ActivityIndicator, FlatList } from "react-native";
import { useQuery } from "@apollo/client";

const GET_GEN_ONE_POKEMON = gql`
  query GetGenOnePokemon {
    gen1_species: pokemon_v2_pokemonspecies(
      where: { pokemon_v2_generation: { name: { _eq: "generation-i" } } }
      order_by: { id: asc }
    ) {
      pokemon_v2_pokemons {
        id
        name
        pokemon_v2_pokemonsprites {
          sprites
        }
      }
    }
  }
`;

export default function PokedexScreen() {
  const { loading, error, data } = useQuery(GET_GEN_ONE_POKEMON);

  if (loading) return <ActivityIndicator className="flex-1" size="large" />;
  if (error) return <Text className="flex-1">Error: {error.message}</Text>;

  return (
    <SafeAreaView>
      <FlatList
        data={data.gen1_species}
        keyExtractor={(item) => item.pokemon_v2_pokemons[0].id.toString()}
        renderItem={({ item }) => {
          const pokemon = item.pokemon_v2_pokemons[0];
          let spriteUrl = null;

          try {
            const sprites = pokemon.pokemon_v2_pokemonsprites[0].sprites;
            const spriteObj = typeof sprites === 'string' ? JSON.parse(sprites) : sprites;
            spriteUrl = spriteObj.other.home.front_default;
          } catch (e) {
            spriteUrl = null;
          }

          return (
            <View className="flex items-center p-3">
              {spriteUrl && <Image source={{ uri: spriteUrl }} className="w-14 h-14" />}
              <Text className="text-lg capitalize">{pokemon.name}</Text>
            </View>
          );
        }}
      />
    </SafeAreaView>
  );
}
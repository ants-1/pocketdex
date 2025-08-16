import { FlatList, View } from "react-native";
import { PokemonCard } from "./PokedexCard";

export default function PokedexList({ pokemonData }: any) {
  return (
    <FlatList
      data={pokemonData}
      numColumns={2}
      columnWrapperStyle={{ justifyContent: "space-evenly" }}
      contentContainerStyle={{ padding: 8 }}
      keyExtractor={(item) => item.pokemon_v2_pokemons[0].id.toString()}
      renderItem={({ item }) => {
        const pokemon = item.pokemon_v2_pokemons[0];
        let spriteUrl = null;

        try {
          const sprites = pokemon.pokemon_v2_pokemonsprites[0].sprites;
          const spriteObj = typeof sprites === 'string' ? JSON.parse(sprites) : sprites;
          spriteUrl = spriteObj.other.home.front_default;;
        } catch (e) {
          spriteUrl = null;
        }

        const pokemonTypes = pokemon.pokemon_v2_pokemontypes.map(
          (t: any) => t.pokemon_v2_type.name
        )
        const pokemonDetails = {
          id: pokemon.id.toString(),
          spriteUrl,
          name: pokemon.name,
          pokemonTypes
        }
        return (
          <View
            className="flex items-center mb-8">
            <PokemonCard pokemonDetails={pokemonDetails} />
          </View>
        );
      }}
    />
  )
}
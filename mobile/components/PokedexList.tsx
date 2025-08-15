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
          spriteUrl = spriteObj.other.home.front_default;
        } catch (e) {
          spriteUrl = null;
        }
        const pokemonDetails = { spriteUrl, name: pokemon.name }
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
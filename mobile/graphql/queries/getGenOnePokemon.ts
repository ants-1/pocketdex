import { gql } from "@apollo/client";

export const GET_GEN_ONE_POKEMON = gql`
  query GetGenOnePokemon {
    gen1_species: pokemon_v2_pokemonspecies(
      where: { pokemon_v2_generation: { name: { _eq: "generation-i" } } }
      order_by: { id: asc }
    ) {
      pokemon_v2_pokemons {
        id
        name
        pokemon_v2_pokemontypes {
          pokemon_v2_type {
            name
          }
        }
        pokemon_v2_pokemonsprites {
          sprites
        }
      }
    }
  }
`;

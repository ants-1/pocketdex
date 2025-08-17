import { gql } from "@apollo/client";

export const GET_POKEMON_QUIZ = gql`
  query GetPokemonQuiz($offset: Int, $limit: Int) {
    gen1_species: pokemon_v2_pokemonspecies(
      where: { pokemon_v2_generation: { name: { _eq: "generation-i" } } }
      order_by: { id: asc }
      offset: $offset
      limit: $limit
    ) {
      pokemon_v2_pokemons {
        id
        name
        pokemon_v2_pokemontypes {
          pokemon_v2_type {
            name
          }
        }
      }
    }
  }
`;

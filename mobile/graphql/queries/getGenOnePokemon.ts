import { gql } from "@apollo/client";

export const GET_GEN_ONE_POKEMON = gql`
  query GetGenOnePokemon(
    $offset: Int
    $limit: Int
    $orderBy: [pokemon_v2_pokemonspecies_order_by!]
    $types: [String!]
  ) {
    gen1_species: pokemon_v2_pokemonspecies(
      where: {
        pokemon_v2_generation: { name: { _eq: "generation-i" } }
        pokemon_v2_pokemons: {
          _and: [
            { id: { _lte: 151 } }               
            { pokemon_v2_pokemontypes: { 
                pokemon_v2_type: { name: { _in: $types } } 
              } 
            }
          ]
        }
      }
      offset: $offset
      limit: $limit
      order_by: $orderBy
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

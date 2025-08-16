import { gql } from "@apollo/client";

export const GET_POKEMON_BY_ID = gql`
  query GetPokemonById($id: Int!) {
    pokemon_v2_pokemon_by_pk(id: $id) {
      id
      name
      pokemon_v2_pokemonsprites {
        sprites
      }
      pokemon_v2_pokemontypes {
        pokemon_v2_type {
          name
        }
      }
      pokemon_v2_pokemonmoves {
        level
        pokemon_v2_move {
          name
          power
          accuracy
          pokemon_v2_movedamageclass {
            name
          }
        }
      }
    }
  }
`;

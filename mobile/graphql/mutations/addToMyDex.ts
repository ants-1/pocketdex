import { gql } from "@apollo/client";

export const ADD_TO_MY_DEX = gql`
  mutation AddToMyDex($id: ID!, $name: String!, $pokemonTypes: [String!]!, $spriteUrl: String) {
    addToMyDex(id: $id, name: $name, pokemonTypes: $pokemonTypes, spriteUrl: $spriteUrl) {
      id
      name
      pokemonTypes
      spriteUrl
    }
  }
`;
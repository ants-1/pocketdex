import { gql } from "@apollo/client";

export const ADD_TO_MY_DEX = gql`
  mutation AddToMyDex($id: ID!, $myDex: AddMyDexInput!) {
    addToMyDex(id: $id, myDex: $myDex) {
      id
      name
      pokemonTypes
      spriteUrl
    }
  }
`;
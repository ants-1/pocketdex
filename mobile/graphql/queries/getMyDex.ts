import { gql } from "@apollo/client";

export const GET_MY_DEX = gql`
  query GetMyDex {
    myDex {
      id
      name
      pokemonTypes
      spriteUrl
    }
  }
`;

import { gql } from "@apollo/client";

export const REMOVE_FROM_MY_DEX = gql`
  mutation RemoveFromMyDex($id: ID!) {
    removeFromMyDex(id: $id) {
      id
      name
    }
  }
`;

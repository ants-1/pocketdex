export const typeDefs = `#graphql
  type Pokemon {
    id: ID!
    name: String!
    pokemonTypes: [String!]!
    spriteUrl: String
  }

  type Query {
    myDex: [Pokemon!]!
  }

  type Mutation {
    addToMyDex(id: ID!, myDex: AddMyDexInput!): Pokemon!
    removeFromMyDex(id: ID!): Pokemon
  }

  input AddMyDexInput {
    id: ID!
    name: String!
    pokemonTypes: [String!]!
    spriteUrl: String
  }
`;

import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

const typeDefs = `#graphql
  type Pokemon {
    id: ID!
    name: String!
    pokemonTypes: [String!]!
    spriteUrl: String
  }

  type Query {
    myDex: [Pokemon]
  }
`;

// Mock data
const Pokemons = [
  {
    id: "1",
    name: "bulbasaur",
    pokemonTypes: ["grass", "poison"],
    spriteUrl:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/1.png",
  },
  {
    id: "2",
    name: "ivysaur",
    pokemonTypes: ["grass", "poison"],
    spriteUrl:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/2.png",
  },
];

let MyDex: typeof Pokemons = Pokemons;

const resolvers = {
  Query: {
    myDex: () => MyDex,
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000, host: "0.0.0.0" }, 
});

console.log(`Server ready at: ${url}`);

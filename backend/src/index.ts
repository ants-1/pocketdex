import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from '@apollo/server/standalone';

const typeDefs = `#graphql
  type Pokemon {
    id: ID!
    name: String
  }

  type Query {
    pokemons: [Pokemon]
  }
`;

// Mock data
const Pokemons = [
  { id: "1", name: "Mew" }, 
  { id: "2", name: "Mewtwo" }
];

const resolvers = {
  Query: {
    pokemons() {
      return Pokemons;
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

console.log(`Server ready at: ${url}`);
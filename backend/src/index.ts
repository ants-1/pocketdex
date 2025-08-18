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
  type Mutation {
    addToMyDex(id: ID!, myDex: AddMyDexInput!): Pokemon
    removeFromMyDex(id: ID!): Pokemon
  }
  input AddMyDexInput {
    id: ID!, 
    name: String!, 
    pokemonTypes: [String!]!, 
    spriteUrl: String
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
  Mutation: {
    addToMyDex: (_: any, { id, myDex }: any) => {
      const { name, pokemonTypes, spriteUrl } = myDex;

      const exists = MyDex.find((p) => p.id === id);
      if (!exists) {
        const newPokemon = {
          id,
          name,
          pokemonTypes,
          spriteUrl: spriteUrl ?? null,
        };
        MyDex.push(newPokemon);
        return newPokemon;
      }
      return exists;
    },

    removeFromMyDex: (_: any, { id }: any) => {
      const index = MyDex.findIndex((p) => p.id === id);
      if (index >= 0) {
        const [removed] = MyDex.splice(index, 1);
        return removed;
      }
      return null;
    },
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

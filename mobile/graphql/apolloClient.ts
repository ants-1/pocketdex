import { ApolloClient, InMemoryCache } from "@apollo/client";

export const localClient = new ApolloClient({
  uri: "http://192.168.1.67:4000/",
  cache: new InMemoryCache()
});

export const client = new ApolloClient({
  uri: "https://beta.pokeapi.co/graphql/v1beta",
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          gen1_species: {
            keyArgs: false,
            merge(
              existing = [],
              incoming: any[],
              options: { args?: Record<string, any> | null },
            ) {
              const { offset = 0 } = options.args ?? {};

              const merged = existing ? existing.slice(0) : [];
              for (let i = 0; i < incoming.length; ++i) {
                merged[offset + i] = incoming[i];
              }
              return merged;
            },
          },
        },
      },
    },
  }),
});

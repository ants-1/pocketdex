import "../global.css";
import { Stack } from "expo-router";
import { ApolloProvider } from "@apollo/client";
import { client } from "@/graphql/apolloClient";
import { StatusBar } from "expo-status-bar";

export default function RootLayout() {
  return (
    <ApolloProvider client={client}>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="auto" />
    </ApolloProvider>
  );
}

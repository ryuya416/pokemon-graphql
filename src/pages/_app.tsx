import type { AppProps } from "next/app";
import { ApolloProvider } from "@apollo/client";
import client from "src/lib/apolloClient";
import { ChakraProvider } from "@chakra-ui/react";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <ApolloProvider client={client}>
        <Component {...pageProps} />
      </ApolloProvider>
    </ChakraProvider>
  );
}

export default MyApp;

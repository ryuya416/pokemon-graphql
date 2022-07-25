import { NextPage } from "next";
import Link from "next/link";
import { useQuery } from "@apollo/client";
import {
  Box,
  Container,
  Spinner,
  Text,
  Flex,
  Image,
  Grid,
  GridItem,
} from "@chakra-ui/react";
import { GET_POKEMONS } from "src/queries/queries";
import { GetPokemonsQuery } from "src/types/generated/graphql";

const Home: NextPage = () => {
  const { data: { pokemons = [] } = {}, loading } = useQuery<GetPokemonsQuery>(
    GET_POKEMONS,
    {
      variables: { first: 150 },
    }
  );

  if (!pokemons || loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="end">
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
          size="xl"
        />
      </Box>
    );
  }

  return (
    <Container maxW="960px" pt={10}>
      <Grid templateColumns="repeat(3, 1fr)" gap={6}>
        {pokemons.map((pokemon) => {
          return (
            <Box
              key={pokemon.number}
              boxShadow="lg"
              px={1}
              py={2}
              _hover={{ boxShadow: "none", transitionDuration: "500ms" }}
            >
              <GridItem>
                <Link href="/pokemon/[id]" as={`/pokemon/${pokemon.name}`}>
                  <a>
                    <Flex alignItems="center" gap={2}>
                      <Text>{pokemon.number}</Text>
                      <Image boxSize="34px" src={pokemon.image} alt="Pokemon" />
                      <Text fontWeight="bold" fontSize="xl">
                        {pokemon.name}
                      </Text>
                    </Flex>
                  </a>
                </Link>
              </GridItem>
            </Box>
          );
        })}
      </Grid>
    </Container>
  );
};

export default Home;

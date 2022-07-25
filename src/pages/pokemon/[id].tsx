import { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useQuery } from "@apollo/client";
import {
  Box,
  Button,
  Container,
  Flex,
  Spinner,
  Text,
  Image,
} from "@chakra-ui/react";
import { GetPokemonQuery } from "src/types/generated/graphql";
import { GET_POKEMON } from "src/queries/queries";

const Pokemon: NextPage = () => {
  const router = useRouter();

  const { data: { pokemon = {} } = {}, loading } = useQuery<GetPokemonQuery>(
    GET_POKEMON,
    {
      variables: { name: router.query.id },
    }
  );

  if (loading) {
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
    <Container maxW="960px" p={16} mx="auto">
      <Box boxShadow="md" rounded="base" maxW="480px" w="100%" mx="auto" p={4}>
        <Text fontWeight="bold"> No.{pokemon.number}</Text>
        <Box>
          <Image
            src={pokemon.image}
            alt="Pokemon"
            w="300px"
            height="300px"
            mx="auto"
          />
        </Box>
        <Text fontSize="3xl" fontWeight="bold">
          {pokemon.name}
        </Text>
        <Box>
          <Flex>
            {pokemon.types
              ? pokemon.types.map((type, index) => {
                  return (
                    <Box key={index}>
                      <Text mr={1}>{type}</Text>
                    </Box>
                  );
                })
              : null}
          </Flex>
        </Box>
      </Box>
      <Box textAlign="center" mt={4}>
        <Link href="/">
          <a>
            <Button colorScheme="blue">一覧に戻る</Button>
          </a>
        </Link>
      </Box>
    </Container>
  );
};

export default Pokemon;

import { gql } from "@apollo/client";

export const GET_POKEMONS = gql`
  query GetPokemons($first: Int!) {
    pokemons(first: $first) {
      number
      name
      image
    }
  }
`;

export const GET_POKEMON = gql`
  query GetPokemon($name: String!) {
    pokemon(name: $name) {
      number
      name
      image
      types
    }
  }
`;

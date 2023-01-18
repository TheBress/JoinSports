import { gql } from "@apollo/client";

export const CREATELOCATION = gql`
  mutation createLocation($name: String!, $direction: String!) {
    createLocation(input: { data: { Name: $name, Direction: $direction } }) {
      location {
        Name
      }
    }
  }
`;

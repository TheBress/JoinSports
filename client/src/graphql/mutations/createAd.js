import { gql } from "@apollo/client";

export const CREATEAD = gql`
  mutation createAd(
    $userId: ID!
    $name: String!
    $description: String!
    $date: String!
    $sport: ID!
    $location: ID!
    $image: String
  ) {
    createAd(
      input: {
        data: {
          Name: $name
          Description: $description
          Date: $date
          sport: $sport
          user: $userId
          location: $location
          image: $image
        }
      }
    ) {
      ad {
        Name
      }
    }
  }
`;

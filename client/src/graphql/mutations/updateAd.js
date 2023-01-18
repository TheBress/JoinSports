import { gql } from "@apollo/client";

export const UPDATEAD = gql`
  mutation updateAd(
    $id: ID!
    $name: String
    $date: String
    $description: String
    $sport: ID
    $location: ID
    $views: Int
    $image: String
  ) {
    updateAd(
      input: {
        where: { id: $id }
        data: {
          Name: $name
          Date: $date
          sport: $sport
          Description: $description
          location: $location
          views: $views
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

import { gql } from "@apollo/client";

export const UPDATEPROFILE = gql`
  mutation updateProfile(
    $id: ID!
    $cityResidence: String!
    $height: Int
    $weigth: Int
    $favoriteSports: [ID]
    $description: String!
    $image: String
  ) {
    updateUser(
      input: {
        where: { id: $id }
        data: {
          cityResidence: $cityResidence
          height: $height
          weigth: $weigth
          favoriteSports: $favoriteSports
          description: $description
          image: $image
        }
      }
    ) {
      user {
        birthDate
      }
    }
  }
`;

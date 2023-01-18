import { gql } from "@apollo/client";

export const UPDATEUSERINCOMPLETE = gql`
  mutation updateUserIncomplete(
    $id: ID!
    $cityResidence: String!
    $birthDate: String!
    $height: Int
    $weigth: Int
    $nationality: String!
    $favoriteSports: [ID]
    $description: String!
    $sex: String!
  ) {
    updateUser(
      input: {
        where: { id: $id }
        data: {
          cityResidence: $cityResidence
          birthDate: $birthDate
          height: $height
          weigth: $weigth
          nationality: $nationality
          favoriteSports: $favoriteSports
          description: $description
          sex: $sex
        }
      }
    ) {
      user {
        birthDate
      }
    }
  }
`;

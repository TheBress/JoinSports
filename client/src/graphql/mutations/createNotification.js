import { gql } from "@apollo/client";

export const CREATENOTIFICATION = gql`
  mutation createNotification(
    $message: String!
    $userTransmitter: ID!
    $userReceptor: ID!
    $ad: ID
  ) {
    createNotification(
      input: {
        data: {
          Message: $message
          userTransmitter: $userTransmitter
          userReceptor: $userReceptor
          ad: $ad
        }
      }
    ) {
      notification {
        Message
      }
    }
  }
`;

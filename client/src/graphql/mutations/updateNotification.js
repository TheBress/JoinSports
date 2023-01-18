import { gql } from "@apollo/client";

export const UPDATENOTIFICATION = gql`
  mutation updateNotification($id: ID!, $isSeen: Boolean!) {
    updateNotification(
      input: { where: { id: $id }, data: { isSeen: $isSeen } }
    ) {
      notification {
        Message
      }
    }
  }
`;

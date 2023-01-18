import { gql } from "@apollo/client";

export const DELETE_NOTIFICATION = gql`
  mutation deleteNotification($id: ID!) {
    deleteNotification(input: { where: { id: $id } }) {
      notification {
        Message
      }
    }
  }
`;

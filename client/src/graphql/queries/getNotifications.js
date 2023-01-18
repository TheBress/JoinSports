import { gql } from "@apollo/client";
import { NOTIFICATION_FRAGMENT } from "../fragments/notification";

export const GETNOTIFICATIONS = gql`
  query getYourNotifications($id: ID) {
    notifications(where: { userReceptor: $id }) {
      ...NotificationParts
    }
  }
  ${NOTIFICATION_FRAGMENT}
`;

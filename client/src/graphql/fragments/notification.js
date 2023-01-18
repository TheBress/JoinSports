import { gql } from "@apollo/client";
import { MEEXTENDED_FRAGMENT } from "./me";

export const NOTIFICATION_FRAGMENT = gql`
  fragment NotificationParts on Notifications {
    id
    Message
    ad {
      id
      Name
    }
    userTransmitter {
      ...MeExtendedParts
    }
    userReceptor {
      ...MeExtendedParts
    }
    created_at
    isSeen
  }
  ${MEEXTENDED_FRAGMENT}
`;

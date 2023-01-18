import { gql } from "@apollo/client";
import { SPORTS_FRAGMENT } from "./sport";

export const AD_FRAGMENT = gql`
  fragment AdParts on Ads {
    id
    Name
    Description
    sport {
      ...SportsParts
    }
    Date

    image

    user {
      username
      image
      id
    }

    requests {
      id
      isAccepted
      user {
        id
        username
        email
        image
      }
    }

    notifications {
      id
      userTransmitter {
        id
      }
      userReceptor {
        id
      }
      ad {
        id
      }
    }

    location {
      id
      Name
      Direction
    }
    views
  }

  ${SPORTS_FRAGMENT}
`;

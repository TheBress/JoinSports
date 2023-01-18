import { gql } from "@apollo/client";
import { AD_FRAGMENT } from "./ad";
import { SPORTS_FRAGMENT } from "./sport";

export const ME_FRAGMENT = gql`
  fragment MeParts on UsersPermissionsMe {
    id
    username
    email
    confirmed
    blocked
  }
`;

export const MEEXTENDED_FRAGMENT = gql`
  fragment MeExtendedParts on UsersPermissionsUser {
    id
    username
    email
    confirmed
    blocked
    birthDate
    height
    weigth
    nationality
    cityResidence
    favoriteSports {
      ...SportsParts
    }
    ads {
      ...AdParts
    }
    image
    description
    sex
    requests {
      isAccepted
      ad {
        ...AdParts
      }
    }
  }
  ${SPORTS_FRAGMENT}
  ${AD_FRAGMENT}
`;

import { gql } from "@apollo/client";
import { AD_FRAGMENT } from "./ad";

export const LOCATIONS_FRAGMENT = gql`
  fragment LocationsParts on Locations {
    id
    Name
    Direction
    ads {
      ...AdParts
    }
  }
  ${AD_FRAGMENT}
`;

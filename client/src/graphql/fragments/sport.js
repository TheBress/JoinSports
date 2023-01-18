import { gql } from "@apollo/client";

export const SPORTS_FRAGMENT = gql`
  fragment SportsParts on Sports {
    id
    Name
  }
`;

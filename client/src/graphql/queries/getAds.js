import { gql } from "@apollo/client";
import { AD_FRAGMENT } from "../fragments/ad";

export const GETADS = gql`
  query getYourAds($id: ID) {
    ads(where: { user: $id }, sort: "views:desc") {
      ...AdParts
    }
  }
  ${AD_FRAGMENT}
`;

export const GET_LAST_ADS = gql`
  query lastAds {
    ads(sort: "created_at:desc", limit: 6) {
      ...AdParts
    }
  }
  ${AD_FRAGMENT}
`;

export const GETAD = gql`
  query getYourAds($id: ID) {
    ads(where: { id: $id }) {
      ...AdParts
    }
  }
  ${AD_FRAGMENT}
`;

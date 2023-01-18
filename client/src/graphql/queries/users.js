import { gql } from "@apollo/client";
import { MEEXTENDED_FRAGMENT } from "../fragments/me";

export const GET_LATEST_USERS = gql`
  query getLatestUsers {
    users(sort: "created_at:desc", limit: 6) {
      ...MeExtendedParts
    }
  }
  ${MEEXTENDED_FRAGMENT}
`;

export const GET_USER = gql`
  query getUser($id: ID!) {
    user(id: $id) {
      ...MeExtendedParts
    }
  }
  ${MEEXTENDED_FRAGMENT}
`;

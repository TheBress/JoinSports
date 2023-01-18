import { gql } from "@apollo/client";

export const CREATEREQUEST = gql`
  mutation createRequest($adId: ID!, $userId: ID!) {
    createRequest(input: { data: { ad: $adId, user: $userId } }) {
      request {
        id
      }
    }
  }
`;

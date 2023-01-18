import { gql } from "@apollo/client";

export const DELETEREQUEST = gql`
  mutation deleteRequest($id: ID!) {
    deleteRequest(input: { where: { id: $id } }) {
      request {
        id
      }
    }
  }
`;

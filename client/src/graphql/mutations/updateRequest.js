import { gql } from "@apollo/client";

export const UPDATEREQUEST = gql`
  mutation updateRequest($id: ID!) {
    updateRequest(input: { where: { id: $id }, data: { isAccepted: true } }) {
      request {
        id
      }
    }
  }
`;

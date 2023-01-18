import { gql } from "@apollo/client";

export const FORGOTPASSWORD = gql`
  mutation forgotPassword($email:String!) {
    forgotPassword(email: $email) {
      ok
    }
  }
`;

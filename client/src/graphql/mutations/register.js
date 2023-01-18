import { gql } from "@apollo/client";

export const REGISTER = gql`
  mutation register($email: String!, $username: String!, $password: String!) {
    register(
      input: { email: $email, username: $username, password: $password }
    ) {
      user {
        id
        username
        email
      }
      jwt
    }
  }
`;

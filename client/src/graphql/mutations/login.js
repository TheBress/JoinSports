import {gql} from "@apollo/client"


export const LOGIN=gql`
mutation login($identifier: String!, $password: String!) {
    login(input: {identifier: $identifier, password: $password}) {
           jwt
    }
}
`
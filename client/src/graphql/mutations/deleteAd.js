import {gql} from "@apollo/client"


export const DELETEAD=gql`
mutation deleteAd($id:ID!) {
    deleteAd(input:{ where:{id: $id}}) {
           ad{
               Name
           }
    }
}
`
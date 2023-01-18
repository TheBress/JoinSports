import { gql } from '@apollo/client';
import { MEEXTENDED_FRAGMENT } from '../fragments/me';


export const ISAUTH= gql `
    query isAuth{
        meExtended{
            ...MeExtendedParts
        }
    }
    ${MEEXTENDED_FRAGMENT}
`
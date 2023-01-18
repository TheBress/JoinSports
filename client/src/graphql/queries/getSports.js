import { gql } from '@apollo/client';
import { SPORTS_FRAGMENT } from '../fragments/sport';

export const GETSPORTS= gql `
    query getSports{
        sports{
            ...SportsParts
        }
    }
    ${SPORTS_FRAGMENT}
`
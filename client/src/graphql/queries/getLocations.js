import { gql } from '@apollo/client';
import { LOCATIONS_FRAGMENT } from '../fragments/location';

export const GETLOCATION= gql `
    query getLocation{
        locations{
            ...LocationsParts
        }
    }
    ${LOCATIONS_FRAGMENT}
`
import { gql } from "@apollo/client";

export const UPDATEEVENT = gql`
  mutation updateEvent(
    $id: ID!
    $from: String!
    $to: String!
    $title: String!
  ) {
    updateEventsCalendar(
      input: {
        where: { id: $id }
        data: { from: $from, to: $to, title: $title }
      }
    ) {
      eventsCalendar {
        id
      }
    }
  }
`;

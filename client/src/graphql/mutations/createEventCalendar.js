import { gql } from "@apollo/client";

export const CREATE_EVENT_CALENDAR = gql`
  mutation createEventCalendar(
    $color: String!
    $to: String!
    $from: String!
    $title: String!
    $userId: ID!
  ) {
    createEventsCalendar(
      input: {
        data: {
          color: $color
          to: $to
          from: $from
          title: $title
          user: $userId
        }
      }
    ) {
      eventsCalendar {
        title
      }
    }
  }
`;

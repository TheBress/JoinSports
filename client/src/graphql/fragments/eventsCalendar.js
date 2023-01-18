import { gql } from "@apollo/client";

export const EVENTS_CALENDAR_FRAGMENT = gql`
  fragment EventsCalendarFragment on EventsCalendar {
    id
    color
    from
    to
    title
    user {
      id
    }
  }
`;

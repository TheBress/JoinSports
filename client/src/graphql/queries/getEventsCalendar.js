import { gql } from "@apollo/client";
import { EVENTS_CALENDAR_FRAGMENT } from "../fragments/eventsCalendar";

export const GETEVENTSCALENDAR = gql`
  query getYourEventsCalendar(
    $to: String
    $from: String
    $title: String
    $id: ID
  ) {
    eventsCalendars(where: { user: $id, to: $to, from: $from, title: $title }) {
      ...EventsCalendarFragment
    }
  }
  ${EVENTS_CALENDAR_FRAGMENT}
`;

export const GETALLEVENTSCALENDAR = gql`
  query getAllEventsCalendar {
    eventsCalendars {
      ...EventsCalendarFragment
    }
  }
  ${EVENTS_CALENDAR_FRAGMENT}
`;

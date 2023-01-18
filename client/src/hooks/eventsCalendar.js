import { useMemo } from "react";
import { useQuery } from "@apollo/client";
import {
  GETALLEVENTSCALENDAR,
  GETEVENTSCALENDAR,
} from "../graphql/queries/getEventsCalendar";

export const UserEventsCalendar = (userId, from, to, title) => {
  const {
    data,
    loading,
    refetch: refetchEvents,
  } = useQuery(GETEVENTSCALENDAR, {
    variables: { id: userId, from: from, to: to, title: title },
  });

  const eventsCalendar = useMemo(() => {
    return data;
  }, [data]);

  return {
    eventsCalendar,
    loading,
    refetchEvents,
  };
};

export const AllEventsCalendar = () => {
  const {
    data,
    loading,
    refetch: refetchEvents,
  } = useQuery(GETALLEVENTSCALENDAR);

  const allEventsCalendar = useMemo(() => {
    return data;
  }, [data]);

  return {
    allEventsCalendar,
    loading,
    refetchEvents,
  };
};

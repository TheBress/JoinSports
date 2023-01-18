import { useMemo } from "react";
import { useQuery } from "@apollo/client";
import { GETNOTIFICATIONS } from "../graphql/queries/getNotifications";

export const UserNotifications = (userId) => {
  const {
    data,
    loading: loadingNotification,
    refetch: refetchNotifications,
  } = useQuery(GETNOTIFICATIONS, { variables: { id: userId } });

  const myNotifications = useMemo(() => {
    return data;
  }, [data]);

  return {
    myNotifications,
    loadingNotification,
    refetchNotifications,
  };
};

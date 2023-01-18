import { useMemo } from "react";
import { useQuery } from "@apollo/client";
import { GET_LATEST_USERS, GET_USER } from "../graphql/queries/users";

export const GetLatestUsers = () => {
  const {
    data,
    loading,
    refetch: refetchLastUsers,
  } = useQuery(GET_LATEST_USERS);

  const LatestUsers = useMemo(() => {
    return data;
  }, [data]);

  return {
    LatestUsers,
    loading,
    refetchLastUsers,
  };
};

export const GetUser = (id) => {
  const {
    data,
    loading,
    refetch: refetchUser,
  } = useQuery(GET_USER, { variables: { id: id } });

  const User = useMemo(() => {
    return data;
  }, [data]);

  return {
    User,
    loading,
    refetchUser,
  };
};

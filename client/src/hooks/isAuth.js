import { useMemo } from "react";
import { useQuery } from "@apollo/client";
import { ISAUTH } from "../graphql/queries/isAuth";

const IsAuth = () => {
  const { data, loading, refetch: refetchUser } = useQuery(ISAUTH);
  const me = useMemo(() => {
    return data;
  }, [data]);

  return {
    me,
    loading,
    refetchUser,
  };
};

export default IsAuth;

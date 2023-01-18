import { useMemo } from "react";
import { GETSPORTS } from "../graphql/queries/getSports";
import { useQuery } from "@apollo/client";

const useSports = () => {
  const { data, loading } = useQuery(GETSPORTS);

  const sports = useMemo(() => {
    return data;
  }, [data]);


  return {
    sports,
    loading,
  };
};

export default useSports;

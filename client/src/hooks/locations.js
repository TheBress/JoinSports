import { useMemo } from "react";
import { useQuery } from "@apollo/client";
import { GETLOCATION } from "../graphql/queries/getLocations";

const useLocations = () => {
  const { data, loading } = useQuery(GETLOCATION);

  const locations = useMemo(() => {
    return data;
  }, [data]);


  return {
    locations,
    loading,
  };
};

export default useLocations;

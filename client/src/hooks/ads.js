import { useMemo } from "react";
import { useQuery } from "@apollo/client";
import { GETAD, GETADS, GET_LAST_ADS } from "../graphql/queries/getAds";

export const UserAds = (userId) => {
  const {
    data,
    loading: loadingAd,
    refetch: refetchAds,
  } = useQuery(GETADS, { variables: { id: userId } });

  const myAds = useMemo(() => {
    return data;
  }, [data]);

  return {
    myAds,
    loadingAd,
    refetchAds,
  };
};

export const AllAdsData = () => {
  const { data, loading: loadingAd, refetch: refetchAllAds } = useQuery(GETADS);

  const allAds = useMemo(() => {
    return data;
  }, [data]);

  return {
    allAds,
    loadingAd,
    refetchAllAds,
  };
};

export const UserAd = (userId) => {
  const {
    data,
    loading,
    refetch: refetchAd,
  } = useQuery(GETAD, { variables: { id: userId } });

  const Ad = useMemo(() => {
    return data;
  }, [data]);

  return {
    Ad,
    loading,
    refetchAd,
  };
};

export const LastAds = () => {
  const { data, loading, refetch: refetchLastAds } = useQuery(GET_LAST_ADS);

  const lastAds = useMemo(() => {
    return data;
  }, [data]);

  return {
    refetchLastAds,
    lastAds,
    loading,
  };
};

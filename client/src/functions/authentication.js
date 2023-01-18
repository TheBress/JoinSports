import { useHistory } from "react-router-dom";
import { getToken } from "../graphql/config/auth";
import isAuth from "../hooks/isAuth";

export const Authentication = () => {
  const history = useHistory();
  const isAuthenticated = getToken();
  if (isAuthenticated === null) history.push("/login");
};

export const CompleteProfile = () => {
  const history = useHistory();
  const { me, loading } = isAuth();
  const dataUser = me?.meExtended;
  if (
    !loading &&
    (dataUser?.cityResidence === null ||
      dataUser?.height === null ||
      dataUser?.weigth === null ||
      dataUser?.nationality === null ||
      dataUser?.favoriteSports.length === 0 ||
      dataUser?.birthDate === null ||
      dataUser?.description === null ||
      dataUser?.sex === null)
  ) {
    history.push("/");
  }
};

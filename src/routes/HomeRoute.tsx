import { useRecoilValue } from "recoil";

import { sessionStore } from "../stores";
import Authed from "../components/home/Authed";
import Public from "../components/home/Public";
import { useAuthedUser } from "../lib/auth/amplify-auth";

const HomeRoute = () => {
  // const session = useRecoilValue(sessionStore);
  const { user, loading, error } = useAuthedUser();

  if (user) {
    return <Authed />;
  }

  return <Public />;
};

export default HomeRoute;

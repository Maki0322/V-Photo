import { useEffect, useState } from "react";
import { useSetRecoilState } from "recoil";
import { onAuthStateChanged } from "firebase/auth";
import { userAuthState } from "../state/userAuthState";
import { userState } from "../state/userState";
import { auth } from "./firebase";

export const useAuth = () => {
  const [isLoading, setIsLoading] = useState(true);
  const setUser = useSetRecoilState(userState);
  const setUserAuth = useSetRecoilState(userAuthState);

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user === null) return
      setUserAuth(user.uid !== "")
      setUser(user);
      setIsLoading(false);
    });
    setIsLoading(false);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return { isLoading };
};
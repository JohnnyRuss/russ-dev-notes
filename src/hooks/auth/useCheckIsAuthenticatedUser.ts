/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { jwtDecode as decode } from "jwt-decode";

import { LS } from "@/utils";
import { VITE_ADMIN_USERNAME } from "@/config/env";
import { DecodedUserT } from "@/interface/db/user.types";

export default function useCheckIsAuthenticatedUser(
  runOnMount: boolean = false
) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const [decodedUser, setDecodedUser] = useState<{
    _id: string;
    username: string;
  } | null>(null);

  function check() {
    let isAuthenticatedUser = false;

    const token = LS.getJWT();
    const decodedUser: DecodedUserT | null = token ? decode(token) : null;

    if (token && decodedUser && decodedUser.username === VITE_ADMIN_USERNAME)
      isAuthenticatedUser = true;
    else {
      LS.removeJWT();
      isAuthenticatedUser = false;
    }

    setIsAuthenticated(isAuthenticatedUser);

    setDecodedUser(() => ({
      _id: decodedUser?._id || "",
      username: decodedUser?.username || "",
    }));

    return { isAuthenticatedUser, decodedUser };
  }

  useEffect(() => {
    if (!runOnMount) return;

    const { isAuthenticatedUser } = check();

    setIsAuthenticated(isAuthenticatedUser);
  }, [runOnMount]);

  return { check, isAuthenticated, decodedUser };
}

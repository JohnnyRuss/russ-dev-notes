/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { PATHS } from "@/config/paths";
import useCheckIsAuthenticatedUser from "./useCheckIsAuthenticatedUser";
import { logger } from "@/utils";

export default function useRedirectUnAuthorized(redirectPath?: string) {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  const { check } = useCheckIsAuthenticatedUser();

  useEffect(() => {
    (async () => {
      try {
        const { isAuthenticatedUser } = check();
        if (!isAuthenticatedUser)
          navigate(redirectPath || PATHS.selection_page);
      } catch (error) {
        logger(error);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return { loading };
}

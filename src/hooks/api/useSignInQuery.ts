import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AxiosResponse } from "axios";

import { logger, LS } from "@/utils";
import { PATHS } from "@/config/paths";
import { axiosPublicQuery } from "@/services/axios";

export default function useSignInQuery() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const signIn = async (credentials: {
    username: string;
    password: string;
  }) => {
    try {
      setLoading(true);
      setErrorMessage("");

      const { data }: AxiosResponse<{ accessToken: string }> =
        await axiosPublicQuery.post("/auth/signin", credentials);

      LS.setJWT(data.accessToken);

      navigate(PATHS.selection_page, { replace: true });
    } catch (error) {
      const message = logger(error, false);
      setErrorMessage(message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return { errorMessage, loading, signIn };
}

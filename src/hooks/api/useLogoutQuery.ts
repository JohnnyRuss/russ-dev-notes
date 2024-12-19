import { logger, LS } from "@/utils";
import { axiosPrivateQuery } from "@/services/axios";
import { useState } from "react";

export default function useLogoutQuery() {
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const signOut = async () => {
    try {
      setLoading(true);
      setErrorMessage("");

      await axiosPrivateQuery.post("/auth/logout");

      LS.removeJWT();
    } catch (error) {
      const message = logger(error, false);
      setErrorMessage(message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return { errorMessage, loading, signOut };
}

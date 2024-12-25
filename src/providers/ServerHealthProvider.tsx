import { AxiosResponse } from "axios";
import { createContext, useState, useEffect } from "react";

import { logger } from "@/utils";
import { axiosPublicQuery } from "@/services/axios";

type ServerHealthProviderT = {
  children: React.ReactNode;
};

const ServerHealthContext = createContext({});

const ServerHealthProvider: React.FC<ServerHealthProviderT> = ({
  children,
}) => {
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const [serverIsAlive, setServerIsAlive] = useState<boolean>(false);

  async function checkServerHealth() {
    try {
      const {
        data: { isAlive },
      }: AxiosResponse<{ isAlive: boolean }> = await axiosPublicQuery.post(
        "/health"
      );

      setServerIsAlive(isAlive);
    } catch (error) {
      logger(error);
    }
  }

  useEffect(() => {
    setIsMounted(true);
    checkServerHealth();
  }, []);

  useEffect(() => {
    if (!isMounted || serverIsAlive) return;

    const intervalId = setInterval(() => {
      checkServerHealth();
    }, 5000);

    return () => {
      clearInterval(intervalId);
    };
  }, [isMounted, serverIsAlive]);

  return (
    <ServerHealthContext.Provider value={{}}>
      {serverIsAlive ? (
        children
      ) : (
        <div className="fixed inset-0 flex flex-col justify-center items-center gap-5 bg-white text-app-dark-primary">
          <p className="font-semibold text-3xl">Server is Awakening...</p>

          <p className="text-center underline text-lg">
            <span>This showcase application is hosted as a free service.</span>
            <br />
            <span>
              Because of this, the initial visit may take up 1m to load data.
            </span>
            <br />
            <span>
              In order to avoid confusion whether the application is ready to
              use,
            </span>
            <br />
            <span>we are checking server health automatically.</span>
          </p>

          <p className="font-semibold text-xl">Thanks for your patience 🙏✨</p>
        </div>
      )}
    </ServerHealthContext.Provider>
  );
};

export default ServerHealthProvider;

import { useState, useEffect } from "react";
import { AxiosResponse } from "axios";

import { logger } from "@/utils";
import { axiosPublicQuery } from "@/services/axios";

import { TopicT } from "@/interface/db/categories.types";

export default function useTopicsQuery() {
  const [topics, setTopics] = useState<Array<TopicT>>([]);
  const [loading, setLoading] = useState<boolean>(false);

  async function getTopics() {
    try {
      setLoading(true);

      const { data }: AxiosResponse<Array<TopicT>> = await axiosPublicQuery.get(
        "/categories/topics"
      );

      setTopics(() => data);
    } catch (error) {
      logger(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getTopics();

    return () => {
      setTopics(() => []);
      setLoading(false);
    };
  }, []);

  return { loading, topics };
}

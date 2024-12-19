import { useState, useEffect } from "react";
import { AxiosResponse } from "axios";

import { logger } from "@/utils";
import { axiosPublicQuery } from "@/services/axios";
import { ArticleT } from "@/interface/db/article.types";

export default function useGetArticlesQuery() {
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<Array<ArticleT>>([]);

  async function getArticles() {
    try {
      setLoading(true);

      const { data }: AxiosResponse<Array<ArticleT>> =
        await axiosPublicQuery.get("/articles");

      setData(() => data);
    } catch (error) {
      logger(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getArticles();

    return () => {
      setData(() => []);
    };
  }, []);

  return { loading, data };
}

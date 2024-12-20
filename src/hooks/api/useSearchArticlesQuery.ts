import { AxiosResponse } from "axios";
import { axiosPublicQuery } from "@/services/axios";
import { logger } from "@/utils";
import { SearchArticleResponseT } from "@/interface/db/article.types";
import { useState } from "react";

export default function useSearchArticlesQuery() {
  const [data, setData] = useState<SearchArticleResponseT>([]);
  const [loading, setLoading] = useState(false);

  const searchArticles = async (query: string, category?: string) => {
    try {
      setLoading(true);

      const { data }: AxiosResponse<SearchArticleResponseT> =
        await axiosPublicQuery.get(
          `/articles/search?search=${query}${
            category ? `&category=${category}` : ""
          }`
        );

      setData(data);
    } catch (error) {
      logger(error);
    } finally {
      setLoading(false);
    }
  };

  return { searchArticles, data, setData, loading };
}

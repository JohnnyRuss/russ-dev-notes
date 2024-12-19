import { AxiosResponse } from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { logger } from "@/utils";
import { axiosPublicQuery } from "@/services/axios";
import { ArticleT } from "@/interface/db/article.types";
import { useSearchParams } from "@/hooks/utils";

export default function useGetArticleQuery(runOnMount = true) {
  const { slug } = useParams();

  const [loading, setLoading] = useState<boolean>(true);
  const [data, setData] = useState<ArticleT>(null);
  const [error, setError] = useState({ error: false, message: "" });

  async function getArticle(articleSlug: string) {
    try {
      if (!articleSlug) return;

      setLoading(true);
      setError(() => ({ error: false, message: "" }));

      const { data }: AxiosResponse<ArticleT> = await axiosPublicQuery.get(
        `/articles/${articleSlug}`
      );

      setData(() => data);
    } catch (error) {
      const message = logger(error);
      setError(() => ({ error: true, message }));
    } finally {
      setLoading(false);
    }
  }

  const cleanUp = () => {
    setData(() => null);
    setLoading(true);
    setError(() => ({ error: false, message: "" }));
  };

  useEffect(() => {
    if (!slug || !runOnMount) return cleanUp();

    getArticle(slug);

    return () => {
      cleanUp();
    };
  }, [slug]);

  const { getParam } = useSearchParams();
  const articleId = getParam("article");

  useEffect(() => {
    if (!articleId || !runOnMount) return cleanUp();

    getArticle(articleId);

    return () => {
      cleanUp();
    };
  }, [articleId]);

  return { loading, error, data, getArticle };
}

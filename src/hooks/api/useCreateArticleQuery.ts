import { useState } from "react";
import { AxiosResponse } from "axios";
import { useNavigate } from "react-router-dom";

import {
  CreateArticleParamsT,
  CreateArticleResponseT,
} from "@/interface/db/article.types";
import { axiosPrivateQuery } from "@/services/axios";
import { useQuillFitValueUntilSave } from "@/hooks/utils/quill";

import { logger } from "@/utils";
import { DYNAMIC_ROUTES } from "@/config/paths";

export default function useCreateArticleQuery() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);

  const { fit } = useQuillFitValueUntilSave();

  async function create(
    credentials: CreateArticleParamsT,
    isUpdating: boolean,
    slug?: string
  ) {
    try {
      setLoading(true);

      const body = fit(credentials.body);

      const articleData = {
        ...credentials,
        body,
      };

      let articleId: string = "";

      if (isUpdating) {
        if (!slug) return;

        const {
          data: { article },
        }: AxiosResponse<CreateArticleResponseT> = await axiosPrivateQuery.put(
          `/articles/${slug}`,
          articleData
        );

        articleId = article;
      } else {
        const {
          data: { article },
        }: AxiosResponse<CreateArticleResponseT> = await axiosPrivateQuery.post(
          "/articles",
          articleData
        );

        articleId = article;
      }

      navigate(DYNAMIC_ROUTES.article_page(articleId));
    } catch (error) {
      logger(error);
    } finally {
      setLoading(false);
    }
  }

  return { loading, create };
}

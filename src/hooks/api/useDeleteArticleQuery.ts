import { useState } from "react";

import { logger } from "@/utils";
import { useSearchParams } from "@/hooks/utils";
import { axiosPrivateQuery } from "@/services/axios";

export default function useDeleteArticleQuery() {
  const { removeParam } = useSearchParams();
  const [loading, setLoading] = useState<boolean>(false);

  const onDelete = async (slug: string) => {
    try {
      if (!slug) return;

      setLoading(true);

      await axiosPrivateQuery.delete(`/articles/${slug}`);

      removeParam("article");
    } catch (error) {
      logger(error);
    } finally {
      setLoading(false);
    }
  };

  return { loading, onDelete };
}

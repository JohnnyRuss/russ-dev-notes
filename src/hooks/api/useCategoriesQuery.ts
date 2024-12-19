import { useEffect, useState } from "react";
import { AxiosResponse } from "axios";

import { logger } from "@/utils";
import { axiosPublicQuery } from "@/services/axios";

import { CategoryT } from "@/interface/db/categories.types";

export default function useCategoriesQuery() {
  const [categories, setCategories] = useState<Array<CategoryT>>([]);
  const [loading, setLoading] = useState<boolean>(false);

  async function getCategories() {
    try {
      setLoading(true);

      const { data }: AxiosResponse<Array<CategoryT>> =
        await axiosPublicQuery.get("/categories");

      setCategories(() => data);
    } catch (error) {
      logger(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getCategories();

    return () => {
      setCategories(() => []);
      setLoading(false);
    };
  }, []);

  return { loading, categories };
}

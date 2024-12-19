import {
  SelectionTreeResponseT,
  SelectionTreeT,
} from "@/interface/db/article.types";
import { axiosPublicQuery } from "@/services/axios";
import { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { useSearchParams } from "@/hooks/utils";

export default function useGetTreeSelectionQuery() {
  const [loading, setLoading] = useState<boolean>(true);
  const [tree, setTree] = useState<SelectionTreeT | null>(null);

  async function getTree(category: string) {
    try {
      setLoading(true);

      const { data }: AxiosResponse<SelectionTreeResponseT> =
        await axiosPublicQuery.get(`/articles/tree?category=${category}`);

      setTree(() =>
        Object.keys(data).map((key) => ({
          key,
          parentKey: key,
          isTopic: true,
          title: data[key].title,
          children: data[key].children.map((child) => ({
            ...child,
            isTopic: false,
            parentKey: key,
          })),
        }))
      );
    } catch (error) {
    } finally {
      setLoading(false);
    }
  }

  const { getParam } = useSearchParams();
  const category = getParam("category");

  useEffect(() => {
    if (!category) return;

    getTree(category);
  }, [category]);

  return { loading, tree, setTree };
}

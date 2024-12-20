import { CategoryT, TopicT } from "./categories.types";

export type ArticleT = {
  _id: string;
  slug: string;
  title: string;
  body: string;
  category: CategoryT;
  topic: TopicT;
  updatedAt: string;
  createdAt: string;
};

export type CreateArticleParamsT = {
  title: string;
  category: string;
  topic: string;
  body: string;
};

export type CreateArticleResponseT = {
  article: string;
};

export type SelectionTreeResponseT = Record<
  string,
  {
    title: string;
    children: Array<{ title: string; slug: string; key: string }>;
  }
>;

export type SelectionTreeItemT = {
  title: string;
  key: string;
  parentKey: string;
  isTopic: boolean;
  children: Array<{
    title: string;
    slug: string;
    key: string;
    parentKey: string;
  }>;
};

export type SearchArticleT = {
  _id: string;
  slug: string;
  title: string;
  category: CategoryT;
  topic: TopicT;
};

export type SearchArticleResponseT = Array<SearchArticleT>;

export type SelectionTreeT = Array<SelectionTreeItemT>;

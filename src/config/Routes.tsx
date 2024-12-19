import { PATHS } from "@/config/paths";
import * as Pages from "@/pages";

const Router = [
  {
    title: "selection-page",
    path: PATHS.selection_page,
    element: <Pages.SelectionPage />,
    children: [],
  },
  {
    title: "blog-page",
    path: PATHS.blog_page,
    element: <Pages.ContentPage />,
    children: [],
  },
  {
    title: "article-page",
    path: PATHS.article_page,
    element: <Pages.ArticlePage />,
    children: [],
  },
  {
    title: "create-page",
    path: PATHS.create_page,
    element: <Pages.CreateArticlePage />,
    children: [],
  },
  {
    title: "auth-page",
    path: PATHS.auth_page,
    element: <Pages.AuthPage />,
    children: [],
  },
  {
    title: "not-found-page",
    path: PATHS.not_found_page,
    element: <Pages.NotFoundPage />,
    children: [],
  },
];

export { Router };

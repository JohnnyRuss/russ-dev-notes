import { VITE_AUTH_ROUTE } from "./env";

const PATHS = {
  selection_page: "/",
  blog_page: "/blog",
  article_page: "/blog/:slug",
  create_page: "/admin/notes/create",
  auth_page: VITE_AUTH_ROUTE,
  not_found_page: "*",
};

const DYNAMIC_ROUTES = {
  article_page: (slug: string) => PATHS.article_page.replace(":slug", slug),
};

export { PATHS, DYNAMIC_ROUTES };

import { Link } from "react-router-dom";

import { PATHS } from "@/config/paths";
import { useSearchParams } from "@/hooks/utils";
import { useCheckIsAuthenticatedUser } from "@/hooks/auth";

import Article from "@/components/Article/Article";
import { Plus, Home } from "@/components/Layouts/Icons";
import { Search } from "@/components/Layouts";
import SideBarTree from "@/components/SideBarTree/SideBarTree";

const Blog: React.FC = () => {
  const { getParam } = useSearchParams();
  const articleId = getParam("article");

  const { isAuthenticated } = useCheckIsAuthenticatedUser(true);

  return (
    <div className="bg-white text-white min-h-[100svh] flex items-start">
      <div className="sticky top-0 left-0 z-[999]">
        <SideBarTree />
      </div>

      <div className="w-full xl:mx-8 pt-4 pb-8 flex flex-col gap-8">
        {!articleId && (
          <div
            className={`flex ${
              isAuthenticated ? "flex-col" : "flex-row items-center"
            } gap-4`}
          >
            <div className="flex items-center gap-4 xl:gap-8 pl-9 pr-1 xl:px-0">
              {isAuthenticated && (
                <Link
                  to={PATHS.create_page}
                  className="w-full bg-app-dark-primary py-3 xl:py-4 rounded-lg text-center font-semibold text-xl flex items-center justify-center gap-4"
                >
                  <Plus />
                  <span>Add Article</span>
                </Link>
              )}

              <Link
                to={PATHS.selection_page}
                className="text text-5xl text-app-dark-primary"
              >
                <Home />
              </Link>
            </div>

            <div className="w-full pr-4 xl:pr-0">
              <Search />
            </div>
          </div>
        )}

        {articleId ? (
          <div className="pl-4 xl:pl-0">
            <Article />
          </div>
        ) : (
          <figure className="w-full h-[75svh] flex justify-center items-center">
            <img
              src="/assets/blog.jpg"
              alt=""
              className="object-contain w-full xl:w-1/2"
            />
          </figure>
        )}
      </div>
    </div>
  );
};

export default Blog;

import { Link } from "react-router-dom";

import { PATHS } from "@/config/paths";
import { useCheckIsAuthenticatedUser } from "@/hooks/auth";

import { Search } from "@/components/Layouts";
import { Plus, Home, Burger } from "@/components/Layouts/Icons";
import { useToggleSideBarNavTree } from "@/hooks/utils";

const BlogHeader: React.FC = () => {
  const { isAuthenticated } = useCheckIsAuthenticatedUser(true);

  const { toggleNavBar } = useToggleSideBarNavTree();

  return (
    <div
      className={`flex ${
        isAuthenticated ? "flex-col" : "flex-row items-center"
      } gap-4`}
    >
      <div className="flex items-center gap-4 xl:gap-8 px-2 xl:px-0">
        <button
          onClick={toggleNavBar}
          className="text-app-dark-primary text-3xl"
        >
          <Burger />
        </button>

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
          className="text text-4xl sm:text-5xl text-app-dark-primary"
        >
          <Home />
        </Link>
      </div>

      <div className="w-full px-2 xl:px-0">
        <Search />
      </div>
    </div>
  );
};

export default BlogHeader;

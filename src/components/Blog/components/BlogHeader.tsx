import { Link } from "react-router-dom";

import { PATHS } from "@/config/paths";
import { useCheckIsAuthenticatedUser } from "@/hooks/auth";

import { Search } from "@/components/Layouts";
import { Plus, Home } from "@/components/Layouts/Icons";

const BlogHeader: React.FC = () => {
  const { isAuthenticated } = useCheckIsAuthenticatedUser(true);

  return (
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
          className="text text-4xl sm:text-5xl text-app-dark-primary"
        >
          <Home />
        </Link>
      </div>

      <div className="w-full pr-4 xl:pr-0">
        <Search />
      </div>
    </div>
  );
};

export default BlogHeader;

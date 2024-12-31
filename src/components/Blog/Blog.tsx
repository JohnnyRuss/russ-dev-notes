import { useSearchParams } from "@/hooks/utils";

import Article from "@/components/Article/Article";

import BlogHeader from "./components/BlogHeader";
import EmptyBlogFigure from "./components/EmptyBlogFigure";
import SideBarTree from "@/components/SideBarTree/SideBarTree";

const Blog: React.FC = () => {
  const { getParam } = useSearchParams();
  const articleId = getParam("article");

  return (
    <div className="bg-white text-white min-h-[100svh] flex items-start">
      <div className="sticky top-0 left-0 z-[999]">
        <SideBarTree />
      </div>

      <div className="w-full xl:mx-8 pt-4 pb-8 flex flex-col gap-8">
        {!articleId && <BlogHeader />}

        {articleId ? <Article /> : <EmptyBlogFigure />}
      </div>
    </div>
  );
};

export default Blog;

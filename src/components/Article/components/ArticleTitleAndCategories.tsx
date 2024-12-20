import { Link } from "react-router-dom";
import { PATHS } from "@/config/paths";
import { ArticleT } from "@/interface/db/article.types";

type ArticleTitleAndCategoriesT = {
  title: string;
  category: ArticleT["category"];
  topic: ArticleT["topic"];
};

const ArticleTitleAndCategories: React.FC<ArticleTitleAndCategoriesT> = ({
  title,
  topic,
  category,
}) => {
  return (
    <div className="text-app-dark-primary">
      <h1 className="text-2xl sm:text-4xl font-semibold">{title}</h1>

      <div className="flex items-center gap-6 capitalize mt-3 text-sm sm:text-base">
        <div>
          <span>
            <strong>Category:</strong>
          </span>
          &nbsp;&nbsp;
          <Link
            to={`${PATHS.blog_page}?category=${category.query}`}
            className="underline"
          >
            {category.title}
          </Link>
        </div>

        <div>
          <span>
            <strong>Topic:</strong>
          </span>
          &nbsp;&nbsp;
          <Link
            className="underline"
            to={`${PATHS.blog_page}?category=${category.query}&topic=${topic.query}`}
          >
            {topic.title}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ArticleTitleAndCategories;

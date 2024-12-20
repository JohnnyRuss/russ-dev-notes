import { SearchArticleT } from "@/interface/db/article.types";
import { Link } from "react-router-dom";

type ResultItemT = {
  article: SearchArticleT;
};

const ResultItem: React.FC<ResultItemT> = ({ article }) => {
  return (
    <Link
      to={`/blog?category=${article.category.query}&topic=${article.topic.query}&article=${article.slug}`}
      className="flex flex-col gap-1 border-b border-b-app-gray-primary pb-4 last:border-none"
    >
      <h1 className="text-lg font-bold">{article.title}</h1>

      <div className="flex items-center gap-4">
        <p className="text-sm flex items-center">
          <span className="font-medium">Category:</span>
          &nbsp;
          <span className="text-blue-600 capitalize">
            {article.category.title}
          </span>
        </p>
        <p className="text-sm flex items-center">
          <span className="font-medium">Topic:</span>
          &nbsp;
          <span className="text-blue-600 capitalize">
            {article.topic.title}
          </span>
        </p>
      </div>
    </Link>
  );
};

export default ResultItem;

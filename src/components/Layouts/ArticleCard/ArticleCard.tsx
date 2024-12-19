import { Link } from "react-router-dom";

import { ArticleT } from "@/interface/db/article.types";

import { useQuillValue } from "@/hooks/utils/quill";
import { DYNAMIC_ROUTES } from "@/config/paths";

type ArticleCardT = {
  article: ArticleT;
};

const ArticleCard: React.FC<ArticleCardT> = ({ article }) => {
  const { description } = useQuillValue(article.body, undefined);

  return (
    <div className="flex flex-col gap-4 text-app-dark-primary">
      <h4 className="text-2xl w-full">
        <Link to={DYNAMIC_ROUTES.article_page(article.slug)} className="w-full">
          {article.title}
        </Link>
      </h4>
      <p>{description}</p>
    </div>
  );
};

export default ArticleCard;

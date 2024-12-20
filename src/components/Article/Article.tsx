import { useState } from "react";

import { useGetArticleQuery } from "@/hooks/api";

import * as UI from "./components";
import { QuillReadOnly, Spinner } from "@/components/Layouts";

const Article: React.FC = () => {
  const { data, loading, error } = useGetArticleQuery();
  const [showOnlyCodeSnippets, setShowOnlyCodeSnippets] = useState(false);

  return loading ? (
    <Spinner />
  ) : error.error ? (
    <UI.NotFoundMessage message={error.message} />
  ) : (
    <div className="min-h-[100svh] relative">
      <div className="w-full max-w-[1000px] mx-auto flex flex-col gap-3">
        <div className="px-3 flex flex-col items-start justify-between gap-7">
          <UI.ArticleTitleAndCategories
            title={data.title}
            topic={data.topic}
            category={data.category}
          />
        </div>

        <div className="flex items-center justify-between w-full sticky top-0 left-0 right-0 px-4 py-4 z-[99] bg-white">
          <UI.ArticleActions slug={data.slug} />

          <UI.ShowCodeButton
            showOnlyCodeSnippets={showOnlyCodeSnippets}
            setShowOnlyCodeSnippets={setShowOnlyCodeSnippets}
          />
        </div>

        <QuillReadOnly
          value={data?.body}
          showOnlyCodeSnippets={showOnlyCodeSnippets}
        />

        <UI.ScrollTopButton />
      </div>
    </div>
  );
};

export default Article;

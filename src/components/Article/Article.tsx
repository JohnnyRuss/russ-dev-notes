import { useState } from "react";

import { useGetArticleQuery } from "@/hooks/api";

import ArticleActions from "./ArticleActions";
import ScrollTopButton from "./ScrollTopButton";
import { QuillReadOnly, Spinner } from "@/components/Layouts";
import ArticleTitleAndCategories from "./ArticleTitleAndCategories";
import { Article as ArticleIcon, Code } from "@/components/Layouts/Icons";

const Article: React.FC = () => {
  const { data, loading, error } = useGetArticleQuery();
  const [showOnlyCodeSnippets, setShowOnlyCodeSnippets] = useState(false);

  return loading ? (
    <Spinner />
  ) : error.error ? (
    <div className="text-app-dark-primary min-h-[100svh] flex flex-col items-center justify-center gap-4">
      <span className="text-4xl font-semibold text-app-red-primary tracking-wider">
        404
      </span>
      <p className="text-xl font-medium tracking-wider">{error.message}</p>
    </div>
  ) : (
    <div className="min-h-[100svh] relative">
      <div className="w-full max-w-[1000px] mx-auto flex flex-col gap-3">
        <div className="px-3 flex flex-col items-start justify-between gap-7">
          <ArticleTitleAndCategories
            title={data.title}
            topic={data.topic}
            category={data.category}
          />
        </div>

        <div className="flex items-center justify-between w-full sticky top-0 left-0 right-0 px-4 py-4 z-[999] bg-white">
          <ArticleActions slug={data.slug} />

          <button
            onClick={() => setShowOnlyCodeSnippets((prev) => !prev)}
            className="bg-app-dark-primary text-white text-lg px-6 py-3 rounded-md flex items-center gap-4"
          >
            <span className="leading-none">
              {showOnlyCodeSnippets ? "Show Article" : "Show Code"}
            </span>
            <span className="leading-none flex items-center justify-center translate-y-[1px]">
              {showOnlyCodeSnippets ? <ArticleIcon /> : <Code />}
            </span>
          </button>
        </div>

        <QuillReadOnly
          value={data?.body}
          showOnlyCodeSnippets={showOnlyCodeSnippets}
        />

        <ScrollTopButton />
      </div>
    </div>
  );
};

export default Article;

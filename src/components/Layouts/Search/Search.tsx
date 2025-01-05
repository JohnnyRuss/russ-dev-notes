import { useState, useEffect } from "react";

import { useSearchParams } from "@/hooks/utils";
import { useSearchArticlesQuery } from "@/hooks/api";

import ResultItem from "./ResultItem";
import ResultsHead from "./ResultsHead";
import SearchField from "./SearchField";
import SearchMessages from "./SearchMessages";

const Search: React.FC = () => {
  const [search, setSearch] = useState<string>("");
  const [openSearch, setOpenSearch] = useState(false);

  const { getParam, removeParam, setParam } = useSearchParams();

  const currentSearch = getParam("search");
  const currentCategory = getParam("category") || "";

  const { searchArticles, data, setData, loading } = useSearchArticlesQuery();

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    timeoutId = setTimeout(() => {
      if (search === "") {
        removeParam("search");
        setData(() => []);
      } else {
        searchArticles(search, currentCategory);
        setParam("search", search);
      }
    }, 1000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [search]);

  useEffect(() => {
    if (currentSearch) setSearch(currentSearch);
  }, []);

  return (
    <div className="relative text-app-dark-primary">
      <SearchField
        search={search}
        setData={setData}
        setSearch={setSearch}
        setOpenSearch={setOpenSearch}
      />

      {openSearch && (
        <>
          <div className="fixed inset-0" onClick={() => setOpenSearch(false)} />
          <div className="absolute left-0 right-0 z-20 top-[120%] bg-white shadow-2xl h-[350px] px-5 py-3 rounded-lg">
            <div className="h-full overflow-y-auto scrollbar pr-3">
              <ResultsHead resultCount={data.length} />

              <div className="flex flex-col items-start gap-4 mt-2 sm:mt-4">
                {data.length > 0 ? (
                  data.map((article) => (
                    <ResultItem key={article._id} article={article} />
                  ))
                ) : (
                  <SearchMessages search={search} loading={loading} />
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Search;

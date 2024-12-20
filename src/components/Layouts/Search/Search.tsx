import { useState, useEffect } from "react";

import { useSearchParams } from "@/hooks/utils";
import { useSearchArticlesQuery } from "@/hooks/api";

import ResultsHead from "./ResultsHead";
import ResultItem from "./ResultItem";
import { Search as SearchIcon } from "@/components/Layouts/Icons";
import SearchMessages from "./SearchMessages";

const Search: React.FC = () => {
  const [search, setSearch] = useState<string>("");
  const [openSearch, setOpenSearch] = useState(false);

  const { getParam, removeParam, setParam } = useSearchParams();

  const currentSearch = getParam("search");
  const currentCategory = getParam("category") || "";

  const onFocus = () => setOpenSearch(true);

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
      <div className="border shadow-2xl rounded-full overflow-hidden bg-white px-5 py-2 w-full flex items-center justify-between gap-2 outline-none relative z-10">
        <input
          type="text"
          id="search"
          value={search}
          onFocus={onFocus}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full outline-none placeholder:italic placeholder:tracking-wider"
          placeholder="Search For Articles..."
        />
        <label
          htmlFor="search"
          className="text-2xl cursor-pointer text-app-gray-primary"
        >
          <SearchIcon />
        </label>
      </div>

      {openSearch && (
        <>
          <div className="fixed inset-0" onClick={() => setOpenSearch(false)} />
          <div className="absolute left-0 right-0 z-20 top-[120%] bg-white shadow-2xl h-[350px] px-5 py-3 rounded-lg">
            <div className="h-full overflow-y-auto scrollbar">
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

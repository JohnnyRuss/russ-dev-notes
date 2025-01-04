import { Search as SearchIcon, Close } from "@/components/Layouts/Icons";
import { SearchArticleResponseT } from "@/interface/db/article.types";

type SearchFieldT = {
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  setOpenSearch: React.Dispatch<React.SetStateAction<boolean>>;
  setData: React.Dispatch<React.SetStateAction<SearchArticleResponseT>>;
};

const SearchField: React.FC<SearchFieldT> = ({
  search,
  setData,
  setSearch,
  setOpenSearch,
}) => {
  const onFocus = () => setOpenSearch(true);

  const onClearSearch = () => {
    setSearch("");
    setData(() => []);
  };

  return (
    <div className="border shadow-2xl rounded-full overflow-hidden bg-white px-5 py-2 w-full flex items-center justify-between gap-2 outline-none relative z-10">
      <input
        type="text"
        id="search"
        value={search}
        onFocus={onFocus}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full bg-transparent outline-none placeholder:italic placeholder:tracking-wider"
        placeholder="Search For Articles..."
      />
      <label
        htmlFor="search"
        className="text-3xl cursor-pointer text-app-gray-primary flex items-center"
      >
        {search ? (
          <button onClick={onClearSearch}>
            <Close />
          </button>
        ) : (
          <SearchIcon />
        )}
      </label>
    </div>
  );
};

export default SearchField;

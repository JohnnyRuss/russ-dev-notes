type SearchMessagesT = {
  search: string;
  loading: boolean;
};

const SearchMessages: React.FC<SearchMessagesT> = ({ search, loading }) => {
  return loading ? (
    <p className="w-full text-center mt-5 font-medium tracking-wider text-xl">
      Loading
    </p>
  ) : search && loading ? (
    <p className="w-full text-center mt-5 font-medium tracking-wider text-xl">
      No results found
    </p>
  ) : (
    <p className="w-full text-center mt-5 font-medium tracking-wider text-xl">
      We are waiting for your query
    </p>
  );
};

export default SearchMessages;

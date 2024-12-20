type ResultsHeadT = {
  resultCount: number;
};

const ResultsHead: React.FC<ResultsHeadT> = ({ resultCount }) => {
  return (
    <h4 className="text-lg sm:text-xl font-bold">
      <span>Search Results</span>
      &nbsp;
      {resultCount > 0 && <span>({resultCount})</span>}
    </h4>
  );
};

export default ResultsHead;

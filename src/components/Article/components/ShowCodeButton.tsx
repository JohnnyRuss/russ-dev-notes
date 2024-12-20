import { Article, Code } from "@/components/Layouts/Icons";

type ShowCodeButtonT = {
  showOnlyCodeSnippets: boolean;
  setShowOnlyCodeSnippets: React.Dispatch<React.SetStateAction<boolean>>;
};

const ShowCodeButton: React.FC<ShowCodeButtonT> = ({
  showOnlyCodeSnippets,
  setShowOnlyCodeSnippets,
}) => {
  return (
    <button
      onClick={() => setShowOnlyCodeSnippets((prev) => !prev)}
      className="bg-app-dark-primary text-white text-base sm:text-lg px-6 py-3 rounded-md flex items-center gap-4"
    >
      <span className="leading-none">
        {showOnlyCodeSnippets ? "Show Article" : "Show Code"}
      </span>
      <span className="leading-none flex items-center justify-center translate-y-[1px]">
        {showOnlyCodeSnippets ? <Article /> : <Code />}
      </span>
    </button>
  );
};

export default ShowCodeButton;

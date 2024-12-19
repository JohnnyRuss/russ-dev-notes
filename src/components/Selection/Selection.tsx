import { logger } from "@/utils";
import SelectionItem from "./SelectionItem";

import { useLogoutQuery } from "@/hooks/api";
import { useCheckIsAuthenticatedUser } from "@/hooks/auth";

import { Spinner } from "@/components/Layouts";

const Home: React.FC = () => {
  const { isAuthenticated, check } = useCheckIsAuthenticatedUser(true);

  const { errorMessage, loading, signOut } = useLogoutQuery();

  const onLogout = async () => {
    try {
      await signOut();
      check();
    } catch (error) {
      logger(error);
    }
  };

  return (
    <div className="bg-app-red-primary min-h-[100svh] relative flex flex-col items-center justify-center gap-12">
      <div className="flex flex-col xl:flex-row items-center justify-center gap-6 xl:gap-12">
        <SelectionItem
          title="Javascript"
          logo="/assets/js.webp"
          query="javascript"
        />
        <SelectionItem
          title="ReactJS"
          logo="/assets/react.webp"
          query="react"
        />
        <SelectionItem title="NodeJS" logo="/assets/node.webp" query="node" />
      </div>

      {errorMessage && (
        <p className="text-white text-xl bg-app-black-transparent px-6 py-3 rounded-md">
          {errorMessage}
        </p>
      )}

      {isAuthenticated && (
        <button
          onClick={onLogout}
          className="absolute bottom-5 right-5 text-white underline tracking-wider"
        >
          Log Out
        </button>
      )}

      {loading && <Spinner />}
    </div>
  );
};

export default Home;

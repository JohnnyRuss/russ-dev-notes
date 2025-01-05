import { logger } from "@/utils";

import { useLogoutQuery } from "@/hooks/api";
import { useCheckIsAuthenticatedUser } from "@/hooks/auth";

import SelectionItem from "./SelectionItem";
import Footer from "@/components/Footer/Footer";
import { Search } from "@/components/Layouts";
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
    <div className="bg-app-red-primary min-h-[100svh] relative flex flex-col items-center justify-center gap-12 pt-5 xl:pt-0">
      <div className="w-full px-6 xl:w-[770px] xl:px-0">
        <Search />
      </div>

      <div className="grid grid-cols-2 xl:grid-cols-4 gap-3 sm:gap-6 xl:gap-12">
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

        <SelectionItem title="NodeJS" logo="/assets/node.webp" query="nodejs" />

        <SelectionItem
          title="Styling"
          logo="/assets/css.webp"
          query="styling"
        />
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

      <Footer className="xl:fixed text-white bottom-0 w-full" />
    </div>
  );
};

export default Home;

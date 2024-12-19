import { useRedirectUnAuthorized } from "@/hooks/auth";

import CreateArticle from "@/components/CreateArticle/CreateArticle";

const CreateArticlePage: React.FC = () => {
  const { loading } = useRedirectUnAuthorized();

  return loading ? <></> : <CreateArticle />;
};

export default CreateArticlePage;

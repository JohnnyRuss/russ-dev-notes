import { useState } from "react";
import { Link } from "react-router-dom";

import { PATHS } from "@/config/paths";
import { useRCTreeContext } from "@/providers";
import { useDeleteArticleQuery } from "@/hooks/api";
import { useCheckIsAuthenticatedUser } from "@/hooks/auth";

import DeleteDialog from "./DeleteDialog";
import { Spinner } from "@/components/Layouts";
import { Update, Delete, Home } from "@/components/Layouts/Icons";

type ArticleActionsT = {
  slug: string;
};

const ArticleActions: React.FC<ArticleActionsT> = ({ slug }) => {
  const [openDeleteDialog, setOpenDeleteDialog] = useState<boolean>(false);
  const { isAuthenticated } = useCheckIsAuthenticatedUser(true);

  const { onDelete, loading } = useDeleteArticleQuery();
  const { removeArticleFromTree } = useRCTreeContext();

  const onDeleteArticle = async () => {
    await onDelete(slug);
    removeArticleFromTree();
  };

  return (
    <>
      <div className="flex items-center gap-6 text-3xl leading-none text-app-dark-primary">
        {isAuthenticated && (
          <>
            <Link
              className="text-xl text-blue-700"
              to={`${PATHS.create_page}?update=${slug}`}
            >
              <Update />
            </Link>

            <button
              onClick={() => setOpenDeleteDialog(true)}
              className="text-app-red-primary"
            >
              <Delete />
            </button>
          </>
        )}

        <Link className="text-app-dark-primary" to={PATHS.selection_page}>
          <Home />
        </Link>

        {loading && <Spinner />}
      </div>

      {openDeleteDialog && (
        <DeleteDialog
          onDelete={onDeleteArticle}
          setOpenDeleteDialog={setOpenDeleteDialog}
        />
      )}
    </>
  );
};

export default ArticleActions;

import { createPortal } from "react-dom";

type DeleteDialogT = {
  onDelete: () => void;
  setOpenDeleteDialog: React.Dispatch<React.SetStateAction<boolean>>;
};

const DeleteDialog: React.FC<DeleteDialogT> = ({
  onDelete,
  setOpenDeleteDialog,
}) => {
  return createPortal(
    <div
      onClick={() => setOpenDeleteDialog(false)}
      className="fixed inset-0 flex items-center justify-center bg-app-black-transparent"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white px-12 py-6 flex flex-col gap-10 rounded-md shadow-2xl"
      >
        <p className="text-xl tracking-wider">
          Are you sure you want to delete this article ?
        </p>

        <div className="flex items-center gap-6 justify-end">
          <button
            onClick={() => setOpenDeleteDialog(false)}
            className="px-6 py-2 bg-app-gray-primary text-white rounded-md text-lg capitalize"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              onDelete();
              setOpenDeleteDialog(false);
            }}
            className="px-6 py-2 bg-app-red-primary text-white rounded-md text-lg capitalize"
          >
            delete
          </button>
        </div>
      </div>
    </div>,
    document.getElementById("portal")
  );
};

export default DeleteDialog;

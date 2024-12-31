import { useMemo } from "react";
import { createPortal } from "react-dom";

import { SelectField } from "@/components/Layouts/Form";
import { useCategoriesQuery, useTopicsQuery } from "@/hooks/api";
import { ReactSelectValueT } from "@/interface/ui/react-select.types";

type PublishModalT = {
  showPublishModal: boolean;
  setShowPublishModal: React.Dispatch<React.SetStateAction<boolean>>;
  onCategoryChange: (args: ReactSelectValueT) => void;
  categoryValue: ReactSelectValueT;
  onTopicChange: (args: ReactSelectValueT) => void;
  topicValue: ReactSelectValueT;
  onPublish: () => Promise<void>;
};

const PublishModal: React.FC<PublishModalT> = ({
  showPublishModal,
  setShowPublishModal,
  categoryValue,
  onCategoryChange,
  topicValue,
  onTopicChange,
  onPublish,
}) => {
  const { categories } = useCategoriesQuery();
  const { topics } = useTopicsQuery();

  const onClose = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setShowPublishModal(false);
  };

  const categoriesOptions = useMemo(
    () =>
      categories.map((category) => ({
        label: category.title,
        value: category._id,
      })),
    [categories]
  );

  const topicsOptions = useMemo(
    () =>
      topics
        .filter((topic) =>
          categoryValue ? topic.category === categoryValue.value : false
        )
        .map((topic) => ({
          label: topic.title,
          value: topic._id,
        })),
    [topics, categoryValue]
  );

  return showPublishModal ? (
    createPortal(
      <div
        onClick={onClose}
        className="fixed inset-0 flex items-center justify-center scroll-block"
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className="bg-app-dark-primary text-white w-[400px] h-[47svh] border border-app-gray-primary p-12 flex flex-col gap-6 rounded-xl shadow-2xl"
        >
          <SelectField
            label="Category"
            options={categoriesOptions}
            placeholder="Select Category..."
            value={categoryValue}
            onChange={onCategoryChange}
          />

          {categoryValue && (
            <SelectField
              label="Topics"
              options={topicsOptions}
              placeholder="Select Topic..."
              value={topicValue}
              onChange={onTopicChange}
            />
          )}

          <button
            onClick={onClose}
            className="w-full mt-auto bg-app-gray-primary text-white py-3 rounded-md font-semibold text-lg tracking-wider"
          >
            Cancel
          </button>

          <button
            onClick={onPublish}
            className="w-full bg-app-blue-secondary text-white py-3 rounded-md font-semibold text-lg tracking-wider"
          >
            Publish
          </button>
        </div>
      </div>,
      document.getElementById("portal")
    )
  ) : (
    <></>
  );
};

export default PublishModal;

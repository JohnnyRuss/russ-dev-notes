import { useState, useEffect } from "react";

import { ReactSelectValueT } from "@/interface/ui/react-select.types";

import { useSearchParams } from "@/hooks/utils";

import { useCreateArticleQuery, useGetArticleQuery } from "@/hooks/api";

import { Spinner } from "@/components/Layouts";
import QuillEditor from "./components/QuillEditor";
import PublishModal from "./components/PublishModal";
import { TextareaField } from "@/components/Layouts/Form";
import { ArrowTriangleLeft } from "@/components/Layouts/Icons";
import { useNavigate } from "react-router-dom";

const CreateArticle: React.FC = () => {
  const [body, setBody] = useState("");

  const [title, setTitle] = useState("");

  const [category, setCategory] = useState<ReactSelectValueT>(null);

  const [topic, setTopic] = useState<ReactSelectValueT>(null);

  const [showPublishModal, setShowPublishModal] = useState<boolean>(false);

  const onCategoryChange = (value: ReactSelectValueT) =>
    setCategory((prev) => (prev?.value === value.value ? null : value));

  const onTopicChange = (value: ReactSelectValueT) =>
    setTopic((prev) => (prev?.value === value.value ? null : value));

  const { getParam } = useSearchParams();

  const updatingArticleSlug = getParam("update");
  const isUpdating = updatingArticleSlug !== null;

  const { loading, create } = useCreateArticleQuery();

  const onPublish = async () => {
    try {
      setShowPublishModal(false);

      const data = {
        body,
        title,
        topic: topic.value,
        category: category.value,
      };

      await create(data, isUpdating, updatingArticleSlug);

      setTitle("");
      setCategory(null);
      setTopic(null);
      setBody("");
    } catch (error) {
      throw error;
    }
  };

  const {
    data,
    getArticle,
    loading: isLoadingArticle,
  } = useGetArticleQuery(false);

  useEffect(() => {
    if (!isUpdating) return;

    getArticle(updatingArticleSlug);
  }, [isUpdating]);

  useEffect(() => {
    if (!isUpdating || !data) return;

    setTitle(data.title || "");
    setBody(data.body || "");
    setCategory(() => ({
      value: data.category._id || "",
      label: data.category.title || "",
    }));
    setTopic(() => ({
      value: data.topic._id || "",
      label: data.topic.title || "",
    }));
  }, [isUpdating, data]);

  const isLoadingData = loading || (isUpdating && isLoadingArticle);

  const navigate = useNavigate();

  return (
    <>
      <div className="min-h-[100svh] p-4 xl:p-12 relative">
        <button
          onClick={() => navigate(-1)}
          className="text-4xl bg-app-gray-primary rounded-full flex items-center justify-center p-2 text-white absolute left-6 top-6"
        >
          <ArrowTriangleLeft />
        </button>

        <div className="w-full max-w-[1200px] mx-auto flex flex-col gap-5 xl:gap-10">
          <TextareaField
            value={title}
            placeholder="Enter Title..."
            onChange={(e) => setTitle(e.target.value)}
            className="bg-transparent text-app-dark-primary outline-none text-4xl font-semibold placeholder:font-normal placeholder:italic"
          />

          <QuillEditor
            value={body}
            setValue={setBody}
            error={false}
            message={""}
          />

          <button
            onClick={() => setShowPublishModal(true)}
            className="bg-app-dark-primary text-white py-4 rounded-md font-semibold text-2xl tracking-wider"
          >
            {isUpdating ? "Update" : "Create"}
          </button>
        </div>
      </div>

      <PublishModal
        onPublish={onPublish}
        topicValue={topic}
        onTopicChange={onTopicChange}
        categoryValue={category}
        onCategoryChange={onCategoryChange}
        showPublishModal={showPublishModal}
        setShowPublishModal={setShowPublishModal}
      />

      {isLoadingData && <Spinner />}
    </>
  );
};

export default CreateArticle;

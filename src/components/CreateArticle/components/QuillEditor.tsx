import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "highlight.js/styles/atom-one-dark.css";

import { useQuillSlider, useQuillConfig } from "@/hooks/utils/quill";
import { ErrorMessage, ModalSlider } from "@/components/Layouts";

type QuillEditorT = {
  value?: string;
  readonly?: boolean;
  error?: boolean;
  message?: string;
  setValue?: React.Dispatch<React.SetStateAction<string>>;
};

const QuillEditor: React.FC<QuillEditorT> = ({
  error,
  message,
  value = "",
  setValue,
  readonly = false,
}) => {
  const onChange = (value: string) => {
    setValue && setValue(value);
  };

  const { activeSlideIndex, setActiveSlideIndex, sliderImages } =
    useQuillSlider(readonly, value);

  const { quillRef, formats, modules } = useQuillConfig();

  return (
    <>
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <ReactQuill
          ref={quillRef}
          value={value}
          onChange={onChange}
          theme="snow"
          formats={formats}
          modules={modules}
          readOnly={readonly}
        />

        {error && <ErrorMessage message={message || ""} />}
      </div>

      {readonly && sliderImages.length > 0 && !isNaN(activeSlideIndex) && (
        <ModalSlider
          images={sliderImages}
          startIndex={activeSlideIndex}
          onClose={() => setActiveSlideIndex(NaN)}
        />
      )}
    </>
  );
};

export default QuillEditor;

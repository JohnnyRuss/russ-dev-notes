import { useEffect } from "react";
import "highlight.js/styles/atom-one-dark.css";

import ModalSlider from "./ModalSlider";
import { useQuillReadOnly, useQuillSlider } from "@/hooks/utils/quill";

type QuillReadOnlyT = { value: string; showOnlyCodeSnippets: boolean };

const QuillReadOnly: React.FC<QuillReadOnlyT> = ({
  value,
  showOnlyCodeSnippets,
}) => {
  const { quillRef, formattedValue, loading } = useQuillReadOnly(value);
  const { activeSlideIndex, setActiveSlideIndex, sliderImages } =
    useQuillSlider(true, formattedValue);

  useEffect(() => {
    if (!formattedValue) return;

    const qlEditor = document.querySelector(".ql-editor");

    if (!qlEditor) return;

    if (showOnlyCodeSnippets) qlEditor.classList.add("ql-for-code");
    else qlEditor.classList.remove("ql-for-code");
  }, [showOnlyCodeSnippets, formattedValue]);

  return (
    <>
      {!loading ? (
        <div className="quill">
          <div className="">
            <div
              ref={quillRef}
              className="ql-editor"
              dangerouslySetInnerHTML={{ __html: formattedValue }}
            />
          </div>
        </div>
      ) : null}

      <ModalSlider
        images={sliderImages}
        startIndex={activeSlideIndex}
        onClose={() => setActiveSlideIndex(NaN)}
      />
    </>
  );
};

export default QuillReadOnly;

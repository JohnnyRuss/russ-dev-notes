import { useCallback } from "react";
import ReactQuill from "react-quill";

export default function useQuillEventHandlers(
  quill: React.RefObject<ReactQuill | null>
) {
  const imageHandler = useCallback(() => {
    // Create an input element of type 'file'
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.setAttribute("multiple", "multiple");
    input.click();

    // When a file is selected
    input.onchange = () => {
      const files = Array.from(input.files);
      // Read the selected file as a data URL
      files.forEach((file) => {
        const reader = new FileReader();

        reader.onload = (e) => {
          // const imageUrl = reader.result;
          const quillEditor = quill.current.getEditor();

          // Get the current selection range and insert the image at that index
          const range = quillEditor.getSelection(true);
          quillEditor.insertEmbed(range.index, "image", e.target.result);
        };

        reader.readAsDataURL(file);
      });
    };
  }, []);

  return { imageHandler };
}

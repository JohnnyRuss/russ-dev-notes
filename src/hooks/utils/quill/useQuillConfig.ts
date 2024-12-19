import ReactQuill from "react-quill";
import { useMemo, useRef } from "react";

import { quillConfig } from "@/lib";
import { useQuillEventHandlers } from "@/hooks/utils/quill";

export default function useQuillConfig() {
  const quillRef = useRef<ReactQuill | null>(null);

  const { imageHandler } = useQuillEventHandlers(quillRef);

  const modules = useMemo(
    () => ({
      ...quillConfig.modules,
      toolbar: {
        container: (quillConfig.modules.toolbar as any).container,
        handlers: { image: imageHandler },
      },
    }),
    [imageHandler]
  );

  return {
    modules,
    quillRef,
    formats: quillConfig.formats,
  };
}

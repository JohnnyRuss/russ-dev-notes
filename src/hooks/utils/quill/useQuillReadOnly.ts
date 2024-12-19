import DOMPurify from "dompurify";
import hljs from "highlight.js";
import { useEffect, useRef, useState } from "react";

import { configureReadOnlyQuill } from "./helpers/ui.helpers";
import { logger } from "@/utils";

export default function useQuillReadOnly(value: string) {
  const quillRef = useRef<null | HTMLDivElement>(null);
  const [formattedValue, setFormattedValue] = useState<string>("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!value) return;

    (async () => {
      try {
        setLoading(true);

        const configuredValue = await configureReadOnlyQuill(value);
        setFormattedValue(() => DOMPurify.sanitize(configuredValue));
      } catch (error) {
        logger(error);
      } finally {
        setLoading(false);
      }
    })();
  }, [value]);

  useEffect(() => {
    if (!quillRef.current || !formattedValue) return;

    const codeBlocks = quillRef.current.querySelectorAll(".code-block-wrapper");

    if (!codeBlocks.length) return;

    codeBlocks.forEach((block) => {
      const copyBt = block.querySelector(".copy-btn");
      const codeBlock = block.querySelector("pre");

      if (codeBlock?.dataset.highlighted === "yes")
        delete codeBlock.dataset.highlighted;

      hljs.highlightElement(codeBlock as HTMLElement);
      copyBt.addEventListener("click", copyCodeHandler);
    });

    return () => {
      codeBlocks.forEach((block) => {
        const copyBt = block.querySelector(".copy-btn");
        copyBt.removeEventListener("click", copyCodeHandler);
      });
    };
  }, [formattedValue]);

  return { quillRef, formattedValue, loading };
}

// UTILS
function copyCodeHandler(e) {
  const codeBlock = e.currentTarget
    .closest(".code-block-wrapper")
    .querySelector("pre");
  const value = codeBlock.textContent;

  navigator.clipboard.writeText(value);
}

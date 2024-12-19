import { useEffect, useState } from "react";

export default function useQuillSlider(readonly: boolean, value: string) {
  const [sliderImages, setSliderImages] = useState<Array<string>>([]);
  const [activeSlideIndex, setActiveSlideIndex] = useState<number>(NaN);

  useEffect(() => {
    if (!readonly) return;

    const quillEl = document.querySelector(".quill");

    if (!quillEl) return;

    const imageElements = quillEl.querySelectorAll("img");

    const imgSources = Array.from(imageElements)
      .map((imgEl) => imgEl.getAttribute("src") || "")
      .filter((src) => src !== "");

    setSliderImages(() => [...imgSources]);
  }, [readonly, value]);

  useEffect(() => {
    const quillEl = document.querySelector(".quill");

    if (!quillEl) return;

    const imageElements = quillEl.querySelectorAll("img");

    const onImageClick = (e: MouseEvent) => {
      const target = e.currentTarget as HTMLElement;

      const imgSrc =
        target.tagName === "IMG" && target.getAttribute("src")
          ? target.getAttribute("src")
          : "";

      if (!imgSrc) return;

      const activeImgIndex = sliderImages.findIndex((img) => img === imgSrc);
      setActiveSlideIndex(activeImgIndex);
    };

    imageElements.forEach((el) => el.addEventListener("click", onImageClick));

    return () => {
      imageElements.forEach((el) =>
        el.removeEventListener("click", onImageClick)
      );
    };
  }, [sliderImages, activeSlideIndex]);

  return { sliderImages, activeSlideIndex, setActiveSlideIndex };
}

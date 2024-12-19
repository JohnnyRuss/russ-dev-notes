import { useState, useEffect } from "react";

import {
  Close,
  ArrowTriangleLeft,
  ArrowTriangleRight,
} from "@/components/Layouts/Icons";

type ModalSliderT = {
  images: Array<string>;
  startIndex: number;
  onClose: () => void;
} & React.ComponentProps<"div">;

const ModalSlider: React.FC<ModalSliderT> = ({
  images,
  onClose,
  startIndex,
}) => {
  const [activeIndex, setActiveIndex] = useState(NaN);

  const onNextSlide = () =>
    setActiveIndex((prev) => (prev + 1 > images.length - 1 ? 0 : prev + 1));

  const onPreviousSlide = () =>
    setActiveIndex((prev) => (prev - 1 < 0 ? images.length - 1 : prev - 1));

  useEffect(() => {
    if (!images || images.length < 1) return;

    setActiveIndex(startIndex);
  }, [startIndex, images]);

  return !isNaN(activeIndex) && activeIndex >= 0 ? (
    <div className="fixed z-99 inset-0 bg-app-black-transparent flex justify-center items-center scroll-block">
      <button className="text-white text-6xl" onClick={onPreviousSlide}>
        <ArrowTriangleLeft className="left-arrow" />
      </button>

      <div className="size-[85%]">
        <figure className="w-full h-full overflow-hidden">
          <img
            src={images[activeIndex]}
            alt=""
            title=""
            width="100%"
            loading="eager"
            className="object-contain h-full max-w-full"
          />
        </figure>
      </div>

      <button className="text-white text-6xl" onClick={onNextSlide}>
        <ArrowTriangleRight className="right-arrow" />
      </button>

      <button
        onClick={onClose}
        className="absolute top-5 right-5 text-white text-4xl"
      >
        <Close />
      </button>

      <div className="absolute bottom-4 text-2xl text-white bg-app-black-transparent px-4 py-1 rounded-full">
        <span className="leading-none">
          {activeIndex + 1} / {images.length}
        </span>
      </div>
    </div>
  ) : (
    <></>
  );
};

export default ModalSlider;

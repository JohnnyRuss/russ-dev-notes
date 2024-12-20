import { useEffect, useState } from "react";
import { ArrowTriangleLeft } from "@/components/Layouts/Icons";

type ScrollTopButtonT = {};

const ScrollTopButton: React.FC<ScrollTopButtonT> = () => {
  const [isScrolling, setIsScrolling] = useState(false);

  const onScrollTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    const handleScroll = () => {
      setIsScrolling(true);

      clearTimeout(timeout);

      timeout = setTimeout(() => {
        setIsScrolling(false);
      }, 1500);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      clearTimeout(timeout);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <button
      onClick={onScrollTop}
      className={`scroll-top sticky ml-auto translate-x-[100px] bottom-4 bg-app-black-transparent size-14 rounded-full flex items-center justify-center text-3xl transition-all ${
        isScrolling
          ? "opacity-100 scale-100 pointer-events-auto"
          : "opacity-0 scale-50 pointer-events-none"
      }`}
    >
      <ArrowTriangleLeft className="rotate-90" />
    </button>
  );
};

export default ScrollTopButton;

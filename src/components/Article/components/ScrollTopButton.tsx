import { useEffect, useState } from "react";
import { ArrowTriangleLeft } from "@/components/Layouts/Icons";

const ScrollTopButton: React.FC = () => {
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
      className={`scroll-top fixed right-4 bottom-4 z-10 bg-app-black-transparent size-14 rounded-full flex items-center justify-center text-3xl transition-all ${
        isScrolling
          ? "opacity-100 scale-100 pointer-events-auto"
          : "opacity-0 scale-50 pointer-events-none"
      }`}
    >
      <ArrowTriangleLeft className="rotate-90 text-white" />
    </button>
  );
};

export default ScrollTopButton;

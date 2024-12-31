import { useEffect, useState } from "react";

import { ArrowTriangleRight } from "@/components/Layouts/Icons";

type ToggleButtonT = {
  navIsToggled: boolean;
  toggleNavBar: () => void;
};

const ToggleButton: React.FC<ToggleButtonT> = ({
  toggleNavBar,
  navIsToggled,
}) => {
  const [isScrolling, setIsScrolling] = useState(false);

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

  return isScrolling ? (
    <button
      onClick={toggleNavBar}
      className="h-14 w-7 z-[999] rounded-full rounded-l-none absolute right-0 top-14 translate-x-full bg-white text-app-dark-primary border border-app-dark-primary flex items-center justify-center leading-none text-2xl after:absolute after:bg-white after:left-0 after:bottom-0 after:top-0 after:w-1 after:-translate-x-[2px] after:z-50 xl:hidden"
    >
      <ArrowTriangleRight
        className={`transition-transform ${
          navIsToggled ? "rotate-180 -translate-x-[5px]" : "translate-x-[0px]"
        }`}
      />
    </button>
  ) : null;
};

export default ToggleButton;

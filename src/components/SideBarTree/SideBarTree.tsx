import Tree from "rc-tree";
import { IoIosArrowDown } from "react-icons/io";

import "rc-tree/assets/index.css";
import { useRCTreeContext } from "@/providers";
import { useSearchParams } from "@/hooks/utils";

import { ArrowTriangleRight } from "@/components/Layouts/Icons";

const SideBarTree: React.FC = () => {
  const { expandedKeys, loading, onSelect, tree, treeRef } = useRCTreeContext();

  const { setParam, removeParam, getParam } = useSearchParams();
  const navIsToggled = getParam("nav") === "1";

  const toggleNavBar = () =>
    navIsToggled ? removeParam("nav") : setParam("nav", "1");

  return (
    <div
      className={`fixed xl:static z-[9999] bg-white w-[300px] border-r border-r-app-dark-primary min-h-[100svh] px-8 pt-4 pb-8 transition-transform ${
        navIsToggled ? "translate-x-0" : "-translate-x-full"
      } xl:translate-x-0`}
    >
      <button
        onClick={toggleNavBar}
        className="h-14 w-7 rounded-full rounded-l-none absolute right-0 translate-x-full bg-white text-app-dark-primary border border-app-dark-primary flex items-center justify-center leading-none text-2xl after:absolute after:bg-white after:left-0 after:bottom-0 after:top-0 after:w-1 after:-translate-x-[2px] after:z-50 xl:hidden"
      >
        <ArrowTriangleRight
          className={`transition-transform ${
            navIsToggled ? "rotate-180 -translate-x-[5px]" : "translate-x-[0px]"
          }`}
        />
      </button>

      {loading ? (
        <p>Loading Tree...</p>
      ) : (
        <Tree
          ref={treeRef}
          treeData={tree}
          checkable={false}
          showIcon={false}
          onSelect={onSelect}
          expandedKeys={expandedKeys}
          switcherIcon={({ isLeaf }: { isLeaf: boolean }) => {
            return isLeaf ? <></> : <IoIosArrowDown />;
          }}
        />
      )}
    </div>
  );
};

export default SideBarTree;

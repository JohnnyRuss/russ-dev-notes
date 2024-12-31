import Tree from "rc-tree";
import { IoIosArrowDown } from "react-icons/io";

import "rc-tree/assets/index.css";
import { useRCTreeContext } from "@/providers";
import { useToggleSideBarNavTree } from "@/hooks/utils";
import ToggleButton from "./ToggleButton";

const SideBarTree: React.FC = () => {
  const { expandedKeys, loading, onSelect, tree, treeRef } = useRCTreeContext();

  const { navIsToggled, toggleNavBar } = useToggleSideBarNavTree();

  return (
    <>
      <div
        className={`fixed xl:static z-[9999] bg-white w-[300px] border-r border-r-app-dark-primary min-h-[100svh] px-8 pt-4 pb-8 transition-transform ${
          navIsToggled ? "translate-x-0" : "-translate-x-full"
        } xl:translate-x-0`}
      >
        <ToggleButton navIsToggled={navIsToggled} toggleNavBar={toggleNavBar} />

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

      {navIsToggled && (
        <div
          onClick={toggleNavBar}
          className="fixed inset-0 bg-app-black-transparent select-none scroll-block"
        />
      )}
    </>
  );
};

export default SideBarTree;

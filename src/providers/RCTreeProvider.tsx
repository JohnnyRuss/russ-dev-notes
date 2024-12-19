import { createContext, useEffect, useRef, useState } from "react";

import { useSearchParams } from "@/hooks/utils";
import { useGetTreeSelectionQuery } from "@/hooks/api";

import { RCTreeOnSelectT } from "@/interface/ui/rc-tree.types";
import { SelectionTreeT } from "@/interface/db/article.types";

type RCTreeProviderT = {
  children: React.ReactNode;
};

type RCTreeContextT = {
  treeRef: React.RefObject<any>;
  loading: boolean;
  expandedKeys: Array<string>;
  onSelect: RCTreeOnSelectT;
  tree: SelectionTreeT;
  removeArticleFromTree: () => void;
};

export const RCTreeContext = createContext<RCTreeContextT>({
  tree: [],
  treeRef: null,
  loading: false,
  expandedKeys: [],
  onSelect: () => {},
  removeArticleFromTree: () => {},
});

const RCTreeProvider: React.FC<RCTreeProviderT> = ({ children }) => {
  const { removeParam, setParam, getParam } = useSearchParams();

  const treeRef = useRef<any>(null);
  const { loading, tree, setTree } = useGetTreeSelectionQuery();
  const [expandedBlocks, setExpandedBlocks] = useState<
    Array<{ parentKey: string; childKey: string }>
  >([]);
  const [expandedKeys, setExpandedKeys] = useState<Array<string>>();

  const onSelect: RCTreeOnSelectT = (_, info) => {
    const targetIsTopic = info.node.isTopic;

    const childKey = info.node.isTopic ? "" : info.node.key;
    const parentKey = info.node.isTopic ? info.node.key : info.node.parentKey;

    setExpandedBlocks((prevState) => {
      if (targetIsTopic) {
        const isExpanded = prevState.some(
          (block) => block.parentKey === parentKey
        );

        isExpanded ? removeParam("topic") : setParam("topic", parentKey);

        return isExpanded
          ? prevState.filter((block) => block.parentKey !== parentKey)
          : prevState
              .filter((block) => block.childKey !== "")
              .concat([{ parentKey, childKey: "" }]);
      } else {
        const isSelectedArticle = prevState.some(
          (block) => block.childKey === childKey
        );

        isSelectedArticle
          ? removeParam("article")
          : setParam("article", childKey);

        return isSelectedArticle
          ? prevState.filter((block) => block.childKey !== childKey)
          : [...prevState, { childKey, parentKey }];
      }
    });

    !targetIsTopic && removeParam("nav");
  };

  useEffect(() => {
    setExpandedKeys(() =>
      expandedBlocks.map((block) => block.childKey || block.parentKey)
    );
  }, [expandedBlocks]);

  const [isMounted, setIsMounted] = useState<boolean>(false);

  const topic = getParam("topic");
  const articleId = getParam("article");

  useEffect(() => {
    if (isMounted || loading) return;

    const currentTopic = tree.find((block) => block.key === topic);
    const currentArticle = tree
      .flatMap((block) => block.children)
      .find((child) => child.key === articleId);

    if (currentArticle)
      setExpandedBlocks(() => [
        { parentKey: currentArticle.parentKey || "", childKey: "" },
        { parentKey: currentArticle.parentKey, childKey: currentArticle.key },
      ]);
    else if (currentTopic)
      setExpandedBlocks(() => [
        { parentKey: currentTopic.key || "", childKey: "" },
      ]);

    setIsMounted(true);
  }, [topic, articleId, tree]);

  const removeArticleFromTree = () => {
    setTree((prev) =>
      prev.map((block) =>
        block.key === topic
          ? {
              ...block,
              children: [
                ...block.children.filter((child) => child.slug !== articleId),
              ],
            }
          : block
      )
    );

    setExpandedBlocks((prev) =>
      prev.filter((child) => child.childKey !== articleId)
    );
  };

  return (
    <RCTreeContext.Provider
      value={{
        treeRef,
        expandedKeys,
        loading,
        onSelect,
        tree,
        removeArticleFromTree,
      }}
    >
      {children}
    </RCTreeContext.Provider>
  );
};

export default RCTreeProvider;

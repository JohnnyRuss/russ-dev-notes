import { EventDataNode } from "rc-tree/lib/interface";
import { SelectionTreeItemT } from "@/interface/db/article.types";

type OnSelectInfoT = {
  event: "select";
  selected: boolean;
  node: EventDataNode<SelectionTreeItemT>;
  selectedNodes: SelectionTreeItemT[];
  nativeEvent: MouseEvent;
};

export type RCTreeOnSelectT = (
  selectedKeys: Array<string>,
  info: OnSelectInfoT
) => void;

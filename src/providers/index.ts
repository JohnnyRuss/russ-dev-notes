import { useContext } from "react";

import { RCTreeContext } from "./RCTreeProvider";

export const useRCTreeContext = () => useContext(RCTreeContext);

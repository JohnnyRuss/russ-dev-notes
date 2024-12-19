import { createRoot } from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";

import "@/styles/index.css";
import "@/styles/quill.css";
import "@/styles/rc-tree.css";
import "@/styles/react-select.css";
import App from "./App.tsx";
import RCTreeProvider from "./providers/RCTreeProvider.tsx";

createRoot(document.getElementById("root") as HTMLDivElement).render(
  <Router>
    <RCTreeProvider>
      <App />
    </RCTreeProvider>
  </Router>
);

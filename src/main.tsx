import { createRoot } from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";

import "@/styles/index.css";
import "@/styles/quill.css";
import "@/styles/rc-tree.css";
import "@/styles/react-select.css";
import App from "./App.tsx";
import RCTreeProvider from "./providers/RCTreeProvider.tsx";
import ServerHealthProvider from "./providers/ServerHealthProvider.tsx";

createRoot(document.getElementById("root") as HTMLDivElement).render(
  <Router>
    <ServerHealthProvider>
      <RCTreeProvider>
        <App />
      </RCTreeProvider>
    </ServerHealthProvider>
  </Router>
);

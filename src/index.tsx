import { createRoot } from "react-dom/client";
import { App } from "./app/app";

const rootNode = document.getElementById("root");

createRoot(rootNode).render(<App />);

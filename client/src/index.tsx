import * as serviceWorker from "./serviceWorker";
// @ts-ignore
import {createRoot} from "react-dom/client";
import "@fontsource/inter";
import "./styles/globals.css"
import App from "./App";


const rootElement: any = document.getElementById("root");
if (!rootElement) throw new Error("Failed to find the root element");
const root = createRoot(rootElement);
root.render(<App/>)



serviceWorker.register();

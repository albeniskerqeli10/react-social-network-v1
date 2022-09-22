import * as serviceWorker from "./serviceWorker";
// @ts-ignore
import {createRoot} from "react-dom/client";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import "@fontsource/inter";
import "./styles/base.css";
import "./styles/tailwind.css"
import App from "./App";


const rootElement: any = document.getElementById("root");
if (!rootElement) throw new Error("Failed to find the root element");

export const queryClient = new QueryClient({
  // defaultOptions: {
  //   queries: {
  //     notifyOnChangeProps: "tracked",
  //   },
  // },
});
const root: any = createRoot(rootElement);
root.render(
  <QueryClientProvider client={queryClient}>
      <App />
  </QueryClientProvider>
);

serviceWorker.register();

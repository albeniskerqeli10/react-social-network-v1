import "@fontsource/inter";
import React from "react";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration.js";
// @ts-ignore
import * as ReactDOMClient from "react-dom/client";

import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import Loader from "./shared/Loader";

import "./styles/base.css";
import "./styles/tailwind.css";
const App = React.lazy(() => import("./App"));

const rootElement: any = document.getElementById("root");
if (!rootElement) throw new Error("Failed to find the root element");

export const queryClient = new QueryClient({
  // defaultOptions: {
  //   queries: {
  //     notifyOnChangeProps: "tracked",
  //   },
  // },
});
const root: any = ReactDOMClient.createRoot(rootElement);
root.render(
  <QueryClientProvider client={queryClient}>
      <App />
  </QueryClientProvider>
);

serviceWorkerRegistration.register();

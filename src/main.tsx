import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider, createGlobalStyle } from "styled-components";
import App from "./App";
//import "./index.css"; // TODO: remove this

const Global = createGlobalStyle`
  :root { color-scheme: light dark; }
  * { box-sizing: border-box; }
  body { margin: 0; font-family: system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif; }
`;

const theme = {
  radius: "16px",
  gap: "12px",
};

const qc = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={qc}>
      <ThemeProvider theme={theme}>
        <Global />
        <App />
      </ThemeProvider>
    </QueryClientProvider>
  </React.StrictMode>
);

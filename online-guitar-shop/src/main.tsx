import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { client } from "./ApolloClient";
import { ApolloProvider } from "@apollo/client/react";
import { LanguageProvider } from "./context/LanguageContext";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <LanguageProvider>
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>
    </LanguageProvider>
  </React.StrictMode>
);

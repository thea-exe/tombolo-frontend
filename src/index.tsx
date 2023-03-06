import React from "react";
import ReactDOM from "react-dom/client";
import { RecoilRoot } from "recoil";
import RecoilNexus from "recoil-nexus";
import { ChakraProvider } from "@chakra-ui/react";

import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Amplify } from "aws-amplify";
import config from "./aws-exports";
import "@aws-amplify/ui-react/styles.css";
import { AmplifyProvider } from "@aws-amplify/ui-react";
Amplify.configure(config); // aws-exports file contains info about where auth info is located in aws, can access thru react app
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <AmplifyProvider>
    {/* will provide styling  */}
    <React.StrictMode>
      <RecoilRoot>
        <RecoilNexus />
        <ChakraProvider>
          <App />
        </ChakraProvider>
      </RecoilRoot>
    </React.StrictMode>
  </AmplifyProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

import React from "react";
import ReactDOM from "react-dom";
import { Amplify } from "aws-amplify";

import Config from "./config";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "./context/contextActions";
import ErrorBoundary from "./components/ErrorBoundary";

/* // Setup amplify to interact with backend
Amplify.configure({
  mandatorySignIn: false,
  region: Config.cognito.REGION,
  userPoolId: Config.cognito.USER_POOL_ID,
  identityPoolId: Config.cognito.IDENTITY_POOL_ID,
  userPoolWebClientId: Config.cognito.APP_CLIENT_ID,
  ...Config.appsync,
}); */

Amplify.configure({
  Auth: {
    mandatorySignIn: false,
    region: Config.cognito.REGION,
    userPoolId: Config.cognito.USER_POOL_ID,
    identityPoolId: Config.cognito.IDENTITY_POOL_ID,
    userPoolWebClientId: Config.cognito.APP_CLIENT_ID,
  },
  Storage: {
    AWSS3: {
      bucket: Config.s3.BUCKET,
      region: Config.s3.REGION,
      /*       identityPoolId: Config.cognito.IDENTITY_POOL_ID */
    },
  },
  ...Config.appsync,
});

ReactDOM.render(
  <ErrorBoundary>
    <Provider>
      <App />
    </Provider>
  </ErrorBoundary>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

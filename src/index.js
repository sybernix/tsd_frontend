import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

import ReduxFormStore from "./com/ReduxFormStore";
import { Provider } from "react-redux";
import "./inc/css/style.css";

ReactDOM.render(
  <Provider store={ReduxFormStore}>
    <App />
  </Provider>,
  document.getElementById("root")
);

serviceWorker.unregister();

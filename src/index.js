import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

import ReduxFormStore from "./com/mod/ReduxFormStore";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from 'react-router-dom';
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";

import "./inc/css/style.css";

const themeObject = {
  typography: {
    fontFamily: '"Lato", "Helvetica", "Arial", sans-serif',
    fontSize: 14,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500
  },
  palette: {
    type: "light"
  }
};

const themeConfig = createMuiTheme(themeObject);

ReactDOM.render(
  <MuiThemeProvider theme={themeConfig}>
    <CssBaseline />
    <Provider store={ReduxFormStore}>
      <Router>
        <App />
      </Router>
    </Provider>
</MuiThemeProvider>,
  document.getElementById("root")
);

serviceWorker.unregister();

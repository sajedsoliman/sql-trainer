import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

import { ThemeProvider } from "@emotion/react";
import theme from "@/styles/theme";
import "./styles/index.css";

ReactDOM.render(
	<React.StrictMode>
		<ThemeProvider theme={theme}>
			<App />
		</ThemeProvider>
	</React.StrictMode>,
	document.getElementById("root")
);

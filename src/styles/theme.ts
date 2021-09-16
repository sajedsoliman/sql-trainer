import { createTheme } from "@mui/material/styles";

const theme = createTheme({
	typography: {
		fontFamily: "Poppins",
	},
	components: {
		MuiTextField: {
			defaultProps: {
				size: "small",
			},
		},
	},
});

export default theme;

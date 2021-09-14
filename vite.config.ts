import { defineConfig } from "vite";
import reactRefresh from "@vitejs/plugin-react-refresh";
import reactJSX from "vite-react-jsx";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [reactRefresh(), reactJSX()],
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "src"),
			"@styles": path.resolve(__dirname, "src/styles"),
			"@assets": path.resolve(__dirname, "src/assets"),
			"@components": path.resolve(__dirname, "src/components"),
			"@utils": path.resolve(__dirname, "src/utils"),
			"@services": path.resolve(__dirname, "src/services"),
			"@store": path.resolve(__dirname, "src/store"),
			"@views": path.resolve(__dirname, "src/views"),
		},
	},
});

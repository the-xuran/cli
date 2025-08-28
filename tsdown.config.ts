import { defineConfig } from "tsdown";
import packageJSON from "./package.json";

export default defineConfig({
	entry: ["./bin/index.ts"],
	outDir: "./dist",
	format: "cjs",
	env: {
		XU_Ver: packageJSON.version
	}
});

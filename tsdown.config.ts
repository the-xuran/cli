import { defineConfig } from "tsdown";
export default defineConfig({
	entry: ["./bin/index.ts"],
	outDir: "./dist/bin",
	format: "cjs"
});

export const templates = [
	{
		name: "react-template",
		description: "React template",
		value: "react-browser"
	},
	{
		name: "vue-template",
		description: "Vue template",
		value: "vue-browser"
	},
	{
		name: "tsdown-template",
		description: "NodeJS template with TypeScript",
		value: "tsdown-node"
	}
];

export const DepOptions = [
	{
		name: "tsx",
		type: "run",
		description: "Runtime TypeScript",
		value: "tsx",
		install(config: any) {
			const version = "^4.20.5";
			config.scripts["dev:run"] = "tsx ./src/index.ts";
			config.devDependencies["tsx"] = version;
			return config;
		}
	}
];

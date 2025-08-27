import path from "path";
import fs from "fs-extra";

export function getTemplates() {
	const templatesDir = path.join(__dirname, "../templates");
	const templates = [];

	// 读取模板目录
	const items = fs.readdirSync(templatesDir);

	for (const item of items) {
		const itemPath = path.join(templatesDir, item);
		const stat = fs.statSync(itemPath);

		if (stat.isDirectory()) {
			// 读取模板配置
			const configPath = path.join(itemPath, "template.config.json");
			let config = {
				name: item,
				description: "No description available",
				value: item
			};

			if (fs.existsSync(configPath)) {
				try {
					const userConfig = fs.readJsonSync(configPath);
					config = { ...config, ...userConfig };
				} catch (e) {
					console.warn(`Invalid config in ${item}: ${e.message}`);
				}
			}

			templates.push(config);
		}
	}

	return templates;
}

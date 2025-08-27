import inquirer from "inquirer";
import chalk from "chalk";
import fs from "fs-extra";
import path from "path";
import ora from "ora";
import { getTemplates } from "./templates";
import { validateProjectName } from "./helpers";

export default async function createProject(projectName, templateOption) {
	// 验证项目名称
	validateProjectName(projectName);

	// 获取可用模板
	const templates = getTemplates();

	// 如果没有通过命令行指定模板，则交互式选择
	let selectedTemplate = templateOption;
	if (!selectedTemplate) {
		const { template } = await inquirer.prompt([
			{
				type: "list",
				name: "template",
				message: "Select a project template:",
				choices: templates.map((t) => ({
					name: `${t.name} - ${chalk.gray(t.description)}`,
					value: t.value
				}))
			}
		]);
		selectedTemplate = template;
	}

	// 检查模板是否存在
	const templateExists = templates.some((t) => t.value === selectedTemplate);
	if (!templateExists) {
		throw new Error(`Template "${selectedTemplate}" not found`);
	}

	const targetDir = path.join(process.cwd(), projectName);

	// 检查目录是否已存在
	if (fs.existsSync(targetDir)) {
		const { overwrite } = await inquirer.prompt([
			{
				type: "confirm",
				name: "overwrite",
				message: `Directory "${projectName}" already exists. Overwrite?`,
				default: false
			}
		]);

		if (!overwrite) {
			throw new Error("Project creation cancelled");
		}

		await fs.remove(targetDir);
	}

	// 创建项目
	const spinner = ora("Creating project files...").start();
	const templatePath = path.join(__dirname, "templates", selectedTemplate);

	try {
		// 复制模板文件
		await fs.copy(templatePath, targetDir);

		// 替换模板中的占位符
		const packageJsonPath = path.join(targetDir, "package.json");
		if (fs.existsSync(packageJsonPath)) {
			const packageJson = await fs.readJson(packageJsonPath);
			packageJson.name = projectName;
			await fs.writeJson(packageJsonPath, packageJson, { spaces: 2 });
		}

		spinner.succeed("Project files created");

		// 显示后续步骤
		console.log(chalk.cyan("\nNext steps:\n"));
		console.log(chalk.gray(`  cd ${projectName}`));
		console.log(chalk.gray("  npm install"));
		console.log(chalk.gray("  npm start\n"));
	} catch (error) {
		spinner.fail("Failed to create project");
		throw error;
	}
}

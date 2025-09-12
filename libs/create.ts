import { select, checkbox } from "@inquirer/prompts";
import chalk from "chalk";
import ora from "ora";
import * as fs from "fs-extra";
import { DepOptions, templates } from "./templates";
import { validateProjectName } from "./helpers";
import path from "path";

export default async function createProject(
	projectName: string,
	templateOption: any
) {
	validateProjectName(projectName);

	let selectedTemplate = templateOption;
	const template = await select({
		message: "Select a project template:",
		choices: templates.map((t) => ({
			name: `${t.name} - ${chalk.gray(t.description)}`,
			value: t.value
		}))
	});

	selectedTemplate = template;

	const options = await checkbox({
		message: "add dependencies?:",
		choices: DepOptions.map((t) => ({
			name: `${t.name} - ${chalk.gray(t.description)}`,
			value: t.value
		}))
	});

	options.forEach((v) => {
		if (v) {
			selectedTemplate += `-${v}`;
		}
	});

	if (!template) {
		throw new Error("Project creation cancelled");
	}

	const spinner = ora("Creating project files...").start();

	try {
		const realtivePath =
			selectedTemplate.substring(
				0,
				selectedTemplate.lastIndexOf("-") + 1
			) + "template";
		const targetDir = path.join(process.cwd(), projectName);
		if (fs.pathExistsSync(targetDir))
			throw new Error(`Project already exists: ${targetDir}`);

		// copy project files
		fs.copySync(
			path.resolve(__dirname, `../templates/${realtivePath}`),
			targetDir,
			{
				filter: (src: string) =>
					[
						"node_modules",
						"package-lock.json",
						"pnpm-lock.yaml",
						"yarn.lock"
					].some((v) => src.includes(v))
						? false
						: true
			}
		);
		const packagePath = path.resolve(targetDir, "package.json");
		// change package.json
		const cachePackage = JSON.parse(
			fs.readFileSync(packagePath).toString()
		);
		cachePackage.name = projectName.toLowerCase();
		fs.writeFileSync(packagePath, JSON.stringify(cachePackage, null, 2));
		spinner.succeed("Project files created");
		// show project type
		const isNode = selectedTemplate.includes("node");
		console.log(chalk.blueBright.overline("\n" + " ".repeat(50)));
		console.log(
			chalk.blueBright(
				`\n This is ${isNode ? "Node Project" : "Browser Project"}\n`
			)
		);
		console.log(chalk.cyan("\nNext steps:\n"));
		console.log(chalk.gray(`  cd ${projectName}`));
		console.log(chalk.gray("  npm install"));
		console.log(chalk.gray("  npm start\n"));
		console.log(chalk.green.bold("\n🎉 Project created successfully!"));
	} catch (err) {
		spinner.fail("Failed to create project");
		throw err;
	}
}

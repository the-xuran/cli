import { select } from "@inquirer/prompts";
import chalk from "chalk";
import ora from "ora";
import { templates } from "./templates";
import { validateProjectName } from "./helpers";
import { create } from "create-tsdown";
import { copyFile } from "fs";
import { jsonModify } from "./utils";

export default async function createProject(projectName: string) {
	validateProjectName(projectName);

	const template = await select({
		message: "Select a project template:",
		choices: templates.map((t) => ({
			name: `${t.name} - ${chalk.gray(t.description)}`,
			value: t.value
		}))
	});

	if (!template) {
		throw new Error("Project creation cancelled");
	}

	const spinner = ora("Waiting for user operation...\n").start();

	try {
		if (template === "web") {
			process.argv.push("--interactive");
			// @ts-ignore
			await require("create-vite");
		} else {
			await create(projectName, {});
		}

		// 替换prettier配置
		copyFile(
			"config/prettier/.prettierrc.json",
			`${projectName}/.prettierrc.json`,
			(err) => {
				if (err) throw err;
			}
		);
		copyFile(
			"config/prettier/.prettierignore",
			`${projectName}/.prettierignore`,
			(err) => {
				if (err) throw err;
			}
		);
		jsonModify(`${projectName}/package.json`, {
			devDependencies: { prettier: "^3.8.2" }
		});

		spinner.succeed("Project files created");
		console.log(chalk.green.bold("\n🎉 Project created successfully!"));
	} catch (err) {
		spinner.fail("Failed to create project");
		throw err;
	}
}

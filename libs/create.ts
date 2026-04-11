import { select } from "@inquirer/prompts";
import chalk from "chalk";
import ora from "ora";
import { templates } from "./templates";
import { validateProjectName } from "./helpers";
import { create } from "create-tsdown";

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

		spinner.succeed("Project files created");
		console.log(chalk.green.bold("\n🎉 Project created successfully!"));
	} catch (err) {
		spinner.fail("Failed to create project");
		throw err;
	}
}

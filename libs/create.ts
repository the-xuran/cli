import inquirer from "inquirer";
import chalk from "chalk";
import ora from "ora";
import templates from "./templates";
import { validateProjectName } from "./helpers";

export default async function createProject(
	projectName: string,
	templateOption: any
) {
	validateProjectName(projectName);

	let selectedTemplate = templateOption;
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
	selectedTemplate = template as string;

	if (!template) {
		throw new Error("Project creation cancelled");
	}

	const spinner = ora("Creating project files...").start();

	// todo: create Project Files

	try {
		spinner.succeed("Project files created");

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
	} catch (error) {
		spinner.fail("Failed to create project");
		throw error;
	}
}

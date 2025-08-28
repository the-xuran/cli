#!/usr/bin/env node
import { Command } from "commander";
import chalk from "chalk";
import createProject from "libs/create";
import templates from "libs/templates";

const program = new Command();

program
	.version(process.env.XU_Ver)
	.description("A CLI for creating a new xuran project")
	.name("create-xuran");

// Show Template List
program
	.command("list")
	.description("List all available templates")
	.action(() => {
		console.log("Available templates：");
		Object.entries(templates).forEach(([_, { name }]) => {
			console.log("- " + chalk.blue.bold(`${name}`));
		});
	});

/* Create Command */
program
	.command("create")
	.description("Create a new xuran project")
	.argument("<project_name>", "The name of the project to create")
	.action(async (projectName, options) => {
		console.log(chalk.blue.bold(`\n✨ Creating project: ${projectName}\n`));
		try {
			await createProject(projectName, options);
		} catch (error) {
			console.error(chalk.red.bold("\n❌ Error:"), error.message);
			process.exit(1);
		}
	});

program.parse();

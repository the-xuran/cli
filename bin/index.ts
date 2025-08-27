#!/usr/bin/env node
import { Command } from "commander";
import chalk from "chalk";
import createProject from "libs/create";

const program = new Command();

program
	.version("0.0.1")
	.description("A CLI for creating a new xuran project")
	.name("create-xuran");

/* Create Command */
program
	.command("create")
	.description("Create a new xuran project")
	.argument("<project_name>", "The name of the project to create")
	.action(async (projectName, options) => {
		console.log(chalk.blue.bold(`\n✨ Creating project: ${projectName}\n`));
		try {
			await createProject(projectName, options);
			console.log(chalk.green.bold("\n🎉 Project created successfully!"));
		} catch (error) {
			console.error(chalk.red.bold("\n❌ Error:"), error.message);
			process.exit(1);
		}
	});

program.parse();

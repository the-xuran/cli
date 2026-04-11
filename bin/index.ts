#!/usr/bin/env node
import { Command } from "commander";
import chalk from "chalk";
import createProject from "libs/create";
import { templates } from "libs/templates";

const program = new Command();

program
	.version(process.env.XU_Ver!)
	.description("A CLI for xuran")
	.name("xuran");

// Show Template List
program
	.command("list")
	.description("List all available templates")
	.action(() => {
		console.log("Available templates：");
		Object.entries(templates).forEach(([_, { name, description }]) => {
			console.log(
				"- " +
					chalk.blue.bold(`${name}`) +
					" " +
					chalk.gray(description)
			);
		});
	});

/* Create Command */
program
	.command("create")
	.description("Create a new xuran project")
	.argument("<project_name>", "The name of the project to create")
	.action(async (projectName, _) => {
		console.log(chalk.blue.bold(`\n✨ Creating project: ${projectName}\n`));
		try {
			await createProject(projectName);
		} catch (error: any) {
			console.error(chalk.red.bold("\n❌ Error:"), error.message);
			process.exit(1);
		}
	});

/* Upgrade Command */
program
	.command("upgrade")
	.description("Upgrade CLI to the latest version")
	.action(async () => {
		console.log(chalk.blue.bold(`\n🔄 Checking for updates...\n`));
		try {
			const { execSync } = await import("child_process");
			const currentVersion = process.env.XU_Ver || "0.0.0";
			const pkgName = "@xuranxys/cli";

			const latestVersion = execSync(`npm view ${pkgName} version`, {
				encoding: "utf-8"
			}).trim();

			if (latestVersion > currentVersion) {
				console.log(
					chalk.yellow.bold(`📦 Current version: ${currentVersion}`)
				);
				console.log(
					chalk.green.bold(`✨ Latest version: ${latestVersion}`)
				);
				console.log(chalk.blue.bold(`\n⬆️  Upgrading...\n`));

				execSync(`npm install -g ${pkgName}`, {
					stdio: "inherit"
				});

				console.log(chalk.green.bold("\n✅ Upgrade completed!"));
			} else {
				console.log(
					chalk.green.bold("✅ Already on the latest version!")
				);
			}
		} catch (error: any) {
			console.error(
				chalk.red.bold("\n❌ Upgrade failed:"),
				error.message
			);
			process.exit(1);
		}
	});

program.parse();

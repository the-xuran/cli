export function validateProjectName(name: string) {
	if (!name) {
		throw new Error("Project name is required");
	}

	if (!/^[a-zA-Z0-9-_]+$/.test(name)) {
		throw new Error(
			"Project name can only contain letters, numbers, hyphens and underscores"
		);
	}

	if (name.length > 50) {
		throw new Error("Project name must be less than 50 characters");
	}

	if (/^[0-9]/.test(name)) {
		throw new Error("Project name cannot start with a number");
	}
}

#!/usr/bin/env node

import { simpleGit } from "simple-git";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import { execSync } from "child_process";
const projectName = process.argv[2];

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const git = simpleGit();

const repoUrl = "https://github.com/jorgesosa-funval/fm-api-template.git"; // Reemplaza con la URL de tu repositorio
const cloneDir = path.join(process.cwd(), "template-repo");

try {
  await git.clone(repoUrl, cloneDir);
  await fs.rename(cloneDir, path.join(process.cwd(), projectName));
  console.log(`Project ${projectName} created successfully.`);
} catch (error) {
  console.error("Error cloning repository:", error);
}

// remove .git folder from project
console.log("Eliminando archivos innecesarios...");
fs.rm(path.join(process.cwd(), projectName, ".git"), { recursive: true });

// instalar dependencias del proyecto
console.log("Instalando dependencias...");
execSync("npm install", {
  stdio: "inherit",
  cwd: path.join(process.cwd(), projectName),
});

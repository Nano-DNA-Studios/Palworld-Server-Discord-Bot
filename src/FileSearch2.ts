import * as dotenv from "dotenv";
dotenv.config();
import { dir } from "console";
import * as fs from "fs";
import * as path from "path";

interface BashCommandModule {
  CommandName: string;
  [key: string]: any; // Additional properties as needed
}

function GetFiles(relativePath: string): string[] {
  const directoryPath = path.join(__dirname, relativePath); // path to your directory

  if (fs.existsSync(directoryPath))
    return fs.readdirSync(directoryPath); 
  else 
    return [];
}

function GetBashCommands(): BashCommandModule[] {
  const Path = "Bash/BashScripts";

  let Files = GetFiles(Path);

  let Commands: BashCommandModule[] = [];

  Files.forEach(file => {
    if (path.extname(file) === ".js") {
      // Dynamic imports in TypeScript might require a workaround or explicit any cast
      const module: BashCommandModule = require(`./${Path}/${file}`) as BashCommandModule;

      if ('CommandName' in module)
        Commands.push(module);
    }
  });

  return Commands;
}

export {
  GetBashCommands,
  GetFiles
};

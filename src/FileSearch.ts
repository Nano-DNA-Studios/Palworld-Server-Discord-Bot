import * as dotenv from "dotenv";
dotenv.config();
import { dir } from "console";
import * as fs from "fs";
import * as path from "path";
import IBashCommand from "./Bash/IBashCommand";
import IConfigureCommands from "./ConfigureCommands/IConfigureCommand";

/**
 * Gets all the files in a directory
 * @param relativePath The relative path to the directory
 * @returns The files in the directory
 */
function GetFiles(relativePath: string): string[] {
  const directoryPath = path.join(__dirname, relativePath); // path to your directory

  if (fs.existsSync(directoryPath))
    return fs.readdirSync(directoryPath); 
  else 
    return [];
}

/**
 * Gets all the Bash Commands
 * @returns Array of Bash Commands
 */
function GetBashCommands(): IBashCommand[] {
  const Path = "Bash/BashCommands";

  let Files = GetFiles(Path);

  let Commands: IBashCommand[] = [];

  Files.forEach(file => {
    if (path.extname(file) === ".js") {
      // Dynamic imports in TypeScript might require a workaround or explicit any cast
      const module: IBashCommand = require(`./${Path}/${file}`) as IBashCommand;

      if ('CommandName' in module)
        Commands.push(module);
    }
  });

  return Commands;
}

/**
 * Gets all the Configure Commands
 * @returns Array of Configure Commands
 */
function GetConfigureCommands () : IConfigureCommands[] {
  const Path = "ConfigureCommands/Commands";

  let Files = GetFiles(Path);

  let Commands: IConfigureCommands[] = [];

  Files.forEach(file => {
    if (path.extname(file) === ".js") {
      // Dynamic imports in TypeScript might require a workaround or explicit any cast
      const module: IConfigureCommands = require(`./${Path}/${file}`) as IConfigureCommands;

      if ('CommandName' in module)
        Commands.push(module);
    }
  });

  return Commands;
}

export {
  GetBashCommands,
  GetFiles,
  GetConfigureCommands,
};

import * as dotenv from "dotenv";
dotenv.config();
import * as fs from "fs";
import * as path from "path";
import ICommand from "./ICommand";

/**
 * Utility Class for Searching Files
 */
class FileSearch {

  /**
   * Path the the Directory of the Bot
   */
  private _directoryPath: string = process.cwd() + "\\src";

  /**
  * Gets all the files with JavaScript endings in the Bot Directory
  * @returns An Array of Java Script File Paths within the Bot Directory
  */
  public GetAllJSFiles(): string[] {
    return this.GetFiles(this._directoryPath, ".js");
  }

  /**
  * Gets all the Java Script Files within the provided directory and subdirectories through recursion
  * @param Path The start Path to search for files
  * @returns Array of all Java Script Files within the provided directory and subdirectories
  */
  public GetFiles(Path: string, fileExtension: string): string[] {
    let AllFiles: string[] = [];

    if (fs.existsSync(Path)) {
      let files = fs.readdirSync(Path);

      files.forEach(file => {
        let absPath = Path + "/" + file;

        if (fs.lstatSync(absPath).isDirectory())
          AllFiles.push(...this.GetFiles(absPath, fileExtension));
        else if (path.extname(absPath) === fileExtension)
          AllFiles.push(absPath);
      });
    }
    
    return AllFiles;
  }

  /**
  * Gets all the Commands from the Provided Directory
  * @returns Array of IT Command Objects
  */
  public GetAllCommands(): ICommand[] {
    let Commands: ICommand[] = [];

    const Files = this.GetAllJSFiles();

    Files.forEach(file => {
      const module = require(file) as ICommand;

      if ('CommandName' in module)
        Commands.push(module);
    });

    return Commands;
  }
}

export default FileSearch;

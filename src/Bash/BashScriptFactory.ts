import * as fs from "fs";
import * as path from "path";
import { GetBashCommands } from "../FileSearch"; // Adjust the import path if necessary
import Scripts from "./BashScriptsEnum"; // Adjust the import if it's not a default export
import BashScript from "./BashScript";
import IBashCommand from "./IBashCommand";

/**
 * Represents a factory for creating Bash scripts.
 */
class BashScriptFactory {
  private ScriptTag: string;
  private files: string[];

  constructor(scriptTag: string) {
    this.ScriptTag = scriptTag;
    const directoryPath = path.join(__dirname, "BashCommands");
    this.files = fs.readdirSync(directoryPath);
  }

  private GetBashCommandObject(command: string): IBashCommand {
    try {
      const Commands = GetBashCommands();

      for (const bashCommand of Commands) {
        if (bashCommand.CommandName === command)
          return bashCommand;
      }
    } catch (err) {
      console.log("Unable to scan directory: " + err);
    }

    return this.GetUndefinedBashScript();
  }

  private GetUndefinedBashScript(): IBashCommand {
    let UndefinedBashScript: IBashCommand = {
      CommandName: "undefined",
      CommandDescription: "",
      CustomCode: ``,
      Tag: "undefined",
      SubCommands: [],
      ReplyMessage: " ",
      LogMessage: " ",
      ErrorMessage: " ",
      SuccessMessage: " ",
      FailMessages: [],
      Options: [],
    };

    return UndefinedBashScript;
  }

  public GetBashScript(): BashScript {
    const CommandObject = this.GetBashCommandObject(this.ScriptTag);
    if (!CommandObject) {
      throw new Error("CommandObject is undefined");
    }
    return new BashScript(CommandObject);
  }

  public HasMaxOutTimer(): boolean {
    if (this.ScriptTag == Scripts.Start) {
      console.log("Start has a max out timer");
      return true;
    } else {
      return false;
    }
  }

  public GetFactoriesToRun(): BashScriptFactory[] {
    let Factories: BashScriptFactory[] = [];

    const BashAction = this.GetBashCommandObject(this.ScriptTag);
    if (!BashAction || !Array.isArray(BashAction.SubCommands)) {
      console.log(typeof BashAction?.SubCommands);
      return [];
    }

    BashAction.SubCommands.forEach((commandTag) => {
      console.log(commandTag);
      if (commandTag === Scripts.Custom) {
        Factories.push(this);
      } else {
        Factories.push(new BashScriptFactory(commandTag));
      }
    });

    return Factories;
  }

  public async GetBashScriptToRun(): Promise<string> {
    let ScriptToRun = "";

    const BashAction = this.GetBashCommandObject(this.ScriptTag);
    if (!BashAction || !Array.isArray(BashAction.SubCommands)) {
      console.log(typeof BashAction?.SubCommands);
      ScriptToRun += "echo 'Something went wrong with the SubCommands'";
      return ScriptToRun;
    }

    BashAction.SubCommands.forEach((commandTag) => {
      console.log(commandTag);
      if (commandTag === Scripts.Custom) {
        const BashCommand = new BashScript(BashAction);
        ScriptToRun += BashCommand.GetCode();
      } else {
        const BashCommand = new BashScript(
          this.GetBashCommandObject(commandTag)!
        );

        ScriptToRun += `\n ${BashCommand.GetCode()} \n`;
      }
    });

    return ScriptToRun;
  }
}

export = BashScriptFactory;

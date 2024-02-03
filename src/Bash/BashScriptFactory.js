const BashScript = require("./BashScript.js");
require("dotenv").config();
const Scripts = require("./Scripts");
const fs = require("fs");
const path = require("path");
const { GetBashCommands} = require("../FileSearch.js");

class BashScriptFactory {
  constructor(scriptTag) {
    this.ScriptTag = scriptTag;
    const directoryPath = path.join(__dirname, "BashScripts"); 
    this.files = fs.readdirSync(directoryPath);
  }

  GetBashCommandObject(command) {
    
    const directoryPath = path.join(__dirname, "BashScripts"); // path to your directory

    try {

      const Commands  = GetBashCommands();

      console.log(Commands);

      for (const bashCommand of Commands) {
        if (bashCommand.CommandName === command)
            {
              console.log(`Found a match! : ${bashCommand.CommandName}`);
              return bashCommand;
            }
      }
    } catch (err) {
      console.log("Unable to scan directory: " + err);
    }
  }

  GetBashScript()
  {
    const CommandObject = this.GetBashCommandObject(this.ScriptTag);

    return new BashScript(CommandObject);
  }

  async GetBashScriptToRun() {
    let ScriptToRun = "";

    const BashAction = this.GetBashCommandObject(this.ScriptTag);

    if (Array.isArray(BashAction.SubCommands)) {
      BashAction.SubCommands.forEach((commandTag) => {
        console.log(commandTag);
        if (commandTag === Scripts.Custom) {
          const BashCommand = new BashScript(BashAction);
          ScriptToRun += BashCommand.GetCode();
        } else {
          const BashCommand = new BashScript(
            this.GetBashCommandObject(commandTag)
          );

          ScriptToRun += `\n ${BashCommand.GetCode()} \n`;
        }
      });
    } else {
      console.log(typeof BashAction.SubCommands);
      ScriptToRun += "echo 'Something went wrong with the SubCommands'";
    }
    console.log(ScriptToRun);

    return ScriptToRun;
  }
}

module.exports = BashScriptFactory;

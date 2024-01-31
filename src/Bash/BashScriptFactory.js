const BashScript = require("./BashScript.js");
require("dotenv").config();
const Scripts = require("./Scripts");
const fs = require("fs");
const path = require("path");

class BashScriptFactory {
  constructor(scriptTag) {
    this.ScriptTag = scriptTag;
    const directoryPath = path.join(__dirname, "BashScripts"); 
    this.files = fs.readdirSync(directoryPath);
  }

  GetBashCommandObject(command) {
    
    const directoryPath = path.join(__dirname, "BashScripts"); // path to your directory

    try {
      const files = fs.readdirSync(directoryPath);
  
      for (const file of files) {
        if (path.extname(file) === ".js") {
          const module = require(`${directoryPath}/${file}`);
  
          if ('CommandName' in module)
          {
            if (module.CommandName === command)
            {
              console.log(`Found a match! : ${module.CommandName}`);
              return module;
            }
          }
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

const RunBashScript = require("./Bash/BashScriptRunner");
const Scripts = require("./Bash/Scripts");
const BashScriptFactory = require("./Bash/BashScriptFactory");

async function HandleCommand (command)  {
    try {
        const Factory = new BashScriptFactory(command);

        const Bash = Factory.GetBashScript();
    
        try{
          await RunBashScript(await Factory.GetBashScriptToRun());
          interaction.reply(Bash.SuccessMessage);
        } catch (error) {
          interaction.reply(Bash.ErrorMessage);
          console.log(error);
        }
    } catch (error) {
     // console.log(`Error Occured : ${error}`);
    }
  };

  module.exports = HandleCommand;
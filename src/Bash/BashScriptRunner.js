require("dotenv").config();
const BashScriptFactory = require("./BashScriptFactory");
const ConnectToServer = require("./ConnectToServer");

//Covert this to a class?
let ScriptRanSuccessfully = true;

function DetermineError(data, Factory)
{
 let Fails = Factory.GetBashScript().FailMessages;
 let dataStr = data.toString().replace(/\r?\n|\r/g, "");
  if (Fails.includes(dataStr)) {
    ScriptRanSuccessfully = false;
  }
}

async function RunBashScript(Factory) {

  Log = "";

  ScriptRanSuccessfully = true;

  const ServerConnection = await ConnectToServer();

  const Script = await Factory.GetBashScript().GetCode();

  return new Promise((resolve, reject) => {

    ServerConnection.exec(`${Script}`, (err, stream) => {
      if (err) throw err;

      let dataBuffer = "";

      if (Factory.HasMaxOutTimer()) {

        setTimeout(() => {
          console.log("Max Timeout Reached");
          resolve(ScriptRanSuccessfully);
          stream.end();
        }, 5000);
      }

      stream
        .on("close", (code, signal) => {
          //console.log(`Stream :: close :: code: ${code}, signal: ${signal}`);
          resolve(ScriptRanSuccessfully);
        })
        .on("data", (data) => {
          dataBuffer += data;
          console.log("STDOUT: " + data);
          DetermineError(data, Factory);
        })
        .stderr.on("data", (data) => {
          console.error("STDERR: " + data);
          DetermineError(data, Factory);
        });
    });

  });
}

module.exports = RunBashScript;
require("dotenv").config();
const BashScriptFactory = require("./BashScriptFactory");
const ConnectToServer = require("./ConnectToServer");

async function RunBashScript(Factory) {

  Log = "";

  const ServerConnection = await ConnectToServer();

  const Script = await Factory.GetBashScript().GetCode();

  return new Promise((resolve, reject) => {

    ServerConnection.exec(`${Script}`, (err, stream) => {
      if (err) throw err;
      
      let dataBuffer = "";

      if (Factory.HasMaxOutTimer()) {
        
        setTimeout(() => {
          console.log("Max Timeout Reached");
          resolve(dataBuffer);
          stream.end();
        }, 5000);
      }

      stream
        .on("close", (code, signal) => {
          console.log(`Stream :: close :: code: ${code}, signal: ${signal}`);
          resolve(dataBuffer);
        })
        .on("data", (data) => {
          dataBuffer += data;
          console.log("STDOUT: " + data);
        })
        .stderr.on("data", (data) => {
          console.error("STDERR: " + data);
        });
    });

  });

}

module.exports = RunBashScript;
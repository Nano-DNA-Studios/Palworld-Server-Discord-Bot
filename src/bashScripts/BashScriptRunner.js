require("dotenv").config();
const ConnectToServer = require("./ConnectToServer");
const BashScript = require("./BashScript");

async function RunBashScript(Scripts) {
  Log = "";

  const ServerConnection = await ConnectToServer();

  //Add other bash scripts
  console.log("Running bash scripts");

  RunScript = `mkdir ~/${process.env.SERVER_TEMP_SCRIPT_DIR}`;

  RunScript += Scripts.GetBashCommands();

  RunScript += `rm -rf ~/${process.env.SERVER_TEMP_SCRIPT_DIR}`;

  ServerConnection.exec(`${RunScript}`, (err, stream) => {
    if (err) throw err;

    stream
      .on("close", (code, signal) => {
        console.log(`Stream :: close :: code: ${code}, signal: ${signal}`);
        //ServerConnection.end(); // Close the connection when done
      })
      .on("data", (data) => {
        console.log("STDOUT: " + data);
      })
      .stderr.on("data", (data) => {
        console.error("STDERR: " + data);
      });
  });

}

module.exports = RunBashScript;

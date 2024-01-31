require("dotenv").config();

const ConnectToServer = require("./ConnectToServer");
const BashScript = require("./BashScript");
const BashScriptFactory = require("./BashScriptFactory");

async function RunBashScript(Script) {

  Log = "";

  const ServerConnection = await ConnectToServer();

  await ServerConnection.exec(`${Script}`, (err, stream) => {
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

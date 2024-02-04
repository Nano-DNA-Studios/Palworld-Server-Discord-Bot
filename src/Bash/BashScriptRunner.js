require("dotenv").config();
const ConnectToServer = require("./ConnectToServer");

async function RunBashScript(Script) {

  Log = "";

  const ServerConnection = await ConnectToServer();

  return new Promise((resolve, reject) => {

    ServerConnection.exec(`${Script}`, (err, stream) => {
      if (err) throw err;
      
      let dataBuffer = "";

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
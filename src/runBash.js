const { Client } = require("ssh2");
const fs = require('fs');
const path = require("path");

const conn = new Client();

function runBash() {
  //const scriptPath = path.join(__dirname, "/bashScripts/PalserverUpdater.sh");
  const UpdateScript = require('./bashScripts/UpdateServer');
  const scriptContent = UpdateScript;
  const scriptPath = "/home/mrdna/PalworldUpdater.sh";
  console.log(`Content : ${scriptContent}`);

  conn
    .on("ready", () => {
      console.log("client :: ready");
      //replace with bash and script path
      conn.exec(`bash ${scriptPath}`, (err, stream) => {
        if (err) throw err;

        stream
          .on("close", (code, signal) => {
            console.log(
              "stream :: close :: code: " + code + ", signal: " + signal
            );
            conn.end();
          })
          .on("data", (data) => {
            console.log("stdout: " + data);
          })
          .stderr.on("data", (data) => {
            console.error("stderr: " + data);
          });
      });
    })
    .connect({
      host: `${process.env.SERVER_IP}`,
      port: process.env.SERVER_PORT,
      username: `${process.env.SERVER_USER}`,
      password: `${process.env.SERVER_PASSWORD}`,
    });
}

module.exports = {
  runBash,
};

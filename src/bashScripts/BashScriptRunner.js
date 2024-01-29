require("dotenv").config();
const ConnectToServer = require("./ConnectToServer");
const BashScript = require("./BashScript");

async function RunCommand(ServerConnection, Command) {
  ServerConnection.exec(`${Command}`, (err, stream) => {
    if (err) throw err;

    stream
      .on("close", (code, signal) => {
        console.log(`Stream :: close :: code: ${code}, signal: ${signal}`);
        ServerConnection.end(); // Close the connection when done
      })
      .on("data", (data) => {
        console.log("STDOUT: " + data);
      })
      .stderr.on("data", (data) => {
        console.error("STDERR: " + data);
      });
  });
}

function MakeTempFolder(ServerConnection) {
  RunCommand(ServerConnection, `mkdir ~/${process.env.SERVER_TEMP_SCRIPT_DIR}`);
}

function DeleteTempFolder(ServerConnection) {
  RunCommand(
    ServerConnection,
    `rm -rf ~/${process.env.SERVER_TEMP_SCRIPT_DIR}`
  );
}

async function RunBashScript(Scripts) {
  Log = "";

  const ServerConnection = await ConnectToServer();

  //Add other bash scripts
  console.log("Running bash scripts");

  RunScript = `mkdir ~/${process.env.SERVER_TEMP_SCRIPT_DIR}`;

  RunScript += Scripts.GetBashCommands();

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

  // if (Array.isArray(Scripts)) {

  //   for (const script of Scripts) {
  //      // console.log(`${script.GetBashCommands()}`);

  //     //  console.log("Saving Script");
  //     //   await ServerConnection.exec(`${script.SaveScript()}`, (err, stream) => {
  //     //       if (err) throw err;

  //     //       stream
  //     //         .on("close", (code, signal) => {
  //     //           console.log(`Stream :: close :: code: ${code}, signal: ${signal}`);
  //     //           //ServerConnection.end(); // Close the connection when done
  //     //         })
  //     //         .on("data", (data) => {
  //     //           console.log("STDOUT: " + data);
  //     //         })
  //     //         .stderr.on("data", (data) => {
  //     //           console.error("STDERR: " + data);
  //     //         });
  //     //     });

  //     //     console.log("Running Script");
  //     //     await ServerConnection.exec(script.RunScript(), (err, stream) => {
  //     //       if (err) throw err;

  //     //       stream
  //     //         .on("close", (code, signal) => {
  //     //           console.log(`Stream :: close :: code: ${code}, signal: ${signal}`);
  //     //           //ServerConnection.end(); // Close the connection when done
  //     //         })
  //     //         .on("data", (data) => {
  //     //           console.log("STDOUT: " + data);
  //     //         })
  //     //         .stderr.on("data", (data) => {
  //     //           console.error("STDERR: " + data);
  //     //         });
  //     //     });

  //       // await RunCommand(ServerConnection, script.GetBashCommands());
  //       // Log += "Running Script: " + script.BashCommandName;
  //   }

  // }

  // DeleteTempFolder(ServerConnection);
}

module.exports = RunBashScript;

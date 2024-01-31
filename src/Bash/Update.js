require("dotenv").config();
const BashScript = require("./BashScript");

// const Update = new BashScript(
//   "Update",
//   `#!/bin/bash

//   pkill "PalServer.sh"
  
//   if killall "PalServer-Linux-Test" ; then
//       echo "Server Terminated"
//   else
//       echo "Failed to Terminate Server"
//   fi
  
//   echo "Starting SteamCMD Update"
    
//   # Run the steamcmd command
//   steamcmd +force_install_dir ${process.env.STEAM_INSTALL_DIR} +login anonymous +app_update 2394010 validate +quit
  
//   ./${process.env.SERVER_INSTALL_DIR}/${process.env.SERVER_START_SCRIPT} &
    
//   # Optionally, add a sleep for a few seconds to allow the server to start
//   sleep 5
  
//   # Implement a check here to confirm the server is running, if possible
  
//   echo "Server is Live"
// `
// );

// module.exports = Update;

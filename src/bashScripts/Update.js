require("dotenv").config();
const BashScript = require("./BashScript");

const Update = new BashScript(
  "Update",
  `#!/bin/bash

  pkill "PalServer.sh"
  
  if killall "PalServer-Linux-Test" ; then
      echo "Server Terminated"
  else
      echo "Failed to Terminate Server"
  fi
  
  echo "Starting SteamCMD Update"
    
  # Run the steamcmd command
  steamcmd +force_install_dir /home/mrdna/PalworldServer +login anonymous +app_update 2394010 validate +quit
  
  # Check the exit status of the previous command
  if [ $? -eq 0 ]; then
    echo "Update Complete"
    echo "Starting Server Again"
      
    # Run the PalServer script and redirect output to a log file
    ./PalworldServer/PalServer.sh &
    
    # Optionally, add a sleep for a few seconds to allow the server to start
    sleep 5
    
    # Implement a check here to confirm the server is running, if possible
    
    echo "Server is Live"
  else
    echo "SteamCMD Update failed"
  fi
  
  echo "Script Completed"
`
);

module.exports = Update;

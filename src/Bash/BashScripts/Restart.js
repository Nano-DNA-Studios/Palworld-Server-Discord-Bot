require("dotenv").config();
const Scripts = require("../Scripts");

const Restart = 
{
  CommandName: Scripts.Restart,
  CommandDescription: 'Restarts the server',
  CustomCode: ``,
  Tag: this.CommandName,
  SubCommands: [Scripts.Shutdown, Scripts.Start],
  ReplyMessage: 'Server is Restarting',
  LogMessage: 'Server is being Restarted',
  ErrorMessage: 'Server could not be Restarted',
  SuccessMessage: 'Server has been Restarted',
};


// new BashScript(
//   "Update",
//   `#!/bin/bash

//   pkill "${process.env.SERVER_START_SCRIPT}"

//   killall "PalServer-Linux-Test"
  
//   killall "steamcmd"
  
//   sleep 10

//   ./${process.env.SERVER_INSTALL_DIR}/${process.env.SERVER_START_SCRIPT} &
    
//   # Optionally, add a sleep for a few seconds to allow the server to start
//   sleep 5
  
//   # Implement a check here to confirm the server is running, if possible
  
//   echo "Server is Live"
// `
// );

module.exports = Restart;

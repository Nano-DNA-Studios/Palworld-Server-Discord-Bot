require("dotenv").config();
const BashScript = require("./BashScript");

//Shut down Works

const Shutdown = new BashScript(
  'Shutdown',
  `#!/bin/bash
pkill "${process.env.SERVER_START_SCRIPT}"

killall "PalServer-Linux-Test"
`
);

module.exports = Shutdown;

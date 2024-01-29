require("dotenv").config();
const BashScript = require("./BashScript");

//Shut down Works

const Shutdown = new BashScript(
  'Shutdown',
  `#!/bin/bash
pkill "PalServer.sh"

killall "PalServer-Linux-Test"

`
);

module.exports = Shutdown;

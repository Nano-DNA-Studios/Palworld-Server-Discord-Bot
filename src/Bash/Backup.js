require("dotenv").config();
const BashScript = require("./BashScript");
const Scripts = require("./Scripts");

const Backup = new BashScript(
  "Update",
  `#!/bin/bash

mkdir Backups

cp -r ${process.env.SERVER_INSTALL_DIR}/Pal/Saved ~/Backups/Saved-${new Date().toUTCString().replace(/ /g, '-').replace(/:/g, '-')}
`
);

module.exports = Backup;
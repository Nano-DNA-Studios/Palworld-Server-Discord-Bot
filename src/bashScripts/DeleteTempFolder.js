require("dotenv").config();
const BashScript = require("./BashScript");

const DeleteTempFolder = new BashScript(
  "MakeTempFolder",
  `
#!/bin/bash
rm -rf ${process.env.SERVER_TEMP_SCRIPT_DIR}
  `
);

module.exports = DeleteTempFolder;

require("dotenv").config();
const BashScript = require("./BashScript");

const MakeTempFolder = new BashScript(
  'MakeTempFolder',
  `
#!/bin/bash

mkdir ${process.env.SERVER_TEMP_SCRIPT_DIR}
  `
);

module.exports = MakeTempFolder;
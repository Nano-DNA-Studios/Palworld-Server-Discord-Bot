require("dotenv").config();
const BashScript = require("./BashScript");

//Start works
const Start = new BashScript("Start", 
`#!/bin/bash
./${process.env.SERVER_INSTALL_DIR}/${process.env.SERVER_START_SCRIPT} &

echo "Server has Started"
`);


module.exports = Start;


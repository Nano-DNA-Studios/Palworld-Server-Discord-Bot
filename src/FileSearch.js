require("dotenv").config();
const { dir } = require("console");
const fs = require("fs");
const path = require("path");


function GetFiles(relativePath)
{
  const directoryPath = path.join(__dirname, relativePath); // path to your directory

  if (fs.existsSync(directoryPath))
    return fs.readdirSync(directoryPath); 
  else 
    return [];
}

function GetBashCommands ()
{
 const Path = "Bash/BashScripts";

  let Files = GetFiles(Path);

  let Commands = [];

  Files.forEach(file => {
    if (path.extname(file) === ".js") {
      const module = require(`./${Path}/${file}`);

      if ('CommandName' in module)
        Commands.push(module);
    }
  });

  return Commands;
}

module.exports = {
  GetBashCommands,
  GetFiles
};


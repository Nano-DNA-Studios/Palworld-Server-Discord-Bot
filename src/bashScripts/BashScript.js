class BashScript {
  constructor(name, content) {
    require("dotenv").config();
    this.BashCommandName = name;
    this.content = content;
    this.TempFolder = process.env.SERVER_TEMP_SCRIPT_DIR;
    this.fileName = `${this.BashCommandName}.sh`;
  }

  SaveScript()
  {
    return `
    echo "${this.content}" > "${this.TempFolder}/${this.fileName}"
    `;
  }

  RunScript()
  {
    console.log(`bash ${this.TempFolder}/${this.fileName}`);

    return `
    bash ${this.TempFolder}/${this.fileName}
    `;
  }

  GetBashCommands() {
    return `
    echo "${this.content}" > "${this.TempFolder}/${this.fileName}"
    bash ${this.TempFolder}/${this.fileName}
    `;
  }
}

module.exports = BashScript;

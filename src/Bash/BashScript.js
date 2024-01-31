require("dotenv").config();

class BashScript {
  constructor(data) {
    require("dotenv").config();
    this.CommandName = data.CommandName;
    this.CommandDescription = data.CommandDescription;
    this.CustomCode = data.CustomCode;
    this.Tag = data.Tag;
    this.SubCommands = data.SubCommands;
    this.ReplyMessage = data.ReplyMessage;
    this.LogMessage = data.LogMessage;
    this.ErrorMessage = data.ErrorMessage;
    this.SuccessMessage = data.SuccessMessage;

    this.content;
    this.TempFolder = process.env.SERVER_TEMP_SCRIPT_DIR;
    this.fileName = `${this.BashCommandName}.sh`;
  }

  GetCode() {
    return this.CustomCode.replace('\t', '');
  }

  SaveScript() {
    return `
    echo "${this.content}" > "${this.TempFolder}/${this.fileName}"
    `;
  }

  RunScript() {
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

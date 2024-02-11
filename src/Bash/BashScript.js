"use strict";
class BashScript {
    constructor(data) {
        this.CommandName = data.CommandName;
        this.CommandDescription = data.CommandDescription;
        this.CustomCode = data.CustomCode;
        this.Tag = data.Tag;
        this.SubCommands = data.SubCommands;
        this.ReplyMessage = data.ReplyMessage;
        this.LogMessage = data.LogMessage;
        this.ErrorMessage = data.ErrorMessage;
        this.SuccessMessage = data.SuccessMessage;
        this.FailMessages = data.FailMessages;
        this.Options = data.Options;
    }
    GetCode() {
        return this.CustomCode.replace('\t', '');
    }
}
module.exports = BashScript;

import IBashCommand from "../IBashCommand";
import BashScriptsEnum from "../BashScriptsEnum";

//Start works
 const Update : IBashCommand = 
 {
    CommandName: BashScriptsEnum.Update,
    CommandDescription: "Updates the Server",
    CustomCode: 
`
steamcmd +force_install_dir ${process.env.STEAM_INSTALL_DIR} +login anonymous +app_update 2394010 validate +quit
`,
    Tag: BashScriptsEnum.Update,
    SubCommands: [BashScriptsEnum.Shutdown, BashScriptsEnum.Backup, BashScriptsEnum.Custom, BashScriptsEnum.Start, BashScriptsEnum.Ping],
    ReplyMessage: "Server is Updating :arrows_clockwise:",
    LogMessage: "Server is Updating :arrows_clockwise:",
    ErrorMessage: ":warning: Server could not Update :warning:",
    SuccessMessage: ":white_check_mark: Server has been Updated :white_check_mark:",
    FailMessages: [],
    Options: []
  };

export = Update;
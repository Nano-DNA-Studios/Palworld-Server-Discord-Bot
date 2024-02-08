const fs = require('fs');
require("dotenv").config();

class DataManager {
  constructor(guildID) {
    
  //Just Load everything from Environment Variables?

    //Constants
    this.GUILD_ID;
    this.SERVER_PROCESS_NAME = "PalServer-Linux-Test";
    this.SERVER_START_SCRIPT = "PalServer.sh";

    this.Data = this.LoadJSONFile(guildID);


    this.CLIENT_ID = this.Data.ClientID;
    this.RUN_LOCALLY = this.Data.RunLocally;
    this.SERVER_IP = this.Data.ServerIP;
    this.SERVER_USER = this.Data.ServerUser;
    this.SERVER_PORT = this.Data.ServerPort;
    this.SERVER_PASSWORD = this.Data.ServerPassword;
    this.SERVER_USER_DIR = this.Data.ServerUserDir;
    this.STEAM_INSTALL_DIR = this.Data.SteamInstallDir;

    console.log(this.Data);

   
    //Load from JSON and set variables
  }

  LoadJSONFile (guildID)
  {
    let Data;

    try 
    {
      //Try to load
      let rawData = fs.readFileSync(`src/Resources/data.json`);
      Data = JSON.parse(rawData);
      console.log('Data Loaded');
      //Extract all data from JSON
    } catch (error)
    {
      this.GUILD_ID = guildID;
      Data = this.GetDefaultJSONData();
      fs.writeFileSync('src/Resources/data.json', Data);
    }

    return Data;
  }

  GetDefaultJSONData ()
  {
    let data =
    {
      'GuildID': this.GUILD_ID,
      'ClientID': '0',
      'ServerProcessName': this.SERVER_PROCESS_NAME,
      'ServerStartScript': this.SERVER_START_SCRIPT,
      'LogChannelID': '0',
      'RunLocally': true,

      'ServerIP': '0',
      'ServerUser': 'm',
      'ServerPort': '0',
      'ServerPassword': 'p',

      'ServerInstallDir': '/home/user/PalworldServer',

    };

    return JSON.stringify(data, null, 4)
  }

  GetJSONFormat()
  {
    let data =
    {
      'GuildID': this.GUILD_ID,
      'ClientID': this.CLIENT_ID,
      'ServerProcessName': this.SERVER_PROCESS_NAME,
      'ServerStartScript': this.SERVER_START_SCRIPT,
      'LogChannelID': this.LOG_CHANNEL_ID,
      'RunLocally': this.RUN_LOCALLY,

      'ServerIP': this.SERVER_IP,
      'ServerUser': this.SERVER_USER,
      'ServerPort': this.SERVER_PORT,
      'ServerPassword': this.SERVER_PASSWORD,

      'ServerInstallDir': this.SERVER_INSTALL_DIR,
    };

     // DISCORD_BOT_TOKEN = MTIwMTE5ODM0NDE5ODk2NzMxNg.GFy5xA.rBKm_67luPTGRF7s2veGcga_tsVkROoh31xrAE
    // GUILD_ID = 698385755977809990
    // CLIENT_ID = 1201198344198967316
    
    // LOG_CHANNEL_ID = 1201331389598007446
    
    // SERVER_IP = 69.60.237.4
    // SERVER_USER = mrdna
    // SERVER_PORT = 55515
    // SERVER_PASSWORD = 299792458
    
    // SERVER_USER_DIR = ~/
    // SERVER_TEMP_SCRIPT_DIR = PalServerCache
    // STEAM_INSTALL_DIR = /home/mrdna/PalworldServer
    
    // SERVER_INSTALL_DIR =  PalworldServer
    // SERVER_START_SCRIPT = PalServer.sh
    
    // SERVER_PROCESS_NAME = PalServer-Linux-Test

    return JSON.stringify(data, null, 4)
  }

}

module.exports = DataManager;
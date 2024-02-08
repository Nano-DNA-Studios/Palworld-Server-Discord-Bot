const fs = require('fs');
require("dotenv").config();
const readline = require('readline');

class DataManager {
  constructor() {
    this.DATA_SAVE_PATH = 'src/Resources/data.json';

    //Constants
    this.DISCORD_BOT_TOKEN = "";
    this.GUILD_ID = "";
    this.SERVER_PROCESS_NAME = "";
    this.SERVER_START_SCRIPT = "";

    this.CLIENT_ID = "";
    this.RUN_LOCALLY = "";
    this.SERVER_IP = "";
    this.SERVER_USER = "";
    this.SERVER_PORT = "";
    this.SERVER_PASSWORD = "";
    //this.SERVER_USER_DIR;
    this.STEAM_INSTALL_DIR = "";
  }

  //Loads the Data from the JSON File into memory of the class
  async LoadData() {
  
    if (this.FileExists()) {
      this.LoadDataFromFile();
    }
    else {
      await this.RegisterServerController();
      this.LoadDataFromFile();
    }
  }

  //Checks if the file exists
  FileExists()
  {
    return fs.existsSync(this.DATA_SAVE_PATH);
  }

  SaveData() {
    let jsonData = this.GetJSONFormat();
    fs.writeFileSync(this.DATA_SAVE_PATH, jsonData);
  }

  LoadDataFromFile() {
    let dataJSON = fs.readFileSync(this.DATA_SAVE_PATH);
    let data = JSON.parse(dataJSON);

    //Load all  data from JSON and put it in class variables 
    this.DISCORD_BOT_TOKEN = data.DiscordBotToken;
    this.GUILD_ID = data.GuildID;
    this.CLIENT_ID = data.ClientID;
    this.SERVER_PROCESS_NAME = data.ServerProcessName;
    this.SERVER_START_SCRIPT = data.ServerStartScript;
    this.LOG_CHANNEL_ID = data.LogChannelID;
    this.RUN_LOCALLY = data.RunLocally;
    this.SERVER_IP = data.ServerIP;
    this.SERVER_USER = data.ServerUser;
    this.SERVER_PORT = data.ServerPort;
    this.SERVER_PASSWORD = data.ServerPassword;
    this.STEAM_INSTALL_DIR = data.SteamInstallDir;
  }

  //Registers the Server Controller by creating the Default Data
  async RegisterServerController() {

    const setupReader = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });

    //Setup Question format
    const prompt = (query) => new Promise((resolve) => setupReader.question(query, resolve));

    // Prompt for bot token and guild ID asynchronously
    let botToken = await prompt('Enter the Discord Bot Token: ');

    // Close the readline interface after collecting all necessary inputs
    setupReader.close();

    let data =
    {
      'DiscordBotToken': botToken,
      'GuildID': '',
      'ClientID': '',
      'ServerProcessName': "PalServer-Linux-Test",
      'ServerStartScript': "PalServer.sh",
      'LogChannelID': '',
      'RunLocally': true,

      'ServerIP': '',
      'ServerUser': '',
      'ServerPort': '',
      'ServerPassword': '',

      'ServerInstallDir': '/home/user/PalworldServer',
    };

    //Save the data to the file
    let JSONData = JSON.stringify(data, null, 4);
    fs.writeFileSync(this.DATA_SAVE_PATH, JSONData);
  }

  GetJSONFormat() {
    let data =
    {
      'DiscordBotToken': this.DISCORD_BOT_TOKEN,
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

    return JSON.stringify(data, null, 4)
  }

  SetClientID(clientID) {
    if (this.CLIENT_ID != clientID)
    {
      this.CLIENT_ID = clientID;
      this.SaveData();
    }
  }

}

module.exports = DataManager;
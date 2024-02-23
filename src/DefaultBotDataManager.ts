import IBotDataManager from "./IBotDataManager";
import fs from 'fs';
import readline, { Interface as ReadLineInterface } from 'readline';

/**
 * The Default Bot Data Manager, implementing the bareminimum for a Bot Data Manager
 */
class DefaultBotDataManager implements IBotDataManager{

  /**
     * Save Path for the Bots Data
     */
  public DATA_SAVE_PATH: string;

  /**
   * Save Path for the File Data
   */
  public FILE_SAVE_PATH: string;

  /**
   * Discord Bot Token
   */
  public DISCORD_BOT_TOKEN: string = "";

  /**
   * Discord Server ID
   */
  public GUILD_ID: string = "";

  /**
   * Name of the Discord Server
   */
  public GUILD_NAME: string = "";

  /**
   * Id of the Discord Bot
   */
  public CLIENT_ID: string = "";

  /**
   * Channel ID of the Log Channel that the Bot will send logs to
   */
  public LOG_CHANNEL_ID: string = "";

  /**
   * Initializes the Data Manager
   * @param botDirectory The Directory that the Bot is located in
   */
  constructor ()
  {
      this.DATA_SAVE_PATH = process.cwd() + '\\Resources';
      this.FILE_SAVE_PATH = this.DATA_SAVE_PATH + '\\data.json';
  }

  /**
   * Loads the Data from the File or Registers it by creating the Default Data and file
   */
  public async LoadData() {
      if (this.FileExists()) {
          this.LoadDataFromFile();
      } else {
          await this.RegisterServerController();
          this.LoadDataFromFile();
      }
  }

  /**
   * Determines if the Data File Exists
   * @returns True if the file exists, False if it does not
   */
  private FileExists(): boolean {
      return fs.existsSync(this.FILE_SAVE_PATH);
  }

  /**
   * Saves the Data to the File
   */
  public SaveData(): void {
      let jsonData: string = this.GetJSONFormat();
      if (fs.existsSync(this.DATA_SAVE_PATH))
          fs.writeFileSync(this.FILE_SAVE_PATH, jsonData);
      else 
      {
        throw new Error(`Data Save Path does not exist ${this.DATA_SAVE_PATH}`);
      }
  }

  /**
   * Loads the Data from the File
   */
  private LoadDataFromFile(): void {
      let dataJSON: string = fs.readFileSync(this.FILE_SAVE_PATH, 'utf8');
      let data = JSON.parse(dataJSON);

      //Load all data from JSON and put it in class variables 
      this.DISCORD_BOT_TOKEN = data.DiscordBotToken;
      this.GUILD_ID = data.GuildID;
      this.GUILD_NAME = data.GuildName;
      this.CLIENT_ID = data.ClientID;
      this.LOG_CHANNEL_ID = data.LogChannelID;
  }

  /**
   * Registers the Server Controller by asking for the Bot Token
   */
  private async RegisterServerController(): Promise<void> {
      const setupReader: ReadLineInterface = readline.createInterface({
          input: process.stdin,
          output: process.stdout
      });

      //Setup Question format
      const prompt = (query: string) => new Promise<string>((resolve) => setupReader.question(query, resolve));

      // Prompt for bot token and guild ID asynchronously
      let botToken: string = await prompt('Enter the Discord Bot Token: ');
      let guildName: string = await prompt('Enter the Guild Name: ');

      // Close the readline interface after collecting all necessary inputs
      setupReader.close();

      let data = {
          'DiscordBotToken': botToken,
          'GuildID': '',
          'GuildName': guildName,
          'ClientID': '',
          'ServerProcessName': "PalServer-Linux-Test",
          'ServerStartScript': "PalServer.sh",
          'LogChannelID': '',
          'RunLocally': true,

          'ServerIP': '',
          'ServerUser': '',
          'ServerPort': '',
          'ServerPassword': '',

          'SteamInstallDir': '/home/user/PalworldServer',
      };

      //Save the data to the file
      let JSONData: string = JSON.stringify(data, null, 4);
      fs.writeFileSync(this.FILE_SAVE_PATH, JSONData);
  }

  /**
   * Gets the Data in JSON Format
   * @returns A string of the Data in JSON Format
   */
  private GetJSONFormat(): string {
      let data = {
          'DiscordBotToken': this.DISCORD_BOT_TOKEN,
          'GuildID': this.GUILD_ID,
          'GuildName': this.GUILD_NAME,
          'ClientID': this.CLIENT_ID,
          'LogChannelID': this.LOG_CHANNEL_ID,
      };

      return JSON.stringify(data, null, 4);
  }

  /**
   * Sets the Client ID for the Bot
   * @param clientID the ID of the Bot in string format
   */
  public SetClientID(clientID: string): void {
      if (this.CLIENT_ID !== clientID) {
          this.CLIENT_ID = clientID;
          this.SaveData();
      }
  }

  /**
   * Sets the Guild ID for the Bot
   * @param guildID ID of the Guild
   */
  public SetGuildID(guildID: string): void {
      this.GUILD_ID = guildID;

      this.SaveData();
  }

  /**
   * Sets the Log Channel that the Bot will send logs to
   * @param logChannelID The ID of the Log Channel
   */
  public SetLogChannelID(logChannelID: string) 
  {
      this.LOG_CHANNEL_ID = logChannelID;

      this.SaveData();
  }


}

export default DefaultBotDataManager;
import fs from 'fs';
import dotenv from 'dotenv';
import readline, { Interface as ReadLineInterface } from 'readline';
dotenv.config();

/**
 * Class Handling Data Management
 */
class DataManager {

    /**
     * Save Path for the Bots Data
     */
    public DATA_SAVE_PATH: string = 'src/Resources/data.json';

    /**
     * Discord Bot Token
     */
    public DISCORD_BOT_TOKEN: string = "";

    /**
     * Discord Server ID
     */
    public GUILD_ID: string = "";

    /**
     * Name of the Process that Handles the Palworld Server
     */
    public SERVER_PROCESS_NAME: string = "";

    /**
     * Name of the Script that Starts the Palworld Server
     */
    public SERVER_START_SCRIPT: string = "";

    /**
     * Id of the Discord Bot
     */
    public CLIENT_ID: string = "";

    /**
     * If the Bot is running locally on the same computer as the Palworld Server hosted or will SSH to communicate
     */
    public RUN_LOCALLY: boolean = true;

    /**
     * IP of the Server to SSH into 
     */
    public SERVER_IP: string = "";

    /**
     * User of the Server to SSH into 
     */
    public SERVER_USER: string = "";

    /**
     * Port of the Server to SSH into 
     */
    public SERVER_PORT: string = "";

    /**
     * Password of the Server to SSH into 
     */
    public SERVER_PASSWORD: string = "";

   /**
    * Directory the Palworld Server is installed in
    */
    public STEAM_INSTALL_DIR: string = "";

    /**
     * Channel ID of the Log Channel that the Bot will send logs to
     */
    public LOG_CHANNEL_ID: string = "";

    /**
     * Loads the Data from the File or Registers it by creating the Default Data and file
     */
    public async LoadData(): Promise<void> {
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
        return fs.existsSync(this.DATA_SAVE_PATH);
    }

    /**
     * Saves the Data to the File
     */
    public SaveData(): void {
        let jsonData: string = this.GetJSONFormat();
        fs.writeFileSync(this.DATA_SAVE_PATH, jsonData);
    }

    /**
     * Loads the Data from the File
     */
    private LoadDataFromFile(): void {
        let dataJSON: string = fs.readFileSync(this.DATA_SAVE_PATH, 'utf8');
        let data = JSON.parse(dataJSON);

        //Load all data from JSON and put it in class variables 
        this.DISCORD_BOT_TOKEN = data.DiscordBotToken;
        this.GUILD_ID = data.GuildID;
        this.CLIENT_ID = data.ClientID;
        this.SERVER_PROCESS_NAME = data.ServerProcessName;
        this.SERVER_START_SCRIPT = data.ServerStartScript;
        this.LOG_CHANNEL_ID = data.LogChannelID;
        this.RUN_LOCALLY = data.RunLocally; // Assuming conversion to boolean
        this.SERVER_IP = data.ServerIP;
        this.SERVER_USER = data.ServerUser;
        this.SERVER_PORT = data.ServerPort;
        this.SERVER_PASSWORD = data.ServerPassword;
        this.STEAM_INSTALL_DIR = data.SteamInstallDir;
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

        // Close the readline interface after collecting all necessary inputs
        setupReader.close();

        let data = {
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
        let JSONData: string = JSON.stringify(data, null, 4);
        fs.writeFileSync(this.DATA_SAVE_PATH, JSONData);
    }

    /**
     * Gets the Data in JSON Format
     * @returns A string of the Data in JSON Format
     */
    private GetJSONFormat(): string {
        let data = {
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

            'ServerInstallDir': this.STEAM_INSTALL_DIR,
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
     * Sets the SSH Server Information to login to the Server
     * @param serverIP IP of the Server
     * @param serverUser User on the Server
     * @param serverPort Port of the Server
     * @param serverPassword Password of the Server
     */
    public SetServerSettings(serverIP : string, serverUser: string, serverPort : string, serverPassword:string)
    {
        this.SERVER_IP = serverIP;
        this.SERVER_USER = serverUser;
        this.SERVER_PORT = serverPort;
        this.SERVER_PASSWORD = serverPassword;

        this.SaveData();
    }
}

export = DataManager;

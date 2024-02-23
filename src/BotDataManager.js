"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const readline_1 = __importDefault(require("readline"));
/**
 * Class Handling Data Management
 */
class BotDataManager {
    /**
     * Initializes the Data Manager
     * @param botDirectory The Directory that the Bot is located in
     */
    constructor() {
        /**
         * Discord Bot Token
         */
        this.DISCORD_BOT_TOKEN = "";
        /**
         * Discord Server ID
         */
        this.GUILD_ID = "";
        /**
         * Name of the Discord Server
         */
        this.GUILD_NAME = "";
        /**
         * Name of the Process that Handles the Palworld Server
         */
        this.SERVER_PROCESS_NAME = "";
        /**
         * Name of the Script that Starts the Palworld Server
         */
        this.SERVER_START_SCRIPT = "";
        /**
         * Id of the Discord Bot
         */
        this.CLIENT_ID = "";
        /**
         * If the Bot is running locally on the same computer as the Palworld Server hosted or will SSH to communicate
         */
        this.RUN_LOCALLY = true;
        /**
         * IP of the Server to SSH into
         */
        this.SERVER_IP = "";
        /**
         * User of the Server to SSH into
         */
        this.SERVER_USER = "";
        /**
         * Port of the Server to SSH into
         */
        this.SERVER_PORT = "";
        /**
         * Password of the Server to SSH into
         */
        this.SERVER_PASSWORD = "";
        /**
         * Directory the Palworld Server is installed in
         */
        this.STEAM_INSTALL_DIR = "";
        /**
         * Channel ID of the Log Channel that the Bot will send logs to
         */
        this.LOG_CHANNEL_ID = "";
        this.DATA_SAVE_PATH = process.cwd() + '\\Resources';
        this.FILE_SAVE_PATH = this.DATA_SAVE_PATH + '\\data.json';
    }
    /**
     * Loads the Data from the File or Registers it by creating the Default Data and file
     */
    LoadData() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.FileExists()) {
                this.LoadDataFromFile();
            }
            else {
                yield this.RegisterServerController();
                this.LoadDataFromFile();
            }
        });
    }
    /**
     * Determines if the Data File Exists
     * @returns True if the file exists, False if it does not
     */
    FileExists() {
        return fs_1.default.existsSync(this.FILE_SAVE_PATH);
    }
    /**
     * Saves the Data to the File
     */
    SaveData() {
        let jsonData = this.GetJSONFormat();
        if (fs_1.default.existsSync(this.DATA_SAVE_PATH))
            fs_1.default.writeFileSync(this.FILE_SAVE_PATH, jsonData);
        else {
            throw new Error(`Data Save Path does not exist ${this.DATA_SAVE_PATH}`);
        }
    }
    /**
     * Loads the Data from the File
     */
    LoadDataFromFile() {
        let dataJSON = fs_1.default.readFileSync(this.FILE_SAVE_PATH, 'utf8');
        let data = JSON.parse(dataJSON);
        //Load all data from JSON and put it in class variables 
        this.DISCORD_BOT_TOKEN = data.DiscordBotToken;
        this.GUILD_ID = data.GuildID;
        this.GUILD_NAME = data.GuildName;
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
    /**
     * Registers the Server Controller by asking for the Bot Token
     */
    RegisterServerController() {
        return __awaiter(this, void 0, void 0, function* () {
            const setupReader = readline_1.default.createInterface({
                input: process.stdin,
                output: process.stdout
            });
            //Setup Question format
            const prompt = (query) => new Promise((resolve) => setupReader.question(query, resolve));
            // Prompt for bot token and guild ID asynchronously
            let botToken = yield prompt('Enter the Discord Bot Token: ');
            let guildName = yield prompt('Enter the Guild Name: ');
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
            let JSONData = JSON.stringify(data, null, 4);
            fs_1.default.writeFileSync(this.FILE_SAVE_PATH, JSONData);
        });
    }
    /**
     * Gets the Data in JSON Format
     * @returns A string of the Data in JSON Format
     */
    GetJSONFormat() {
        let data = {
            'DiscordBotToken': this.DISCORD_BOT_TOKEN,
            'GuildID': this.GUILD_ID,
            'GuildName': this.GUILD_NAME,
            'ClientID': this.CLIENT_ID,
            'ServerProcessName': this.SERVER_PROCESS_NAME,
            'ServerStartScript': this.SERVER_START_SCRIPT,
            'LogChannelID': this.LOG_CHANNEL_ID,
            'RunLocally': this.RUN_LOCALLY,
            'ServerIP': this.SERVER_IP,
            'ServerUser': this.SERVER_USER,
            'ServerPort': this.SERVER_PORT,
            'ServerPassword': this.SERVER_PASSWORD,
            'SteamInstallDir': this.STEAM_INSTALL_DIR,
        };
        return JSON.stringify(data, null, 4);
    }
    /**
     * Sets the Client ID for the Bot
     * @param clientID the ID of the Bot in string format
     */
    SetClientID(clientID) {
        if (this.CLIENT_ID !== clientID) {
            this.CLIENT_ID = clientID;
            this.SaveData();
        }
    }
    /**
     * Sets the Guild ID for the Bot
     * @param guildID ID of the Guild
     */
    SetGuildID(guildID) {
        this.GUILD_ID = guildID;
        this.SaveData();
    }
    /**
     * Sets the SSH Server Information to login to the Server
     * @param serverIP IP of the Server
     * @param serverUser User on the Server
     * @param serverPort Port of the Server
     * @param serverPassword Password of the Server
     */
    SetSSHSettings(serverIP, serverUser, serverPort, serverPassword) {
        this.SERVER_IP = serverIP;
        this.SERVER_USER = serverUser;
        this.SERVER_PORT = serverPort;
        this.SERVER_PASSWORD = serverPassword;
        this.SaveData();
    }
    /**
     * Sets the Run Locally Boolean
     * @param runLocally Boolean determining if the server is running locally or not. If true, the server is running locally. If false, the server is running remotely and needs to be SSH'd into.
     */
    SetRunLocally(runLocally) {
        this.RUN_LOCALLY = runLocally;
        this.SaveData();
    }
    /**
     * Sets the Log Channel that the Bot will send logs to
     * @param logChannelID The ID of the Log Channel
     */
    SetLogChannelID(logChannelID) {
        this.LOG_CHANNEL_ID = logChannelID;
        this.SaveData();
    }
}
exports.default = BotDataManager;
